
const Component = require("../component/index");

/**
 * A NIEM Type.
 */
class Type extends Component {

  /**
   * @param {string} prefix
   * @param {string} name
   * @param {string} definition
   * @param {Type.StyleType} style
   * @param {string} [baseQName]
   */
  constructor(prefix, name, definition, style, baseQName) {

    super(prefix, name, definition);

    this.style = style;
    this.baseQName = baseQName;
    this.memberQNames = [];
  }

  /**
   * True if the type is complex and capable of carrying attributes.
   * @type {Boolean}
   */
  get isComplexType() {
    return this.style ? Type.ComplexStyles.includes(this.style) : false;
  }

  /**
   * True if the type is complex and capable of carrying elements.
   */
  get isComplexContent() {
    return this.isComplexType && this.style !== "CSC";
  }

  /**
   * True if the type is simple and carries a value only.
   * @type {Boolean}
   */
  get isSimpleType() {
    return this.style ? Type.SimpleStyles.includes(this.style) : false;
  }

  /**
   * True if the type can carry a value - a simple type or a CSC type (a complex
   * type with a value and attributes).
   */
  get isSimpleContent() {
    return this.isSimpleType || this.style == "CSC";
  }

  /**
   * Name from the type base's qname field.
   * Returns undefined if there is no qualified base.
   */
  get baseName() {
    // Check that the baseQName contains both a prefix and a name
    if (this.baseQName && this.baseQName.match(/.+\:.+/)) {
      return this.baseQName.split(":")[1];
    }
    return undefined;
  }

  /**
   * Namespace prefix from the type base's qname field.
   * Returns undefined if there is no qualified base.
   */
  get basePrefix() {
    // Check that the baseQName contains both a prefix and a name
    if (this.baseQName && this.baseQName.match(/.+\:.+/)) {
      return this.baseQName.split(":")[0];
    }
    return undefined;
  }

  get baseQNameDefault() {
    if (this.baseQName) {
      return this.baseQName;
    }

    // Return defaults if an explicit base type is not set
    if (this.style == "object" || this.style == "adapter") {
      return "structures:ObjectType";
    }
    if (this.style == "association") {
      return "structures:AssociationType";
    }
    if (this.style == "augmentation") {
      return "structures:AugmentationType";
    }
    if (this.style == "metadata") {
      return "structures:MetadataType";
    }
    if (this.style == "simple") {
      return "xs:token";
    }

    return undefined;
  }

  /**
   * The general type style - CCC, CSC, or S.
   * @returns {"CCC"|"CSC"|"S"}
   */
  get styleCategory() {

    switch (this.style) {

      case "CSC":
        return "CSC";

      case "adapter":
      case "association":
      case "metadata":
      case "object":
        return "CCC";

      case "simple":
      case "list":
      case "union":
        return "S";
    }

  }

  get sourceDataSet() {
    if (this.source) return this.source.types;
  }

  static route(userKey, modelKey, releaseKey, prefix, name) {
    let releaseRoute = super.route(userKey, modelKey, releaseKey);
    return releaseRoute + "/types/" + prefix + ":" + name;
  }

  get route() {
    return Type.route(this.userKey, this.modelKey, this.releaseKey, this.prefix, this.name);
  }

  toJSON() {
    return {
      ...super.toJSON(),
      style: this.style,
      baseQName: this.baseQName,
      memberQNames: this.memberQNames.length > 0 ? this.memberQNames : undefined
    };
  }

}

/** @type {"object"|"adapter"|"association"|"augmentation"|"metadata"|"CSC"} */
Type.ComplexStyleType;

/** @type {"simple"|"list"|"union"} */
Type.SimpleStyleType;

/** @type {Type.ComplexStyleType | Type.SimpleStyleType} */
Type.StyleType = "";

Type.ComplexStyles = ["object", "adapter", "association", "augmentation", "metadata", "CSC"];

Type.SimpleStyles = ["simple", "list", "union"];

Type.Styles = [...Type.ComplexStyles, ...Type.SimpleStyles];


/**
 * Search criteria options for type find operations.
 *
 * String fields are for exact matches.
 *
 * @typedef {Object} CriteriaType
 * @property {string} userKey
 * @property {string} modelKey
 * @property {string} releaseKey
 * @property {string} niemReleaseKey
 * @property {string|RegExp} prefix
 * @property {string|RegExp} name
 * @property {string|RegExp} definition
 * @property {string|RegExp} keyword - Name, definition, or other type keyword fields
 * @property {string|RegExp} baseQName
 * @property {Type.StyleType[]} styles
 * @property {boolean} isComplexType
 * @property {boolean} isComplexContent
 */
Type.CriteriaType = {};

module.exports = Type;
