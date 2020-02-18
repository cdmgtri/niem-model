
let SourceDataSetInterface = require("./dataSet/index");
let Transaction = require("./transaction/index");
let Change = require("./change/index");

class NIEMModelSourceInterface {

  constructor() {

    /** @type {SourceDataSetInterface<Model>} */
    this.models = new SourceDataSetInterface();

    /** @type {SourceDataSetInterface<Release>} */
    this.releases = new SourceDataSetInterface();

    /** @type {SourceDataSetInterface<Namespace>} */
    this.namespaces = new SourceDataSetInterface();

    /** @type {SourceDataSetInterface<Property>} */
    this.properties = new SourceDataSetInterface();

    /** @type {SourceDataSetInterface<Type>} */
    this.types = new SourceDataSetInterface();

    /** @type {SourceDataSetInterface<Facet>} */
    this.facets = new SourceDataSetInterface();

    /** @type {SourceDataSetInterface<SubProperty>} */
    this.subProperties = new SourceDataSetInterface();

    /** @type {SourceDataSetInterface<LocalTerm>} */
    this.localTerms = new SourceDataSetInterface();

    /** @type {Transaction[]} */
    this.log = [];

  }

  static SourceDataSet() {
    return SourceDataSetInterface;
  }

  static Transaction() {
    return Transaction;
  }

  static Change() {
    return Change;
  }

}

module.exports = NIEMModelSourceInterface;

let { Model, Release, Namespace, LocalTerm, Property, Type, Facet, SubProperty, NIEMObject } = require("../../index");
