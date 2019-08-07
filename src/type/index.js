
const Component = require("../component/index");

/**
 * A NIEM Type.
 * @extends {Component}
 */
class Type extends Component {

  /**
   * @param {Release} release
   * @param {string} prefix
   * @param {string} name
   * @param {string} definition
   * @param {Type.PatternType} pattern
   * @param {string} [baseQName]
   * @param {string[]} [memberQNames=[]]
   */
  constructor(release, prefix, name, definition, pattern, baseQName, memberQNames=[]) {

    super(release, prefix, name, definition);

    this.pattern = pattern;
    this.baseQName = baseQName;
    this.memberQNames = memberQNames;
  }

  static buildRoute(userKey, modelKey, releaseKey, typeQName) {
    return Component.buildRoute(userKey, modelKey, releaseKey, "Type", typeQName);
  }

  /**
   * True if the type is complex and capable of carrying attributes.
   * @type {Boolean}
   */
  get isComplexType() {
    return this.pattern ? Type.ComplexPatterns.hasOwnProperty(this.pattern) : false;
  }

  /**
   * True if the type is complex and capable of carrying elements.
   */
  get isComplexContent() {
    return this.isComplexType && this.pattern !== "CSC";
  }

  /**
   * True if the type is simple and carries a value only.
   * @type {Boolean}
   */
  get isSimpleType() {
    return this.pattern ? Type.SimplePatterns.hasOwnProperty(this.pattern) : false;
  }

  /**
   * True if the type can carry a value - a simple type or a CSC type (a complex
   * type with a value and attributes).
   */
  get isSimpleContent() {
    return this.isSimpleType || this.pattern == "CSC";
  }

  get baseQNameSuggestion() {
    if (this.baseQName) {
      return this.baseQName;
    }

    // Return defaults if an explicit base type is not set
    if (this.pattern == "object" || this.pattern == "adapter") {
      return "structures:ObjectType";
    }
    if (this.pattern == "association") {
      return "structures:AssociationType";
    }
    if (this.pattern == "augmentation") {
      return "structures:AugmentationType";
    }
    if (this.pattern == "metadata") {
      return "structures:MetadataType";
    }
    if (this.pattern == "simple") {
      return "xs:token";
    }

    return undefined;
  }

  /**
   * The general type style - CCC, CSC, or S.
   * @returns {"CCC"|"CSC"|"S"}
   */
  get style() {
    if (! this.isComplexType) {
      return "S";
    }
    else if (this.isComplexContent) {
      return "CCC";
    }
    else {
      return "CSC";
    }
  }

  /**
   * @param {"full"|"release"|"namespace"} [scope="full"]
   */
  serialize(scope="full") {

    let object = super.serialize(scope);

    object.pattern = this.pattern;

    if (this.baseQName) {
      object.baseQName = this.baseQName;
    }

    if (this.memberQNames.length > 0) {
      object.memberQNames = this.memberQName;
    }

    return object;
  }

}

/** @type {"object"|"adapter"|"association"|"augmentation"|"metadata"|"CSC"} */
Type.ComplexPatternType;

/** @type {"simple"|"list"|"union"} */
Type.SimplePatternType;

/** @type {Type.ComplexPatternType | Type.SimplePatternType} */
Type.PatternType = "";

Type.ComplexPatterns = {
  "object": "object",
  "adapter": "adapter",
  "association": "association",
  "augmentation": "augmentation",
  "metadata": "metadata",
  "CSC": "CSC"
};

Type.SimplePatterns = {
  "simple": "simple",
  "list": "list",
  "union": "union"
};

Type.Patterns = {
  ...Type.ComplexPatterns,
  ...Type.SimplePatterns
}

module.exports = Type;

const Release = require("../release/index");
