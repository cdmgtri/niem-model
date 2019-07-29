
let NIEMObject = require("../niem-object/index");

/**
 * A NIEM Facet
 */
class Facet extends NIEMObject {

  /**
   * @param {Release} release
   * @param {String} typeQName
   * @param {string} value
   * @param {string} definition
   * @param {KindShape} [kind="enumeration"]
   */
  constructor(release, typeQName, value, definition, kind="enumeration") {
    super();

    this.release = release;
    this.typeQName = typeQName;
    this.value = value;
    this.definition = definition;
    this.kind = kind;
  }

  get route() {
    return Facet.buildRoute(this.userKey, this.modelKey, this.releaseKey, this.typeQName, this.kind, this.value);
  }

  get label() {
    return this.typeQName + " - " + this.kind + "=" + this.value;
  }

  static buildRoute(userKey, modelKey, releaseKey, typeQName, kind, value) {
    let Type = require("../type/index");
    return Type.buildRoute(userKey, modelKey, releaseKey, typeQName) + `/facets/${kind}/${value}`;
  }

  get typePrefix() {
    return this.typeQName.split(":")[0];
  }

  get typeName() {
    return this.typeQName.includes(":") ? this.typeQName.split(":")[1] : "";
  }

  get authoritativePrefix() {
    return this.typePrefix;
  }

  /**
   * @param {"full"|"release"|"type"|"kind"} [scope="full"]
   */
  serialize(scope) {

    let object = {};

    if (scope == "full") {
      object = this.releaseIdentifiers;
    }

    if (scope == "full" || scope == "release") {
      object.typeQName = this.typeQName;
    }

    if (scope != "kind") {
      object.kind = this.kind;
    }

    object.value = this.value;
    object.definition = this.definition;

    return object;
  }

  /**
   * Custom JSON serialization
   */
  toJSON() {
    let json = this.type ? this.type.toJSON() : {};

    return {
      kind: this.kind,
      value: this.value,
      definition: this.definition,
      ...json
    };
  }

}

/** @type{"enumeration"|"length"|"minLength"|"maxLength"|"pattern"|"whiteSpace"|"maxInclusive"|"minInclusive"|"maxExclusive"|"minExclusive"|"totalDigits"|"fractionDigits"} */
let KindShape;

Facet.KindShape = KindShape;

Facet.KindValues = ["enumeration", "length", "minLength", "maxLength", "pattern",
  "whiteSpace", "maxInclusive", "minInclusive", "maxExclusive", "minExclusive",
  "totalDigits", "fractionDigits"];

module.exports = Facet;

let Release = require("../release/index");
