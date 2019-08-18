
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

  get route() {
    return LocalTerm.route(this.release.userKey, this.release.modelKey, this.releaseKey, this.prefix, this.term) ;
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

  get identifiers() {
    return {
      ...super.identifiers,
      prefix: this.prefix,
      term: this.term
    };
  }

  get sourceDataSet() {
    return this.source.localTerms;
  }

  get namespace() {
    return this.release.namespace(this.prefix);
  }

  get identifiers() {
    return {
      ...super.identifiers,
      term: this.term
    }
  }

  toJSON() {
    return {
      ...super.toJSON(),
      prefix: this.prefix,
      term: this.term,
      literal: this.literal,
      definition: this.definition
    }
  }

}


/**
 * Search criteria options for local term find operations.
 *
 * @typedef {Object} CriteriaType
 * @property {string} userKey
 * @property {string} modelKey
 * @property {string} releaseKey
 * @property {string} niemReleaseKey
 * @property {string|RegExp} prefix
 * @property {string|RegExp} text
 */
LocalTerm.CriteriaType = {};

module.exports = LocalTerm;
