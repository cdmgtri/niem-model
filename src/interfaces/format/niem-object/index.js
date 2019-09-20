
let NIEMObject = require("../../../niem-object");
let Release = require("../../../release");

/**
 * @template {NIEMObject} T
 * @template U
 */
class NIEMObjectFormatInterface {

  /**
   * @param {U} input
   * @returns {T}
   */
  parse(input) {
    throw new Error("Parse function not defined");
  }

  /**
   * @param {U} input
   * @param {Release} release
   * @returns {Promise<T>}
   */
  async load(input, release) {
    throw new Error("Load function not defined");
  }

  /**
   * @param {T} niemObject
   * @returns {Promise<U>}
   */
  async generate(niemObject) {
    throw new Error("Generate function not defined");
  }

}

module.exports = NIEMObjectFormatInterface;
