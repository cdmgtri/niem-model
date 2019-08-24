
let NIEMObject = require("../niem-object/index");
let NIEMModelSourceInterface = require("../interfaces/source/index");

/**
 * A coherent set of namespaces bundled together for a release, IEPD, EIEM, etc.
 */
class Release extends NIEMObject {

  /**
   * @param {String} releaseKey
   * @param {String} niemReleaseKey
   * @param {"3.0"|"4.0"} [ndrVersion="4.0"] Defaults to "4.0"
   * @param {String} version
   * @param {"draft"|"published"} status
   * @param {String} baseURI
   * @param {String} branch
   * @param {String} description
   */
  constructor(releaseKey="default", niemReleaseKey, ndrVersion="4.0", version, status, baseURI, branch, description) {

    super();

    let Model = require("../model/index");
    this.model = new Model();

    this.releaseKey = releaseKey;
    this.niemReleaseKey = niemReleaseKey;
    this.ndrVersion = ndrVersion;
    this.version = version;
    this.status = status;
    this.baseURI = baseURI;
    this.branch = branch;
    this.description = description;

  }

  get source() {
    return this.model.source;
  }

  /**
   * @param {String} releaseKey
   * @param {String} niemReleaseKey
   * @param {"3.0"|"4.0"} [ndrVersion="4.0"] Defaults to "4.0"
   * @param {String} version
   * @param {"draft"|"published"} status
   * @param {String} baseURI
   * @param {String} branch
   * @param {String} description
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
       * @param {Namespace.StyleType} style
       * @param {string} uri
       * @param {string} fileName
       * @param {string} definition
       * @param {string} version
       */
      add: async (prefix, style, uri, fileName, definition, version) => {
        // Use Namespace builder to return the right NDR-version of a namespace
        let namespace = Namespace.create(this.ndrVersion, prefix, style, uri, fileName, definition, version);
        namespace.release = this;
        return namespace.add();
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

    }
  }

  get localTerms() {
    return {

      /**
       * @param {string} prefix
       * @param {string} term
       * @param {string} literal
       * @param {string} definition
       */
      add: async (prefix, term, literal, definition) => {
        let localTerm = LocalTerm.create(this.ndrVersion, prefix, term, literal, definition);
        localTerm.release = this;
        return localTerm.add();
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

    }
  }

  get properties() {
    return {

      /**
       * @param {string} prefix
       * @param {string} name
       * @param {string} definition
       * @param {string} typeQName
       * @param {string} groupQName
       * @param {boolean} [isElement=true] Defaults to true
       * @param {boolean} [isAbstract=false] Defaults to false
       */
      add: async (prefix, name, definition, typeQName, groupQName, isElement=true, isAbstract=false) => {
        let property = Property.create(this.ndrVersion, prefix, name, definition, typeQName, groupQName, isElement, isAbstract);
        property.release = this;
        return property.add();
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
      },

    }
  }

  get types() {
    return {

      /**
       * @param {string} prefix
       * @param {string} name
       * @param {string} definition
       * @param {Type.StyleType} style
       * @param {string} baseQName
       */
      add: async (prefix, name, definition, style, baseQName) => {
        let type = Type.create(this.ndrVersion, prefix, name, definition, style, baseQName);
        type.release = this;
        return type.add();
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
      },

    }
  }

  get facets() {
    return {

      /**
       * @param {string} typeQName
       * @param {string} value
       * @param {string} definition
       * @param {Facet.StyleType} [style="enumeration"] Default "enumeration"
       */
      add: async (typeQName, value, definition, style="enumeration") => {
        let facet = Facet.create(this.ndrVersion, typeQName, value, definition, style);
        facet.release = this;
        return facet.add();
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
      },

    }
  }

  get subProperties() {
    return {

      /**
       * @param {string} typeQName
       * @param {string} propertyQName
       * @param {string} min
       * @param {string} max
       * @param {string} definition
       */
      add: async (typeQName, propertyQName, min, max, definition) => {
        let subProperty = SubProperty.create(this.ndrVersion, typeQName, propertyQName, min, max, definition);
        subProperty.release = this;
        return subProperty.add();
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
      },

    }
  }

  async dependents() {
    let namespaces = await this.namespaces();
    return { namespaces, count: namespaces.length };
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

/** @type {"draft"|"published"} */
Release.StatusType;

Release.Statuses = ["draft", "published"];

/**
 * Search criteria for release find operations.
 *
 * @typedef {Object} CriteriaType
 * @property {string} userKey
 * @property {string} modelKey
 * @property {string} releaseKey
 * @property {string} niemReleaseKey
 * @property {"draft"|"published"}  status
 */
Release.CriteriaType = {};

/**
 * @typedef {Object} IdentifiersType
 * @property {string} userKey
 * @property {string} modelKey
 * @property {string} releaseKey
 */
Release.IdentifiersType;

module.exports = Release;

let Model = require("../model/index");
let Namespace = require("../namespace/index");
let Property = require("../property/index");
let Type = require("../type/index");
let Facet = require("../facet/index");
let SubProperty = require("../subproperty/index");
let LocalTerm = require("../local-term/index");
let Component = require("../component/index");
