
const Component = require("../component/index");

/**
 * A NIEM Type.
 */
class Type extends Component {

  /**
   * @param {string} prefix
   * @param {string} name
   * @param {string} [definition]
   * @param {StyleType} [style]
   * @param {string} [baseQName]
   */
  constructor(prefix="", name="", definition="", style=undefined, baseQName="") {

    super(prefix, name, definition);

    this.style = style;
    this.baseQName = baseQName;

    /** @type {String[]} */
    this.memberQNames = [];
  }

  /**
   * Testing
   // @ts-ignore
   * @param {import("../release-object/index").NDRVersionType} ndrVersion
   * @param {string} prefix
   * @param {string} name
   * @param {string} definition
   * @param {StyleType} style
   * @param {string} [baseQName]
   */
  static create(ndrVersion, prefix, name, definition, style, baseQName) {
    return new Type(prefix, name, definition, style, baseQName);
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
   */
  get baseName() {
    return Component.getName(this.baseQName);
  }

  /**
   * Namespace prefix from the type base's qname field.
   */
  get basePrefix() {
    return Component.getPrefix(this.baseQName);
  }

  get baseLabel() {
    if (this.style == "list") return `${this.baseQName} list`;
    if (this.style == "union") return `union of ${this.memberQNames.join(", ")}`;
    if (this.style == "simple" && this.basePrefix == "xs") return `restricts ${this.baseQName}`;
    return `extends ${this.baseQName}`;
  }

  get baseQNameDefault() {

    if (this.baseQName) return this.baseQName;
    if (this.prefix == "structures" || this.prefix == "xs") return undefined;

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

  get baseQNameDefaultPrefix() {
    let qname = this.baseQNameDefault;
    if (qname) {
      return Component.getPrefix(qname);
    }
  }

  /**
   * The general type style - CCC, CSC, or S.
   * @returns {"CCC"|"CSC"|"S"}
   */
  get styleCategory() {

    if (this.style == "CSC") {
      return "CSC";
    }

    if (Type.ComplexStyles.includes(this.style)) {
      return "CCC";
    }

    if (Type.SimpleStyles.includes(this.style)) {
      return "S";
    }

  }

  get sourceDataSet() {
    return this.source.types;
  }

  async base() {
    return this.release.types.get(this.baseQName);
  }

  async members() {

    /** @type {Type[]} */
    let members = [];

    for (let qname of this.memberQNames) {
      let member = await this.release.types.get(qname);
      members.push(member);
    }

    return members;
  }

  get facets() {
    return {

      /**
       * @param {string} value
       * @param {string} definition
       * @param {Facet.StyleType} [style="enumeration"] Default "enumeration"
       */
      add: async (value, definition, style="enumeration") => {
        return this.release.facets.add(this.qname, value, definition, style);
      },

      /**
       * @param {Facet[]} facets
       */
      addMultiple: async(facets) => {
        facets.forEach( facet => facet.typeQName = this.qname );
        return this.release.facets.addMultiple(facets);
      },

      /**
       * @param {string} value
       * @param {Facet.StyleType} [style="enumeration"] Default "enumeration"
       */
      get: async (value, style="enumeration") => {
        return this.release.facets.get(this.qname, value, style);
      },

      /**
       * @param {Facet.CriteriaType} criteria
       */
      find: async (criteria={}) => {
        criteria.typeQName = this.qname;
        return this.release.facets.find(criteria);
      },

      /**
       * @param {Facet.CriteriaType} criteria
       */
      count: async (criteria={}) => {
        criteria.typeQName = this.qname;
        return this.release.facets.count(criteria);
      }

    };
  }

  get subProperties() {
    return {

      /**
       * @param {string} propertyQName
       * @param {string} [min="0"] Defaults to "0"
       * @param {string} [max="unbounded"] Defaults to "unbounded"
       * @param {string} definition
       * @param {"element"|"attribute"} style
       */
      add: async (propertyQName, min="0", max="unbounded", definition, style) => {
        return this.release.subProperties.add(this.qname, propertyQName, min, max, definition, style);
      },

      /**
       * @param {SubProperty[]} subProperties
       */
      addMultiple: async(subProperties) => {
        subProperties.forEach( subProperty => subProperty.typeQName = this.qname );
        return this.release.subProperties.addMultiple(subProperties);
      },

      /**
       * @param {string} propertyQName
       */
      get: async (propertyQName) => {
        return this.release.subProperties.get(this.qname, propertyQName);
      },

      /**
       * @param {SubProperty.CriteriaType} criteria
       */
      find: async (criteria={}) => {
        criteria.typeQName = this.qname;
        return this.release.subProperties.find(criteria);
      },

      /**
       * @param {SubProperty.CriteriaType} criteria
       */
      count: async (criteria={}) => {
        criteria.typeQName = this.qname;
        return this.release.subProperties.count(criteria);
      }

    };
  }

  get dataProperties() {
    return {

      /**
       * @param {Property.CriteriaType} criteria
       */
      find: async (criteria={}) => {
        criteria.typeQName = this.qname;
        return this.release.properties.find(criteria);
      },

      /**
       * @param {Property.CriteriaType} criteria
       */
      count: async (criteria={}) => {
        criteria.typeQName = this.qname;
        return this.release.properties.count(criteria);
      }

    };
  }

  /**
   * @param {CriteriaType} criteria
   */
  async childTypes (criteria) {
    criteria.baseQName = this.qname;
    return this.release.types.find(criteria);
  }

  /**
   * @param {CriteriaType} criteria
   */
  async childDescendantTypes(criteria) {
    criteria.baseQName = this.qname;

    let childTypes = await this.release.types.find(criteria);

    /** @type {Type[]} */
    let descendantTypes = [];

    for (let childType of childTypes) {
      criteria.baseQName = childType.qname;
      let newDescendantTypes = await this.childDescendantTypes(criteria);
      descendantTypes.push(childType, ...newDescendantTypes);
    }

    return descendantTypes;
  }

  async parents() {
    return getParents(this);
  }

  async dependencies() {
    let base = await this.base();
    let count = base ? 2 : 1;
    return { base, count };
  }

  /**
   * @param {boolean} [current=true] Defaults to true; false for last saved identifiers
   */
  async dependents(current=true) {

    let qname = current ? this.qname : this.previousIdentifiers.prefix + ":" + this.previousIdentifiers.name;

    let childTypes = await this.release.types.find({ baseQName: qname });
    let dataProperties = await this.release.properties.find({ typeQName: qname });
    let subProperties = await this.release.subProperties.find({ typeQName: qname });
    let facets = await this.release.facets.find({ typeQName: qname });

    let count = childTypes.length + subProperties.length + dataProperties.length + facets.length;

    return { childTypes, subProperties, dataProperties, facets, count };
  }

  /**
   * @param {"edit"|"delete"} op
   * @param {Change} change
   */
  async updateDependents(op, change) {

    await super.updateDependents(op, change);

    let newQName = op == "edit" ? this.qname : null;

    let dependents = await this.dependents(false);

    // Update child types
    for (let childType of dependents.childTypes) {
      childType.baseQName = newQName;
      await childType.save(change);
    }

    // Update data properties
    for (let dataProperty of dependents.dataProperties) {
      dataProperty.typeQName = newQName;
      await dataProperty.save(change);
    }

    // Update or delete subproperties (these don't exist without the type)
    for (let subProperty of dependents.subProperties) {
      if (op == "edit") {
        subProperty.propertyQName = newQName;
        await subProperty.save(change);
      }
      else if (op == "delete") {
        await subProperty.delete(change);
      }
    }

    // Update or delete facets (these don't exist without the type)
    for (let facet of dependents.facets) {
      if (op == "edit") {
        facet.typeQName = newQName;
        await facet.save(change);
      }
      else if (op == "delete") {
        await facet.delete(change);
      }
    }

  }

  get contents() {

    let self = this;

    return {

      async facets() {

        /** @type {Facet[]} */
        let facets = [];

        if (self.style == "union") {
          // Return concatenation of all member type facets
          let members = await self.members();
          for (let member of members) {
            let memberFacets = await member.facets.find();
            facets.push(...memberFacets);
          }
        }
        else if (self.isSimpleType) {
          // Find facets on this type
          facets = await self.facets.find();
        }
        else if (self.isSimpleContent && self.name.endsWith("CodeType")) {
          // Return facets on this CSC type's simple base type
          let base = await self.base();
          facets = await base.facets.find();
        }

        return facets.sort(Facet.sortFacetsByStyleAdjustedValueDefinition);
      },

      async containedProperties() {

        let subProperties = await self.subProperties.find();

        /** @type {Property[]} */
        let properties = [];

        for (let subProperty of subProperties) {
          let property = await subProperty.property();
          properties.push(property);
        }

        // Return sub-properties
        return properties;

      },

      async inheritedProperties() {

        let parents = await self.parents();

        /** @type {Object.<string, Property[]>} */
        let obj = {};

        for (let parent of parents) {
          let subProperties = await parent.subProperties.find();
          let properties = [];

          for (let subProperty of subProperties) {
            let property = await subProperty.property();
            properties.push(property);
          }
          obj[parent.qname] = properties;
        }

        return obj;

      }

    }
  }

  async contents1() {



  }

  static route(userKey, modelKey, releaseKey, qname) {
    let releaseRoute = super.route(userKey, modelKey, releaseKey);
    return releaseRoute + "/types/" + qname;
  }

  get route() {
    return Type.route(this.userKey, this.modelKey, this.releaseKey, this.qname);
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

/**
 * @param {Type} type
 * @param {Type[]} [parents]
 * @returns {Promise<Type[]>}
 */
async function getParents(type, parents=[]) {

  let parent = await type.base();

  if (parent) {
    // Add new parent to the beginning of the array and look for the next parent
    parents.unshift(parent);
    return getParents(parent, parents);
  }

  // No more parents, return the array
  return parents;

}

/** @typedef {"object"|"adapter"|"association"|"augmentation"|"metadata"|"CSC"} ComplexStyleType*/

/** @typedef {"simple"|"list"|"union"} SimpleStyleType*/

/** @typedef {ComplexStyleType|SimpleStyleType} StyleType */
let TypeStyleType;

Type.ComplexStyles = ["object", "adapter", "association", "augmentation", "metadata", "CSC"];

Type.SimpleStyles = ["simple", "list", "union"];

Type.Styles = [...Type.ComplexStyles, ...Type.SimpleStyles];


/**
 * Search criteria options for type find operations.
 *
 * String fields are for exact matches.
 *
 * @typedef {Object} CriteriaType
 * @property {string} [userKey]
 * @property {string} [modelKey]
 * @property {string} [releaseKey]
 * @property {string} [niemReleaseKey]
 * @property {string|string[]} [prefix]
 * @property {string|RegExp} [name]
 * @property {string|RegExp} [definition]
 * @property {string|RegExp} [keyword] - Name, definition, or other type keyword fields
 * @property {string|RegExp} [baseQName]
 * @property {string|RegExp} [baseName]
 * @property {string|RegExp} [basePrefix]
 * @property {Type.StyleType[]} [style]
 * @property {boolean} [isComplexType]
 * @property {boolean} [isComplexContent]
 */
let TypeCriteriaType;

Type.CriteriaKeywordFields = ["name", "definition"];

/**
 * @typedef {Object} IdentifiersType
 * @property {string} userKey
 * @property {string} modelKey
 * @property {string} releaseKey
 * @property {string} prefix
 * @property {string} name
 */
Type.IdentifiersType;

module.exports = Type;

let Facet = require("../facet/index");
let Property = require("../property/index");
let SubProperty = require("../subproperty/index");
let Change = require("../interfaces/source/change/index");
