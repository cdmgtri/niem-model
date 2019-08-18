
let NIEMObject = require("../niem-object/index");
let NIEMModelSourceInterface = require("../../interfaces/source/index");

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

    try {
      await release.add();
    }
    catch (err) {
    }

    return release;
  }

  async release(releaseKey) {
    return this.niem.release(this.userKey, this.modelKey, releaseKey);
  }

  /**
   * @param {Release.CriteriaType} criteria
   */
  async releases(criteria) {
    criteria.userKey = this.userKey;
    criteria.modelKey = this.modelKey;
    return this.niem.releases(criteria);
  }

  async namespace(releaseKey, prefix) {
    return this.niem.namespace(this.userKey, this.modelKey, releaseKey, prefix);
  }

  /**
   * @param {Namespace.CriteriaType} criteria
   */
  async namespaces(criteria) {
    criteria.userKey = this.userKey;
    criteria.modelKey = this.modelKey;
    return this.niem.namespaces(criteria);
  }

  async localTerm(releaseKey, prefix, term) {
    return this.niem.localTerm(this.userKey, this.modelKey, releaseKey, prefix, term);
  }

  /**
   * @param {LocalTerm.CriteriaType} criteria
   */
  async localTerms(criteria) {
    criteria.userKey = this.userKey;
    criteria.modelKey = this.modelKey;
    return this.niem.localTerms(criteria);
  }

  async property(releaseKey, prefix, name) {
    return this.niem.property(this.userKey, this.modelKey, releaseKey, prefix, name);
  };

  /**
   * @param {Property.CriteriaType} criteria
   */
  async properties(criteria) {
    criteria.userKey = this.userKey;
    criteria.modelKey = this.modelKey;
    return this.niem.properties(criteria);
  }

  async type(releaseKey, prefix, name) {
    return this.niem.type(this.userKey, this.modelKey, releaseKey, prefix, name);
  };

  /**
   * @param {Type.CriteriaType} criteria
   */
  async types(criteria) {
    criteria.userKey = this.userKey;
    criteria.modelKey = this.modelKey;
    return this.niem.types(criteria);
  }

  /**
   * @param {string} releaseKey
   * @param {string} typeQName
   * @param {string} value
   * @param {Facet.StyleType} [style="enumeration"] Default "enumeration"
   */
  async facet(releaseKey, typeQName, value, style="enumeration") {
    return this.niem.facet(this.userKey, this.modelKey, releaseKey, typeQName, value, style);
  };

  /**
   * @param {Facet.CriteriaType} criteria
   */
  async facets(criteria) {
    criteria.userKey = this.userKey;
    criteria.modelKey = this.modelKey;
    return this.niem.facets(criteria);
  }

  async subProperty(releaseKey, typeQName, propertyQName) {
    return this.niem.subProperty(this.userKey, this.modelKey, releaseKey, typeQName, propertyQName);
  };

  /**
   * @param {SubProperty.CriteriaType} criteria
   */
  async subProperties(criteria) {
    criteria.userKey = this.userKey;
    criteria.modelKey = this.modelKey;
    return this.niem.subProperties(criteria);
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
 */
Model.CriteriaType = {};

module.exports = Model;

let Release = require("../release/index");
let Namespace = require("../namespace/index");
let Property = require("../property/index");
let Type = require("../type/index");
let Facet = require("../facet/index");
let SubProperty = require("../subproperty/index");
let LocalTerm = require("../local-term/index");
