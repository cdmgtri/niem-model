
let ReleaseObject = require("../release-object/index");

const NO_RELEASE = "Namespace does not belong to a release";

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

  get sourceDataSet() {
    if (this.source) return this.source.namespaces;
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

  get authoritativePrefix() {
    return this.prefix;
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

  /**
   * @param {string} name
   */
  async type(name) {
    if (! this.release) throw new Error(NO_RELEASE);
    return this.release.type(this.prefix, name);
  }

  /**
   * @param {Type.CriteriaType} criteria
   */
  async types(criteria) {
    if (! this.release) throw new Error(NO_RELEASE);
    criteria.prefix = this.prefix;
    return this.release.types(criteria);
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

let Type = require("../type/index");
