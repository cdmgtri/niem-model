
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
   * @param {{[string: string]: string}} identifiers
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
   * @param {string} identifiers
   * @returns {Promise<T[]>}
   */
  async history(identifiers) {
    notImplemented();
  }

}

function notImplemented() {
  throw new Error("Data source not provided");
}

module.exports = SourceDataSetInterface;
