
let ReleaseObject = require("../release-object/index");

/**
 * A NIEM Namespace
 */
class Namespace extends ReleaseObject {

  /**
   * @param {String} prefix
   * @param {Namespace.NamespaceStyleType} [style]
   * @param {String} [uri]
   * @param {String} [fileName]
   * @param {String} [definition]
   * @param {String} [version]
   */
  constructor(prefix, style, uri, fileName, definition, version) {

    super();

    this.prefix = prefix;
    this.style = style;
    this.uri = uri;
    this.fileName = fileName;
    this.definition = definition;
    this.version = version;

    this.conformanceTargets = [];

    /** @type {String} */
    this.relativePath;

    /** @type {String} */
    this.xsdString;
  }

  get styleRank() {
    switch (this.style) {
      case "core":
        return 1;
      case "domain":
        return 2;
      case "code":
      case "csv":
        return 3;
      case "extension":
        return 4;
      case "adapter":
        return 5;
      case "proxy":
        return 6;
      case "utility":
        return 7;
      case "built-in":
        return 8;
      case "external":
        return 9;
    }
    return 99;
  }

  get conformanceRequired() {
    /** @type {Namespace.NamespaceStyleType[]} */
    let nonconformantStyles = ["built-in", "csv", "external", "utility"];
    return ! nonconformantStyles.includes(this.style);
  }

  /**
   * @type {"3.0"|"4.0"}
   */
  get ndrVersion() {
    return undefined;
  }

  get sourceDataSet() {
    return this.source.namespaces;
  }


  /**
   * @param {string} name
   * @param {string} definition
   * @param {string} typeQName
   * @param {string} groupQName
   * @param {boolean} [isElement=true] Defaults to true
   * @param {boolean} [isAbstract=false] Defaults to false
   */
  async createProperty(name, definition, typeQName, groupQName, isElement=true, isAbstract=false) {

    let property = new Property(this.prefix, name, definition, typeQName, groupQName, isElement, isAbstract);
    property.release = this.release;

    try {
      await property.add();
    }
    catch (err) {
    }

    return property;
  }

  /**
   * @param {string} name
   * @param {string} definition
   * @param {Type.StyleType} style
   * @param {string} baseQName
   */
  async createType(name, definition, style, baseQName) {

    let type = new Type(this.prefix, name, definition, style, baseQName);
    type.release = this.release;

    try {
      await type.add();
    }
    catch (err) {
    }

    return type;
  }

  /**
   * @param {string} typeName
   * @param {string} value
   * @param {string} definition
   * @param {Facet.StyleType} [style="enumeration"] Default "enumeration"
   */
  async createFacet(typeName, value, definition, style="enumeration") {

    let facet = new Facet(this.prefix + ":" + typeName, value, definition, style);
    facet.release = this.release;

    try {
      await facet.add();
    }
    catch (err) {
    }

    return facet;
  }

  /**
   * @param {string} name
   */
  async property(name) {
    return this.release.property(this.prefix, name);
  }

  /**
   * @param {Property.CriteriaType} criteria
   */
  async properties(criteria) {
    criteria.prefix = this.prefix;
    return this.release.properties(criteria);
  }

  /**
   * @param {string} name
   */
  async type(name) {
    return this.release.type(this.prefix, name);
  }

  /**
   * @param {Type.CriteriaType} criteria
   */
  async types(criteria) {
    criteria.prefix = this.prefix;
    return this.release.types(criteria);
  }

  /**
   * @param {string} name
   * @param {string} value
   * @param {Facet.StyleType} [style="enumeration]" Default "enumeration"
   */
  async facet(name, value, style="enumeration") {
    return this.release.facet(this.prefix, name, style, value);
  }

  /**
   * @param {Facet.CriteriaType} criteria
   */
  async facets(criteria) {
    criteria.prefix = this.prefix;
    return this.release.facets(criteria);
  }

  get authoritativePrefix() {
    return this.prefix;
  }

  get label() {
    return this.prefix;
  }

  static route(userKey, modelKey, releaseKey, prefix) {
    return super.route(userKey, modelKey, releaseKey) + "/namespaces/" + prefix;
  }

  /**
   * @example "/niem/model/4.0/namespaces/nc"
   * @example "/lapd/arrestReport/1.0/namespaces/nc"
   * @example "/lapd/arrestReport/1.0/namespaces/ext"
   */
  get route() {
    return Namespace.route(this.userKey, this.modelKey, this.releaseKey, this.prefix);
  }

  get identifiers() {
    return {
      ...super.identifiers,
      prefix: this.prefix
    }
  }

  /**
   * Custom sort function to order an array of namespaces by prefix.
   *
   * @static
   * @param {Namespace} ns1
   * @param {Namespace} ns2
   */
  static sortByPrefix(ns1, ns2) {
    return ns1.prefix ? ns1.prefix.localeCompare(ns2.prefix) : -1;
  }

  /**
   * Custom sort function to order an array of namespaces by ranked style
   * and then by prefix.
   *
   * @static
   * @param {Namespace} ns1
   * @param {Namespace} ns2
   */
  static sortByStyle(ns1, ns2) {

    // Sort by prefix if styles match
    if (ns1.style == ns2.style) {
      return ns1.prefix ? ns1.prefix.localeCompare(ns2.prefix) : -1;
    }

    // Sort by style rank
    return ns1.styleRank - ns2.styleRank;
  }

  /**
   * Custom sort function to order an array of namespaces by target namespace URI.
   *
   * @static
   * @param {Namespace} ns1
   * @param {Namespace} ns2
   */
  static sortByURI(ns1, ns2) {
    return ns1.uri ? ns1.uri.localeCompare(ns2.uri) : -1;
  }

  toJSON() {
    return {
      ...super.toJSON(),
      prefix: this.prefix,
      uri: this.uri,
      fileName: this.fileName,
      definition: this.definition,
      version: this.version,
      style: this.style,
      conformanceTargets: this.conformanceTargets.length > 0 ? this.conformanceTargets : undefined,
      relativePath: this.relativePath,
      xsdString: this.xsdString
    };
  }

}

/**
 * Search criteria options for namespace find operations.
 *
 * @typedef {Object} CriteriaType
 * @property {string} userKey
 * @property {string} modelKey
 * @property {string} releaseKey
 * @property {string} niemReleaseKey
 * @property {string|RegExp} prefix
 * @property {Namespace.NamespaceStyleType[]} styles
 * @property {boolean} conformanceRequired
 */
Namespace.CriteriaType = {};

/** @type {"core"|"domain"|"code"|"extension"|"adapter"|"external"|"proxy"|"utility"|"csv"|"built-in"} */
Namespace.NamespaceStyleType;

Namespace.NamespaceStyles = ["core", "domain", "code", "extension", "adapter", "external", "proxy", "utility", "csv", "built-in"];

module.exports = Namespace;

let Property = require("../property/index");
let Type = require("../type/index");
let Facet = require("../facet/index");
let SubProperty = require("../subproperty/index");
let LocalTerm = require("../local-term/index");
