
/**
 * @template {NIEMObject} T
 */
class Mapping {

  /**
   * @param {String} userKey
   * @param {String} modelKey
   * @param {String} releaseKey
   * @param {Mapping.OperationType} operation
   * @param {Mapping.ClassNameType} className
   * @param {String} previousID
   * @param {String} id
   * @param {Change[]} changes
   */
  constructor(userKey=undefined, modelKey=undefined, releaseKey=undefined, operation=undefined, className=undefined, previousID=undefined, id=undefined, changes=[]) {

    /** @type {DataSetInterface<T, any, any>} */
    this.dataSet;

    this.userKey = userKey;
    this.modelKey = modelKey;
    this.releaseKey = releaseKey;
    this.operation = operation;
    this.className = className;
    this.previousID = previousID;
    this.id = id;
    this.changes = changes;

    /** @type {String[]} */
    this.differentFields;

  }

  async object() {
    return this.dataSet.id(this.id);
  }

  async previousObject() {
    return this.dataSet.id(this.previousID);
  }

  async computeDiffs() {

    if (this.operation == "load") {
      this.differentFields = [];
      return [];
    }

    let oldObject = await this.previousObject();
    let newObject = await this.object();

    let keys = Object.keys(newObject || oldObject);
    keys = keys.filter( key => key != "release" && key != "origin" );

    if (!oldObject || !newObject) {
      this.differentFields = keys;
      return keys;
    }

    let differentFields = [];

    for (let key of keys) {
      if (Array.isArray(oldObject[key])) {
        // Compare arrays
        if (oldObject[key].join(", ") != newObject[key].join(", ")) {
          differentFields.push(key);
        }
      }
      else if (oldObject[key] != newObject[key]) {
        // Compare strings, booleans, ...
        differentFields.push(key);
      }
    }

    this.differentFields = differentFields;
    return differentFields;

  }


}

/** @type {"add"|"edit"|"delete"|"load"} */
Mapping.OperationType;

/**
 * @type {"Namespace"|"LocalTerm"|"Property"|"Type"|"SubProperty"|"Facet"}
 */
Mapping.ClassNameType;

let NIEMObject = require("../../../niem-object/index");
let DataSetInterface = require("../dataSet/interface");
let Change = require("../change/index");

module.exports = Mapping;
