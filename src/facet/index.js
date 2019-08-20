
let ReleaseObject = require("../release-object/index");
let Type = require("../type/index");

/**
 * A NIEM Facet
 */
class Facet extends ReleaseObject {

  /**
   * @param {String} typeQName
   * @param {string} value
   * @param {string} definition
   * @param {Facet.StyleType} [style="enumeration"] Defaults to enumeration
   */
  constructor(typeQName, value, definition, style="enumeration") {
    super();

    this.typeQName = typeQName;
    this.style = style;
    this.value = value;
    this.definition = definition;
  }

  get isCode() {
    return this.style == "enumeration";
  }

  get typePrefix() {
    if (this.typeQName && this.typeQName.includes(":")) {
      return this.typeQName.split(":")[0];
    }
  }

  get typeName() {
    if (this.typeQName && this.typeQName.includes(":")) {
      return this.typeQName.split(":")[1];
    }
  }

  get sourceDataSet() {
    return this.source.facets;
  }

  async namespace() {
    return this.release.namespace(this.typePrefix);
  }

  async type() {
    return this.release.type(this.typePrefix, this.typeName);
  }

  async dependencies() {
    let type = await this.type();
    return {type, count: 1};
  }

  get authoritativePrefix() {
    return this.typePrefix;
  }

  get label() {
    let shortStyle = this.style.replace("enumeration", "enum");
    return this.typeQName + " - " + shortStyle + " " + this.value;
  }

  get route() {
    return Facet.route(this.userKey, this.modelKey, this.releaseKey, this.typePrefix, this.typeName, this.value, this.style);
  }

  /**
   * @param {string} userKey
   * @param {string} modelKey
   * @param {string} releaseKey
   * @param {string} typeQName
   * @param {string} value
   * @param {Facet.StyleType} [style="enumeration"] Default "enumeration"
   */
  static route(userKey, modelKey, releaseKey, typePrefix, typeName, value, style="enumeration") {
    let typeRoute = Type.route(userKey, modelKey, releaseKey, typePrefix, typeName);
    return typeRoute + `/facets/${style}/${value}`;
  }

  get identifiers() {
    return Facet.identifiers(this.userKey, this.modelKey, this.releaseKey, this.typeQName, this.value, this.style, this.definition);
  }

  /**
   * @param {string} userKey
   * @param {string} modelKey
   * @param {string} releaseKey
   * @param {string} typeQName
   * @param {string} value
   * @param {Facet.StyleType} [style="enumeration"] Default "enumeration"
   * @param {string} definition
   */
  static identifiers(userKey, modelKey, releaseKey, typeQName, value, style="enumeration", definition) {
    return {userKey, modelKey, releaseKey, typeQName, style, value, definition};
  }

  toJSON() {
    return {
      ...super.toJSON(),
      typePrefix: this.typePrefix,
      typeName: this.typeName,
      style: this.style,
      value: this.value,
      definition: this.definition
    };
  }

}

/** @type{"enumeration"|"length"|"minLength"|"maxLength"|"pattern"|"whiteSpace"|"maxInclusive"|"minInclusive"|"maxExclusive"|"minExclusive"|"totalDigits"|"fractionDigits"} */
Facet.StyleType;

Facet.Styles = ["enumeration", "length", "minLength", "maxLength", "pattern",
  "whiteSpace", "maxInclusive", "minInclusive", "maxExclusive", "minExclusive",
  "totalDigits", "fractionDigits"];



/**
 * Search criteria options for facet find operations.
 *
 * @typedef {Object} CriteriaType
 * @property {string} userKey
 * @property {string} modelKey
 * @property {string} releaseKey
 * @property {string} niemReleaseKey
 * @property {string|RegExp} typeQName
 * @property {string|string[]} typePrefix
 * @property {string|RegExp} typeName
 * @property {string|RegExp} value
 * @property {string|RegExp} definition
 * @property {Facet.StyleType[]} style
 * @property {boolean} isCode True to return only enums; false to return non-enums
 * @property {string|RegExp} keyword - value or definition
 */
Facet.CriteriaType = {};

Facet.CriteriaKeywordFields = ["value", "definition"];

module.exports = Facet;
