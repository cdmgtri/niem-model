
const Component = require("../component/index");

/**
 * A property represents a concept, idea, or thing. It defines specific semantics and appears in
 * exchanges as the tag or label for a field.
 *
 * Properties may be more commonly known as as elements, attributes, fields, tags, keys, or keywords.
 *
 * @extends {Component<Property>}
 */
class Property extends Component {

  /**
   * @param {string} [prefix] - Prefix of the namespace in which the property is defined
   * @param {string} [name] - Name of the property
   * @param {string} [definition] - Definition of the property
   * @param {string} [typeQName] - Qualified name of the property's data type
   * @param {string} [groupQName] - Qualified name of the property's substitution group head
   * @param {boolean} [isElement=true] - True if element (default); false if attribute
   * @param {boolean} [isAbstract=false] - True if concrete (default); false if abstract
   * @param {boolean} [nillable=true] - True if property can be assigned an explicit null value (default)
   */
  constructor (prefix="", name="", definition="", typeQName="", groupQName="", isElement=true, isAbstract=false, nillable=true) {

    super(prefix, name, definition);

    /**
     * Qualified name of the property's data type
     * @type {string}
     */
    this.typeQName = typeQName;

    /**
     * Qualified name of the property's substitution group head
     * @type {string}
     */
    this.groupQName = groupQName;

    /**
     * True if the property is an element; false if attribute
     * @type {boolean}
     */
    this.isElement = isElement;

    /**
     * True if the property is concrete; false if abstract
     * @type {boolean}
     */
    this.isAbstract = isAbstract;

    /**
     * True if the property can be assigned an explicit null value
     * @type {boolean}
     */
    this.nillable = nillable;

    // Update nillable to false if property is an attribute or an abstract element
    if (!this.isElement || this.isAbstract) {
      this.nillable = false;
    }

    /**
     * Specially-designated properties to which a metadata property may be applied.
     * @type {string[]}
     */
    this.appliesToPropertyQNames = [];

    /**
     * Specially-designated types to which a metadata property may be applied.
     * @type {string[]}
     */
    this.appliesToTypeQNames = [];

  }

  /**
   * Namespace prefix of the property's data type
   * @type {string}
   */
  get typePrefix() {
    return Component.getPrefix(this.typeQName);
  }

  /**
   * Name of the property's data type, without the namespace prefix
   * @type {string}
   */
  get typeName() {
    return Component.getName(this.typeQName);
  }

  /**
   * Namespace prefix of the property's substitution group head
   * @type {string}
   */
  get groupPrefix() {
    return Component.getPrefix(this.groupQName);
  }

  /**
   * Name of the property's substitution group head, without the namespace prefix
   * @type {string}
   */
  get groupName() {
    return Component.getName(this.groupQName);
  }

  /**
   * True if the property is an attribute; false if the property is an element.
   * @type {boolean}
   */
  get isAttribute() {
    return ! this.isElement;
  }

  /**
   * True if the property is a concrete element; false if the property is an abstract element or an attribute.
   * @type {boolean}
   */
  get isConcrete() {
    return ! this.isAbstract;
  }

  /**
   * Style of the property
   * @type {"abstract"|"attribute"|"element"}
   */
  get style() {

    if (this.isAbstract == true) {
      return "abstract";
    }
    if (this.isAttribute == true) {
      return "attribute";
    }
    return "element";

  }

  get sourceDataSet() {
    if (this.source) return this.source.properties;
  }

  /**
   * Gets the substitution group head property for this property.
   * @returns {Promise<Property>}
   */
  async group() {
    return this.release.properties.get(this.groupPrefix + ":" + this.groupName);
  }

  /**
   * Gets the substitution group or substitution group grandparent property
   * @todo Substitution group lookup should recurse to be able to go up multiple levels
   * @returns {Promise<Property>}
   */
  async groupHead() {
    let group = await this.group();

    if (group && group.group) {
      // The property's substitution group has its own substitution group
      return this.release.properties.get(group.qname);
    }

    return group;
  }

  /**
   * Gets the type object for this property's data type, based on the typeQName value.
   * @returns {Promise<import("../typedefs").Type>}
   */
  async type() {
    return this.release.types.get(this.typeQName);
  }

  /**
   * Gets properties that can be substituted for this property.
   * @param {CriteriaType} [criteria] Optional criteria to filter the results
   * @returns {Promise<Property[]>}
   */
  async substitutions(criteria={}) {
    criteria.groupQName = this.qname;
    return this.release.properties.find(criteria);
  }

  /**
   * Gets immediate and second-level properties that can be substituted for this property.
   * @param {CriteriaType} criteria Optional criteria to filter the results
   * @returns {Promise<Property[]>}
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

  /**
   * Specially-designated types to which a metadata property may be applied.
   * @returns {Promise<import("../typedefs").Type[]>}
   */
  async appliesToTypes() {

    /** @type {import("../typedefs").Type[]} */
    let types = [];

    for (let qname of this.appliesToTypeQNames) {
      let type = await this.release.types.get(qname);
      types.push(type);
    }

    return types;
  }

  /**
   * Specially-designated properties to which a metadata property may be applied.
   * @returns {Promise<Property[]>}
   */
   async appliesToProperties() {

    /** @type {Property[]} */
    let properties = [];

    for (let qname of this.appliesToPropertyQNames) {
      let property = await this.release.properties.get(qname);
      properties.push(property);
    }

    return properties;
  }

  /**
   * Sub-property functions for this property as it may occur under one or more types.
   * - async add(typeQName, [min], [max], [definition]) => SubProperty
   * - async find(criteria) => SubProperty[]
   */
  get subProperties() {

    return {

      /**
       * Adds this property to the specified type.
       * @param {string} typeQName
       * @param {string} [min]
       * @param {string} [max]
       * @param {string} [definition]
       */
      add: async (typeQName, min, max, definition) => {
        return this.release.subProperties.add(typeQName, this.qname, min, max, definition);
      },

      /**
       * Finds all sub-property relationships for which this property participates.
       * @param {import("../subproperty/index").CriteriaType} [criteria] - Optional criteria by which to filter the results
       * @returns {Promise<import("../typedefs").SubProperty[]>}
       */
      find: async (criteria={}) => {
        criteria.propertyQName = this.qname;
        let d = await this.dependencies();
        d.type
        return this.release.subProperties.find(criteria);
      }

    }
  }

  /**
   * Gets an object containing the other objects that this property directly refers to.
   *
   * Useful in helping to determine which namespaces will need to be imported in this property's schema.
   *
   * - type: Data type of this property
   * - group: Substitution group head for this property
   * - count: Number of dependencies (between 0 and 2)
   */
  async dependencies() {

    let type = await this.type();
    let group = await this.group();

    let count = 0;
    if (type) count++;
    if (group) count++;

    return { type, group, count };
  }

  /**
   * Gets an object containing the other objects that refer to this property.
   *
   * Useful in cascading changes when this property is updated or deleted.
   *
   * - substitutions: Properties that may substitute for this property
   * - subProperties: Sub-property relationships that this property is a part of
   * - count:  Number of dependents
   *
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
   * Cascades changes when a property is updated or deleted.
   *
   * - edit: Updates the property's qname in references by other components
   * - delete: Deletes the reference to this property from other components
   *
   * @param {"edit"|"delete"} op - Change operation
   * @param {import("../typedefs").Change} [change] - Change description information
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

  /**
   * Gets an object with functions that will find any contents that this property may contain or carry.
   *
   * - async facets() - Finds any codes or other facets that this property may contain
   * - async containedProperties() - Finds any properties that this property directly contains
   * - async inheritedProperties() - Finds parent types and the properties those types contain
   * - async base() - Finds the base or parent of this property's data type
   */
  get contents() {

    let self = this;

    return {

      /**
       * Finds any codes or other facets that this property may contain
       */
      async facets() {
        let type = await self.type();
        return type ? type.contents.facets() : [];
      },

      /**
       * Finds any sub-properties that this property may directly contain
       */
      async containedProperties() {
        let type = await self.type();
        return type ? type.contents.containedProperties() : [];
      },

      /**
       * Finds parent types and the properties those types contain, e.g., {parentTypeQName: subProperty[]}
       */
      async inheritedProperties() {
        let type = await self.type();
        return type ? type.contents.inheritedProperties() : {};
      },

      async base() {
        let type = await self.type();
        if (type) return type.base();
      }

    }

  }

  /**
   * Creates a new property.
   * @param {string} prefix
   * @param {string} name
   * @param {string} [definition]
   * @param {string} [typeQName]
   * @param {string} [groupQName]
   * @param {boolean} [isElement=true]
   * @param {boolean} [isAbstract=false]
   * @param {import("../release-object/index").NDRVersionType} [ndrVersion]
   * @returns {Property}
   */
   static create (prefix, name, definition, typeQName, groupQName, isElement=true, isAbstract=false, ndrVersion) {
    return new Property(prefix, name, definition, typeQName, groupQName, isElement, isAbstract);
  }

  /**
   * @param {import("../typedefs").Release} release
   * @param {string} prefix
   * @param {string} name
   * @param {string} definition
   * @param {string} [typeQName]
   * @param {string} [groupQName]
   * @param {boolean} [isAbstract=false]
   */
  static createElement(release, prefix, name, definition, typeQName, groupQName, isAbstract=false) {
    let property = new Property(prefix, name, definition, typeQName, groupQName, true, isAbstract);
    property.release = release;
    return property;
  }

  /**
   * @param {import("../typedefs").Release} release
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
   * @param {import("../typedefs").Release} release
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
/**
 * @type {CriteriaType}
 */
Property.PropertyCriteriaType;

Property.CriteriaKeywordFields = ["name", "definition"];

/**
 * @typedef {Object} IdentifiersType
 * @property {string} userKey
 * @property {string} modelKey
 * @property {string} releaseKey
 * @property {string} prefix
 * @property {string} name
 */
/**
 * @type {IdentifiersType}
 */
Property.IdentifiersType;

/**
 * @typedef {Object} DependentsTypes
 * @property {Property[]} substitutions
 * @property {Array<import("../subproperty/index")>} subProperties
 * @property {number} count
 */
/**
 * @type {DependentsTypes}
 */
 Property.PropertyDependentsTypes;

module.exports = Property;
