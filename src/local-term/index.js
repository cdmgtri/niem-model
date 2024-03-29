
let ReleaseObject = require("../release-object/index");

class LocalTerm extends ReleaseObject {

  /**
   * @param {string} prefix
   * @param {string} term
   * @param {string} literal
   * @param {string} definition
   */
  constructor(prefix="", term="", literal="", definition="") {
    super();
    this.prefix = prefix;
    this.term = term;
    this.literal = literal;
    this.definition = definition;
  }

  /**
   * @param {ReleaseObject.NDRVersionType} ndrVersion
   * @param {string} prefix
   * @param {string} term
   * @param {string} literal
   * @param {string} definition
   */
  static create(ndrVersion, prefix, term, literal, definition) {
    return new LocalTerm(prefix, term, literal, definition);
  }

  get sourceDataSet() {
    return this.source.localTerms;
  }

  get namespace() {
    return this.release.namespaces.get(this.prefix);
  }

  get route() {
    return LocalTerm.route(this.release.userKey, this.release.modelKey, this.releaseKey, this.prefix, this.term);
  }

  /**
   * @param {string} userKey
   * @param {string} modelKey
   * @param {string} releaseKey
   * @param {string} prefix
   * @param {string} term
   */
  static route(userKey, modelKey, releaseKey, prefix, term) {
    let Namespace = require("../namespace/index");
    let namespaceRoute = Namespace.route(userKey, modelKey, releaseKey, prefix);
    return namespaceRoute + "/terms/" + term;
  }

  get authoritativePrefix() {
    return this.prefix;
  }

  /**
   * @example "nc - NIEM"
   */
  get label() {
    return this.prefix + " - " + this.term;
  }

  get identifiers() {
    return {
      ...super.identifiers,
      prefix: this.prefix,
      term: this.term
    };
  }

  /**
   * @param {string} userKey
   * @param {string} modelKey
   * @param {string} releaseKey
   * @param {string} prefix
   * @param {string} term
   */
  static identifiers(userKey, modelKey, releaseKey, prefix, term) {
    return {userKey, modelKey, releaseKey, prefix, term};
  }

  /**
   * Custom sort function to sort an array of local terms by term.
   * @param {LocalTerm} term1
   * @param {LocalTerm} term2
   */
  static sortByTerm(term1, term2) {
    if (!term1 || !term2) return 0;
    return term1.term.localeCompare(term2.term);
  }

  /**
   * Custom sort function to sort an array of local terms by qualified term.
   * @param {LocalTerm} term1
   * @param {LocalTerm} term2
   */
  static sortByPrefixTerm(term1, term2) {
    if (!term1 || !term2) return 0;

    // Sort by prefix
    if (term1.prefix != term2.prefix) {
      return term1.prefix.localeCompare(term2.prefix);
    }

    // Sort by term
    return term1.term.localeCompare(term2.term);
  }

  toJSON() {
    return {
      ...super.toJSON(),
      prefix: this.prefix,
      term: this.term,
      literal: this.literal,
      definition: this.definition
    };
  }

}


/**
 * Search criteria options for local term find operations.
 *
 * @typedef {Object} CriteriaType
 * @property {string} [userKey]
 * @property {string} [modelKey]
 * @property {string} [releaseKey]
 * @property {string} [niemReleaseKey]
 * @property {string|string[]} [prefix]
 * @property {string|RegExp} [keyword]
 */
/**
 * @type {CriteriaType}
 */
LocalTerm.CriteriaType = {};

LocalTerm.CriteriaKeywordFields = ["term", "literal", "definition"];

/**
 * @typedef {Object} IdentifiersType
 * @property {string} userKey
 * @property {string} modelKey
 * @property {string} releaseKey
 * @property {string} prefix
 * @property {string} term
 */
/**
 * @type {IdentifiersType}
 */
LocalTerm.IdentifiersType;

module.exports = LocalTerm;
