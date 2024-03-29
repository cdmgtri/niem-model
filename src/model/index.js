
let NIEMObject = require("../niem-object/index");

/**
 * @extends {NIEMObject<Model>}
 */
class Model extends NIEMObject {

  /**
   * @param {string} [userKey]
   * @param {string} [modelKey]
   * @param {StyleType} [style]
   * @param {string} [description]
   * @param {string} [website]
   * @param {string} [repo]
   */
  constructor(userKey, modelKey, style, description, website, repo) {

    super();

    /** @type {import("../typedefs").SourceInterface} */
    this._source;

    this.userKey = userKey;
    this.modelKey = modelKey;
    this.style = style;
    this.description = description;
    this.website = website;
    this.repo = repo;

    /** @type {import("../typedefs").NIEM} */
    this.niem;

  }

  get source() {
    return this._source;
  }

  /**
   * @param {import("../typedefs").SourceInterface} source
   */
  set source(source) {
    this._source = source;
    this.niem.sources.push(source);
  }

  get sourceDataSet() {
    return this._source.models;
  }

  get releases() {
    return {

      /**
       * @param {string} releaseKey
       * @param {string} [niemReleaseKey]
       * @param {"3.0"|"4.0"|"5.0"|"6.0"} [ndrVersion]
       * @param {string} [version]
       * @param {Release.StatusType} [status]
       * @param {string} [baseURI]
       * @param {string} [branch]
       * @param {string} [description]
       * @returns {Promise<Release>}
       */
      add: async (releaseKey, niemReleaseKey, ndrVersion, version, status, baseURI) => {
        let release = Release.create(releaseKey, niemReleaseKey, ndrVersion, version, status, baseURI);
        release.model = this;
        return release.add();
      },

      get: async (releaseKey) => {
        return this._source.releases.get({...this.identifiers, releaseKey});
      },

      /**
       * @param {Release.CriteriaType} [criteria]
       */
      find: async (criteria={}) => {
        Object.assign(criteria, this.identifiers);
        return this._source.releases.find(criteria);
      }

    };
  }

  get mappings() {
    return {

      find: async (releaseKey) => {
        let criteria = {userKey: this.userKey, modelKey: this.modelKey, releaseKey};
        return this.niem.mappings.find(criteria);
      }

    }
  }

  /**
   * @param {string} userKey
   * @param {string} modelKey
   * @param {StyleType} [style]
   * @param {string} [description]
   * @param {string} [website]
   * @param {string} [repo]
   */
  static create(userKey, modelKey, style, description, website, repo) {
    return new Model(userKey, modelKey, style, description, website, repo);
  }

  get label() {
    return this.userKey + " " + this.modelKey;
  }

  get route() {
    return Model.route(this.userKey, this.modelKey);
  }

  static route(userKey, modelKey) {
    return "/" + userKey + "/" + modelKey;
  }

  /**
   * @param {string} userKey
   * @param {string} modelKey
   */
  static identifiers(userKey, modelKey) {
    return {userKey, modelKey};
  }

  get identifiers() {
    return {
      userKey: this.userKey,
      modelKey: this.modelKey
    };
  }

  toJSON() {
    return {
      ...super.toJSON(),
      style: this.style,
      description: this.description,
      website: this.website,
      repo: this.repo
    };
  }

}

/** @typedef {"model"|"IEPD"|"other"} StyleType */
let TypeStyleType;  // Prevent typedef from attaching to following declaration

Model.Styles = ["model", "IEPD", "other"];

/**
 * Search criteria options for model find operations.
 *
 * String fields are for exact matches.
 *
 * @typedef {object} CriteriaType
 * @property {string} [userKey]
 * @property {string} [modelKey]
 * @property {StyleType} [style]
 */
/**
 * @type {CriteriaType}
 */
Model.CriteriaType;

/**
 * @typedef {object} IdentifiersType
 * @property {string} userKey
 * @property {string} modelKey
 */
/**
 * @type {IdentifiersType}
 */
Model.IdentifiersType;

module.exports = Model;

let Release = require("../release/index");
