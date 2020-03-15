
let NIEMObject = require("../niem-object/index");

/**
 * A coherent set of namespaces bundled together for a release, IEPD, EIEM, etc.
 */
class Release extends NIEMObject {

  /**
   * @param {string} releaseKey
   * @param {string} niemReleaseKey
   * @param {ReleaseObject.NDRVersionType} [ndrVersion="4.0"] Defaults to "4.0"
   * @param {string} [version]
   * @param {StatusType} [status]
   * @param {string} [baseURI]
   * @param {string} [branch]
   * @param {string} [description]
   */
  constructor(releaseKey="default", niemReleaseKey="", ndrVersion="4.0", version="", status, baseURI="", branch="", description="") {

    super();

    /** @type {Model} */
    this.model;

    this.releaseKey = releaseKey;
    this.niemReleaseKey = niemReleaseKey;
    this.ndrVersion = ndrVersion;
    this.version = version;
    this.status = status;
    this.baseURI = baseURI;
    this.branch = branch;
    this.description = description;

  }

  get niem() {
    return this.model.niem;
  }

  get source() {
    return this.model.source;
  }

  /**
   * @param {string} releaseKey
   * @param {string} [niemReleaseKey]
   * @param {"3.0"|"4.0"} [ndrVersion="4.0"] Defaults to "4.0"
   * @param {string} [version]
   * @param {"draft"|"published"} [status]
   * @param {string} [baseURI]
   * @param {string} [branch]
   * @param {string} [description]
   */
  static create(releaseKey, niemReleaseKey, ndrVersion="4.0", version, status, baseURI, branch, description) {
    return new Release(releaseKey, niemReleaseKey, ndrVersion, version, status, baseURI, branch, description);
  }

  get sourceDataSet() {
    return this.source.releases;
  }

  get namespaces() {
    return {

      /**
       * @param {string} prefix
       * @param {Namespace.StyleType} [style]
       * @param {string} [uri]
       * @param {string} [fileName]
       * @param {string} [definition]
       * @param {string} [version]
       * @param {string} [relativePath]
       * @returns {Promise<Namespace>}
       */
      add: async (prefix, style, uri, fileName, definition, version, relativePath) => {
        // Use Namespace builder to return the right NDR-version of a namespace
        let namespace = Namespace.create(this.ndrVersion, prefix, style, uri, fileName, definition, version);
        namespace.release = this;
        namespace.relativePath = relativePath;
        return namespace.add();
      },

      /**
       * @param {Namespace[]} namespaces
       */
      addMultiple: async(namespaces) => {
        namespaces.forEach( namespace => namespace.release = this );
        return Namespace.addMultiple(this.releaseKey, this.source.namespaces, namespaces);
      },

      /**
       * @param {string} prefix
       */
      get: async (prefix) => {
        return this.source.namespaces.get({...this.identifiers, prefix});
      },

      /**
       * @param {Namespace.CriteriaType} criteria
       */
      find: async (criteria={}) => {
        Object.assign(criteria, this.identifiers);
        return this.source.namespaces.find(criteria);
      },

      /**
       * @param {Namespace.CriteriaType} criteria
       */
      count: async (criteria={}) => {
        Object.assign(criteria, this.identifiers);
        return this.source.namespaces.count(criteria);
      }

    };
  }

  get localTerms() {
    return {

      /**
       * @param {string} prefix
       * @param {string} term
       * @param {string} [literal]
       * @param {string} [definition]
       * @returns {Promise<LocalTerm>}
       */
      add: async (prefix, term, literal, definition) => {
        let localTerm = LocalTerm.create(this.ndrVersion, prefix, term, literal, definition);
        localTerm.release = this;
        return localTerm.add();
      },

      /**
       * @param {LocalTerm[]} localTerms
       */
      addMultiple: async(localTerms) => {
        localTerms.forEach( localTerm => localTerm.release = this );
        return LocalTerm.addMultiple(this.releaseKey, this.source.localTerms, localTerms);
      },

      /**
       * @param {string} prefix
       * @param {string} term
       */
      get: async (prefix, term) => {
        return this.source.localTerms.get({...this.identifiers, prefix, term});
      },

      /**
       * @param {LocalTerm.CriteriaType} criteria
       */
      find: async (criteria={}) => {
        Object.assign(criteria, this.identifiers);
        return this.source.localTerms.find(criteria);
      },

      /**
       * @param {LocalTerm.CriteriaType} criteria
       */
      count: async (criteria={}) => {
        Object.assign(criteria, this.identifiers);
        return this.source.localTerms.count(criteria);
      }

    };
  }

  get properties() {
    return {

      /**
       * @param {string} prefix
       * @param {string} name
       * @param {string} [definition]
       * @param {string} [typeQName]
       * @param {string} [groupQName]
       * @param {boolean} [isElement=true] Defaults to true
       * @param {boolean} [isAbstract=false] Defaults to false
       * @returns {Promise<Property>}
       */
      add: async (prefix, name, definition, typeQName, groupQName, isElement=true, isAbstract=false) => {
        let property = Property.create(this.ndrVersion, prefix, name, definition, typeQName, groupQName, isElement, isAbstract);
        property.release = this;
        return property.add();
      },

      /**
       * @param {Property[]} properties
       */
      addMultiple: async(properties) => {
        properties.forEach( property => property.release = this );
        return Property.addMultiple(this.releaseKey, this.source.properties, properties);
      },

      /**
       * @param {string} qname
       */
      get: async (qname) => {
        return this.source.properties.get({
          ...this.identifiers,
          prefix: Component.getPrefix(qname),
          name: Component.getName(qname)
        });
      },

      /**
       * @param {Property.CriteriaType} criteria
       */
      find: async (criteria={}) => {
        Object.assign(criteria, this.identifiers);
        return this.source.properties.find(criteria);
      },

      /**
       * @param {Property.CriteriaType} criteria
       */
      count: async (criteria={}) => {
        Object.assign(criteria, this.identifiers);
        return this.source.properties.count(criteria);
      }

    };
  }

  get types() {
    return {

      /**
       * @param {string} prefix
       * @param {string} name
       * @param {string} [definition]
       * @param {Type.StyleType} [style]
       * @param {string} [baseQName]
       * @returns {Promise<Type>}
       */
      add: async (prefix, name, definition, style, baseQName) => {
        let type = Type.create(this.ndrVersion, prefix, name, definition, style, baseQName);
        type.release = this;
        return type.add();
      },

      /**
       * @param {Type[]} types
       */
      addMultiple: async(types) => {
        types.forEach( type => type.release = this );
        return Type.addMultiple(this.releaseKey, this.source.types, types);
      },

      /**
       * @param {string} qname
       */
      get: async (qname) => {
        return this.source.types.get({
          ...this.identifiers,
          prefix: Component.getPrefix(qname),
          name: Component.getName(qname)
        });
      },

      /**
       * @param {Type.CriteriaType} criteria
       */
      find: async (criteria={}) => {
        Object.assign(criteria, this.identifiers);
        return this.source.types.find(criteria);
      },

      /**
       * @param {Type.CriteriaType} criteria
       */
      count: async (criteria={}) => {
        Object.assign(criteria, this.identifiers);
        return this.source.types.count(criteria);
      }

    };
  }

  get facets() {
    return {

      /**
       * @param {string} typeQName
       * @param {string} value
       * @param {string} [definition]
       * @param {Facet.StyleType} [style="enumeration"] Default "enumeration"
       * @returns {Promise<Facet>}
       */
      add: async (typeQName, value, definition, style="enumeration") => {
        let facet = Facet.create(this.ndrVersion, typeQName, value, definition, style);
        facet.release = this;
        return facet.add();
      },

      /**
       * @param {Facet[]} facets
       */
      addMultiple: async(facets) => {
        facets.forEach( facet => facet.release = this );
        return Facet.addMultiple(this.releaseKey, this.source.facets, facets);
      },

      /**
       * @param {string} qname
       * @param {string} value
       * @param {Facet.StyleType} [style="enumeration"] Default "enumeration"
       */
      get: async (qname, value, style="enumeration") => {
        return this.source.facets.get({...this.identifiers, typeQName: qname, value, style});
      },

      /**
       * @param {Facet.CriteriaType} criteria
       */
      find: async (criteria={}) => {
        Object.assign(criteria, this.identifiers);
        return this.source.facets.find(criteria);
      },

      /**
       * @param {Facet.CriteriaType} criteria
       */
      count: async (criteria={}) => {
        Object.assign(criteria, this.identifiers);
        return this.source.facets.count(criteria);
      }

    };
  }

  get subProperties() {
    return {

      /**
       * @param {string} typeQName
       * @param {string} propertyQName
       * @param {string} [min]
       * @param {string} [max]
       * @param {string} [definition]
       * @returns {Promise<SubProperty>}
       */
      add: async (typeQName, propertyQName, min, max, definition) => {
        let subProperty = SubProperty.create(this.ndrVersion, typeQName, propertyQName, min, max, definition);
        subProperty.release = this;
        return subProperty.add();
      },

      /**
       * @param {SubProperty[]} subProperties
       */
      addMultiple: async(subProperties) => {
        subProperties.forEach( subProperty => subProperty.release = this );
        return SubProperty.addMultiple(this.releaseKey, this.source.subProperties, subProperties);
      },

      /**
       * @param {string} typeQName
       * @param {string} propertyQName
       */
      get: async (typeQName, propertyQName) => {
        return this.source.subProperties.get({...this.identifiers, typeQName, propertyQName});
      },

      /**
       * @param {SubProperty.CriteriaType} criteria
       */
      find: async (criteria={}) => {
        Object.assign(criteria, this.identifiers);
        return this.source.subProperties.find(criteria);
      },

      /**
       * @param {SubProperty.CriteriaType} criteria
       */
      count: async (criteria={}) => {
        Object.assign(criteria, this.identifiers);
        return this.source.subProperties.count(criteria);
      }

    };
  }

  async dependents() {
    let namespaces = await this.namespaces.find();
    return { namespaces, count: namespaces.length };
  }

  async loadBuiltIns() {

    // Add XML schema namespace
    let xs = await this.namespaces.add("xs", "built-in", "http://www.w3.org/2001/XMLSchema");

    // Add XML schema simple types
    await xs.types.add("base64Binary", "A data type for Base64-encoded binary data.", "simple");
    await xs.types.add("boolean", "A data type for binary-valued logic (true/false).", "simple");
    await xs.types.add("byte", "A data type that is  is derived from short by setting the value of maxInclusive to be 127 and minInclusive to be -128.", "simple");
    await xs.types.add("anyURI", "anyURI represents a Uniform Resource Identifier Reference (URI).", "simple");
    await xs.types.add("double", "The double datatype is patterned after the IEEE double-precision 64-bit floating point type [IEEE 754-1985].", "simple");
    await xs.types.add("gDay", "gDay is a gregorian day that recurs, specifically a day of the month such as the 5th of the month.", "simple");
    await xs.types.add("date", "A data type for a calendar date with the format CCYY-MM-DD.", "simple");
    await xs.types.add("dateTime", "dateTime values may be viewed as objects with integer-valued year, month, day, hour and minute properties, a decimal-valued second property, and a boolean timezoned property.", "simple");
    await xs.types.add("decimal", "A data type for arbitrary precision decimal numbers.", "simple");
    await xs.types.add("duration", "A data type for a duration of time with the format PnYnMnDTnHnMnS, where nY is the number of years, nM is the number of months, nD is the number of days, nH is the number of hours, nM is the number of minutes, and nS is the number of seconds.", "simple");
    await xs.types.add("gYear", "A data type for a Gregorian calendar year with the format CCYY.", "simple");
    await xs.types.add("gYearMonth", "A data type for a specific gregorian month in a specific gregorian year.", "simple");
    await xs.types.add("float", "A data type that is patterned after the IEEE single-precision 32-bit floating point type [IEEE 754-1985]. The basic value space of float consists of the values m x 2^e, where m is an integer whose absolute value is less than 2^24, and e is an integer between -149 and 104, inclusive. In addition to the basic value space described above, the value space of float also contains the following three special values: positive and negative infinity and not-a-number (NaN).", "simple");
    await xs.types.add("gMonth", "A data type for a Gregorian month with the format --MM--.", "simple");
    await xs.types.add("gMonthDay", "A data type for a gregorian date that recurs, specifically a day of the year such as the third of May. Arbitrary recurring dates are not supported by this datatype. The value space of gMonthDay is the set of calendar dates, as defined in Section 3 of [ISO 8601]. Specifically, it is a set of one-day long, annually periodic instances.", "simple");
    await xs.types.add("language", "A data type that represents natural language identifiers as defined by by [RFC 3066].", "simple");
    await xs.types.add("hexBinary", "A data type for hex-encoded binary data.", "simple");
    await xs.types.add("int", "A data type that is  is derived from long by setting the value of maxInclusive to be 2147483647 and minInclusive to be -2147483648.", "simple");
    await xs.types.add("integer", "A data type for the standard mathematical concept of integer numbers.", "simple");
    await xs.types.add("long", "A data type that is derived from integer by setting the value of maxInclusive to be 9223372036854775807 and minInclusive to be -9223372036854775808.", "simple");
    await xs.types.add("negativeInteger", "A data type that is derived from nonPositiveInteger by setting the value of maxInclusive to be -1.", "simple");
    await xs.types.add("nonNegativeInteger", "A data type for an integer with a minimum value of 0.", "simple");
    await xs.types.add("nonPositiveInteger", "A data type for a lexical representation consisting of an optional preceding sign followed by a finite-length sequence of decimal digits.", "simple");
    await xs.types.add("normalizedString", "A data type that represents white space normalized strings. The value space of normalizedString is the set of strings that do not contain the carriage return, line feed nor tab characters.", "simple");
    await xs.types.add("token", "A data type for tokenized strings.", "simple");
    await xs.types.add("positiveInteger", "positiveInteger is derived from nonNegativeInteger by setting the value of minInclusive to be 1.", "simple");
    await xs.types.add("short", "A data type that is derived from int by setting the value of maxInclusive to be 32767 and minInclusive to be -32768.", "simple");
    await xs.types.add("time", "A data type for an instant of time with the format hh:mm:ss.sss.", "simple");
    await xs.types.add("string", "A data type for character strings in XML.", "simple");
    await xs.types.add("unsignedByte", "A data type that is derived from unsignedShort by setting the value of maxInclusive to be 255.", "simple");
    await xs.types.add("unsignedInt", "A data type that is derived from unsignedLong by setting the value of maxInclusive to be 4294967295.", "simple");
    await xs.types.add("unsignedLong", "A data type that is derived from nonNegativeInteger by setting the value of maxInclusive to be 18446744073709551615.", "simple");
    await xs.types.add("unsignedShort", "A data type that is derived from unsignedInt by setting the value of maxInclusive to be 65535.", "simple");

    // Add XML namespace
    let xml = await this.namespaces.add("xml", "built-in", "");

    // Add attribute xml:lang
    await xml.properties.add("lang", "A human language used in the scope of the element to which it's attached.", undefined, undefined, false);

  }

  async loadUtilities() {

    let structures = await this.namespaces.add("structures", "utility", "", "structures", "");

    await structures.types.add("ObjectType", undefined, "object");
    await structures.types.add("AssociationType", "", "augmentation");
    await structures.types.add("AugmentationType", undefined, "augmentation");

  }

  get modelKey() {
    return this.model.modelKey;
  }

  get userKey() {
    return this.model.userKey;
  }

  get identifiers() {
    return {
      ...this.model.identifiers,
      releaseKey: this.releaseKey
    };
  }

  /**
   * @param {string} userKey
   * @param {string} modelKey
   * @param {string} releaseKey
   */
  static identifiers(userKey, modelKey, releaseKey) {
    return {userKey, modelKey, releaseKey};
  }

  /**
   * @example "niem model 4.0"
   * @example "lapd arrestReport 1.0"
   */
  get label() {
    return this.model.label + " " + this.releaseKey;
  }

  /**
   * @param {string} userKey
   * @param {string} modelKey
   * @param {string} releaseKey
   */
  static route(userKey, modelKey, releaseKey) {
    return Model.route(userKey, modelKey) + "/" + releaseKey;
  }

  get route() {
    return Release.route(this.userKey, this.modelKey, this.releaseKey);
  }

  get modelRoute() {
    return this.model.route;
  }

  toJSON() {
    return {
      ...super.toJSON(),
      releaseKey: this.releaseKey,
      niemReleaseKey: this.niemReleaseKey,
      version: this.version,
      baseURI: this.baseURI,
      branch: this.branch,
      description: this.description
    };
  }

}

/** @typedef {"draft"|"published"} StatusType */
let ReleaseStatusType;

Release.Statuses = ["draft", "published"];

/**
 * Search criteria for release find operations.
 *
 * @typedef {object} CriteriaType
 * @property {string} [userKey]
 * @property {string} [modelKey]
 * @property {string} [releaseKey]
 * @property {string} [niemReleaseKey]
 * @property {"draft"|"published"}  [status]
 */
let ReleaseCriteriaType = {};

/**
 * @typedef {object} IdentifiersType
 * @property {string} userKey
 * @property {string} modelKey
 * @property {string} releaseKey
 */
let ReleaseIdentifiersType;

module.exports = Release;

let Model = require("../model/index");
let Namespace = require("../namespace/index");
let Property = require("../property/index");
let Type = require("../type/index");
let Facet = require("../facet/index");
let SubProperty = require("../subproperty/index");
let LocalTerm = require("../local-term/index");
let Component = require("../component/index");

let ReleaseObject = require("../release-object/index");
