
let Change = require("./change/index");

class SourceDataSetInterface {

  /**
   * @param {NIEMObject} niemObject
   * @param {Change} change
   */
  async add(niemObject, change) {
    return undefined;
  }

  /**
   * @param {NIEMObject} niemObject
   * @param {Change} change
   */
  async edit(niemObject, change) {
    return undefined;
  }

  /**
   * @param {NIEMObject} niemObject
   * @param {Change} change
   */
  async delete(niemObject, change) {
    return undefined;
  }

  /**
   * @param {string} id
   */
  async get(id) {
    return undefined;
  }

  /**
   * @param {NIEMObject} exactCriteria
   */
  async find(exactCriteria) {
    return undefined;
  }

  /**
   * @param {string} id
   */
  async history(id) {
    return undefined;
  }

}

module.exports = SourceDataSetInterface;

let NIEMObject = require("../../niem-object/index");
