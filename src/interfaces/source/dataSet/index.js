
let Change = require("../change/index");
let Transaction = require("../transaction/index");

/**
 * @template {NIEMObject} T
 */
class SourceDataSetInterface {

  /**
   * @param {T} niemObject
   * @param {Change} change
   * @returns {Promise<T>}
   */
  async add(niemObject, change) {
    notImplemented();
  }

  /**
   * @param {T} niemObject
   * @param {Change} change
   * @returns {Promise<T>}
   */
  async edit(niemObject, change) {
    notImplemented();
  }

  /**
   * @param {T} niemObject
   * @param {Change} change
   * @returns {Promise<T>}
   */
  async delete(niemObject, change) {
    notImplemented();
  }

  /**
   * @param {U} identifiers
   * @returns {Promise<T>}
   */
  async get(identifiers) {
    notImplemented();
  }

  /**
   * @param {object} criteria
   * @returns {Promise<T[]>}
   */
  async find(criteria) {
    notImplemented();
  }

  /**
   * @param {object} criteria
   * @returns {Promise<T[]>}
   */
  async count(criteria) {
    notImplemented();
  }

  /**
   * @param {T} niemObject
   * @returns {Promise<Transaction[]>}
   */
  async revisions(niemObject) {
    notImplemented();
  }

  /**
   * @param {T} niemObject
   * @returns {Promise<Transaction[]>}
   */
  async history(niemObject) {
    notImplemented();
  }

}

function notImplemented() {
  throw new Error("Data source not provided");
}

module.exports = SourceDataSetInterface;

let NIEMObject = require("../../../niem-object/index");
