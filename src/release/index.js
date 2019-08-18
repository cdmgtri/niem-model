
let NIEMObject = require("../niem-object/index");

const NO_MODEL = "Release does not belong to a model";

/**
 * A coherent set of namespaces bundled together for a release, IEPD, EIEM, etc.
 */
class Release extends NIEMObject {

  /**
   * @param {String} releaseKey
   * @param {String} niemReleaseKey
   * @param {String} version
   * @param {"draft"|"published"} status
   * @param {String} baseURI
   * @param {String} branch
   * @param {String} description
   */
  constructor(releaseKey="default", niemReleaseKey, version, status, baseURI, branch, description) {

    super();

    /** @type {Model} */
    this.model;

    this.releaseKey = releaseKey;
    this.niemReleaseKey = niemReleaseKey;
    this.version = version;
    this.status = status;
    this.baseURI = baseURI;
    this.branch = branch;
    this.description = description;

  }

  get source() {
    if (this.model) return this.model.source;
  }

  get sourceDataSet() {
    if (this.source) return this.source.releases;
  }

  get modelKey() {
    if (this.model) return this.model.modelKey;
  }

  get userKey() {
    if (this.model) return this.model.userKey;
  }

  get identifiers() {
    return {
      ...super.identifiers,
      releaseKey: this.releaseKey
    };
  }

  /**
   * @example "niem model 4.0"
   * @example "lapd arrestReport 1.0"
   */
  get label() {
    return super.label + " " + this.releaseKey;
  }

  /**
   * @param {string} userKey
   * @param {string} modelKey
   * @param {string} releaseKey
   */
  static route(userKey, modelKey, releaseKey) {
    return super.route(userKey, modelKey) + "/" + releaseKey;
  }

  get route() {
    return Release.route(this.userKey, this.modelKey, this.releaseKey);
  }

  toJSON() {
    return {
      ...super.toJSON(),
      releaseKey: this.releaseKey,
      niemReleaseKey: this.niemReleaseKey,
      version: this.version,
      baseURI: this.baseURI,
      branch: this.branch,
      description: this.description
    };
  }

  /**
   * @param {string} releaseKey
   * @param {string} niemReleaseKey
   * @param {string} version
   * @param {Release.StatusType} status
   * @param {string} baseURI
   * @param {string} branch
   * @param {string} description
   */
  async createNamespace(prefix, style, uri, fileName, definition, version) {

    let namespace = new Namespace(prefix, style, uri, fileName, definition, version);
    namespace.release = this;

    if (this.source) {
      await namespace.add();
    }

    return namespace;
  }

  /**
   * @param {string} prefix
   * @param {string} name
   * @param {string} definition
   * @param {Type.StyleType} style
   * @param {string} baseQName
   */
  async createType(prefix, name, definition, style, baseQName) {

    let type = new Type(prefix, name, definition, style, baseQName);
    type.release = this;

    if (this.source) {
      await type.add();
    }

    return type;
  }

  /**
   * @param {string} prefix
   */
  async namespace(prefix) {
    if (! this.model) throw new Error(NO_MODEL);
    return this.model.namespace(this.releaseKey, prefix);
  }

  /**
   * @param {Namespace.CriteriaType} criteria
   */
  async namespaces(criteria) {
    if (! this.model) throw new Error(NO_MODEL);
    criteria.releaseKey = this.releaseKey;
    return this.model.namespaces(criteria);
  }

  /**
   * @param {string} prefix
   * @param {string} name
   */
  async type(prefix, name) {
    if (! this.model) throw new Error(NO_MODEL);
    return this.model.type(this.releaseKey, prefix, name);
  }

  /**
   * @param {Type.CriteriaType} criteria
   */
  async types(criteria) {
    if (! this.model) throw new Error(NO_MODEL);
    criteria.releaseKey = this.releaseKey;
    return this.model.types(criteria);
  }

}

/** @type {"draft"|"published"} */
Release.StatusType;

Release.Statuses = ["draft", "published"];

/**
 * Search criteria for release find operations.
 *
 * @typedef {Object} CriteriaType
 * @property {string} userKey
 * @property {string} modelKey
 * @property {string} releaseKey
 * @property {string} niemReleaseKey
 * @property {"draft"|"published"}  status
 */
Release.CriteriaType = {};

module.exports = Release;

let Model = require("../model/index");
let Namespace = require("../namespace/index");
let Type = require("../type/index");
