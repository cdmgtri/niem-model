
// @ts-ignore
let _ = require("lodash");
let Change = require("../interfaces/source/change/index");
let DataSet = require("../interfaces/source/dataSet/interface");

/**
 * Commonalities of NIEM components and other items.
 * @template T
 */
class NIEMObject {

  constructor() {

    /**
     * The object identifiers from the latest source transaction.
     * @type {{[string: string]: string}}
     */
    this.previousIdentifiers;

    /**
     * The corresponding object identifiers from the previous release.
     * @type {{[string: string]: string}}
     */
    this.migrationIdentifiers;

    /**
     * The corresponding object identifiers from the original subset object.
     * @type {string}
     */
    this.subsetIdentifiers;

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
   * @type {String}
   */
  get previousRoute() {
    if (! this.previousIdentifiers) return undefined;
    let params = Object.values(this.previousIdentifiers);
    return this.constructor["route"](...params);
  }

  /**
   * @type {String}
   */
  get migrationRoute() {
    if (! this.migrationIdentifiers) return undefined;
    let params = Object.values(this.migrationIdentifiers);
    return this.constructor["route"](...params);
  }

  /**
   * @type {String}
   */
  get subsetRoute() {
    if (! this.subsetIdentifiers) return undefined;
    let params = Object.values(this.subsetIdentifiers);
    return this.constructor["route"](...params);
  }

  /**
   * @type {DataSet<NIEMObject>}
   */
  get sourceDataSet() {
    return undefined;
  }

  /**
   * An object ID.
   * May be overwritten to return a new kind of value, like a database id.
   */
  get id() {
    return this["route"];
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

  /**
   * @returns {string}
   */
  static route(...args) {
    return undefined;
  }

  /**
   * An ID that distinguishes objects across different users, models, and releases.
   * Not unique for duplicate facets.
   *
   * @type {string}
   * @example "/niem/model"
   * @example "/lapd/arrestReport"
   */
  get route() {
    return undefined;
  }

  get identifiers() {
    return {};
  }

  /**
   * @abstract
   * @returns {Object<string, string>}
   */
  static identifiers(...args) {
    return {};
  }

  toJSON() {
    return {
      userKey: this["userKey"],
      modelKey: this["modelKey"],
      migrationIdentifiers: this.migrationIdentifiers,
      previousIdentifiers: this.previousIdentifiers,
      input_location: this.input_location,
      input_line: this.input_line
    };
  }

  /**
   * Creates a new class.
   * Used to support different versions of classes based on the NDR version.
   *
   * @abstract
   * @example "Namespace.create('3.0', ...) returns a NDR 3.0-specific Namespace object"
   */
  static create(ndrVersion, ...args) {

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
  get missingIdentifierFields() {
    let results = [];
    for (let field in this.identifiers) {
      if (! this.identifiers[field]) {
        results.push(field);
      }
    }
    return results;
  }

  /**
   * Checks that a NIEM object has unique identifiers needed for source operations.
   *
   * @example "Throws error if a type does not have a name."
   * @example "Returns if a type has a userKey, modelKey, releaseKey, prefix, and name."
   * @throws {Error}
   */
  async checkBaselineFields() {
    if (this.missingIdentifierFields.length > 0) {
      throw new Error("Required fields are missing: " + this.missingIdentifierFields);
    }
  }

  /**
   * Checks that an object ID does or does not exist in the source.
   * @param {"exists"|"available"} expectedStatus
   * @param {Object} identifiers
   */
  async checkSourceID(expectedStatus, identifiers) {

    if (! this["source"] || ! this.sourceDataSet) {
      throw new Error("No NIEM source data implementation");
    }

    // Check for an existing object with the given id
    let match = await this.sourceDataSet.get(identifiers);

    if (expectedStatus == "available" && match) {
      let json = JSON.stringify(identifiers, null, 2);
      throw new Error("Required fields are not unique: " + json);
    }

    if (expectedStatus == "exists" && ! match ) {
      throw new Error("Object not found");
    }

  }

  async hasDependencies() {
    let dependencies = await this.dependencies();
    return dependencies ? dependencies.count > 0 : false;
  }

  /**
   * @returns {Promise<Object>}
   */
  async dependencies() {
  }

  /**
   * @abstract
   * @param {boolean} [current=true] Defaults to true; false for last saved identifiers
   * @returns {Promise<object>}
   */
  async dependents(current=true) {
  }

  /**
   * @todo Review refUpdate
   * @abstract
   * @param {"edit"|"delete"} op
   * @param {Change} change
   * @returns {Promise<object>}
   */
  async updateDependents(op, change = new Change()) {
    change["refUpdate"] = this["route"];
  }

  /**
   * Save changes to the object.
   * @param {Model|Release} [modelOrRelease] Adds a release to the given model, or a release-object to the given release
   * @param {Change} [change]
   */
  async add(modelOrRelease, change) {

    if (modelOrRelease) {
      if (modelOrRelease.constructor.name == "Model" && this.constructor.name == "Release") {
        this.model = modelOrRelease;
      }
      else if (modelOrRelease.constructor.name == "Release" && this.constructor.name != "Model" && this.constructor.name != "Release") {
        this.release = modelOrRelease;
      }
    }

    // Check required fields and that object is unique
    await this.checkBaselineFields();

    // Facets might not be unique; other objects must be
    if (this.constructor.name != "Facet") {
      await this.checkSourceID("available", this.identifiers);
    }

    // Add object
    await this.sourceDataSet.add(this, change);

    // Initialize previous identifiers in case of future updated fields
    this.previousIdentifiers = Object.assign({}, this.identifiers);

    return this;
  }

  /**
   * @param {String} releaseKey
   * @param {DataSet} dataSet
   * @param {NIEMObject[]} newNIEMObjects
   * @param {Change} [change]
   */
  static async addMultiple(releaseKey, dataSet, newNIEMObjects, change) {

    /**
     * Get all current objects in the release
     * @type {NIEMObject[]}
     */
    let currentObjects = await dataSet.find({releaseKey});

    // Get the routes of all current objects in the release and new objects to be added
    let currentRoutes = new Set( currentObjects.map( object => object.route ) );
    let newRoutes = new Set( newNIEMObjects.map( object => object.route ) );

    // Compare the existing routes to the new routes to look for duplicate identifiers
    let combinedRoutes = new Set([...currentRoutes, ...newRoutes]);

    if (currentRoutes.size + newRoutes.size != combinedRoutes.size) {
      // Find which routes are duplicates
      let allRoutes = [...currentRoutes, ...newRoutes];
      let duplicateRoutes = [];
      _.values(_.groupBy(allRoutes)).forEach( d => {
        if (d.length > 1) {
          duplicateRoutes.push(d[0]);
        }
      });

      // Duplicate identifiers exist.  Do not add new objects.
      console.warn("Duplicate identifier fields found.  Cannot add new objects.", duplicateRoutes);
      return;
    }

    for (let newObject of newNIEMObjects) {
      // Add object and initialize previous identifiers in case of future updated fields
      await dataSet.add(newObject, change);
      newObject.previousIdentifiers = Object.assign({}, newObject.identifiers);
    }

    return newNIEMObjects;

  }

  /**
   * Save changes to the object.
   * @param {Change} [change]
   */
  async save(change) {

    // Check required fields and that object exists
    await this.checkBaselineFields();
    await this.checkSourceID("exists", this.previousIdentifiers);

    // Update object
    return this.sourceDataSet.edit(this, change);

  }

  /**
   * Deletes the object.
   * @param {Change} [change]
   */
  async delete(change) {

    // Check that object exists
    await this.checkSourceID("exists", this.previousIdentifiers);

    // Remove object from data source
    this.sourceDataSet.delete(this, change);

    // Update dependents
    await this.updateDependents("delete");

    return this;
  }

  async history() {
    return this.sourceDataSet.history(this);
  }

  async revisions() {
    return this.sourceDataSet.revisions(this);
  }

  /**
   * True if the given object matches the given criteria.
   * @template T
   * @param {T} niemObject
   * @param {object} criteria
   * @returns {Boolean}
   */
  static match(niemObject, criteria) {

    for (let key in criteria) {

      // Evaluate keyword separately
      if (key == "keyword") continue;

      /** @type {String} */
      let niemObjectValue = niemObject[key];

      let criteriaValue = criteria[key];

      if (!niemObjectValue && niemObjectValue != criteriaValue) return false;

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
      let keywordFields = niemObject.constructor["CriteriaKeywordFields"];

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
   * @param {object} criteria
   * @returns {Boolean}
   */
  match(criteria) {
    return this.constructor["match"](this, criteria);
  }

  /**
   * An array of NIEM objects that match the given criteria.
   * @template {NIEMObject} T
   * @param {T[]} niemObjects
   * @param {object} criteria
   * @returns {T[]}
   */
  static matches(niemObjects, criteria) {
    if (!criteria) return niemObjects;
    return niemObjects.filter( niemObject => niemObject.match(criteria) );
  }

}

NIEMObject.CriteriaKeywordFields = [];

NIEMObject.CriteriaType = undefined;

/**
 * @type {Object.<string, string|boolean|RegExp|string[]>}
 */
NIEMObject.IdentifiersType;

module.exports = NIEMObject;

let Model = require("../model/index");
let Release = require("../release/index");
