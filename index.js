
let NIEMModelSourceMemory = require("niem-model-source-memory");

let NIEMModelSource = require("./src/interfaces/source/index");

let Model = require("./src/model/index");
let Release = require("./src/release/index");
let Namespace = require("./src/namespace/index");
let LocalTerm = require("./src/local-term/index");
let Property = require("./src/property/index");
let Type = require("./src/type/index");
let Facet = require("./src/facet/index");
let SubProperty = require("./src/subproperty/index");

/**
 * @todo Handle lookups in multiple release sources (will need a release source setter)
 */
class NIEM {

  /**
   * @param {NIEMModelSource} source
   */
  constructor(source) {

    /** @type {NIEMModelSource} */
    this.source = source || new NIEMModelSourceMemory();

    this.qa;
  }

  get models() {

    return {

      /**
       * @param {string} userKey
       * @param {string} modelKey
       * @param {Model.StyleType} style
       * @param {string} description
       * @param {string} website
       * @param {string} repo
       */
      add: async (userKey, modelKey, style, description, website, repo) => {
        let model = Model.create(userKey, modelKey, style, description, website, repo);
        model.source = this.source;
        model.niem = this;
        return model.add();
      },

      /**
       * @param {string} userKey
       * @param {string} modelKey
       */
      get: async (userKey, modelKey) => {
        let identifiers = Model.identifiers(userKey, modelKey);
        return this.source.models.get(identifiers);
      },

      /**
       * @param {Model.CriteriaType} criteria
       */
      find: async (criteria={}) => {
        return this.source.models.find(criteria);
      },

      niem: async () => {
        return this.models.get("niem", "model");
      }

    }

  }

  get releases() {
    return {

      /**
       * @param {string} userKey
       * @param {string} modelKey
       * @param {string} releaseKey
       * @param {string} niemReleaseKey
       * @param {string} version
       * @param {Release.StatusType} status
       * @param {string} baseURI
       */
      add: async (userKey, modelKey, releaseKey, niemReleaseKey, version, status, baseURI) => {
        let model = await this.models.get(userKey, modelKey);

        if (! model) {
          // Create model if not found
          model = await this.models.add(userKey, modelKey);
        }

        return model.releases.add(releaseKey, niemReleaseKey, version, status, baseURI);
      },

      /**
       * @param {string} userKey
       * @param {string} modelKey
       * @param {string} releaseKey
       */
      get: async (userKey, modelKey, releaseKey) => {
        let identifiers = Release.identifiers(userKey, modelKey, releaseKey);
        return this.source.releases.get(identifiers);
      },

      /**
       * @param {Release.CriteriaType} criteria
       */
      find: async (criteria={}) => {
        return this.source.releases.find(criteria);
      },

      niem: async (releaseKey) => {
        return this.release("niem", "model", releaseKey);
      }

    }
  }

  get namespaces() {
    return {

      /**
       * @param {string} userKey
       * @param {string} modelKey
       * @param {string} releaseKey
       * @param {string} prefix
       */
      get: async (userKey, modelKey, releaseKey, prefix) => {
        let identifiers = Namespace.identifiers(userKey, modelKey, releaseKey, prefix);
        return this.source.namespaces.get(identifiers);
      },

      /**
       * @param {Type.CriteriaType} criteria
       */
      find: async (criteria={}) => {
        return this.source.namespaces.find(criteria);
      }

    }
  }

  get localTerms() {
    return {

      /**
       * @param {string} userKey
       * @param {string} modelKey
       * @param {string} releaseKey
       * @param {string} prefix
       * @param {string} term
       */
      get: async (userKey, modelKey, releaseKey, prefix, term) => {
        let identifiers = LocalTerm.identifiers(userKey, modelKey, releaseKey, prefix, term);
        return this.source.localTerms.get(identifiers);
      },

      /**
       * @param {LocalTerm.CriteriaType} criteria
       */
      find: async (criteria={}) => {
        return this.source.localTerms.find(criteria);
      }

    }
  }

  get properties() {
    return {

      /**
       * @param {string} userKey
       * @param {string} modelKey
       * @param {string} releaseKey
       * @param {string} qname
       */
      get: async (userKey, modelKey, releaseKey, qname) => {
        let identifiers = Property.identifiers(userKey, modelKey, releaseKey, Property.getPrefix(qname), Property.getName(qname));
        return this.source.properties.get(identifiers);
      },

      /**
       * @param {Property.CriteriaType} criteria
       */
      find: async (criteria={}) => {
        return this.source.properties.find(criteria);
      }

    }
  }

  get types() {
    return {

      /**
       * @param {string} userKey
       * @param {string} modelKey
       * @param {string} releaseKey
       * @param {string} qname
       */
      get: async (userKey, modelKey, releaseKey, qname) => {
        let identifiers = Type.identifiers(userKey, modelKey, releaseKey, Type.getPrefix(qname), Type.getName(qname));
        return this.source.types.get(identifiers);
      },

      /**
       * @param {Type.CriteriaType} criteria
       */
      find: async (criteria={}) => {
        return this.source.types.find(criteria);
      }

    }
  }

  get facets() {
    return {

      /**
       * @param {string} userKey
       * @param {string} modelKey
       * @param {string} releaseKey
       * @param {string} typeQName
       * @param {string} value
       * @param {Facet.StyleType} [style="enumeration"] Default "enumeration"
       * @param {string} definition
       */
      get: async (userKey, modelKey, releaseKey, typeQName, value, style="enumeration", definition) => {
        let identifiers = Facet.identifiers(userKey, modelKey, releaseKey, typeQName, value, style, definition);
        return this.source.facets.get(identifiers);
      },

      /**
       * @param {Facet.CriteriaType} criteria
       */
      find: async (criteria={}) => {
        return this.source.facets.find(criteria);
      }

    }
  }

  get subProperties() {
    return {

      /**
       * @param {string} userKey
       * @param {string} modelKey
       * @param {string} releaseKey
       * @param {string} prefix
       * @param {string} name
       */
      get: async (userKey, modelKey, releaseKey, typeQName, propertyQName) => {
        let identifiers = SubProperty.identifiers(userKey, modelKey, releaseKey, typeQName, propertyQName);
        return this.source.subProperties.get(identifiers);
      },

      /**
       * @param {SubProperty.CriteriaType} criteria
       */
      find: async (criteria={}) => {
        return this.source.subProperties.find(criteria);
      }

    }
  }

}

NIEM.Model = Model;
NIEM.Release = Release;
NIEM.Namespace = Namespace;
NIEM.LocalTerm = LocalTerm;
NIEM.Component = require("./src/component/index");
NIEM.Property = Property;
NIEM.Type = Type;
NIEM.Facet = Facet;
NIEM.SubProperty = SubProperty;

NIEM.NIEMObject = require("./src/niem-object/index");
NIEM.ReleaseObject = require("./src/release-object/index");

NIEM.Interfaces = {
  NIEMSource: {
    NIEMModelSource: require("./src/interfaces/index"),
    Change: require("./src/interfaces/source/change/index"),
    Transaction: require("./src/interfaces/source/transaction/index"),
    DataSet: require("./src/interfaces/source/dataSet/index")
  }
}

NIEM.Tests = {
  unitTests: require("./test/unit/index")
}

module.exports = NIEM;

