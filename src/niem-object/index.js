
/**
 * Commonalities of NIEM components and other items.
 */
class NIEMObject {

  constructor() {

    /** A file name, a spreadsheet tab, etc. */
    this.source_location = "";

    /** A line number, a spreadsheet row, etc. */
    this.source_line = "";

    /** A character position in a line, a spreadsheet column, etc. */
    this.source_position = "";

  }

  /**
   * Returns the prefix of the namespace responsible for the object.
   *
   * @example For element nc:Person, returns "nc"
   * @example For type-has-property relationship type j:SubjectType-has-property nc:RoleOfPerson, returns "j"
   */
  get authoritativePrefix() {
    return "";
  }

  /**
   * A string with enough information to generally identify a component.
   * Used for documentation purposes.
   *
   * @example Property label "nc:PersonHairColorCode"
   * @example Type-Contains-Property label "nc:PersonType - nc:PersonBirthDate"
   * @example Facet label "ncic:HAIRCodeSimpleType enumeration BLK"
   */
  get label() {
    return "";
  }

  get route() {
    return "";
  }

  get id() {
    return this.route;
  }

  static buildRoute() {
    return "";
  }

  get modelKey() {
    return this.release && this.release.modelKey ? this.release.modelKey : "undefined";
  }

  get userKey() {
    return this.release && this.release.userKey ? this.release.userKey : "undefined";
  }

  get releaseKey() {
    return this.release && this.release.releaseKey ? this.release.releaseKey : "undefined";
  }

  get releaseIdentifiers() {
    return {
      userKey: this.userKey,
      modelKey: this.modelKey,
      releaseKey: this.releaseKey
    };
  }

  /**
   * @param {String} location
   * @param {String} line
   * @param {String} position
   */
  updateSource(location, line, position) {
    this.source_location = location;
    this.source_line = line;
    this.source_position = position;
  }

}

module.exports = NIEMObject;
