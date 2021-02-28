
let Change = require("./change/index");
let DataSetInterface = require("./dataSet/interface");
let Transaction = require("./transaction/index");
let Logger = require("./logger/index");

class SourceInterface {

  constructor() {

    let Mappings = require("./mappings/index");

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

  toJSON() {
    return {}
  }

}

module.exports = SourceInterface;

let Model = require("../../model/index");
let Release = require("../../release/index");
let Namespace = require("../../namespace/index");
let LocalTerm = require("../../local-term/index");
let Property = require("../../property/index");
let Type = require("../../type/index");
let Facet = require("../../facet/index");
let SubProperty = require("../../subproperty/index");
