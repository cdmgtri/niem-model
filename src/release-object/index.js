
let NIEMObject = require("../niem-object/index");

/**
 * Commonalities of NIEM release components and other items.
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

  static route(userKey, modelKey, releaseKey) {
    return super.route(userKey, modelKey) + "/" + releaseKey;
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
      releaseKey: this.releaseKey,
      ...super.identifiers
    };
  }

  get source() {
    if (this.release) return this.release.source;
  }

  toJSON() {
    return {
      ...super.toJSON(),
      releaseKey: this.releaseKey
    };
  }

}

module.exports = ReleaseObject;

let Release = require("../release/index");
