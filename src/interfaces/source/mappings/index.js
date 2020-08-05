
let Mapping = require("../mapping/index");

/**
 * @template T
 */
class Mappings {

  constructor() {
    /** @type {Mapping[]} */
    this.data = [];
  }

  /**
   * @param {DataSetInterface} dataSet
   * @param {String} userKey
   * @param {String} modelKey
   * @param {String} releaseKey
   * @param {Mapping.OperationType} operation
   * @param {Mapping.ClassNameType} className
   * @param {String} previousID
   * @param {String} id
   * @param {Change[]} changes
   * @returns {Promise<Mapping<T>>}
   */
  async add(dataSet, userKey=undefined, modelKey=undefined, releaseKey=undefined, operation=undefined, className=undefined, previousID=undefined, id=undefined, changes=[]) {

    let mapping = new Mapping(userKey, modelKey, releaseKey, operation, className, previousID, id, changes);
    mapping.dataSet = dataSet;
    await mapping.computeDiffs();
    this.data.push(mapping);
    // @ts-ignore
    return mapping;

  }

  /**
   * @param {DataSetInterface} dataSet
   * @param {Mapping[]} mappings
   * @returns {Promise<Mapping<T>[]>}
   */
  async addMultiple(dataSet, mappings) {
    for (let mapping of mappings) {
      mapping.dataSet = dataSet;
      await mapping.computeDiffs();
    }
    this.data.push(...mappings);
    return mappings;
  }

  /**
   * @param {Mapping.ClassNameType} className
   * @param {Object} identifiers
   * @returns {Promise<Mapping<T>>}
   */
  async get(className, identifiers) {
    return this.data.find( mapping => mapping.className == className && mapping.id == identifiers );
  }

  /**
   * @param {Mappings.CriteriaType} criteria
   * @returns {Promise<Mapping<T>[]>}
   */
  async find(criteria={}) {
    let keys = Object.keys(criteria);
    return this.data.filter( mapping => {
      for (let key of keys) {
        if (mapping[key] != criteria[key]) {
          return false;
        }
      }
      return true;
    });
  }

  /**
   * @param {NIEM} niem
   * @param {Object[]} jsonMappings
   * @returns {Promise<Mapping<T>[]>}
   */
  async load(niem, jsonMappings=[]) {
    let source = niem.sources[0];

    /** @type {Mapping[]}] */
    let mappings = jsonMappings.map( jsonMapping => Object.assign(new Mapping(), jsonMapping) );

    this.addMultiple(source.namespaces, mappings.filter( mapping => mapping.className == "Namespace") );
    this.addMultiple(source.localTerms, mappings.filter( mapping => mapping.className == "LocalTerm") );
    this.addMultiple(source.properties, mappings.filter( mapping => mapping.className == "Property") );
    this.addMultiple(source.types, mappings.filter( mapping => mapping.className == "Type") );
    this.addMultiple(source.subProperties, mappings.filter( mapping => mapping.className == "SubProperty") );
    this.addMultiple(source.facets, mappings.filter( mapping => mapping.className == "Facet") );

    return mappings;
  }

}

/**
 * @type {{userKey?: String, modelKey?: String, releaseKey?: String, className?: Mapping.ClassNameType, operation?: Mapping.OperationType}}
 */
Mappings.CriteriaType;


let NIEM = require("../../../niem/index");
let Change = require("../change/index");
let DataSetInterface = require("../dataSet/interface");

module.exports = Mappings;
