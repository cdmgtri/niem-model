
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
   * @param {string} prefix
   * @param {string} name
   * @param {string} value
   * @param {Facet.StyleType} [style="enumeration"] Default "enumeration"
   */
  static route(userKey, modelKey, releaseKey, prefix, name, value, style="enumeration") {
    let typeRoute = Type.route(userKey, modelKey, releaseKey, prefix, name);
    return typeRoute + `/facets/${style}/${value}`;
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
 * @property {string|RegExp} prefix
 * @property {string|RegExp} name
 * @property {string|RegExp} value
 * @property {string|RegExp} definition
 * @property {string|RegExp} keyword - value or definition
 * @property {Facet.StyleType[]} styles
 * @property {boolean} enums True to return only enums; false to return non-enums
 */
Facet.CriteriaType = {};


module.exports = Facet;

let Release = require("../release/index");
