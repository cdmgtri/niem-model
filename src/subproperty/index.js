
let ReleaseObject = require("../release-object/index");
let Component = require("../component/index");
let Type = require("../type/index");

/**
 * A usage of a property by a type.
 */
class SubProperty extends ReleaseObject {

  /**
   * @param {String} typeQName
   * @param {String} propertyQName
   * @param {String} [min="0"] Default "0"
   * @param {String} [max="unbounded"] Default "unbounded"; or "1" if property name begins with a lower case letter
   * @param {String} definition
   * @param {"element"|"attribute"} style
   * @param {number} [sequence]
   */
  constructor(typeQName, propertyQName, min="0", max="unbounded", definition="", style="element", sequence) {

    super();

    this.typeQName = typeQName;
    this.propertyQName = propertyQName;
    this.style = style;
    this.min = min;
    this.max = max;
    this.definition = definition;
    this.sequence = sequence;

  }

  /**
   * @param {ReleaseObject.NDRVersionType} ndrVersion
   * @param {String} typeQName
   * @param {String} propertyQName
   * @param {String} [min="0"] Default "0"
   * @param {String} [max="unbounded"] Default "unbounded"; or "1" if property name begins with a lower case letter
   * @param {String} definition
   * @param {"element"|"attribute"} style
   * @param {number} sequence
   */
  static create(ndrVersion, typeQName, propertyQName, min="0", max="unbounded", definition, style, sequence) {
    return new SubProperty(typeQName, propertyQName, min, max, definition, style, sequence);
  }

  get typePrefix() {
    return Component.getPrefix(this.typeQName);
  }

  get typeName() {
    return Component.getName(this.typeQName);
  }

  get propertyPrefix() {
    return Component.getPrefix(this.propertyQName);
  }

  get propertyName() {
    return Component.getName(this.propertyQName);
  }

  get sourceDataSet() {
    return this.source.subProperties;
  }

  /**
   * Namespace of the type
   */
  async namespace() {
    return this.release.namespaces.get(this.typePrefix);
  }

  async type() {
    return this.release.types.get(this.typePrefix + ":" + this.typeName);
  }

  async property() {
    return this.release.properties.get(this.propertyPrefix + ":" + this.propertyName);
  }

  async dependencies() {
    let type = await this.type();
    let property = await this.property();
    return { type, property, count: 2 };
  }

  /**
   * Custom sort function to order an array of subProperties by qualified type, then qualified property.
   *
   * @example "ag:ProducerShare would appear before nc:Activity"
   *
   * @param {SubProperty} subProperty1
   * @param {SubProperty} subProperty2
   */
  static sortByTypeProperty(subProperty1, subProperty2) {
    if (!subProperty1 || ! subProperty2) return 0;

    if (subProperty1.typeQName != subProperty2.typeQName) {
      return subProperty1.typeQName.localeCompare(subProperty2.typeQName);
    }

    return subProperty1.propertyQName.localeCompare(subProperty2.propertyQName);
  }

  /**
   * Custom sort function to order an array of subProperties by qualified type, then qualified property.
   *
   * @example "ag:ProducerShare would appear before nc:Activity"
   *
   * @param {SubProperty} subProperty1
   * @param {SubProperty} subProperty2
   */
  static sortByCoreTypeProperty(subProperty1, subProperty2) {
    if (!subProperty1 || ! subProperty2) return 0;

    if (subProperty1.typePrefix != subProperty2.typePrefix) {
      if (subProperty1.typePrefix == "nc") return -1;
      if (subProperty2.typePrefix == "nc") return 1;
    }

    if (subProperty1.typeQName != subProperty2.typeQName) {
      return subProperty1.typeQName.localeCompare(subProperty2.typeQName);
    }

    if (subProperty1.propertyPrefix != subProperty2.propertyPrefix) {
      if (subProperty1.propertyPrefix == "nc") return -1;
      if (subProperty2.propertyPrefix == "nc") return 1;
    }

    return subProperty1.propertyQName.localeCompare(subProperty2.propertyQName);
  }

  /**
   * Custom sort function to order an array of subProperties by qualified type, the sequence,
   * then qualified property (if needed for duplicate sequence IDs).
   *
   * @param {SubProperty} subProperty1
   * @param {SubProperty} subProperty2
   */
  static sortByTypeSequence(subProperty1, subProperty2) {
    if (!subProperty1 || ! subProperty2) return 0;

    if (subProperty1.typeQName != subProperty2.typeQName) {
      return subProperty1.typeQName.localeCompare(subProperty2.typeQName);
    }

    if (subProperty1.sequence != subProperty2.sequence) {
      return subProperty1.sequence < subProperty2.sequence;
    }

    return subProperty1.propertyQName.localeCompare(subProperty2.propertyQName);
  }

  /**
   * Custom sort function to order an array of subProperties by qualified type, the sequence,
   * then qualified property (if needed for duplicate sequence IDs).
   *
   * @param {SubProperty} subProperty1
   * @param {SubProperty} subProperty2
   */
  static sortByCoreTypeSequence(subProperty1, subProperty2) {
    if (!subProperty1 || ! subProperty2) return 0;

    if (subProperty1.typePrefix != subProperty2.typePrefix) {
      if (subProperty1.typePrefix == "nc") return -1;
      if (subProperty2.typePrefix == "nc") return 1;
    }

    if (subProperty1.typeQName != subProperty2.typeQName) {
      return subProperty1.typeQName.localeCompare(subProperty2.typeQName);
    }

    if (subProperty1.sequence != subProperty2.sequence) {
      return subProperty1.sequence < subProperty2.sequence;
    }

    if (subProperty1.propertyPrefix != subProperty2.propertyPrefix) {
      if (subProperty1.propertyPrefix == "nc") return -1;
      if (subProperty2.propertyPrefix == "nc") return 1;
    }

    return subProperty1.propertyQName.localeCompare(subProperty2.propertyQName);
  }

  async isElement() {
    let property = await this.property();
    if (property) return property.isElement;
  }

  get authoritativePrefix() {
    return this.typePrefix;
  }

  get label() {
    return this.typeQName + " - " + this.propertyQName;
  }

  get route() {
    return SubProperty.route(this.userKey, this.modelKey, this.releaseKey, this.typeQName, this.propertyQName);
  }

  /**
   * @example "/niem/model/4.1/types/nc:PersonType/properties/nc:PersonName"
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

  /**
   * @param {string} userKey
   * @param {string} modelKey
   * @param {string} releaseKey
   * @param {string} typeQName
   * @param {string} propertyQName
   */
  static identifiers(userKey, modelKey, releaseKey, typeQName, propertyQName) {
    return {userKey, modelKey, releaseKey, typeQName, propertyQName};
  }

  toJSON() {
    return {
      ...super.toJSON(),
      typeQName: this.typeQName,
      propertyQName: this.propertyQName,
      min: this.min,
      max: this.max,
      definition: this.definition,
      style: this.style
    };
  }

}


/**
 * Search criteria options for subProperty find operations.
 *
 * @typedef {Object} CriteriaType
 * @property {string} [userKey]
 * @property {string} [modelKey]
 * @property {string} [releaseKey]
 * @property {string} [niemReleaseKey]
 * @property {string|string[]} [typePrefix]
 * @property {string|RegExp} [typeName]
 * @property {string|RegExp} [typeQName]
 * @property {string|string[]} [propertyPrefix]
 * @property {string|RegExp} [propertyName]
 * @property {string|RegExp} [propertyQName]
 * @property {string|RegExp} [min]
 * @property {string|RegExp} [max]
 * @property {string|RegExp} [keyword] - Property and type names
 */
SubProperty.CriteriaType = {};

SubProperty.CriteriaKeywordFields = ["typeName", "propertyName"];

/**
 * @typedef {Object} IdentifiersType
 * @property {string} userKey
 * @property {string} modelKey
 * @property {string} releaseKey
 * @property {string|RegExp} typeQName
 * @property {string|RegExp} propertyQName
 */
SubProperty.IdentifiersType;

module.exports = SubProperty;
