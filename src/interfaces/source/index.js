// @ts-nocheck

let SourceInterface = require("./interface");
let DataSet = require("./dataSet/index");
let Logger = require("./logger/index");

class NIEMSourceMemory extends SourceInterface {

  constructor(loggingEnabled=false) {

    let Model = require("../../model/index");
    let Release = require("../../release/index");
    let Namespace = require("../../namespace/index");
    let LocalTerm = require("../../local-term/index");
    let Property = require("../../property/index");
    let Type = require("../../type/index");
    let Facet = require("../../facet/index");
    let SubProperty = require("../../subproperty/index");

    super();

    this.logger = new Logger(loggingEnabled);

    this.log = this.logger.log;

    /** @type {DataSet<Model>} */
    this.models = new DataSet(Model, this.logger);

    /** @type {DataSet<Release>} */
    this.releases = new DataSet(Release, this.logger);

    /** @type {DataSet<Namespace>} */
    this.namespaces = new DataSet(Namespace, this.logger);

    /** @type {DataSet<Property>} */
    this.properties = new DataSet(Property, this.logger);

    /** @type {DataSet<Type>} */
    this.types = new DataSet(Type, this.logger);

    /** @type {DataSet<LocalTerm>} */
    this.localTerms = new DataSet(LocalTerm, this.logger);

    /** @type {DataSet<SubProperty>} */
    this.subProperties = new DataSet(SubProperty, this.logger);

    /** @type {DataSet<Facet>} */
    this.facets = new DataSet(Facet, this.logger);

    this.mappings = new Mappings();

  }

  toJSON() {
    return {
      timestamp: (new Date()).toLocaleString(),
      models: this.models.data,
      releases: this.releases.data,
      namespaces: this.namespaces.data,
      properties: this.properties.data,
      types: this.types.data,
      localTerms: this.localTerms.data,
      subProperties: this.subProperties.data,
      facets: this.facets.data,
      mappings: this.mappings.data,
      log: this.log
    };

  }

  /**
   * @param {NIEM} niem
   * @param {Object} json
   * @param {Model[]} json.models
   * @param {Release[]} json.releases
   * @param {Namespace[]} json.namespaces
   * @param {Property[]} json.properties
   * @param {Type[]} json.types
   * @param {LocalTerm[]} json.localTerms
   * @param {SubProperty[]} json.subProperties
   * @param {Facet[]} json.facets
   * @param {Mapping[]} json.mappings
   * @param {Transaction[]} json.log
   */
  async load(niem, json) {
    await this.models.load(niem, json.models);
    await this.releases.load(niem, json.releases);
    await this.namespaces.load(niem, json.namespaces);
    await this.properties.load(niem, json.properties);
    await this.types.load(niem, json.types);
    await this.localTerms.load(niem, json.localTerms);
    await this.subProperties.load(niem, json.subProperties);
    await this.facets.load(niem, json.facets);
    await this.mappings.load(niem, json.mappings);
    await this.log.push(...json.log);
  }

}

module.exports = NIEMSourceMemory;

let Mappings = require("./mappings/index");
let Mapping = require("./mapping/index");
let Transaction = require("./transaction/index");

let NIEM = require("../../niem/index");
let Model = require("../../model/index");
let Release = require("../../release/index");
let Namespace = require("../../namespace/index");
let LocalTerm = require("../../local-term/index");
let Property = require("../../property/index");
let Type = require("../../type/index");
let Facet = require("../../facet/index");
let SubProperty = require("../../subproperty/index");
