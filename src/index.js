
let TypeDefs = require("./typedefs");


/**
 * @typedef {import("./model/index")} ModelTypeDef
 * @type {ModelTypeDef}
 */
 let ModelDef;

 /**
  * @typedef {import("./release/index")} ReleaseTypeDef
  * @type {ReleaseTypeDef}
  */
 let ReleaseDef;

 /**
  * @typedef {import("./namespace/index")} NamespaceTypeDef
  * @type {NamespaceTypeDef}
  */
 let NamespaceDef;

 /**
  * @typedef {import("./local-term/index")} LocalTermTypeDef
  * @type {LocalTermTypeDef}
  */
 let LocalTermDef;

 /**
  * @typedef {import("./property/index")} PropertyTypeDef
  * @type {PropertyTypeDef}
  */
 let PropertyDef;

 /**
  * @typedef {import("./type/index")} TypeTypeDef
  * @type {TypeTypeDef}
  */
 let TypeDef;

 /**
  * @typedef {import("./facet/index")} FacetTypeDef
  * @type {FacetTypeDef}
  */
 let FacetDef;

 /**
  * @typedef {import("./subproperty/index")} SubPropertyTypeDef
  * @type {SubPropertyTypeDef}
  */
 let SubPropertyDef;

 /**
  * @typedef {import("./component/index")} ComponentTypeDef
  * @type {ComponentTypeDef}
  */
 let ComponentDef;

 /**
  * @typedef {import("./niem-object/index")} NIEMObjectTypeDef
  * @type {NIEMObjectTypeDef}
  */
 let NIEMObjectDef;

 /**
  * @typedef {import("./release-object/index")} ReleaseObjectTypeDef
  * @type {ReleaseObjectTypeDef}
  */
 let ReleaseObjectDef;


 /**
  * @typedef {import("./interfaces/source/interface")} SourceInterfaceTypeDef
  * @type {SourceInterfaceTypeDef}
  */
  let SourceInterfaceDef;

  /**
   * @typedef {import("./interfaces/source/index")} SourceTypeDef
   * @type {SourceTypeDef}
   */
  let SourceDef;

  /**
   * @typedef {import("./interfaces/source/dataSet/interface")} DataSetInterfaceTypeDef
   * @type {DataSetInterfaceTypeDef}
   */
  let DataSetInterfaceDef;

  /**
   * @typedef {import("./interfaces/source/dataSet/index")} DataSetTypeDef
   * @type {DataSetTypeDef}
   */
  let DataSetDef;

  /**
   * @typedef {import("./interfaces/source/change/index.js")} ChangeTypeDef
   * @type {ChangeTypeDef}
   */
  let ChangeDef;

  /**
   * @typedef {import("./interfaces/source/transaction/index.js")} TransactionTypeDef
   * @type {TransactionTypeDef}
   */
  let TransactionDef;

  /**
   * @typedef {import("./interfaces/source/logger/index.js")} LoggerTypeDef
   * @type {LoggerTypeDef}
   */
  let LoggerDef;

  /**
   * @typedef {import("./interfaces/source/mapping/index.js")} MappingTypeDef
   * @type {MappingTypeDef}
   */
  let MappingDef;

  /**
   * @typedef {import("./interfaces/source/mappings/index.js")} MappingsTypeDef
   * @type {MappingsTypeDef}
   */
  let MappingsDef;


  /**
   * @typedef {import("./interfaces/format/interface.js")} NIEMFormatInterfaceTypeDef
   * @type {NIEMFormatInterfaceTypeDef}
   */
  let NIEMFormatInterfaceDef;

  /**
   * @typedef {import("./interfaces/format/niem-object/interface.js")} NIEMObjectFormatInterfaceTypeDef
   * @type {NIEMObjectFormatInterfaceTypeDef}
   */
  let NIEMObjectFormatInterfaceDef;

  /**
   * @typedef {import("./niem/index")} NIEMTypeDef
   * @type {NIEMTypeDef}
   */
  let NIEMDef;


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
  unitTests: require("../test/unit.test..js.x"),
  integrationTests: require("../test/integration/index"),

  // TypeDefs more easily available
  ModelDef,
  ReleaseDef,
  NamespaceDef,
  LocalTermDef,
  PropertyDef,
  TypeDef,
  FacetDef,
  SubPropertyDef,
  ComponentDef,
  NIEMObjectDef,
  ReleaseObjectDef,

  SourceInterfaceDef,
  SourceDef,
  DataSetInterfaceDef,
  DataSetDef,
  ChangeDef,
  TransactionDef,
  LoggerDef,
  MappingDef,
  MappingsDef,

  NIEMFormatInterfaceDef,
  NIEMObjectFormatInterfaceDef,

  NIEMDef

};
