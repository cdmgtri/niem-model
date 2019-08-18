
let NIEMObject = require("../niem-object/index");

const NO_NIEM = "Model does not belong to a NIEM community data set";

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

    /** @type {NIEMModelSource} */
    this._source;

    this._userKey = userKey;
    this._modelKey = modelKey;
    this.style = style;
    this.description = description;
    this.website = website;
    this.repo = repo;

    /** @type {NIEM} */
    this.niem;

  }

  get source() {
    return this._source;
  }

  get sourceDataSet() {
    if (this.source) return this.source.models;
  }

  get modelKey() {
    return this._modelKey;
  }

  get userKey() {
    return this._userKey;
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
  async createRelease(releaseKey, niemReleaseKey, version, status, baseURI) {

    let release = new Release(releaseKey, niemReleaseKey, version, status, baseURI);
    release.model = this;

    if (this.source) {
      await release.add();
    }

    return release;
  }

  async release(releaseKey) {
    if (! this.niem) throw new Error(NO_NIEM);
    return this.niem.release(this.userKey, this.modelKey, releaseKey);
  }

  /**
   * @param {Release.CriteriaType} criteria
   */
  async releases(criteria) {
    if (! this.niem) throw new Error(NO_NIEM);
    criteria.userKey = this.userKey;
    criteria.modelKey = this.modelKey;
    return this.niem.releases(criteria);
  }

  async namespace(releaseKey, prefix) {
    if (! this.niem) throw new Error(NO_NIEM);
    return this.niem.namespace(this.userKey, this.modelKey, releaseKey, prefix);
  }

  /**
   * @param {Namespace.CriteriaType} criteria
   */
  async namespaces(criteria) {
    if (! this.niem) throw new Error(NO_NIEM);
    criteria.userKey = this.userKey;
    criteria.modelKey = this.modelKey;
    return this.niem.namespaces(criteria);
  }

  async type(releaseKey, prefix, name) {
    if (! this.niem) throw new Error(NO_NIEM);
    return this.niem.type(this.userKey, this.modelKey, releaseKey, prefix, name);
  };

  /**
   * @param {Type.CriteriaType} criteria
   */
  async types(criteria) {
    if (! this.niem) throw new Error(NO_NIEM);
    criteria.userKey = this.userKey;
    criteria.modelKey = this.modelKey;
    return this.niem.types(criteria);
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
 */
Model.CriteriaType = {};

module.exports = Model;

let NIEM = require("../../index");
let Release = require("../release/index");
let Namespace = require("../namespace/index");
let Type = require("../type/index");
let NIEMModelSource = require("../interfaces/source/index");
