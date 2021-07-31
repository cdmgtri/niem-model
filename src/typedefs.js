
/**
 * @typedef {import("./model/index")} Model
 * @type {Model}
 */
let ModelDef;

/**
 * @typedef {import("./release/index")} Release
 * @type {Release}
 */
let ReleaseDef;

/**
 * @typedef {import("./namespace/index")} Namespace
 * @type {Namespace}
 */
let NamespaceDef;

/**
 * @typedef {import("./local-term/index")} LocalTerm
 * @type {LocalTerm}
 */
let LocalTermDef;

/**
 * @typedef {import("./property/index")} Property
 * @type {Property}
 */
let PropertyDef;

/**
 * @typedef {import("./type/index")} Type
 * @type {Type}
 */
let TypeDef;

/**
 * @typedef {import("./facet/index")} Facet
 * @type {Facet}
 */
let FacetDef;

/**
 * @typedef {import("./subproperty/index")} SubProperty
 * @type {SubProperty}
 */
let SubPropertyDef;

/**
 * @typedef {import("./component/index")} Component
 * @type {Component}
 */
let ComponentDef;

/**
 * @typedef {import("./niem-object/index")} NIEMObject
 * @type {NIEMObject}
 */
let NIEMObjectDef;

/**
 * @typedef {import("./release-object/index")} ReleaseObject
 * @type {ReleaseObject}
 */
let ReleaseObjectDef;


/**
 * @typedef {import("./interfaces/source/interface")} SourceInterface
 * @type {SourceInterface}
 */
 let SourceInterfaceDef;

 /**
  * @typedef {import("./interfaces/source/index")} Source
  * @type {Source}
  */
 let SourceDef;

 /**
  * @typedef {import("./interfaces/source/dataSet/interface")} DataSetInterface
  * @type {DataSetInterface}
  */
 let DataSetInterfaceDef;

 /**
  * @typedef {import("./interfaces/source/dataSet/index")} DataSet
  * @type {DataSet}
  */
 let DataSetDef;

 /**
  * @typedef {import("./interfaces/source/change/index.js")} Change
  * @type {Change}
  */
 let ChangeDef;

 /**
  * @typedef {import("./interfaces/source/transaction/index.js")} Transaction
  * @type {Transaction}
  */
 let TransactionDef;

 /**
  * @typedef {import("./interfaces/source/logger/index.js")} Logger
  * @type {Logger}
  */
 let LoggerDef;

 /**
  * @typedef {import("./interfaces/source/mapping/index.js")} Mapping
  * @type {Mapping}
  */
 let MappingDef;

 /**
  * @typedef {import("./interfaces/source/mappings/index.js")} Mappings
  * @type {Mappings}
  */
 let MappingsDef;


 /**
  * @typedef {import("./interfaces/format/interface.js")} NIEMFormatInterface
  * @type {NIEMFormatInterface}
  */
 let NIEMFormatInterfaceDef;

 /**
  * @typedef {import("./interfaces/format/niem-object/interface.js")} NIEMObjectFormatInterface
  * @type {NIEMObjectFormatInterface}
  */
 let NIEMObjectFormatInterfaceDef;

 /**
  * @typedef {import("./niem/index")} NIEM
  * @type {NIEM}
  */
 let NIEMDef;

module.exports = {
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

}
