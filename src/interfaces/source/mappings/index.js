
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
   * @param {String[]} differentFields
   * @param {Change[]} changes
   * @returns {Promise<Mapping<T>>}
   */
  async add(dataSet, userKey=undefined, modelKey=undefined, releaseKey=undefined, operation=undefined, className=undefined, previousID=undefined, id=undefined, differentFields=undefined, changes=[]) {

    let mapping = new Mapping(userKey, modelKey, releaseKey, operation, className, previousID, id, differentFields, changes);

    mapping.dataSet = dataSet;

    if (differentFields == undefined) {
      await mapping.computeDiffs();
    }

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
      if (mapping.differentFields == undefined) {
        await mapping.computeDiffs();
      }
    }
    this.data.push(...mappings);
    return mappings;
  }

  /**
   * @param {DataSetInterface} dataSet
   * @param {Mapping.ClassNameType} className
   * @param {Object.<string, any>} oldObject
   * @param {Object.<string, any>} newObject
   * @param {String[]} ignoredFields
   * @param {Change[]} changes
   */
  calculate(dataSet, className, oldObject, newObject, ignoredFields=[], changes) {

    /** @type {Mapping.OperationType} */
    let operation;

    let differentFields = [];

    if (!newObject) {
      operation = "delete";
      newObject = {};
    }
    else {
      differentFields = compareObject(oldObject, newObject, ignoredFields);
      operation = (differentFields.length === 0) ? "load" : "edit";
    }

    let mapping = new Mapping(newObject.userKey, newObject.modelKey, newObject.releaseKey, operation, className, oldObject.id, newObject.id, differentFields, changes);

    mapping.dataSet = dataSet;

    return mapping;

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
   * @param {import("../../../niem/index")} niem
   * @param {Object[]} jsonMappings
   * @returns {Promise<Mapping<T>[]>}
   */
  async load(niem, jsonMappings=[]) {
    let source = niem.sources[0];

    /** @type {Mapping[]}] */
    let mappings = jsonMappings.map( jsonMapping => Object.assign(new Mapping(), jsonMapping) );

    /**
     * @param {Mapping[]} data
     * @param {Mapping[]} allMappings
     * @param {DataSetInterface} dataSet
     * @param {Mapping.ClassNameType} className
     */
    function addObjectMappings(data, allMappings, dataSet, className) {
      let mappings = allMappings.filter( mapping => mapping.className == className );
      mappings.forEach( mapping => {
        mapping.dataSet = dataSet
        data.push(mapping);
      });
    }

    addObjectMappings(this.data, mappings, source.namespaces, "Namespace");
    addObjectMappings(this.data, mappings, source.localTerms, "LocalTerm");
    addObjectMappings(this.data, mappings, source.properties, "Property");
    addObjectMappings(this.data, mappings, source.types, "Type");
    addObjectMappings(this.data, mappings, source.subProperties, "SubProperty");
    addObjectMappings(this.data, mappings, source.facets, "Facet");

    return mappings;
  }

}


/**
 * @param {Object} oldObject
 * @param {Object} newObject
 * @param {String[]} ignoredFields
 */
function compareObject(oldObject, newObject, ignoredFields=[]) {

  let differentFields = [];

  let allIgnoredFields = ["release", "origin", "previousIdentifiers", ...ignoredFields];

  let keys = Object.keys(newObject || oldObject);
  keys = keys.filter( key => ! allIgnoredFields.includes(key) );

  for (let key of keys) {
    if (Array.isArray(oldObject[key])) {
      // Compare arrays
      if (oldObject[key].sort().join(", ") != newObject[key].sort().join(", ")) {
        differentFields.push(key);
      }
    }
    else if ((oldObject[key] || "") != (newObject[key] || "")) {
      // Compare strings, booleans, ...
      differentFields.push(key);
    }
  }

  return differentFields;

}




/**
 * @type {{userKey?: String, modelKey?: String, releaseKey?: String, className?: Mapping.ClassNameType, operation?: Mapping.OperationType}}
 */
Mappings.CriteriaType;

let Change = require("../change/index");
let DataSetInterface = require("../dataSet/interface");

module.exports = Mappings;
