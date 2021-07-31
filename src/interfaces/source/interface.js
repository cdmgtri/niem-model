
let Change = require("./change/index");
let DataSetInterface = require("./dataSet/interface");
let Transaction = require("./transaction/index");
let Logger = require("./logger/index");

class SourceInterface {

  constructor() {

    let Mappings = require("./mappings/index");

    this.logger = new Logger();

    /** @type {DataSetInterface<Model, Model.IdentifiersType, Model.CriteriaType>} */
    this.models = new DataSetInterface();

    /** @type {DataSetInterface<Release, Release.IdentifiersType, Release.CriteriaType>} */
    this.releases = new DataSetInterface();

    /** @type {DataSetInterface<Namespace, Namespace.IdentifiersType, Namespace.CriteriaType>} */
    this.namespaces = new DataSetInterface();

    /** @type {DataSetInterface<Property, Property.IdentifiersType, Property.CriteriaType>} */
    this.properties = new DataSetInterface();

    /** @type {DataSetInterface<Type, Type.IdentifiersType, Type.CriteriaType>} */
    this.types = new DataSetInterface();

    /** @type {DataSetInterface<Facet, Facet.IdentifiersType, Facet.CriteriaType>} */
    this.facets = new DataSetInterface();

    /** @type {DataSetInterface<SubProperty, SubProperty.IdentifiersType, SubProperty.CriteriaType>} */
    this.subProperties = new DataSetInterface();

    /** @type {DataSetInterface<LocalTerm, LocalTerm.IdentifiersType, LocalTerm.CriteriaType>} */
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
