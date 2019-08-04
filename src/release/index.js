
let NIEMObject = require("../niem-object/index");

/**
 * A coherent set of namespaces bundled together for a release, IEPD, EIEM, etc.
 */
class Release extends NIEMObject {

  /**
   * @param {Model} model
   * @param {String} releaseKey
   * @param {String} niemReleaseKey
   * @param {"draft"|"published"} status
   * @param {String} baseURI
   * @param {String} branch
   * @param {String} description
   */
  constructor(model, releaseKey="default", niemReleaseKey, status, baseURI, branch, description) {

    super();

    this.model = model;
    this._releaseKey = releaseKey;
    this.niemReleaseKey = niemReleaseKey;
    this.status = status;
    this.baseURI = baseURI;
    this.branch = branch;
    this.description = description;
  }

  get releaseKey() {
    return this._releaseKey;
  }

  set releaseKey(releaseKey) {
    this._releaseKey = releaseKey;
  }

  get modelKey() {
    return this.model.modelKey;
  }

  get userKey() {
    return this.model.userKey;
  }

  get label() {
    return this.modelKey + "-" + this.releaseKey;
  }

  get route() {
    return Release.buildRoute(this.userKey, this.modelKey, this.releaseKey);
  }

  static buildRoute(userKey, modelKey, releaseKey) {
    return Model.buildRoute(userKey, modelKey) + "/" + releaseKey;
  }

  /**
   * Serializes the release
   * @param {"full"|"model"} [scope="full"]
   */
  serialize(scope="full") {

    let object = {};

    if (scope == "full") {
      object.userKey = this.userKey;
      object.modelKey = this.modelKey;
    }

    object.releaseKey = this.releaseKey;
    object.niemReleaseKey = this.modelReleaseKey;
    object.baseURI = this.baseURI;
    object.branch = this.branch;
    object.description = this.description;

    return object;
  }

}

module.exports = Release;

let Model = require("../model/index");
