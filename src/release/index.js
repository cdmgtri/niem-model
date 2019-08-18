
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

    let Model = require("../model/index");
    this.model = new Model();

    this.releaseKey = releaseKey;
    this.niemReleaseKey = niemReleaseKey;
    this.version = version;
    this.status = status;
    this.baseURI = baseURI;
    this.branch = branch;
    this.description = description;

  }

  get source() {
    return this.model.source;
  }

  get sourceDataSet() {
    return this.source.releases;
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

    try {
      await namespace.add();
    }
    catch (err) {
    }

    return namespace;
  }

  /**
   * @param {string} prefix
   * @param {string} name
   * @param {string} definition
   * @param {string} typeQName
   * @param {string} groupQName
   * @param {boolean} [isElement=true] Defaults to true
   * @param {boolean} [isAbstract=false] Defaults to false
   */
  async createProperty(prefix, name, definition, typeQName, groupQName, isElement=true, isAbstract=false) {

    let property = new Property(prefix, name, definition, typeQName, groupQName, isElement, isAbstract);
    property.release = this;

    try {
      await property.add();
    }
    catch (err) {
    }

    return property;
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

    try {
      await type.add();
    }
    catch (err) {
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
  async property(prefix, name) {
    if (! this.model) throw new Error(NO_MODEL);
    return this.model.property(this.releaseKey, prefix, name);
  }

  /**
   * @param {Property.CriteriaType} criteria
   */
  async properties(criteria) {
    if (! this.model) throw new Error(NO_MODEL);
    criteria.releaseKey = this.releaseKey;
    return this.model.properties(criteria);
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

  get modelKey() {
    return this.model.modelKey;
  }

  get userKey() {
    return this.model.userKey;
  }

  get identifiers() {
    return {
      ...this.model.identifiers,
      releaseKey: this.releaseKey
    };
  }

  /**
   * @example "niem model 4.0"
   * @example "lapd arrestReport 1.0"
   */
  get label() {
    return this.model.label + " " + this.releaseKey;
  }

  /**
   * @param {string} userKey
   * @param {string} modelKey
   * @param {string} releaseKey
   */
  static route(userKey, modelKey, releaseKey) {
    return Model.route(userKey, modelKey) + "/" + releaseKey;
  }

  get route() {
    return Release.route(this.userKey, this.modelKey, this.releaseKey);
  }

  toJSON() {
    return {
      ...this.model.toJSON(),
      releaseKey: this.releaseKey,
      niemReleaseKey: this.niemReleaseKey,
      version: this.version,
      baseURI: this.baseURI,
      branch: this.branch,
      description: this.description
    };
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
let Property = require("../property/index");
