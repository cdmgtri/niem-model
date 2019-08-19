
let NIEMObject = require("../niem-object/index");

/**
 * A coherent set of namespaces bundled together for a release, IEPD, EIEM, etc.
 */
class Release extends NIEMObject {

  /**
   * @param {String} releaseKey
   * @param {String} niemReleaseKey
   * @param {"3.0"|"4.0"} [ndrVersion="4.0"] Defaults to "4.0"
   * @param {String} version
   * @param {"draft"|"published"} status
   * @param {String} baseURI
   * @param {String} branch
   * @param {String} description
   */
  constructor(releaseKey="default", niemReleaseKey, ndrVersion="4.0", version, status, baseURI, branch, description) {

    super();

    let Model = require("../model/index");
    this.model = new Model();

    this.releaseKey = releaseKey;
    this.niemReleaseKey = niemReleaseKey;
    this.ndrVersion = ndrVersion;
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
   * @param {string} prefix
   * @param {Namespace.StyleType} style
   * @param {string} uri
   * @param {string} fileName
   * @param {string} definition
   * @param {string} version
   */
  async createNamespace(prefix, style, uri, fileName, definition, version) {

    // Use Namespace builder to return the right NDR-version of a namespace
    let namespace = Namespace.createNamespace(this.ndrVersion, prefix, style, uri, fileName, definition, version);

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
   * @param {string} term
   * @param {string} literal
   * @param {string} definition
   */
  async createLocalTerm(prefix, term, literal, definition) {

    let localTerm = new LocalTerm(prefix, term, literal, definition);
    localTerm.release = this;

    try {
      await localTerm.add();
    }
    catch (err) {
    }

    return localTerm;
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
   * @param {string} typeQName
   * @param {string} value
   * @param {string} definition
   * @param {Facet.StyleType} [style="enumeration"] Default "enumeration"
   */
  async createFacet(typeQName, value, definition, style="enumeration") {

    let facet = new Facet(typeQName, value, definition, style);
    facet.release = this;

    try {
      await facet.add();
    }
    catch (err) {
    }

    return facet;
  }

  /**
   * @param {string} typeQName
   * @param {string} propertyQName
   * @param {string} min
   * @param {string} max
   * @param {string} definition
   */
  async createSubProperty(typeQName, propertyQName, min, max, definition) {

    let subProperty = new SubProperty(typeQName, propertyQName, min, max, definition);
    subProperty.release = this;

    try {
      await subProperty.add();
    }
    catch (err) {
    }

    return subProperty;
  }

  /**
   * @param {string} prefix
   */
  async namespace(prefix) {
    return this.model.namespace(this.releaseKey, prefix);
  }

  /**
   * @param {Namespace.CriteriaType} criteria
   */
  async namespaces(criteria) {
    criteria.releaseKey = this.releaseKey;
    return this.model.namespaces(criteria);
  }

  /**
   * @param {string} prefix
   * @param {string} term
   */
  async localTerm(prefix, term) {
    return this.model.localTerm(this.releaseKey, prefix, term);
  }

  /**
   * @param {LocalTerm.CriteriaType} criteria
   */
  async localTerms(criteria) {
    criteria.releaseKey = this.releaseKey;
    return this.model.localTerms(criteria);
  }

  /**
   * @param {string} prefix
   * @param {string} name
   */
  async property(prefix, name) {
    return this.model.property(this.releaseKey, prefix, name);
  }

  /**
   * @param {Property.CriteriaType} criteria
   */
  async properties(criteria) {
    criteria.releaseKey = this.releaseKey;
    return this.model.properties(criteria);
  }

  /**
   * @param {string} prefix
   * @param {string} name
   */
  async type(prefix, name) {
    return this.model.type(this.releaseKey, prefix, name);
  }

  /**
   * @param {Type.CriteriaType} criteria
   */
  async types(criteria) {
    criteria.releaseKey = this.releaseKey;
    return this.model.types(criteria);
  }

  /**
   * @param {string} prefix
   * @param {string} name
   * @param {string} value
   * @param {Facet.StyleType} [style="enumeration"] Default "enumeration"
   */
  async facet(prefix, name, value, style="enumeration") {
    return this.model.facet(this.releaseKey, prefix, name, value, style);
  }

  /**
   * @param {Facet.CriteriaType} criteria
   */
  async facets(criteria) {
    criteria.releaseKey = this.releaseKey;
    return this.model.facets(criteria);
  }

  /**
   * @param {string} typeQName
   * @param {string} propertyQName
   */
  async subProperty(typeQName, propertyQName) {
    return this.model.subProperty(this.releaseKey, typeQName, propertyQName);
  }

  /**
   * @param {SubProperty.CriteriaType} criteria
   */
  async subProperties(criteria) {
    criteria.releaseKey = this.releaseKey;
    return this.model.subProperties(criteria);
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
   * @param {string} userKey
   * @param {string} modelKey
   * @param {string} releaseKey
   */
  static identifiers(userKey, modelKey, releaseKey) {
    return {userKey, modelKey, releaseKey};
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
let Property = require("../property/index");
let Type = require("../type/index");
let Facet = require("../facet/index");
let SubProperty = require("../subproperty/index");
let LocalTerm = require("../local-term/index");
