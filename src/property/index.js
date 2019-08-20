
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
   * @param {Property} [groupQName]
   * @param {boolean} [isElement=true]
   * @param {boolean} [isAbstract=false]
   */
  constructor (prefix, name, definition, typeQName, groupQName, isElement=true, isAbstract=false) {

    super(prefix, name, definition);

    this.typeQName = typeQName;
    this.groupQName = groupQName;
    this.isElement = isElement;
    this.isAbstract = isAbstract;
  }

  get typePrefix() {
    return Component.prefix(this.typeQName);
  }

  get typeName() {
    return Component.name(this.typeQName);
  }

  get groupPrefix() {
    return Component.prefix(this.groupQName);
  }

  get groupName() {
    return Component.name(this.groupQName);
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
    return this.release.property(this.groupPrefix, this.groupName);
  }

  async type() {
    return this.release.type(this.typePrefix, this.typeName);
  }

  async substitutions() {
    return this.release.properties({groupQName: this.qname});
  }

  async subProperties() {
    return this.release.subProperties({
      propertyPrefix: this.prefix,
      propertyName: this.name
    });
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
   */
  async dependents(current=true) {

    let qname = current ? this.qname : this.previousIdentifiers.prefix + ":" + this.previousIdentifiers.name;

    let substitutions = await this.release.properties({ groupQName: qname });
    let subProperties = await this.release.subProperties({ propertyQName: qname });

    let count = substitutions.length + subProperties.length;

    return { substitutions, subProperties, count };
  }

  /**
   * @param {"edit"|"delete"} op
   * @param {Change} change
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

  }

  static createElement(release, prefix, name, definition, typeQName, groupQName, isAbstract=false) {
    return new Property(release, prefix, name, definition, typeQName, groupQName, true, isAbstract);
  }

  static createAttribute(release, prefix, name, definition, typeQName) {
    return new Property(release, prefix, name, definition, typeQName, null, false, false);
  }

  static createAbstract(release, prefix, name, definition) {
    return new Property(release, prefix, name, definition, null, null, true, true);
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
      groupQName: this.groupQName
    };
  }

}

/**
 * Search criteria options for type find operations.
 *
 * String fields are for exact matches.
 *
 * @typedef {Object} CriteriaType
 * @property {string} userKey
 * @property {string} modelKey
 * @property {string} releaseKey
 * @property {string} niemReleaseKey
 * @property {string|string[]} prefix
 * @property {string|RegExp} name
 * @property {string|RegExp} definition
 * @property {string|string[]} typePrefix
 * @property {string|RegExp} typeName
 * @property {string|string[]|RegExp} typeQName
 * @property {string|RegExp} groupQName
 * @property {string|RegExp} groupPrefix
 * @property {boolean} isElement
 * @property {boolean} isAbstract
 * @property {RegExp} keyword - Name, definition, or other text keyword fields
 */
Property.CriteriaType = {};

Property.CriteriaKeywordFields = ["name", "definition"];

module.exports = Property;

let Change = require("../interfaces/source/change/index");
