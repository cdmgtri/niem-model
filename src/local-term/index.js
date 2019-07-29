
let NIEMObject = require("../niem-object/index");

class LocalTerm extends NIEMObject {

  /**
   * @param {Release} release
   * @param {String} prefix
   * @param {String} term
   * @param {String} literal
   * @param {String} definition
   */
  constructor(release, prefix, term, literal, definition) {
    super();
    this.release = release;
    this.prefix = prefix;
    this.term = term;
    this.literal = literal;
    this.definition = definition;
  }

  get route() {
    return LocalTerm.buildRoute(this.release.userKey, this.release.modelKey, this.release.releaseKey, this.prefix, this.term) ;
  }

  get authoritativePrefix() {
    return this.prefix;
  }

  /**
   * @param {String} userKey
   * @param {String} modelKey
   * @param {String} releaseKey
   * @param {String} prefix
   * @param {String} term
   */
  static buildRoute(userKey, modelKey, releaseKey, prefix, term) {
    let Namespace = require("../namespace/index");
    let route = Namespace.buildRoute(userKey, modelKey, releaseKey, prefix);
    return route + "/terms/" + term;
  }

  /**
   * @param {"release"|"namespace"|"full"} [scope="full"]
   */
  serialize(scope="full") {

    let object = {};

    if (scope == "full") {
      object.userKey = this.userKey;
      object.modelKey = this.modelKey;
      object.releaseKey = this.releaseKey;
    }

    if (scope == "full" || scope == "release") {
      object.prefix = this.prefix;
    }

    object.term = this.term;
    object.literal = this.literal;
    object.definition = this.definition;

    return object;
  }

}

module.exports = LocalTerm;

let Release = require("../release/index");
