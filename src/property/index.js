
const Component = require("../component/index");

/**
 * A NIEM Property.
 */
class Property extends Component {

  /**
   * @param {String} prefix
   * @param {String} name
   * @param {String} [definition]
   * @param {String} [typeQName]
   * @param {String} [groupQName]
   * @param {boolean} [isElement=true]
   * @param {boolean} [isAbstract=false]
   * @param {boolean} [nillable=true]
   */
  constructor (prefix="", name="", definition="", typeQName="", groupQName="", isElement=true, isAbstract=false, nillable=true) {

    super(prefix, name, definition);

    this.typeQName = typeQName;
    this.groupQName = groupQName;
    this.isElement = isElement;
    this.isAbstract = isAbstract;
    this.nillable = nillable;

    if (!this.isElement || this.isAbstract) {
      this.nillable = false;
    }

    /** @type {String[]} */
    this.appliesToPropertyQNames = [];

    /** @type {String[]} */
    this.appliesToTypeQNames = [];
  }

  /**
   * @param {import("../release-object/index").NDRVersionType} ndrVersion
   * @param {String} prefix
   * @param {String} name
   * @param {String} [definition]
   * @param {String} [typeQName]
   * @param {String} [groupQName]
   * @param {boolean} [isElement=true]
   * @param {boolean} [isAbstract=false]
   */
  static create (ndrVersion, prefix, name, definition, typeQName, groupQName, isElement=true, isAbstract=false) {
    return new Property(prefix, name, definition, typeQName, groupQName, isElement, isAbstract);
  }

  get typePrefix() {
    return Component.getPrefix(this.typeQName);
  }

  get typeName() {
    return Component.getName(this.typeQName);
  }

  get groupPrefix() {
    return Component.getPrefix(this.groupQName);
  }

  get groupName() {
    return Component.getName(this.groupQName);
  }

  get isAttribute() {
    return ! this.isElement;
  }

  get isConcrete() {
    return ! this.isAbstract;
  }

  get style() {

    if (this.isAbstract) {
      return "abstract";
    }
    if (this.isAttribute) {
      return "attribute";
    }
    if (this.groupQName) {
      return "substitution";
    }
    return "element";

  }

  get sourceDataSet() {
    if (this.source) return this.source.properties;
  }

  async group() {
    return this.release.properties.get(this.groupPrefix + ":" + this.groupName);
  }

  async groupHead() {
    let group = await this.group();

    if (group && group.group) {
      // The property's substitution group has its own substitution group
      return this.release.properties.get(group.qname);
    }

    return group;
  }

  async type() {
    return this.release.types.get(this.typePrefix + ":" + this.typeName);
  }

  /**
   * @param {CriteriaType} criteria
   */
  async substitutions(criteria={}) {
    criteria.groupQName = this.qname;
    return this.release.properties.find(criteria);
  }

  /**
   * @param {CriteriaType} criteria
   */
  async substitutionDescendants(criteria={}) {
    criteria.groupQName = this.qname;

    let substitutions = await this.release.properties.find(criteria);

    /** @type {Property[]} */
    let descendantSubstitutions = [];

    for (let childSubstitution of substitutions) {
      criteria.groupQName = childSubstitution.qname;
      let newDescendantSubstitutions = await this.substitutionDescendants(criteria);
      descendantSubstitutions.push(childSubstitution, ...newDescendantSubstitutions);
    }

    return descendantSubstitutions;
  }

  async appliesToTypes() {

    /** @type {Type[]} */
    let types = [];

    for (let qname of this.appliesToTypeQNames) {
      let type = await this.release.types.get(qname);
      types.push(type);
    }

    return types;
  }

  async appliesToProperties() {

    /** @type {Property[]} */
    let properties = [];

    for (let qname of this.appliesToPropertyQNames) {
      let property = await this.release.properties.get(qname);
      properties.push(property);
    }

    return properties;
  }

  get subProperties() {
    return {

      add: async (typeQName, min, max, definition) => {
        return this.release.subProperties.add(typeQName, this.qname, min, max, definition);
      },

      /**
       * @param {SubProperty.CriteriaType} criteria
       */
      find: async (criteria) => {
        criteria.propertyQName = this.qname;
        return this.release.subProperties.find(criteria);
      }

    };
  }

  async dependencies() {

    let type = await this.type();
    let group = await this.group();

    let count = 0;
    if (type) count++;
    if (group) count++;

    return { type, group, count };
  }

  /**
   * @param {boolean} [current=true] Defaults to true; false for last saved identifiers
   * @returns {Promise<DependentsTypes>}
   */
  async dependents(current=true) {

    let qname = current ? this.qname : this.previousIdentifiers.prefix + ":" + this.previousIdentifiers.name;

    let substitutions = await this.release.properties.find({ groupQName: qname });
    let subProperties = await this.release.subProperties.find({ propertyQName: qname });

    let count = substitutions.length + subProperties.length;

    return { substitutions, subProperties, count };
  }

  /**
   * @param {"edit"|"delete"} op
   * @param {Change} [change]
   */
  async updateDependents(op, change) {

    await super.updateDependents(op, change);

    let newQName = op == "edit" ? this.qname : null;

    let dependents = await this.dependents(false);

    // Update or delete subproperties (these don't exist without the property)
    for (let subProperty of dependents.subProperties) {
      if (op == "edit") {
        subProperty.propertyQName = newQName;
        await subProperty.save(change);
      }
      else if (op == "delete") {
        await subProperty.delete(change);
      }
    }

    // Update substitutions
    for (let substitution of dependents.substitutions) {
      substitution.groupQName = newQName;
      await substitution.save(change);
    }

    return dependents;

  }

  async contents() {

    if (this.isAbstract) {
      let substitutions = await this.release.properties.find({groupQName: this.qname});
      return { substitutions: substitutions.sort(Property.sortByQName) };
    }

    let type = await this.type();
    return type.contents();

  }

  /**
   * @param {Release} release
   * @param {string} prefix
   * @param {string} name
   * @param {string} definition
   * @param {string} typeQName
   * @param {string} groupQName
   * @param {boolean} [isAbstract=false]
   */
  static createElement(release, prefix, name, definition, typeQName, groupQName, isAbstract=false) {
    let property = new Property(prefix, name, definition, typeQName, groupQName, true, isAbstract);
    property.release = release;
    return property;
  }

  /**
   * @param {Release} release
   * @param {string} prefix
   * @param {string} name
   * @param {string} definition
   * @param {string} typeQName
   */
  static createAttribute(release, prefix, name, definition, typeQName) {
    let property = new Property(prefix, name, definition, typeQName, null, false, false);
    property.release = release;
    return property;
  }

  /**
   * @param {Release} release
   * @param {string} prefix
   * @param {string} name
   * @param {string} definition
   */
  static createAbstract(release, prefix, name, definition) {
    let property = new Property(prefix, name, definition, null, null, true, true);
    property.release = release;
    return property;
  }

  static route(userKey, modelKey, releaseKey, prefix, name) {
    let releaseRoute = super.route(userKey, modelKey, releaseKey);
    return releaseRoute + "/properties/" + prefix + ":" + name;
  }

  get route() {
    return Property.route(this.userKey, this.modelKey, this.releaseKey, this.prefix, this.name);
  }

  toJSON() {
    return {
      ...super.toJSON(),
      typeQName: this.typeQName,
      isElement: this.isElement,
      isAbstract: this.isAbstract,
      groupQName: this.groupQName,
      appliesToTypeQNames: this.appliesToTypeQNames,
      appliesToPropertyQNames: this.appliesToPropertyQNames
    };
  }

}

/**
 * Search criteria options for type find operations.
 *
 * String fields are for exact matches.
 *
 * @typedef {Object} CriteriaType
 * @property {string} [userKey]
 * @property {string} [modelKey]
 * @property {string} [releaseKey]
 * @property {string} [niemReleaseKey]
 * @property {string|string[]} [prefix]
 * @property {string|RegExp} [name]
 * @property {string|RegExp} [definition]
 * @property {string|string[]} [typePrefix]
 * @property {string|RegExp} [typeName]
 * @property {string|string[]|RegExp} [typeQName]
 * @property {string|RegExp} [groupQName]
 * @property {string|RegExp} [groupPrefix]
 * @property {boolean} [isElement]
 * @property {boolean} [isAbstract]
 * @property {string|RegExp} [keyword] - Name, definition, or other text keyword fields
 */
let PropertyCriteriaType;

Property.CriteriaKeywordFields = ["name", "definition"];

/**
 * @typedef {Object} IdentifiersType
 * @property {string} userKey
 * @property {string} modelKey
 * @property {string} releaseKey
 * @property {string} prefix
 * @property {string} name
 */
Property.IdentifiersType = Component.IdentifiersType;

/**
 * @typedef {Object} DependentsTypes
 * @property {Property[]} substitutions
 * @property {SubProperty[]} subProperties
 * @property {number} count
 */
let PropertyDependentsTypes;

module.exports = Property;

let Change = require("../interfaces/source/change/index");
let SubProperty = require("../subproperty/index");
let Release = require("../release/index");
let Type = require("../type/index");
