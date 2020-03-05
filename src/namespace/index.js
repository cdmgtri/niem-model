
let ReleaseObject = require("../release-object/index");

/**
 * A NIEM Namespace
 */
class Namespace extends ReleaseObject {

  /**
   * @param {String} prefix
   * @param {StyleType} [style]
   * @param {String} [uri]
   * @param {String} [fileName]
   * @param {String} [definition]
   * @param {String} [version]
   */
  constructor(prefix, style, uri="", fileName="", definition="", version="") {

    super();

    this.prefix = prefix;
    this.style = style;
    this.uri = uri;
    this.fileName = fileName;
    this.definition = definition;
    this.version = version;

    this.conformanceTargets = [];

    /** @type {String} */
    this.relativePath;

    /** @type {String} */
    this.xsdString;
  }

  /**
   * @param {ReleaseObject.NDRVersionType} ndrVersion
   * @param {String} prefix
   * @param {StyleType} [style]
   * @param {String} [uri]
   * @param {String} [fileName]
   * @param {String} [definition]
   * @param {String} [version]
   */
  static create(ndrVersion, prefix, style, uri, fileName, definition, version) {

    let versionedNamespace = Namespace;

    if (ndrVersion == "3.0") {
      versionedNamespace = require("./3.0/index");
    }
    else if (ndrVersion == "4.0") {
      versionedNamespace = require("./4.0/index");
    }

    return new versionedNamespace(prefix, style, uri, fileName, definition, version);
  }

  get styleRank() {
    switch (this.style) {
      case "core":
        return 1;
      case "domain":
        return 5;
      case "code":
      case "csv":
        return 10;
      case "extension":
        return 15;
      case "CS":
        return 20;
      case "adapter":
        return 25;
      case "proxy":
        return 30;
      case "utility":
        return 35;
      case "built-in":
        return 40;
      case "external":
        return 45;
    }
    return 99;
  }

  get conformanceRequired() {
    /** @type {StyleType[]} */
    let nonconformantStyles = ["built-in", "csv", "external", "utility"];
    return ! nonconformantStyles.includes(this.style);
  }

  /**
   * @type {"3.0"|"4.0"|string}
   */
  get ndrVersion() {
    return undefined;
  }

  get load() {
    return {
      xsd: async (xsdString) => this.formats.xsd.namespace.load(xsdString, this.release),

      json: async (jsonString) => this.formats.json.namespace.load(jsonString, this.release)
    };
  }

  get sourceDataSet() {
    return this.source.namespaces;
  }

  get localTerms() {
    return {

      /**
       * @param {string} term
       * @param {string} [literal]
       * @param {string} [definition]
       */
      add: async (term, literal, definition) => {
        return this.release.localTerms.add(this.prefix, term, literal, definition);
      },

      /**
       * @param {LocalTerm[]} localTerms
       */
      addMultiple: async(localTerms) => {
        localTerms.forEach( localTerm => localTerm.prefix = this.prefix );
        return this.release.localTerms.addMultiple(localTerms);
      },

      /**
       * @param {string} term
       */
      get: async (term) => {
        return this.release.localTerms.get(this.prefix, term);
      },

      /**
       * @param {LocalTerm.CriteriaType} criteria
       */
      find: async (criteria={}) => {
        criteria.prefix = this.prefix;
        return this.release.localTerms.find(criteria);
      },

      /**
       * @param {LocalTerm.CriteriaType} criteria
       */
      count: async (criteria={}) => {
        criteria.prefix = this.prefix;
        return this.release.localTerms.count(criteria);
      }

    };
  }

  get properties() {
    return {

      /**
       * @param {string} name
       * @param {string} definition
       * @param {string} [typeQName]
       * @param {string} [groupQName]
       * @param {boolean} [isElement=true] Defaults to true
       * @param {boolean} [isAbstract=false] Defaults to false
       */
      add: async (name, definition, typeQName, groupQName, isElement=true, isAbstract=false) => {
        return this.release.properties.add(this.prefix, name, definition, typeQName, groupQName, isElement, isAbstract);
      },

      /**
       * @param {Property[]} properties
       */
      addMultiple: async(properties) => {
        properties.forEach( property => property.prefix = this.prefix );
        return this.release.properties.addMultiple(properties);
      },

      /**
       * @param {string} name
       */
      get: async (name) => {
        return this.release.properties.get(this.prefix + ":" + name);
      },

      /**
       * @param {Property.CriteriaType} criteria
       */
      find: async (criteria={}) => {
        criteria.prefix = this.prefix;
        return this.release.properties.find(criteria);
      },

      /**
       * @param {Property.CriteriaType} criteria
       */
      count: async (criteria={}) => {
        criteria.prefix = this.prefix;
        return this.release.properties.count(criteria);
      }

    };
  }

  get types() {
    return {

      /**
       * @param {string} name
       * @param {string} definition
       * @param {Type.StyleType} style
       * @param {string} [baseQName]
       */
      add: async (name, definition, style, baseQName) => {
        return this.release.types.add(this.prefix, name, definition, style, baseQName);
      },

      /**
       * @param {Type[]} types
       */
      addMultiple: async(types) => {
        types.forEach( type => type.prefix = this.prefix );
        return this.release.types.addMultiple(types);
      },

      /**
       * @param {string} name
       */
      get: async (name) => {
        return this.release.types.get(this.prefix + ":" + name);
      },

      /**
       * @param {Type.CriteriaType} criteria
       */
      find: async (criteria={}) => {
        criteria.prefix = this.prefix;
        return this.release.types.find(criteria);
      },

      /**
       * @param {Type.CriteriaType} criteria
       */
      count: async (criteria={}) => {
        criteria.prefix = this.prefix;
        return this.release.types.count(criteria);
      }

    };
  }

  get facets() {
    return {

      /**
       * @param {string} typeName
       * @param {string} value
       * @param {string} definition
       * @param {Facet.StyleType} [style="enumeration"] Default "enumeration"
       */
      add: async (typeName, value, definition, style="enumeration") => {
        return this.release.facets.add(this.prefix + typeName, value, definition, style);
      },

      /**
       * Does not set namespace information
       * @param {Facet[]} facets
       */
      addMultiple: async(facets) => {
        return this.release.facets.addMultiple(facets);
      },

      /**
       * @param {string} name
       * @param {string} value
       * @param {Facet.StyleType} [style="enumeration"] Default "enumeration"
       */
      get: async (name, value, style="enumeration") => {
        return this.release.facets.get(this.prefix + ":" + name, value, style);
      },

      /**
       * @param {Facet.CriteriaType} criteria
       */
      find: async (criteria={}) => {
        criteria.typePrefix = this.prefix;
        return this.release.facets.find(criteria);
      },

      /**
       * @param {Facet.CriteriaType} criteria
       */
      count: async (criteria={}) => {
        criteria.typePrefix = this.prefix;
        return this.release.facets.count(criteria);
      }

    };
  }

  get subProperties() {
    return {

      /**
       * @param {string} typeName
       * @param {string} propertyQName
       * @param {string} min
       * @param {string} max
       * @param {string} definition
       */
      add: async (typeName, propertyQName, min, max, definition) => {
        return this.release.subProperties.add(this.prefix + typeName, propertyQName, min, max, definition);
      },

      /**
       * Does not set namespace information
       * @param {SubProperty[]} subProperties
       */
      addMultiple: async(subProperties) => {
        return this.release.subProperties.addMultiple(subProperties);
      },

      /**
       * @param {string} typeName
       * @param {string} propertyQName
       */
      get: async (typeName, propertyQName) => {
        return this.release.subProperties.get(this.prefix + typeName, propertyQName);
      },

      /**
       * @param {SubProperty.CriteriaType} criteria
       */
      find: async (criteria={}) => {
        criteria.typePrefix = this.prefix;
        return this.release.subProperties.find(criteria);
      },

      /**
       * @param {SubProperty.CriteriaType} criteria
       */
      count: async (criteria={}) => {
        criteria.typePrefix = this.prefix;
        return this.release.subProperties.count(criteria);
      }

    };
  }

  /**
   * @example `For Core, dependents j:PersonEyeColorCode (substitutes for
     nc:PersonEyeColorAbstract) and hs:ServiceType (extends nc:ActivityType)`
   */
  async dependencies() {

    // Substitutions
    let substitutions = await this.release.properties.find({ groupPrefix: this.prefix });

    // Data properties
    let dataProperties = await this.release.properties.find({ typePrefix: this.prefix });

    // Child types
    let childTypes = await this.release.types.find({ basePrefix: this.prefix });

    // Sub-properties
    let subProperties = await this.release.subProperties.find({ propertyName: this.prefix });

    let count = substitutions.length + dataProperties.length + childTypes.length + subProperties.length;

    return { substitutions, dataProperties, childTypes, subProperties, count };

  }

  /**
   * @example "For Core, dependents nc:Person and nc:PersonType"
   */
  async dependents() {

    let localTerms = await this.localTerms.find();
    let properties = await this.properties.find();
    let types = await this.types.find();

    return {
      count: localTerms.length + properties.length + types.length,
      localTerms,
      properties,
      types
    };
  }


  /**
   * Update namespace dependents.  Operations will cascade through the
   * namespace properties and types.
   *
   * @param {"edit"|"delete"} op
   * @param {Change} change
   */
  async updateDependents(op, change) {

    await super.updateDependents(op, change);

    let dependents = await this.dependents();

    // Update or delete local terms
    for (let localTerm of dependents.localTerms) {
      if (op == "edit") {
        localTerm.prefix = this.prefix;
        await localTerm.save(change);
      }
      else {
        await localTerm.delete(change);
      }
    }

    // Update or delete properties
    for (let property of dependents.properties) {
      if (op == "edit") {
        property.prefix = this.prefix;
        await property.save(change);
      }
      else if (op == "delete") {
        await property.delete(change);
      }
    }

    // Update or delete types
    for (let type of dependents.types) {
      if (op == "edit") {
        type.prefix = this.prefix;
        await type.save(change);
      }
      else if (op == "delete") {
        await type.delete(change);
      }
    }

  }

  get authoritativePrefix() {
    return this.prefix;
  }

  get label() {
    return this.prefix;
  }

  static route(userKey, modelKey, releaseKey, prefix) {
    return super.route(userKey, modelKey, releaseKey) + "/namespaces/" + prefix;
  }

  /**
   * @example "/niem/model/4.0/namespaces/nc"
   * @example "/lapd/arrestReport/1.0/namespaces/nc"
   * @example "/lapd/arrestReport/1.0/namespaces/ext"
   */
  get route() {
    return Namespace.route(this.userKey, this.modelKey, this.releaseKey, this.prefix);
  }

  get identifiers() {
    return {
      ...super.identifiers,
      prefix: this.prefix
    };
  }

  /**
   * @param {string} userKey
   * @param {string} modelKey
   * @param {string} releaseKey
   * @param {string} prefix
   */
  static identifiers(userKey, modelKey, releaseKey, prefix) {
    return {userKey, modelKey, releaseKey, prefix};
  }

  /**
   * Custom sort function to order an array of namespaces by prefix.
   *
   * @static
   * @param {Namespace} ns1
   * @param {Namespace} ns2
   */
  static sortByPrefix(ns1, ns2) {
    return ns1.prefix ? ns1.prefix.localeCompare(ns2.prefix) : -1;
  }

  /**
   * Custom sort function to order an array of namespaces by ranked style
   * and then by prefix.
   *
   * @static
   * @param {Namespace} ns1
   * @param {Namespace} ns2
   */
  static sortByStyle(ns1, ns2) {

    // Sort by prefix if styles match
    if (ns1.style == ns2.style) {
      return ns1.prefix ? ns1.prefix.localeCompare(ns2.prefix) : -1;
    }

    // Sort by style rank
    return ns1.styleRank - ns2.styleRank;
  }

  /**
   * Custom sort function to order an array of namespaces by target namespace URI.
   *
   * @static
   * @param {Namespace} ns1
   * @param {Namespace} ns2
   */
  static sortByURI(ns1, ns2) {
    return ns1.uri ? ns1.uri.localeCompare(ns2.uri) : -1;
  }

  toJSON() {
    return {
      ...super.toJSON(),
      prefix: this.prefix,
      uri: this.uri,
      fileName: this.fileName,
      definition: this.definition,
      version: this.version,
      style: this.style,
      conformanceTargets: this.conformanceTargets.length > 0 ? this.conformanceTargets : undefined,
      relativePath: this.relativePath,
      xsdString: this.xsdString
    };
  }

}

/**
 * Search criteria options for namespace find operations.
 *
 * @typedef {Object} CriteriaType
 * @property {string} [userKey]
 * @property {string} [modelKey]
 * @property {string} [releaseKey]
 * @property {string} [niemReleaseKey]
 * @property {string|RegExp} [prefix]
 * @property {StyleType[]} [style]
 * @property {boolean} [conformanceRequired]
 */
let NamespaceCriteriaType;

/**
 * @typedef {Object} IdentifiersType
 * @property {string} userKey
 * @property {string} modelKey
 * @property {string} releaseKey
 * @property {string|RegExp} prefix
 */
let NamespaceIdentifiersType;

/** @typedef {"core"|"domain"|"code"|"extension"|"adapter"|"external"|"proxy"|"utility"|"csv"|"built-in"|"CS"} StyleType */
let NamespaceStyleType;

Namespace.Styles = ["core", "domain", "code", "extension", "adapter", "external", "proxy", "utility", "csv", "built-in", "CS"];

module.exports = Namespace;

let Property = require("../property/index");
let Type = require("../type/index");
let Facet = require("../facet/index");
let SubProperty = require("../subproperty/index");
let LocalTerm = require("../local-term/index");
let Change = require("../interfaces/source/change/index");
