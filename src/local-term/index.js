
let ReleaseObject = require("../release-object/index");

class LocalTerm extends ReleaseObject {

  /**
   * @param {String} prefix
   * @param {String} term
   * @param {String} literal
   * @param {String} definition
   */
  constructor(prefix, term, literal, definition) {
    super();
    this.prefix = prefix;
    this.term = term;
    this.literal = literal;
    this.definition = definition;
  }

  /**
   * @param {ReleaseObject.NDRVersionType} ndrVersion
   * @param {String} prefix
   * @param {String} term
   * @param {String} literal
   * @param {String} definition
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
   * @param {String} userKey
   * @param {String} modelKey
   * @param {String} releaseKey
   * @param {String} prefix
   * @param {String} term
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
   * @param {String} userKey
   * @param {String} modelKey
   * @param {String} releaseKey
   * @param {String} prefix
   * @param {String} term
   */
  static identifiers(userKey, modelKey, releaseKey, prefix, term) {
    return {userKey, modelKey, releaseKey, prefix, term};
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
LocalTerm.IdentifiersType;

module.exports = LocalTerm;
