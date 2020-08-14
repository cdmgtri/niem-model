
let DataSetInterface = require("./interface");

// @ts-ignore
let _ = require("lodash");

/**
 * @template {NIEMObject<T>} T
 * @template {Object<string, string>} IdentifiersType
 * @template {Object<string, any>} CriteriaType
 */
class DataSet extends DataSetInterface {

  /**
   * @param {typeof NIEMObject} ObjectClass NIEM object class, e.g., Model, Property
   * @param {Logger} logger
   */
  constructor(ObjectClass, logger) {

    super();

    /** @private */
    this.ObjectClass = ObjectClass;

    /**
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

  /**
   * @param {String} id
   */
  async id(id) {
    return this.data.find( item => item.id == id );
  }

  /**
   * @param {IdentifiersType} identifiers
   */
  async get(identifiers) {

    if (!identifiers) return;

    // Drop definition from a Facet identifier if undefined (for non-unique enum support)
    /** @type {CriteriaType} */
    // @ts-ignore
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
   * @param {CriteriaType} [criteria]
   * @param {Function} [sortFunction]
   * @returns {Promise<T[]>}
   */
  async find(criteria, sortFunction) {

    /** @type {T[]} */
    // @ts-ignore
    let matches = this.ObjectClass.matches(this.data, criteria);
    this.logger.record(this.ObjectClass, "find", undefined, criteria, undefined, matches.length);

    let objects = matches.map( match => {
      let newObject = Object.assign(new this.ObjectClass(), match);
      this.updatePreviousIdentifiers(newObject);
      return newObject;
    });

    // @ts-ignore
    if (sortFunction) objects = objects.sort(sortFunction);

    return objects;
  }

  /**
   * @param {CriteriaType} criteria
   * @returns {Promise<number>}
   */
  async count(criteria) {
    let matches = this.ObjectClass.matches(this.data, criteria);
    let count = matches.length;
    this.logger.record(this.ObjectClass, "find", undefined, criteria, undefined, count);
    return count;
  }

  /**
   * @param {NIEMObject} object
   * @returns {Promise<Transaction[]>}
   */
  async revisions(object) {
    this.logger.record(this.ObjectClass, "revisions", object);
    return this.logger.objectUpdates(object.route, "previousRoute");
  }


  /**
   * @todo Returns objects or transactions?  Need functions for both?
   * @param {NIEMObject} object
   * @returns {Promise<Transaction<T>[]>}
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

    if (! object) return;

    let copyByRef = ["_source", "niem", "model", "release"];

    // Deep clone all object properties except in the exclude list above, to be handled below
    let copy = _.cloneDeep(_.omit(object, copyByRef));
    copy = Object.assign(new this.ObjectClass(), copy);

    if (object.constructor.name == "Model") {
      // @ts-ignore
      copy.niem = object.niem;

      // @ts-ignore
      copy._source = object._source;
    }
    else if (object.constructor.name == "Release") {
      // @ts-ignore
      copy.model = object.model;
    }
    else {
      // @ts-ignore
      copy.release = object.release;
    }

    // @ts-ignore
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

    if (index == -1) {
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
   * @param {T[]} dataSetJSON
   */
  async load(niem, dataSetJSON) {

    if (!dataSetJSON || dataSetJSON.length == 0) return;

    // Deep copy to avoid linking to or modifying input values
    let jsonObjects = JSON.parse(JSON.stringify(dataSetJSON));

    let className = this.ObjectClass.name;

    if (className == "Model") {
      for (let json of jsonObjects) {
        try {
          let model = await niem.models.add(json["userKey"], json["modelKey"]);
          model = Object.assign(model, json);
          await model.save();
        }
        catch (err) {
          // Do nothing - allow releases to be split over multiple files, each with model info
        }
      }
    }
    else if (className == "Release") {
      for (let json of jsonObjects) {
        // Find the model object of the release
        let model = await niem.models.get(json["userKey"], json["modelKey"]);

        try {
          let release = await model.releases.add(json["releaseKey"]);

          // Remove release getters
          delete json["userKey"];
          delete json["modelKey"];
          delete json["releaseKey"];

          release = Object.assign(release, json);
          await release.save();
        }
        catch (err) {
          // Do nothing - allow release metadata to be overwritten with the actual release
        }
      }
    }
    else {
      let releases = await niem.releases.find();

      for (let release of releases) {
        let jsonReleaseObjects = jsonObjects.filter( json => json["userKey"] == release.userKey
          && json["modelKey"] == release.modelKey && json["releaseKey"] == release.releaseKey);

        for (let json of jsonReleaseObjects) {
          delete json["userKey"];
          delete json["modelKey"];
          delete json["releaseKey"];

          let object = Object.assign(new this.ObjectClass(), json, {release});
          this.data.push(object);
        }
      }
    }

  }

}

module.exports = DataSet;

let Logger = require("../logger/index");
let Change = require("../change/index");
let Transaction = require("../transaction/index");

let NIEM = require("../../../niem/index");
let NIEMObject = require("../../../niem-object/index");
