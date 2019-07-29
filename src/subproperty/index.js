
let NIEMObject = require("../niem-object/index");

/**
 * A usage of a property by a type.
 */
class SubProperty extends NIEMObject {

  /**
   * @param {Release} release
   * @param {String} typeQName
   * @param {String} propertyQName
   * @param {String} min
   * @param {String} max
   * @param {String} definition
   */
  constructor(release, typeQName, propertyQName, min="0", max="unbounded", definition) {
    super();

    // TODO: Check all qualified names in constructors

    if (propertyQName && propertyQName.includes(":")) {
      let propertyName = propertyQName.split(":")[1];
      if (propertyName[0] == propertyName[0].toLowerCase()) {
        // Set max to 1 for an attribute (indicated by lowerCamelCase property name)
        max = "1";
      }
    }

    this.release = release;
    this.typeQName = typeQName;
    this.propertyQName = propertyQName;
    this.min = min;
    this.max = max;
    this.definition = definition;
  }

  get authoritativePrefix() {
    return this.typePrefix;
  }

  get route() {
    return SubProperty.buildRoute(this.userKey, this.modelKey, this.releaseKey, this.typeQName, this.propertyQName);
  }

  /**
   * @example /niem/reference-model/4.1/types/nc:PersonType/properties/nc:PersonName
   */
  static buildRoute(userKey, modelKey, releaseKey, typeQName, propertyQName) {
    let Type = require("../type/index");
    return Type.buildRoute(userKey, modelKey, releaseKey, typeQName) + "/properties/" + propertyQName;
  }

  get typePrefix() {
    return this.typeQName.split(":")[0];
  }

  get propertyPrefix() {
    return this.propertyQName.split(":")[0];
  }

  /**
   * @param {"full"|"release"|"type"} [scope="full"]
   */
  serialize(scope="full") {

    let object = {};

    if (scope == "full") {
      object = this.releaseIdentifiers;
    }

    if (scope == "full" || scope == "release") {
      object.typeQName = this.typeQName;
    }

    object.propertyQName = this.propertyQName;
    object.min = this.min;
    object.max = this.max;

    if (this.definition) {
      object.definition = this.definition;
    }

    return object;
  }

}

module.exports = SubProperty;

let Release = require("../release/index");
