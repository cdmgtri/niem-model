
let NIEMModelSource = require("./src/interfaces/source/index");

let Model = require("./src/model/index");
let Release = require("./src/release/index");
let Namespace = require("./src/namespace/index");
let LocalTerm = require("./src/local-term/index");
let Property = require("./src/property/index");
let Type = require("./src/type/index");
let Facet = require("./src/facet/index");
let SubProperty = require("./src/subproperty/index");

/**
 * @todo Add niem-model-source-memory as testing dependency
 */
class NIEM {

  /**
   * @param {NIEMModelSource} source
   */
  constructor(source) {

    this.source = source || new NIEMModelSource();

    this.qa;
  }

  /**
   * @param {string} userKey
   * @param {string} modelKey
   * @param {Model.StyleType} style
   * @param {string} description
   * @param {string} website
   * @param {string} repo
   */
  async createModel(userKey, modelKey, style, description, website, repo) {

    let model = new Model(userKey, modelKey, style, description, website, repo);
    model.source = this.source;
    model.niem = this;

    try {
      await model.add();
    }
    catch(err) {
    }

    return model;
  }

  /**
   * @param {string} userKey
   * @param {string} modelKey
   * @param {string} releaseKey
   * @param {string} niemReleaseKey
   * @param {string} version
   * @param {Release.StatusType} status
   * @param {string} baseURI
   */
  async createRelease(userKey, modelKey, releaseKey, niemReleaseKey, version, status, baseURI) {

    /** @type {Model} */
    let model;

    try {
      // Load existing model if available
      model = await this.model(userKey, modelKey);
    }
    catch (err) {
    }

    if (! model) {
      // Create model if not found
      model = await this.createModel(userKey, modelKey);
    }

    return model.createRelease(releaseKey, niemReleaseKey, version, status, baseURI);
  }

  /**
   * @param {string} userKey
   * @param {string} modelKey
   */
  async model(userKey, modelKey) {
    let identifiers = Model.identifiers(userKey, modelKey);
    return this.source.models.get(identifiers);
  }

  /**
   * @param {Model.CriteriaType} criteria
   */
  async models(criteria={}) {
    return this.source.models.find(criteria);
  }

  async niemModel() {
    return this.model("niem", "model");
  }

  /**
   * @param {string} userKey
   * @param {string} modelKey
   * @param {string} releaseKey
   */
  async release(userKey, modelKey, releaseKey) {
    let identifiers = Release.identifiers(userKey, modelKey, releaseKey);
    return this.source.releases.get(identifiers);
  }

  /**
   * @param {Release.CriteriaType} criteria
   */
  async releases(criteria={}) {
    return this.source.releases.find(criteria);
  }

  async niemRelease(releaseKey) {
    return this.release("niem", "model", releaseKey);
  }

  /**
   * @param {string} userKey
   * @param {string} modelKey
   * @param {string} releaseKey
   * @param {string} prefix
   */
  async namespace(userKey, modelKey, releaseKey, prefix) {
    let identifiers = Namespace.identifiers(userKey, modelKey, releaseKey, prefix);
    return this.source.namespaces.get(identifiers);
  }

  /**
   * @param {Type.CriteriaType} criteria
   */
  async namespaces(criteria={}) {
    return this.source.namespaces.find(criteria);
  }

  /**
   * @param {string} userKey
   * @param {string} modelKey
   * @param {string} releaseKey
   * @param {string} prefix
   * @param {string} term
   */
  async localTerm(userKey, modelKey, releaseKey, prefix, term) {
    let identifiers = LocalTerm.identifiers(userKey, modelKey, releaseKey, prefix, term);
    return this.source.localTerms.get(identifiers);
  }

  /**
   * @param {LocalTerm.CriteriaType} criteria
   */
  async localTerms(criteria={}) {
    return this.source.localTerms.find(criteria);
  }

  /**
   * @param {string} userKey
   * @param {string} modelKey
   * @param {string} releaseKey
   * @param {string} qname
   */
  async property(userKey, modelKey, releaseKey, qname) {
    let identifiers = Property.identifiers(userKey, modelKey, releaseKey, qname);
    return this.source.properties.get(identifiers);
  }

  /**
   * @param {Property.CriteriaType} criteria
   */
  async properties(criteria={}) {
    return this.source.properties.find(criteria);
  }

  /**
   * @param {string} userKey
   * @param {string} modelKey
   * @param {string} releaseKey
   * @param {string} qname
   */
  async type(userKey, modelKey, releaseKey, qname) {
    let identifiers = Type.identifiers(userKey, modelKey, releaseKey, qname);
    return this.source.types.get(identifiers);
  }

  /**
   * @param {Type.CriteriaType} criteria
   */
  async types(criteria={}) {
    return this.source.types.find(criteria);
  }

  /**
   * @param {string} userKey
   * @param {string} modelKey
   * @param {string} releaseKey
   * @param {string} typeQName
   * @param {string} value
   * @param {Facet.StyleType} [style="enumeration"] Default "enumeration"
   * @param {string} definition
   */
  async facet(userKey, modelKey, releaseKey, typeQName, value, style="enumeration", definition) {
    let identifiers = Facet.identifiers(userKey, modelKey, releaseKey, typeQName, value, style, definition);
    return this.source.facets.get(identifiers);
  }

  /**
   * @param {Facet.CriteriaType} criteria
   */
  async facets(criteria={}) {
    return this.source.facets.find(criteria);
  }

  /**
   * @param {string} userKey
   * @param {string} modelKey
   * @param {string} releaseKey
   * @param {string} prefix
   * @param {string} name
   */
  async subProperty(userKey, modelKey, releaseKey, typeQName, propertyQName) {
    let identifiers = SubProperty.identifiers(userKey, modelKey, releaseKey, typeQName, propertyQName);
    return this.source.subProperties.get(identifiers);
  }

  /**
   * @param {SubProperty.CriteriaType} criteria
   */
  async subProperties(criteria={}) {
    return this.source.subProperties.find(criteria);
  }

}

NIEM.Model = Model;
NIEM.Release = Release;
NIEM.Namespace = Namespace;
NIEM.LocalTerm = LocalTerm;
NIEM.Component = require("./src/component/index");
NIEM.Property = Property;
NIEM.Type = Type;
NIEM.Facet = Facet;
NIEM.SubProperty = SubProperty;

NIEM.NIEMObject = require("./src/niem-object/index");
NIEM.ReleaseObject = require("./src/release-object/index");

NIEM.Interfaces = {
  NIEMSource: {
    NIEMModelSource: require("./src/interfaces/index"),
    Change: require("./src/interfaces/source/change/index"),
    Transaction: require("./src/interfaces/source/transaction/index"),
    DataSet: require("./src/interfaces/source/dataSet/index")
  }
}

NIEM.Tests = {
  unitTests: require("./test/unit/index")
}

module.exports = NIEM;

