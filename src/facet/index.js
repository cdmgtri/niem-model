
let ReleaseObject = require("../release-object/index");
let Type = require("../type/index");

/**
 * A NIEM Facet
 * @extends {ReleaseObject<Facet>}
 */
class Facet extends ReleaseObject {

  /**
   * @param {String} typeQName
   * @param {string} value
   * @param {string} [definition]
   * @param {StyleType} [style="enumeration"] Defaults to enumeration
   */
  constructor(typeQName, value, definition="", style="enumeration") {
    super();

    this.typeQName = typeQName;
    this.style = style;
    this.value = value;
    this.definition = definition;
  }

  /**
   * @param {ReleaseObject.NDRVersionType} ndrVersion
   * @param {String} typeQName
   * @param {string} value
   * @param {string} [definition]
   * @param {StyleType} [style="enumeration"] Defaults to enumeration
   */
  static create(ndrVersion, typeQName, value, definition, style="enumeration") {
    return new Facet(typeQName, value, definition, style);
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
    return this.release.namespaces.get(this.typePrefix);
  }

  async type() {
    return this.release.types.get(this.typePrefix + ":" + this.typeName);
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
    return Facet.route(this.userKey, this.modelKey, this.releaseKey, this.typeQName, this.value, this.style);
  }

  /**
   * @param {string} userKey
   * @param {string} modelKey
   * @param {string} releaseKey
   * @param {string} typeQName
   * @param {string} value
   * @param {StyleType} [style="enumeration"] Default "enumeration"
   */
  static route(userKey, modelKey, releaseKey, typeQName, value, style="enumeration") {
    let typeRoute = Type.route(userKey, modelKey, releaseKey, typeQName);
    return typeRoute + `/facets/${style}/${value}`;
  }

  get identifiers() {
    return Facet.identifiers(this.userKey, this.modelKey, this.releaseKey, this.typeQName, this.value, this.style);
  }

  /**
   * @param {string} userKey
   * @param {string} modelKey
   * @param {string} releaseKey
   * @param {string} typeQName
   * @param {string} value
   * @param {StyleType} [style="enumeration"] Default "enumeration"
   */
  static identifiers(userKey, modelKey, releaseKey, typeQName, value, style="enumeration") {
    return {userKey, modelKey, releaseKey, typeQName, style, value};
  }

  toJSON() {
    return {
      ...super.toJSON(),
      typeQName: this.typeQName,
      style: this.style,
      value: this.value,
      definition: this.definition
    };
  }

  /**
   * @static
   * @param {Facet} facet1
   * @param {Facet} facet2
   * @returns {number}
   * @memberof Facet
   */
  static sortFacetsByStyleValueDefinition(facet1, facet2) {

    // Sort facet by type qname
    if (facet1.typeQName != facet2.typeQName) {
      return facet1.typeQName.localeCompare(facet2.typeQName);
    }

    // Sort facet by style
    if (facet1.style != facet2.style) return facet1.style.localeCompare(facet2.style);

    // Sort facet by value
    if (facet1.value != facet2.value) return facet1.value.localeCompare(facet2.value);

    // Sort facet by definition
    return facet1.definition.localeCompare(facet2.definition);

  }

  /**
   * Sorts by facet type qname, style, adjusted so that min facets appear before max facets,
   * and then facet value and definition.
   *
   * @example "enumeration, length, minValue, maxValue, pattern"
   *
   * @static
   * @param {Facet} facet1
   * @param {Facet} facet2
   * @returns {number}
   * @memberof Facet
   */
  static sortFacetsByStyleAdjustedValueDefinition(facet1, facet2) {

    // Sort facet by type qname
    if (facet1.typeQName != facet2.typeQName) {
      return facet1.typeQName.localeCompare(facet2.typeQName);
    }

    // Sort facet by style adjusted
    if (facet1.style != facet2.style) {
      if (facet1.style.startsWith("min") && facet2.style.startsWith("max")) {
        // Sort min before max styles
        return -1;
      }
      if (facet1.style.startsWith("max") && facet2.style.startsWith("min")) {
        // Sort max after min
        return 1;
      }
      // Other sort style alphabetically
      return facet1.style.localeCompare(facet2.style);
    }

    // Sort facet by value
    if (facet1.value != facet2.value) return facet1.value.localeCompare(facet2.value);

    // Sort facet by definition
    return facet1.definition.localeCompare(facet2.definition);

  }

  /**
   * @param {Facet} facet1
   * @param {Facet} facet2
   */
  static sortFacetsByValue(facet1, facet2) {

    // Sort facet by type qname
    if (facet1.typeQName != facet2.typeQName) {
      return facet1.typeQName.localeCompare(facet2.typeQName);
    }

    // Sort facet by value
    return facet1.value.localeCompare(facet2.value);

  }

}


/** @typedef {"enumeration"|"length"|"minLength"|"maxLength"|"pattern"|"whiteSpace"|"maxInclusive"|"minInclusive"|"maxExclusive"|"minExclusive"|"totalDigits"|"fractionDigits"}  StyleType */
let FacetStyleType;

Facet.Styles = ["enumeration", "length", "minLength", "maxLength", "pattern",
  "whiteSpace", "maxInclusive", "minInclusive", "maxExclusive", "minExclusive",
  "totalDigits", "fractionDigits"];



/**
 * Search criteria options for facet find operations.
 *
 * @typedef {Object} CriteriaType
 * @property {string} [userKey]
 * @property {string} [modelKey]
 * @property {string} [releaseKey]
 * @property {string} [niemReleaseKey]
 * @property {string|RegExp} [typeQName]
 * @property {string|string[]} [typePrefix]
 * @property {string|RegExp} [typeName]
 * @property {string|RegExp} [value]
 * @property {string|RegExp} [definition]
 * @property {Facet.StyleType[]} [style]
 * @property {boolean} [isCode] True to return only enums; false to return non-enums
 * @property {string|RegExp} [keyword] - value or definition
 */
let FacetCriteriaType;


Facet.CriteriaKeywordFields = ["value", "definition"];

/**
 * @typedef {Object} IdentifiersType
 * @property {string} userKey
 * @property {string} modelKey
 * @property {string} releaseKey
 * @property {string} typeQName
 * @property {string} value
 * @property {StyleType} [style="enumeration"]
 */
let FacetIdentifiersType;

module.exports = Facet;
