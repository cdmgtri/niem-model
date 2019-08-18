
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
 * @todo Fix NIEMModel class
 *
 * @todo Refactor each class against NIEMObject
 * @todo Refactor each class against ReleaseObject
 * @todo Refactor serialize into toJSON getters on each class
 * @todo Update tests
 *
 * @todo Refactor source interface accessors into classes
 * @todo Add niem-model-source-memory as testing dependency
 *
 * @todo Generate docs and set things private as needed
 *
 * @todo Implement find criteria and regex
 *
 * @todo Handle different versioned classes
 *
 * @todo Add test runtime to niem-test-suite
 */
class NIEM {

  /**
   * @param {NIEMModelSource} source
   */
  constructor(source) {

    this.source = source;

    this.qa;
  }

  /**
   * Throw error if no data source implementation.
   * @throws {Error} - No source
   */
  sourceCheck() {
    if (! this.source) {
      throw new Error("No NIEM source data implementation");
    }
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
    model._source = this.source;

    if (this.source) {
      await model.add();
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

    if (this.source) {
      // Load existing model if available
      model = await this.model(userKey, modelKey);
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
    this.sourceCheck();
    let route = Model.route(userKey, modelKey);
    return this.source.models.get(route);
  }

  /**
   * @param {Model.CriteriaType} criteria
   */
  async models(criteria) {
    this.sourceCheck();
    return this.source.models.find(criteria);
  }

  /**
   * @param {string} userKey
   * @param {string} modelKey
   * @param {string} releaseKey
   */
  async release(userKey, modelKey, releaseKey) {
    this.sourceCheck();
    let route = Release.route(userKey, modelKey, releaseKey);
    return this.source.releases.get(route);
  }

  /**
   * @param {Release.CriteriaType} criteria
   */
  async releases(criteria) {
    this.sourceCheck();
    return this.source.releases.find(criteria);
  }

  /**
   * @param {string} userKey
   * @param {string} modelKey
   * @param {string} releaseKey
   * @param {string} prefix
   */
  async namespace(userKey, modelKey, releaseKey, prefix) {
    this.sourceCheck();
    let route = Namespace.route(userKey, modelKey, releaseKey, prefix);
    return this.source.namespaces.get(route);
  }

  /**
   * @param {Type.CriteriaType} criteria
   */
  async namespaces(criteria) {
    this.sourceCheck();
    return this.source.namespaces.find(criteria);
  }

  /**
   * @param {string} userKey
   * @param {string} modelKey
   * @param {string} releaseKey
   * @param {string} prefix
   * @param {string} name
   */
  async property(userKey, modelKey, releaseKey, prefix, name) {
    this.sourceCheck();
    let route = Property.route(userKey, modelKey, releaseKey, prefix, name);
    return this.source.properties.get(route);
  }

  /**
   * @param {Property.CriteriaType} criteria
   */
  async properties(criteria) {
    this.sourceCheck();
    return this.source.properties.find(criteria);
  }

  /**
   * @param {string} userKey
   * @param {string} modelKey
   * @param {string} releaseKey
   * @param {string} prefix
   * @param {string} name
   */
  async type(userKey, modelKey, releaseKey, prefix, name) {
    this.sourceCheck();
    let route = Type.route(userKey, modelKey, releaseKey, prefix, name);
    return this.source.types.get(route);
  }

  /**
   * @param {Type.CriteriaType} criteria
   */
  async types(criteria) {
    this.sourceCheck();
    return this.source.types.find(criteria);
  }

}

NIEM.Model = Model;
NIEM.Release = Release;
NIEM.Namespace = Namespace;
NIEM.LocalTerm = LocalTerm;
NIEM.Property = Property;
NIEM.Type = Type;
NIEM.Facet = Facet;
NIEM.SubProperty = SubProperty;

NIEM.Helpers = {
  NIEMObject: require("./src/niem-object/index"),
  ReleaseObject: require("./src/release-object/index"),
  Component: require("./src/component/index")
};

NIEM.Interfaces = require("./src/interfaces/index");

NIEM.Tests = {
  unitTests: require("./test/unit/index")
}

module.exports = NIEM;

