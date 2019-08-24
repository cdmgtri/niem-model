
let NIEMObject = require("../niem-object/index");
let NIEMModelSourceInterface = require("../interfaces/source/index");

/**
 * @extends {NIEMObject<Model>}
 */
class Model extends NIEMObject {

  /**
   * @param {String} userKey
   * @param {String} modelKey
   * @param {Model.StyleType} style
   * @param {String} description
   * @param {String} website
   * @param {String} repo
   */
  constructor(userKey, modelKey, style, description, website, repo) {

    super();

    this.source = new NIEMModelSourceInterface();

    this.userKey = userKey;
    this.modelKey = modelKey;
    this.style = style;
    this.description = description;
    this.website = website;
    this.repo = repo;

    let NIEM = require("../../index");
    this.niem = new NIEM();

  }

  get sourceDataSet() {
    return this.source.models;
  }

  get releases() {
    return {

      /**
       * @param {string} releaseKey
       * @param {string} niemReleaseKey
       * @param {string} version
       * @param {Release.StatusType} status
       * @param {string} baseURI
       * @param {string} branch
       * @param {string} description
       * @param {string}
       */
      add: async (releaseKey, niemReleaseKey, version, status, baseURI) => {
        let release = Release.create(releaseKey, niemReleaseKey, version, status, baseURI);
        release.model = this;
        release.source = this.source;
        return release.add();
      },

      get: async (releaseKey) => {
        return this.niem.release(this.userKey, this.modelKey, releaseKey);
      },

      /**
       * @param {Release.CriteriaType} criteria
       */
      find: async (criteria={}) => {
        criteria.userKey = this.userKey;
        criteria.modelKey = this.modelKey;
        return this.niem.releases(criteria);
      }

    }
  }

  /**
   * @param {String} userKey
   * @param {String} modelKey
   * @param {Model.StyleType} style
   * @param {String} description
   * @param {String} website
   * @param {String} repo
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
    }
  }

}

/** @type {"model"|"IEPD"|"other"} */
Model.StyleType;

Model.Styles = ["model", "IEPD", "other"];

/**
 * Search criteria options for model find operations.
 *
 * String fields are for exact matches.
 *
 * @typedef {Object} CriteriaType
 * @property {string} userKey
 * @property {string} modelKey
 * @property {Model.StyleType} style
 */
Model.CriteriaType;

/**
 * @typedef {Object} IdentifiersType
 * @property {string} userKey
 * @property {string} modelKey
 */
Model.IdentifiersType;

module.exports = Model;

let Release = require("../release/index");
