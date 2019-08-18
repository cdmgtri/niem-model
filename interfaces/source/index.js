
let SourceDataSet = require("./dataSet/index");
let Transaction = require("./transaction/index");

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

}

module.exports = NIEMModelSourceInterface;

let Model = require("../../src/model/index");
let Release = require("../../src/release/index");
let Namespace = require("../../src/namespace/index");
let Property = require("../../src/property/index");
let Type = require("../../src/type/index");
let Facet = require("../../src/facet/index");
let SubProperty = require("../../src/subproperty/index");
let LocalTerm = require("../../src/local-term/index");
