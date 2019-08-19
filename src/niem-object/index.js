
let Change = require("../interfaces/source/change/index");
let NIEMModelSource = require("../interfaces/source/index");

let { SourceDataSet } = NIEMModelSource;

/**
 * Commonalities of NIEM components and other items.
 * @template T
 */
class NIEMObject {

  constructor() {

    /**
     * The object ID from the latest source transaction.
     * @type {string}
     */
    this.lastTransactionID;

    /**
     * The corresponding object ID from the previous release.
     * @type {string}
     */
    this.migrationID;

    /**
     * A file name, a spreadsheet tab, etc.
     * @type {String}
     */
    this.input_location;

    /**
     * A line number, a spreadsheet row, etc.
     * @type {String}
     */
    this.input_line;

  }

  /**
   * @type {SourceDataSet<T>}
   */
  get sourceDataSet() {
    return undefined;
  }

  /**
   * An object ID.
   * May be overwritten to return a new kind of value, like a database id.
   */
  get id() {
    return this.route;
  }

  /**
   * A readable label for a NIEM object.
   * May not be unique in certain cases (non-unique codes) or across releases.
   *
   * @example "niem model"
   * @example "lapd arrestReport"
   *
   * @example Property label "nc:PersonHairColorCode"
   * @example Type-Contains-Property label "nc:PersonType - nc:PersonBirthDate"
   * @example Facet label "ncic:HAIRCodeSimpleType - enum BLK"
   */
  get label() {
    return undefined;
  }

  static route() {
    return undefined;
  }

  /**
   * An ID that distinguishes objects across different users, models, and releases.
   * Not unique for duplicate facets.
   *
   * @example "/niem/model"
   * @example "/lapd/arrestReport"
   */
  get route() {
    return undefined;
  }

  get identifiers() {
    return {};
  }

  toJSON() {
    return {
      id: this.id,
      userKey: this.userKey,
      modelKey: this.modelKey,
      migrationID: this.migrationID,
      transactionID: this.lastTransactionID,
      input_location: this.input_location,
      input_line: this.input_line
    };
  }

  /**
   * @param {String} location
   * @param {String} line
   */
  updateSource(location, line) {
    this.input_location = location;
    this.input_line = line;
  }

  /**
   * Check for values in all required identifier fields
   */
  hasBaselineFields() {
    for (let field in this.identifiers) {
      if (! this.identifiers[field]) {
        return false;
      }
    }
    return true;
  }

  /**
   * Checks that a NIEM object has unique identifiers needed for source operations.
   *
   * @example "Throws error if a type does not have a name."
   * @example "Returns if a type has a userKey, modelKey, releaseKey, prefix, and name."
   * @throws {Error}
   */
  async checkBaselineFields() {
    if (! this.hasBaselineFields()) {
      throw new Error("Required fields are missing");
    }
  }

  /**
   * Checks that an object ID does or does not exist in the source.
   * @param {"exists"|"available"} expectedStatus
   * @param {string} id
   */
  async checkSourceID(expectedStatus, id) {

    if (! this.source || ! this.sourceDataSet) {
      throw new Error("No NIEM source data implementation");
    }

    // Check for an existing object with the given id
    let match = await this.sourceDataSet.get(id);

    if (expectedStatus == "available" && match) {
      throw new Error("Required fields are not unique");
    }

    if (expectedStatus == "exists" && ! match ) {
      throw new Error("Object not found");
    }

  }

  /**
   * Save changes to the object.
   * @param {Change} change
   */
  async add(change) {

    // Check required fields and that object is unique
    await this.checkBaselineFields();
    await this.checkSourceID("available", this.id);

    // Add object
    await this.sourceDataSet.add(this, change);

    // Initialize transaction id
    this.lastTransactionID = this.id;

    return this;
  }

  /**
   * Save changes to the object.
   * @param {Change} change
   */
  async save(change) {

    // Check required fields and that object exists
    await this.checkBaselineFields();
    await this.checkSourceID("exists", this.lastTransactionID);

    // Update object
    await this.sourceDataSet.edit(this, change);

    // Reset transaction id
    this.lastTransactionID = this.id;

    return this;
  }

  /**
   * Deletes the object.
   * @param {Change} change
   */
  async delete(change) {

    // Check that object exists
    await this.checkSourceID("exists", this.lastTransactionID);

    // Remove object from data source
    this.sourceDataSet.delete(this, change);

    return this;
  }

  /**
   * True if the given object matches the given criteria.
   * @template T
   * @param {T} niemObject
   * @param {CriteriaType} criteria
   * @returns {Boolean}
   */
  static match(niemObject, criteria) {

    for (let key in criteria) {

      // Evaluate keyword separately
      if (key == "keyword") continue;

      /** @type {String} */
      let niemObjectValue = niemObject[key];

      if (!niemObjectValue) return false;

      let criteriaValue = criteria[key];

      if (criteriaValue instanceof RegExp) {
        // Make case insensitive and compare regular expression
        let regex = new RegExp(criteriaValue, "i");
        if (! regex.test(niemObjectValue)) {
          return false;
        }
      }
      else if (Array.isArray(criteriaValue)) {
        // Check if the object value matches one of the values in the criteria array
        if (! criteriaValue.includes(niemObjectValue)) {
          return false;
        }
      }
      else {
        // Compare string or boolean
        if (niemObjectValue != criteriaValue) {
          return false;
        }
      }
    }

    // Second pass criteria check for keyword regex searches on multiple fields
    if (criteria && criteria.keyword) {

      // Get the list of fields to check for a keyword search
      let keywordFields = niemObject.constructor.CriteriaKeywordFields;

      let regex = new RegExp(criteria.keyword, "i");

      // Return true if any of the fields matches the keyword
      for (let fld of keywordFields) {
        if (niemObject[fld] && regex.test(niemObject[fld])) {
          return true;
        }
      }

      // No field matched
      return false;
    }

    return true;

  }

  /**
   * True if the object matches the given criteria.
   * @param {CriteriaType} criteria
   * @returns {Boolean}
   */
  match(criteria) {
    return this.constructor.match(this, criteria);
  }

  /**
   * An array of NIEM objects that match the given criteria.
   * @param {NIEMObject[]} niemObjects
   * @param {CriteriaType} criteria
   * @returns {NIEMObject<T>[]}
   */
  static matches(niemObjects, criteria) {
    return niemObjects.filter( niemObject => niemObject.match(criteria) );
  }

}

NIEMObject.CriteriaKeywordFields = [];

/**
 * @type {Object.<string, string|boolean|RegExp|string[]>}
 */
let CriteriaType;

module.exports = NIEMObject;
