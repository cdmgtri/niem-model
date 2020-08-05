
let DataSetInterface = require("./dataSet/interface");
let Transaction = require("./transaction/index");
let Change = require("./change/index");
let Logger = require("./logger/index");

class SourceInterface {

  constructor() {

    this.logger = new Logger();

    /** @type {DataSetInterface<Model>} */
    this.models = new DataSetInterface();

    /** @type {DataSetInterface<Release>} */
    this.releases = new DataSetInterface();

    /** @type {DataSetInterface<Namespace>} */
    this.namespaces = new DataSetInterface();

    /** @type {DataSetInterface<Property>} */
    this.properties = new DataSetInterface();

    /** @type {DataSetInterface<Type>} */
    this.types = new DataSetInterface();

    /** @type {DataSetInterface<Facet>} */
    this.facets = new DataSetInterface();

    /** @type {DataSetInterface<SubProperty>} */
    this.subProperties = new DataSetInterface();

    /** @type {DataSetInterface<LocalTerm>} */
    this.localTerms = new DataSetInterface();

    this.mappings = new Mappings();

    /** @type {Transaction[]} */
    this.log = [];

  }

  async load(...args) {
    throw new Error("Data source not provided");
  }

  async export(...args) {
    throw new Error("Data source not provided");
  }

  static SourceDataSet() {
    return DataSetInterface;
  }

  static Transaction() {
    return Transaction;
  }

  static Change() {
    return Change;
  }

}

module.exports = SourceInterface;

let { Model, Release, Namespace, LocalTerm, Property, Type, Facet, SubProperty } = require("../../index");
let Mappings = require("./mappings/index");
