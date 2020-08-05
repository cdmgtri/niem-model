
let Change = require("../change/index");
let Transaction = require("../transaction/index");

/**
 * @template {NIEMObject<T>} T
 * @template {Object<string, string>} IdentifiersType
 * @template {Object<string, any>} CriteriaType
 */
class DataSetInterface {

  /**
   * @param {T} niemObject
   * @param {Change} [change]
   * @returns {Promise<T>}
   */
  async add(niemObject, change) {
    throw new Error("Data source not provided");
  }

  /**
   * @param {T} niemObject
   * @param {Change} [change]
   * @returns {Promise<T>}
   */
  async edit(niemObject, change) {
    throw new Error("Data source not provided");
  }

  /**
   * @param {T} niemObject
   * @param {Change} [change]
   * @returns {Promise<T>}
   */
  async delete(niemObject, change) {
    throw new Error("Data source not provided");
  }

  /**
   * @param {String} id
   * @returns {Promise<T>}
   */
  async id(id) {
    throw new Error("Data source not provided");
  }

  /**
   * @param {IdentifiersType} identifiers
   * @returns {Promise<T>}
   */
  async get(identifiers) {
    throw new Error("Data source not provided");
  }

  /**
   * @param {CriteriaType} [criteria]
   * @param {Function} [sortFunction]
   * @returns {Promise<T[]>}
   */
  async find(criteria, sortFunction) {
    throw new Error("Data source not provided");
  }

  /**
   * @param {CriteriaType} [criteria]
   * @returns {Promise<number>}
   */
  async count(criteria) {
    throw new Error("Data source not provided");
  }

  /**
   * @param {T} niemObject
   * @returns {Promise<Transaction[]>}
   */
  async revisions(niemObject) {
    throw new Error("Data source not provided");
  }

  /**
   * @param {T} niemObject
   * @returns {Promise<Transaction[]>}
   */
  async history(niemObject) {
    throw new Error("Data source not provided");
  }

  async load(...args) {
    throw new Error("Data source not provided");
  }

  async export(...args) {
    throw new Error("Data source not provided");
  }

}

module.exports = DataSetInterface;

let NIEMObject = require("../../../niem-object/index");
