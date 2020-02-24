
let NIEMObject = require("../niem-object/index");
let Release = require("../release/index");

/**
 * Commonalities of NIEM release components and other items.
 * @template T
 * @extends {NIEMObject<ReleaseObject>}
 */
class ReleaseObject extends NIEMObject {

  constructor() {

    super();

    this.release = new Release("default", "default", "4.0");

  }

  /**
   * Returns the prefix of the namespace responsible for the object.
   *
   * @example For element nc:Person, returns "nc"
   * @example For sub-property relationship j:SubjectType-has-nc:RoleOfPerson, returns "j"
   */
  get authoritativePrefix() {
    return "";
  }

  get modelKey() {
    if (this.release) return this.release.modelKey;
  }

  get userKey() {
    if (this.release) return this.release.userKey;
  }

  get releaseKey() {
    if (this.release) return this.release.releaseKey;
  }

  get niemReleaseKey() {
    if (this.release) return this.release.niemReleaseKey;
  }

  get ndrVersion() {
    if (this.release) return this.release.ndrVersion;
  }

  get niem() {
    if (this.release && this.release.model) return this.release.model.niem;
  }

  get formats() {
    return this.release.formats;
  }

  /**
   * @returns {Promise<string>}
   */
  async xsd() {
    return this.formats.xsd[this.constructor.name].generate(this);
  }

  get parse() {
    return {
      /**
       * @param {string} input
       * @returns {Promise<T>}
       */
      xsd: async (input) => this.formats.xsd[this.constructor.name].parse(input),

      json: async (input) => this.formats.json[this.constructor.name].parse(input)
    };
  }

  get load() {
    return {
      xsd: async (input) => this.formats.xsd[this.constructor.name].parse(input, this.release),

      json: async (input) => this.formats.json[this.constructor.name].parse(input, this.release)
    };
  }

  /**
   * Save changes to the object.
   * @param {Release} [release]
   * @param {Change} [change]
   */
  async add(release, change) {
    return super.add(release, change);
  }

  static route(userKey, modelKey, releaseKey, ...args) {
    return Release.route(userKey, modelKey, releaseKey);
  }

  /**
   * @example "/niem/model/4.0"
   * @example "/lapd/arrestReport/1.0"
   */
  get route() {
    return ReleaseObject.route(this.userKey, this.modelKey, this.releaseKey);
  }

  get identifiers() {
    return {
      ...this.release.identifiers
    };
  }

  get source() {
    if (this.release) return this.release.source;
  }

  get releaseRoute() {
    return this.release.route;
  }

  toJSON() {
    return {
      ...super.toJSON(),
      releaseKey: this.releaseKey
    };
  }

}

/** @typedef {"3.0"|"4.0"|string} NDRVersionType */
let NDRVersion;

module.exports = ReleaseObject;

let NIEMObjectFormatInterface = require("../interfaces/format/niem-object/index");
let Change = require("../interfaces/source/change/index");
