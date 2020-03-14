
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
    SourceInterface: {
      SourceInterface: require("./interfaces/source/interface"),
      Source: require("./interfaces/source/index"),
      DataSetInterface: require("./interfaces/source/dataSet/interface"),
      DataSet: require("./interfaces/source/dataSet/index"),
      Change: require("./interfaces/source/change/index"),
      Transaction: require("./interfaces/source/transaction/index"),
      Logger: require("./interfaces/source/logger/index")
      },
    FormatInterface: {
      NIEMFormatInterface: require("./interfaces/format/interface"),
      NIEMObjectFormatInterface: require("./interfaces/format/niem-object/interface")
    }
  },

  Tests: {
    unitTests: require("../test/unit/index"),
    integrationTests: require("../test/integration/index")
  }
};
