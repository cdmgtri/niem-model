
let NIEMModelSourceMemory = require("../interfaces/source/index");

let Model = require("../model/index");
let Release = require("../release/index");
let Namespace = require("../namespace/index");
let LocalTerm = require("../local-term/index");
let Property = require("../property/index");
let Type = require("../type/index");
let Facet = require("../facet/index");
let SubProperty = require("../subproperty/index");
let NIEMModelSource = require("../interfaces/source/interface");

class NIEM {

  /**
   * @param {NIEMModelSource} [source]
   */
  constructor(source) {

    /** @type {NIEMModelSource[]} */
    this.sources = source ? [source] : [new NIEMModelSourceMemory()];

  }

  get models() {

    return {

      /**
       * @param {string} userKey
       * @param {string} modelKey
       * @param {Model.StyleType} [style]
       * @param {string} [description]
       * @param {string} [website]
       * @param {string} [repo]
       */
      add: async (userKey, modelKey, style, description, website, repo) => {
        let model = Model.create(userKey, modelKey, style, description, website, repo);
        model._source = this.sources[0];
        model.niem = this;
        return model.add();
      },

      /**
       * @param {string} userKey
       * @param {string} modelKey
       */
      get: async (userKey, modelKey) => {
        let identifiers = Model.identifiers(userKey, modelKey);
        for (let source of this.sources) {
          let model = await source.models.get(identifiers);
          if (model) return model;
        }
      },

      /**
       * @param {Model.CriteriaType} criteria
       */
      find: async (criteria={}) => {
        let results = [];
        for (let source of this.sources) {
          let models = await source.models.find(criteria);
          results.push(...models);
        }
        return results;
      },

      niem: async () => {
        return this.models.get("niem", "model");
      }

    };

  }

  get releases() {
    return {

      /**
       * @param {string} userKey
       * @param {string} modelKey
       * @param {string} releaseKey
       * @param {string} [niemReleaseKey]
       * @param {"3.0"|"4.0"} [ndrVersion]
       * @param {string} [version]
       * @param {import("../release/index").StatusType} [status]
       * @param {string} [baseURI]
       */
      add: async (userKey, modelKey, releaseKey, niemReleaseKey, ndrVersion, version, status, baseURI) => {
        let model = await this.models.get(userKey, modelKey);

        if (! model) {
          // Create model if not found
          model = await this.models.add(userKey, modelKey);
        }

        return model.releases.add(releaseKey, niemReleaseKey, ndrVersion, version, status, baseURI);
      },

      /**
       * @param {string} userKey
       * @param {string} modelKey
       * @param {string} releaseKey
       * @param {string} niemReleaseKey
       */
      load: async (userKey, modelKey, releaseKey, niemReleaseKey) => {

        // Find or initialize release
        let release = await this.releases.get(userKey, modelKey, releaseKey);
        if (!release) {
          release = await this.releases.add(userKey, modelKey, releaseKey, niemReleaseKey);
        }

        // Return format-specific function that loads data
        return {
          xsd: async (input) => release.load.xsd(input),
          json: async (input) => release.load.json(input)
        };

      },

      /**
       * @param {string} userKey
       * @param {string} modelKey
       * @param {string} releaseKey
       */
      get: async (userKey, modelKey, releaseKey) => {
        let identifiers = Release.identifiers(userKey, modelKey, releaseKey);
        for (let source of this.sources) {
          let release = await source.releases.get(identifiers);
          if (release) return release;
        }
      },

      /**
       * @param {Release.CriteriaType} criteria
       */
      find: async (criteria={}) => {
        let results = [];
        for (let source of this.sources) {
          let releases = await source.releases.find(criteria);
          results.push(...releases);
        }
        return results;
      },

      niem: async (releaseKey) => {
        return this.releases.get("niem", "model", releaseKey);
      }

    };
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
        for (let source of this.sources) {
          let namespace = await source.namespaces.get(identifiers);
          if (namespace) return namespace;
        }
      },

      /**
       * @param {Namespace.CriteriaType} criteria
       */
      find: async (criteria={}) => {
        let results = [];
        for (let source of this.sources) {
          let namespaces = await source.namespaces.find(criteria);
          results.push(...namespaces);
        }
        return results;
      }

    };
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
        for (let source of this.sources) {
          let localTerm = await source.localTerms.get(identifiers);
          if (localTerm) return localTerm;
        }
      },

      /**
       * @param {LocalTerm.CriteriaType} criteria
       */
      find: async (criteria={}) => {
        let results = [];
        for (let source of this.sources) {
          let localTerms = await source.localTerms.find(criteria);
          results.push(...localTerms);
        }
        return results;
      }

    };
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
        for (let source of this.sources) {
          let property = await source.properties.get(identifiers);
          if (property) return property;
        }
      },

      /**
       * @param {Property.CriteriaType} criteria
       */
      find: async (criteria={}) => {
        let results = [];
        for (let source of this.sources) {
          let properties = await source.properties.find(criteria);
          results.push(...properties);
        }
        return results;
      }

    };
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
        for (let source of this.sources) {
          let type = await source.types.get(identifiers);
          if (type) return type;
        }
      },

      /**
       * @param {Type.CriteriaType} criteria
       */
      find: async (criteria={}) => {
        let results = [];
        for (let source of this.sources) {
          let types = await source.types.find(criteria);
          results.push(...types);
        }
        return results;
      }

    };
  }

  get facets() {

    return {

      /**
       * @param {string} userKey
       * @param {string} modelKey
       * @param {string} releaseKey
       * @param {string} typeQName
       * @param {string} value
       * @param {import("../facet/index").StyleType} [style="enumeration"] Default "enumeration"
       * @param {string} definition
       */
      get: async (userKey, modelKey, releaseKey, typeQName, value, style="enumeration", definition) => {
        let identifiers = Facet.identifiers(userKey, modelKey, releaseKey, typeQName, value, style);
        identifiers.definition = definition;
        for (let source of this.sources) {
          let facet = await source.facets.get(identifiers);
          if (facet) return facet;
        }
      },

      /**
       * @param {import("../facet/index").CriteriaType} criteria
       */
      find: async (criteria={}) => {
        let results = [];
        for (let source of this.sources) {
          let facets = await source.facets.find(criteria);
          results.push(...facets);
        }
        return results;
      }

    };
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
        for (let source of this.sources) {
          let subProperty = await source.subProperties.get(identifiers);
          if (subProperty) return subProperty;
        }
      },

      /**
       * @param {SubProperty.CriteriaType} criteria
       */
      find: async (criteria={}) => {
        let results = [];
        for (let source of this.sources) {
          let subProperties = await source.subProperties.find(criteria);
          results.push(...subProperties);
        }
        return results;
      }

    };
  }

}

module.exports = NIEM;
