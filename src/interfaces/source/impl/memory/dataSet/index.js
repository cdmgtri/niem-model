
let SourceDataSetInterface = require("niem-model/src/interfaces/source/dataSet/index");

/**
 * @template {NIEMObject} T
 */
class SourceDataSet extends SourceDataSetInterface {

  /**
   * @param {T} ObjectClass NIEM object class, e.g., Model, Property
   * @param {Logger} logger
   */
  constructor(ObjectClass, logger) {

    super();

    /** @private */
    this.ObjectClass = ObjectClass;

    /**
     * @private
     * @type {T[]}
      */
    this.data = [];

    /** @private */
    this.logger = logger;
  }

  /**
   * @param {T} object
   * @param {Change} change
   */
  async add(object, change) {
    let copy = this.copy(object);
    this.data.push(copy);
    this.logger.record(this.ObjectClass, "add", copy, undefined, change, 1);
    this.updatePreviousIdentifiers(object);
    return object;
  }

  /**
   * @param {T} object
   * @param {Change} change
   */
  async edit(object, change) {
    return this.modify(object, change, "edit");
  }

  /**
   * @param {T} object
   * @param {Change} change
   */
  async delete(object, change) {
    return this.modify(object, change, "delete");
  }

  async get(identifiers) {

    if (!identifiers) return;

    // Drop definition from a Facet identifier if undefined (for non-unique enum support)
    let updatedIdentifiers = Object.assign({}, identifiers);

    if (this.ObjectClass.name == "Facet" && updatedIdentifiers.definition === undefined) {
      delete updatedIdentifiers.definition;
    }

    let matches = await this.find(updatedIdentifiers);
    if (matches && matches.length > 0) {
      this.logger.record(this.ObjectClass, "get", undefined, identifiers, undefined, matches.length);
      return matches[matches.length - 1];
    }

    this.logger.record(this.ObjectClass, "get", undefined, identifiers, undefined, 0);

  }

  /**
   * @returns {Promise<T[]>}
   */
  async find(criteria) {

    /** @type {T[]} */
    let matches = this.ObjectClass.matches(this.data, criteria);
    this.logger.record(this.ObjectClass, "find", undefined, criteria, undefined, matches.length);

    let objects = matches.map( match => {
      let newObject = Object.assign(new this.ObjectClass(), match)
      this.updatePreviousIdentifiers(newObject);
      return newObject;
    });

    return objects;
  }

  /**
   * @returns {Promise<T[]>}
   */
  async count(criteria) {
    let matches = this.ObjectClass.matches(this.data, criteria);
    let count = matches.length;
    this.logger.record(this.ObjectClass, "find", undefined, criteria, undefined, count);
    return count;
  }

  /**
   * @param {NIEMObject} object
   * @returns {Promise<T[]>}
   */
  async revisions(object) {
    this.logger.record(this.ObjectClass, "revisions", object);
    return this.logger.objectUpdates(object.route, "previousRoute");
  }


  /**
   * @todo Returns objects or transactions?  Need functions for both?
   * @param {NIEMObject} object
   * @returns {Promise<T[]>}
   */
  async history(object) {
    this.logger.record(this.ObjectClass, "history", object);
    return this.logger.objectUpdates(object.route, "migrationRoute");
  }

  /**
   * Deep copies the object to avoid modification by reference
   * @private
   * @returns {T}
   */
  copy(object) {

    if (! object) return
    let copy = new this.ObjectClass();

    for (let key of Object.keys(object)) {

      // Skip null or undefined values
      if (!object[key]) continue;

      if (["_source", "niem", "model", "release"].includes(key)) {
        // Copy by reference
        copy[key] = object[key];
      }
      else {
        // Copy by value
        copy[key] = JSON.parse(JSON.stringify(object[key]));
      }
    }

    return copy;

  }

  /**
   * @param {T} object
   */
  updatePreviousIdentifiers(object) {
    object.previousIdentifiers = Object.assign({}, object.identifiers);
  }

  /**
   * @param {T} object
   * @param {Change} change
   * @param {"edit"|"delete"} op
   */
  async modify(object, change, op) {

    // Deep copy updated object for storage
    let copy = this.copy(object);

    // Find currently stored object
    let index = this.data.findIndex( row => {
      return JSON.stringify(row.identifiers) == JSON.stringify(object.previousIdentifiers);
    });

    if (!index) {
      this.logger.record(this.ObjectClass, op, copy, undefined, change, 0);
      throw new Error("Object " + copy.id + " not found");
    }

    // Check for modified identifiers for potential dependency updates
    let identifiersModified = ! (object.route == object.previousRoute);

    if (op == "edit") {
      // Replace original object with updated object
      this.data.splice(index, 1, copy);
    }
    else if (op == "delete") {
      // Remove original object
      this.data.splice(index, 1);
    }

    // Update dependents if identifiers have been modified
    if (identifiersModified) {
      await object.updateDependents("edit");
    }

    this.logger.record(this.ObjectClass, op, copy, undefined, change, 1);

    // Reset previous identifiers
    this.updatePreviousIdentifiers(object);

    return object;
  }

  /**
   * @param {NIEM} niem
   * @param {T[]} objects
   */
  async load(niem, objects) {

    for (let object of objects) {

      /** @type {T} */
      let json = JSON.parse(JSON.stringify(object));

      if (this.ObjectClass.name == "Model") {
        json = Object.assign(new this.ObjectClass(), object);
        json.source = niem.source;
      }
      else if (this.ObjectClass.name == "Release") {
        // Find the model object of the release and remove release getters
        let model = await niem.models.get(object.userKey, object.modelKey);
        delete object.userKey;
        delete object.modelKey;

        // Create release and attach the model
        json = Object.assign(new this.ObjectClass(), object);
        json.model = model;
      }
      else {
        // Find the release object and remove release getters
        let release = await niem.releases.get(object.userKey, object.modelKey, object.releaseKey);
        delete object.userKey;
        delete object.modelKey;
        delete object.releaseKey;

        // Create the object and attach the release
        json = Object.assign(new this.ObjectClass(), object);
        json.release = release;
      }

      this.data.push(json);

    }

  }

}

module.exports = SourceDataSet;

let Logger = require("../logger/index");

let NIEM = require("niem-model");
let { NIEMObject } = NIEM;