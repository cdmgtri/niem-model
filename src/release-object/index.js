
let NIEMObject = require("../niem-object/index");
let Release = require("../release/index");

/**
 * Commonalities of NIEM release components and other items.
 * @template T
 * @extends {NIEMObject<T>}
 */
class ReleaseObject extends NIEMObject {

  constructor() {

    super();

    /** @type {Release} */
    this.release;

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

  async mapping() {
    // @ts-ignore
    return this.source.mappings.get(this.constructor.name, this.identifiers);
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
