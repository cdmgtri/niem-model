
let Change = require("../change/index");
let Transaction = require("../transaction/index");

/**
 * @template T
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
   * @param {string} id
   * @returns {Promise<T>}
   */
  async get(id) {
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
   * @param {string} id
   * @returns {Promise<Transaction[]>}
   */
  async history(id) {
    notImplemented();
  }

}

function notImplemented() {
  throw new Error("Data source not provided");
}

module.exports = SourceDataSetInterface;
