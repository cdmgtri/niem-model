
/**
 * @template {import("../../../typedefs").NIEMObject} T
 */
class NIEMObjectFormatInterface {

  /**
   * Returns a NIEM object, parsed from the given input.
   * @returns {Promise<T>}
   */
  async read(...args) {
    throw new Error("NIEM format reader is not defined");
  }

  /**
   * @returns {Promise<T>}
   */
  async parse(...args) {
    throw new Error("NIEM format parser is not defined");
  }

  /**
   * Returns a NIEM object as parsed from the given input.
   * Adds the new object to the given release.

   * @param {any} input
   * @param {import("../../../typedefs").Release} release
   * @returns {Promise<T>}
   */
  async load(input, release) {
    let object = await this.read(input, release);
    return object.add(release);
  }

  /**
   * NIEM object represented as an XML Schema string
   *
   * @param {T} niemObject
   * @returns {Promise<string>}
   */
  async write(niemObject) {
    let node = await this.export(niemObject);
    return this.stringify(node);
  }

  /**
   * @param {T} niemObject
   * @returns {Promise<Object>}
   */
  async export(niemObject, ...args) {
    throw new Error("NIEM format exporter is not defined.");
  }

  /**
   * Convert input to a string
   * @returns {string}
   */
  stringify(input) {
    throw new Error("NIEM format stringify is not defined");
  }

  /**
   * Returns the appropriate classes for the given NDR version.
   * @param {"3.0"|"4.0"|"5.0"|"6.0"} ndrVersion
   * @returns {NIEMObjectFormatInterface}
   */
  static create(ndrVersion) {
    throw new Error("NIEM format factory is not defined.");
  }


}

module.exports = NIEMObjectFormatInterface;
