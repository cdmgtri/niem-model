
let NIEM = require("../../../../index");

let SourceInterface = require("../../index");

let DataSet = require("./dataSet/index");
let Logger = require("./logger/index");

class NIEMSourceMemory extends SourceInterface {

  constructor(loggingEnabled=false) {

    let Model = require("../../../../model/index");
    let Release = require("../../../../release/index");
    let Namespace = require("../../../../namespace/index");
    let LocalTerm = require("../../../../local-term/index");
    let Property = require("../../../../property/index");
    let Type = require("../../../../type/index");
    let Facet = require("../../../../facet/index");
    let SubProperty = require("../../../../subproperty/index");

    super();

    this.logger = new Logger(loggingEnabled);

    this.log = this.logger.log;

    // @ts-ignore
    this.models = new DataSet(Model, this.logger);

    // @ts-ignore
    this.releases = new DataSet(Release, this.logger);

    // @ts-ignore
    this.namespaces = new DataSet(Namespace, this.logger);

    // @ts-ignore
    this.properties = new DataSet(Property, this.logger);

    // @ts-ignore
    this.types = new DataSet(Type, this.logger);

    // @ts-ignore
    this.localTerms = new DataSet(LocalTerm, this.logger);

    // @ts-ignore
    this.subProperties = new DataSet(SubProperty, this.logger);

    // @ts-ignore
    this.facets = new DataSet(Facet, this.logger);

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
      log: this.log
    };

  }

  /**
   * @param {NIEM} niem
   * @param {Object} json
   * @param {NIEM.Model[]} json.models
   * @param {NIEM.Release[]} json.releases
   * @param {NIEM.Namespace[]} json.namespaces
   * @param {NIEM.Property[]} json.properties
   * @param {NIEM.Type[]} json.types
   * @param {NIEM.LocalTerm[]} json.localTerms
   * @param {NIEM.SubProperty[]} json.subProperties
   * @param {NIEM.Facet[]} json.facets
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
    await this.log.push(...json.log);
  }

}

module.exports = NIEMSourceMemory;

let Transaction = require("../../transaction/index");
