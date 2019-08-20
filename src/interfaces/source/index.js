
let SourceDataSet = require("./dataSet/index");
let Transaction = require("./transaction/index");
let Change = require("./change/index");

class NIEMModelSourceInterface {

  constructor() {

    /** @type {SourceDataSet<Model>} */
    this.models = new SourceDataSet();

    /** @type {SourceDataSet<Release>} */
    this.releases = new SourceDataSet();

    /** @type {SourceDataSet<Namespace>} */
    this.namespaces = new SourceDataSet();

    /** @type {SourceDataSet<Property>} */
    this.properties = new SourceDataSet();

    /** @type {SourceDataSet<Type>} */
    this.types = new SourceDataSet();

    /** @type {SourceDataSet<Facet>} */
    this.facets = new SourceDataSet();

    /** @type {SourceDataSet<SubProperty>} */
    this.subProperties = new SourceDataSet();

    /** @type {SourceDataSet<LocalTerm>} */
    this.localTerms = new SourceDataSet();

    /** @type {Transaction[]} */
    this.log = [];

  }

  static SourceDataSet() {
    return SourceDataSet;
  }

  static Transaction() {
    return Transaction;
  }

  static Change() {
    return Change;
  }

}

module.exports = NIEMModelSourceInterface;

let Model = require("../../model/index");
let Release = require("../../release/index");
let Namespace = require("../../namespace/index");
let Property = require("../../property/index");
let Type = require("../../type/index");
let Facet = require("../../facet/index");
let SubProperty = require("../../subproperty/index");
let LocalTerm = require("../../local-term/index");
