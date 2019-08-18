
const Component = require("../component/index");

/**
 * A NIEM Property.
 *
 * @extends {Component}
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

  /**
   * Name from the property group's qname field.
   * Returns undefined if there is no qualified group.
   */
  get groupName() {
    // Check that the groupQName contains both a prefix and a name
    if (this.groupQName && this.groupQName.match(/.+\:.+/)) {
      return this.groupQName.split(":")[1];
    }
    return undefined;
  }

  /**
   * Namespace prefix from the property group's qname field.
   * Returns undefined if there is no qualified group.
   */
  get groupPrefix() {
    // Check that the groupQName contains both a prefix and a name
    if (this.groupQName && this.groupQName.match(/.+\:.+/)) {
      return this.groupQName.split(":")[0];
    }
    return undefined;
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

  static route(userKey, modelKey, releaseKey, prefix, name) {
    let releaseRoute = super.route(userKey, modelKey, releaseKey);
    return releaseRoute + "/properties/" + prefix + ":" + name;
  }

  get route() {
    return Property.route(this.userKey, this.modelKey, this.releaseKey, this.prefix, this.name);
  }

  get sourceDataSet() {
    if (this.source) return this.source.properties;
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
 * @property {string|RegExp} prefix
 * @property {string|RegExp} name
 * @property {string|RegExp} definition
 * @property {string|RegExp} keyword - Name, definition, or other type keyword fields
 * @property {string|RegExp} groupQName
 * @property {boolean} isElement
 * @property {boolean} isAbstract
 */
Property.CriteriaType = {};

module.exports = Property;
