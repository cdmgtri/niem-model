
module.exports = {

  NIEM: require("./niem/index"),

  Model: require("./model/index"),
  Release: require("./release/index"),
  Namespace: require("./namespace/index"),
  LocalTerm: require("./local-term/index"),
  Property: require("./property/index"),
  Type: require("./type/index"),
  Facet: require("./facet/index"),
  SubProperty: require("./subproperty/index"),

  Component: require("./component/index"),
  NIEMObject: require("./niem-object/index"),
  ReleaseObject: require("./release-object/index"),

  Interfaces: {
    Source: {
      NIEMModelSource: require("./interfaces/source/index"),
      Change: require("./interfaces/source/change/index"),
      Transaction: require("./interfaces/source/transaction/index"),
      DataSet: require("./interfaces/source/dataSet/index")
      },
    Format: {
      NIEMModelFormat: require("./interfaces/format/index"),
      NIEMObjectFormat: require("./interfaces/format/niem-object/index")
    }
  },

  Tests: {
    unitTests: require("../test/unit/index"),
    integrationTests: require("../test/integration/index")
  }
};
