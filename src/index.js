
let Model = require("./model/index");
let Release = require("./release/index");
let Namespace = require("./namespace/index");
let LocalTerm = require("./local-term/index");
let Property = require("./property/index");
let Type = require("./type/index");
let Facet = require("./facet/index");
let SubProperty = require("./subproperty/index");

let Component = require("./component/index");
let NIEMObject = require("./niem-object/index");
let ReleaseObject = require("./release-object/index");

let SourceInterface = require("./interfaces/source/interface");
let Source = require("./interfaces/source/index");
let DataSetInterface = require("./interfaces/source/dataSet/interface");
let DataSet = require("./interfaces/source/dataSet/index");
let Change = require("./interfaces/source/change/index");
let Transaction = require("./interfaces/source/transaction/index");
let Logger = require("./interfaces/source/logger/index");
let Mapping = require("./interfaces/source/mapping/index");
let Mappings = require("./interfaces/source/mappings/index");

let NIEMFormatInterface = require("./interfaces/format/interface");
let NIEMObjectFormatInterface = require("./interfaces/format/niem-object/interface");

let unitTests = require("../test/unit/index");
let integrationTests = require("../test/integration/index");


module.exports = {

  NIEM: require("./niem/index"),

  Model,
  Release,
  Namespace,
  LocalTerm,
  Property,
  Type,
  Facet,
  SubProperty,

  Component,
  NIEMObject,
  ReleaseObject,

  // For Intellisense support
  ModelInstance: new Model("test", "test"),
  ReleaseInstance: new Release(),
  NamespaceInstance: new Namespace("test"),
  LocalTermInstance: new LocalTerm(),
  PropertyInstance: new Property(),
  TypeInstance: new Type(),
  FacetInstance: new Facet("test:TestSimpleType", "test"),
  SubPropertyInstance: new SubProperty("test:TestType", "test:TestProperty"),

  ComponentInstance: new Component("test", "Test", "Test def"),
  NIEMObjectInstance: new NIEMObject(),
  ReleaseObjectInstance: new ReleaseObject(),

  // Source interface classes
  SourceInterface,
  Source,
  DataSetInterface,
  DataSet,
  Change,
  Transaction,
  Logger,
  Mapping,
  Mappings,


  // Format interface classes
  NIEMFormatInterface,
  NIEMObjectFormatInterface,

  // Source interface instances for Intellisense
  SourceInterfaceInstance: new SourceInterface(),
  SourceInstance: new Source(),
  DataSetInterfaceInstance: new DataSetInterface(),
  DataSetInstance: new DataSet(Property, new Logger()),
  ChangeInstance: new Change(),
  TransactionInstance: new Transaction(Property, "add", new Property("test", "Test", "Test def"), {prefix: "test"}, new Change(), 2),
  LoggerInstance: new Logger(),
  MappingInstance: new Mapping(),
  MappingsInstance: new Mappings(),

  // Format interface instances for Intellisense
  NIEMFormatInterfaceInstance: new NIEMFormatInterface(),
  NIEMObjectFormatInterfaceInstance: new NIEMObjectFormatInterface(),

  // Tests
  unitTests,
  integrationTests,

  Interfaces: {
    SourceInterface: {
      SourceInterface,
      Source,
      DataSetInterface,
      DataSet,
      Change,
      Transaction,
      Logger,
      Mapping,
      Mappings,
      },
    FormatInterface: {
      NIEMFormatInterface,
      NIEMObjectFormatInterface
    }
  },

  Tests: {
    unitTests,
    integrationTests
  }
};
