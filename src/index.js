
let TypeDefs = require("./typedefs");

module.exports = {

  NIEM: require("./niem/index"),

  // Primary NIEM classes
  Model: require("./model/index"),
  Release: require("./release/index"),
  Namespace: require("./namespace/index"),
  LocalTerm: require("./local-term/index"),
  Property: require("./property/index"),
  Type: require("./type/index"),
  Facet: require("./facet/index"),
  SubProperty: require("./subproperty/index"),

  // Support for NIEM classes
  Component: require("./component/index"),
  NIEMObject: require("./niem-object/index"),
  ReleaseObject: require("./release-object/index"),

  // TypeDefs
  TypeDefs,

  // Source interface classes
  SourceInterface: require("./interfaces/source/interface"),
  Source: require("./interfaces/source/index"),
  DataSetInterface: require("./interfaces/source/dataSet/interface"),
  DataSet: require("./interfaces/source/dataSet/index"),
  Change: require("./interfaces/source/change/index"),
  Transaction: require("./interfaces/source/transaction/index"),
  Logger: require("./interfaces/source/logger/index"),
  Mapping: require("./interfaces/source/mapping/index"),
  Mappings: require("./interfaces/source/mappings/index"),

  // Format interface classes
  NIEMFormatInterface: require("./interfaces/format/interface"),
  NIEMObjectFormatInterface: require("./interfaces/format/niem-object/interface"),

  // Tests
  unitTests: require("../test/unit/index"),
  integrationTests: require("../test/integration/index"),

};
