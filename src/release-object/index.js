
let NIEMObject = require("../niem-object/index");
let Release = require("../release/index");

/**
 * Commonalities of NIEM release components and other items.
 */
class ReleaseObject extends NIEMObject {

  constructor() {

    super();

    this.release = new Release();

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

  static route(userKey, modelKey, releaseKey) {
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

/** @type {"3.0"|"4.0"} */
ReleaseObject.NDRVersionType;

module.exports = ReleaseObject;
