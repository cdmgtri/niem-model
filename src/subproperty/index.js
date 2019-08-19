
let ReleaseObject = require("../release-object/index");
let Component = require("../component/index");
let Type = require("../type/index");

/**
 * A usage of a property by a type.
 */
class SubProperty extends ReleaseObject {

  /**
   * @param {Release} release
   * @param {String} typeQName
   * @param {String} propertyQName
   * @param {String} [min="0"] Default "0"
   * @param {String} [max="unbounded"] Default "unbounded"; or "1" if property name begins with a lower case letter
   * @param {String} definition
   */
  constructor(typeQName, propertyQName, min="0", max="unbounded", definition) {

    super();

    this.typeQName = typeQName;
    this.propertyQName = propertyQName;
    this.min = min;
    this.max = max;
    this.definition = definition;

    let propertyName = this.propertyName;
    let firstChar = propertyName ? propertyName[0] : ""
    if (firstChar && firstChar == firstChar.toLowerCase()) {
      // Set max to 1 for probable attribute (property name starts lower case)
      this.max = "1";
    }

  }

  get typePrefix() {
    return Component.prefix(this.typeQName);
  }

  get typeName() {
    return Component.name(this.typeQName);
  }

  get propertyPrefix() {
    return Component.prefix(this.typeQName);
  }

  get propertyName() {
    return Component.name(this.propertyQName);
  }

  get sourceDataSet() {
    return this.source.subProperties;
  }

  /**
   * Namespace of the type
   */
  async namespace() {
    return this.release.namespace(this.typePrefix);
  }

  async type() {
    return this.release.type(this.typePrefix, this.typeName);
  }

  async property() {
    return this.release.property(this.propertyPrefix, this.propertyName);
  }

  async isElement() {
    let property = await this.property();
    if (property) return property.isElement;
  }

  get authoritativePrefix() {
    return this.typePrefix;
  }

  get route() {
    return SubProperty.route(this.userKey, this.modelKey, this.releaseKey, this.typeQName, this.propertyQName);
  }

  /**
   * @example" /niem/model/4.1/types/nc:PersonType/properties/nc:PersonName"
   */
  static route(userKey, modelKey, releaseKey, typeQName, propertyQName) {
    let typeRoute = Type.route(userKey, modelKey, releaseKey, typeQName);
    return typeRoute + "/properties/" + propertyQName;
  }

  get identifiers() {
    return {
      ...super.identifiers,
      typeQName: this.typeQName,
      propertyQName: this.propertyQName
    };
  }

  toJSON() {
    return {
      ...super.toJSON(),
      typeQName: this.typeQName,
      propertyQName: this.propertyQName,
      min: this.min,
      max: this.max,
      definition: this.definition
    };
  }

}


/**
 * Search criteria options for subProperty find operations.
 *
 * @typedef {Object} CriteriaType
 * @property {string} userKey
 * @property {string} modelKey
 * @property {string} releaseKey
 * @property {string} niemReleaseKey
 * @property {string|string[]} typePrefix
 * @property {string|RegExp} typeName
 * @property {string|string[]} propertyPrefix
 * @property {string|RegExp} propertyName
 * @property {string|RegExp} min
 * @property {string|RegExp} max
 * @property {string|RegExp} keyword - Property and type names
 */
SubProperty.CriteriaType = {};

SubProperty.CriteriaKeywordFields = ["typeName", "propertyName"];

module.exports = SubProperty;

let Release = require("../release/index");
