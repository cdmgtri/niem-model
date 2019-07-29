
let NIEMObject = require("../niem-object/index");

/**
 * A coherent set of namespaces bundled together for a release, IEPD, EIEM, etc.
 */
class Release extends NIEMObject {

  /**
   * @param {Model} model
   * @param {String} releaseKey
   * @param {String} niemReleaseKey
   * @param {"draft"|"published"} status
   * @param {String} baseURI
   * @param {String} branch
   * @param {String} description
   */
  constructor(model, releaseKey="default", niemReleaseKey, status, baseURI, branch, description) {

    super();

    this.model = model;
    this._releaseKey = releaseKey;
    this.niemReleaseKey = niemReleaseKey;
    this.status = status;
    this.baseURI = baseURI;
    this.branch = branch;
    this.description = description;
  }

  get releaseKey() {
    return this._releaseKey;
  }

  set releaseKey(releaseKey) {
    this._releaseKey = releaseKey;
  }

  get modelKey() {
    return this.model.modelKey;
  }

  get userKey() {
    return this.model.userKey;
  }

  get label() {
    return this.modelKey + "-" + this.releaseKey;
  }

  get route() {
    return Release.buildRoute(this.userKey, this.modelKey, this.releaseKey);
  }

  static buildRoute(userKey, modelKey, releaseKey) {
    return Model.buildRoute(userKey, modelKey) + "/" + releaseKey;
  }

  get namespaces() {

    let Namespace = require("../namespace/index");

    return {
      /**
       * @param {Namespace} input
       */
      add: async (input) => {
        input.release = this;
        return this.model.namespaces.add(input);
      },

      /**
       * @param {String} prefix
       */
      get: async (prefix) => this.model.namespaces.get(this.releaseKey, prefix),

      /**
       * @param {Namespace} criteria
       */
      find: async (criteria={}) => {
        criteria.release = this;
        return this.model.namespaces.find(criteria);
      },

      kinds: {

        /**
         * @param {Namespace} criteria
         */
        all: async (criteria={}) => {
          criteria.release = this;
          return this.model.namespaces.kinds.all(criteria);
        },

        /**
         * @param {Namespace} criteria
         */
        core: async () => {
          return this.model.namespaces.get(this.releaseKey, "nc");
        },

        /**
         * @param {Namespace} criteria
         */
        domains: async (criteria={}) => {
          criteria.release = this;
          return this.model.namespaces.kinds.domains(criteria);
        },

        /**
         * @param {Namespace} criteria
         */
        codes: async (criteria={}) => {
          criteria.release = this;
          return this.model.namespaces.kinds.codes(criteria);
        },

        /**
         * @param {Namespace} criteria
         */
        adapters: async (criteria={}) => {
          criteria.release = this;
          return this.model.namespaces.kinds.adapters(criteria);
        },

        /**
         * @param {Namespace} criteria
         */
        externals: async (criteria={}) => {
          criteria.release = this;
          return this.model.namespaces.kinds.externals(criteria);
        },

        /**
         * @param {Namespace} criteria
         */
        proxy: async (criteria={}) => {
          criteria.release = this;
          return this.model.namespaces.kinds.proxy(criteria);
        },

        /**
         * @param {Namespace} criteria
         */
        utilities: async (criteria={}) => {
          criteria.release = this;
          return this.model.namespaces.kinds.utilities(criteria);
        },

        /**
         * @param {Namespace} criteria
         */
        extensions: async (criteria={}) => {
          criteria.release = this;
          return this.model.namespaces.kinds.extensions(criteria);
        },

        /**
         * @param {Namespace} criteria
         */
        conformant: async (criteria={}) => {
          criteria.release = this;
          return this.model.namespaces.kind.conformant(criteria);
        }
      }
    };
  }

  get properties() {

    let Property = require("../property/index");

    return {
      /**
       * @param {Property} input
       */
      add: async (input) => {
        input.release = this;
        return this.model.properties.add(input);
      },

      get: async (qname) => {
        return this.model.properties.get(this.releaseKey, qname);
      },

      /**
       * @param {Property} criteria
       */
      find: async (criteria={}) => {
        criteria.release = this;
        return this.model.properties.find(criteria);
      },

      kinds: {

        /**
         * @param {Property} criteria
         */
        all: async (criteria={}) => {
          criteria.release = this;
          return this.model.properties.kinds.all(criteria);
        },

        /**
         * @param {Property} criteria
         */
        elements: async (criteria={}) => {
          criteria.release = this;
          return this.model.properties.kinds.elements(criteria);
        },

        /**
         * @param {Property} criteria
         */
        attributes: async (criteria={}) => {
          criteria.release = this;
          return this.model.properties.kinds.attributes(criteria);
        },

        /**
         * @param {Property} criteria
         */
        abstracts: async (criteria={}) => {
          criteria.release = this;
          return this.model.properties.kinds.abstracts(criteria);
        }
      }
    }
  }

  get types() {

    let Type = require("../type/index");

    return {
      /**
       * @param {Type} input
       */
      add: async (input) => {
        input.release = this;
        return this.model.types.add(input);
      },

      get: async (qname) => {
        return this.model.types.get(this.releaseKey, qname);
      },

      /**
       * @param {Type} criteria
       */
      find: async (criteria={}) => {
        criteria.release = this;
        return this.model.types.find(criteria);
      },

      kinds: {

        /**
         * @param {Type} criteria
         */
        all: async (criteria={}) => {
          criteria.release = this;
          return this.model.types.kinds.all(criteria);
        },

        /**
         * @param {Type} criteria
         */
        objects: async (criteria={}) => {
          criteria.release = this;
          return this.model.types.kinds.objects(criteria);
        },

        /**
         * @param {Type} criteria
         */
        adapters: async (criteria={}) => {
          criteria.release = this;
          return this.model.types.kinds.adapters(criteria);
        },

        /**
         * @param {Type} criteria
         */
        associations: async (criteria={}) => {
          criteria.release = this;
          return this.model.types.kinds.associations(criteria);
        },

        /**
         * @param {Type} criteria
         */
        augmentations: async (criteria={}) => {
          criteria.release = this;
          return this.model.types.kinds.augmentations(criteria);
        },

        /**
         * @param {Type} criteria
         */
        metadata: async (criteria={}) => {
          criteria.release = this;
          return this.model.types.kinds.metadata(criteria);
        },

        /**
         * @param {Type} criteria
         */
        CSCs: async (criteria={}) => {
          criteria.release = this;
          return this.model.types.kinds.CSCs(criteria);
        },

        /**
         * All simple types, including atomic, lists, and unions.
         * @param {Type} criteria
         */
        simple: async (criteria={}) => {
          criteria.release = this;
          return this.model.types.kinds.simple(criteria);
        },

        /**
         * @param {Type} criteria
         */
        lists: async (criteria={}) => {
          criteria.release = this;
          return this.model.types.kinds.lists(criteria);
        },

        /**
         * @param {Type} criteria
         */
        unions: async (criteria={}) => {
          criteria.release = this;
          return this.model.types.kinds.unions(criteria);
        },

        /**
         * Simple types that are not lists or unions.
         * @param {Type} criteria
         */
        atomic: async (criteria={}) => {
          criteria.release = this;
          return this.model.types.kinds.atomic(criteria);
        }
      }
    }
  }


  get localTerms() {

    let LocalTerm = require("../local-term/index");

    return {
      /**
       * @param {LocalTerm} input
       */
      add: async (input) => {
        input.release = this;
        return this.model.localTerms.add(input);
      },

      /**
       * @param {String} prefix
       * @param {String} term
       */
      get: async (prefix, term) => {
        return this.model.localTerms.get(this.releaseKey, prefix, term);
      },

      /**
       * @param {LocalTerm} criteria
       */
      find: async (criteria={}) => {
        criteria.release = this;
        return this.model.localTerms.find(criteria);
      }
    }
  }

  get subProperties() {

    let SubProperty = require("../subproperty/index");

    return {
      /**
       * @param {SubProperty} input
       */
      add: async (input) => {
        input.release = this;
        return this.model.subProperties.add(input);
      },

      /**
       * @param {String} typeQName
       * @param {String} propertyQName
       */
      get: async (typeQName, propertyQName) => {
        return this.model.subProperties.get(this.releaseKey, typeQName, propertyQName);
      },

      /**
       * @param {SubProperty} criteria
       */
      find: async (criteria={}) => {
        criteria.release = this;
        return this.model.subProperties.find(criteria);
      }
    }
  }

  get facets() {

    let Facet = require("../facet/index");
    let { KindShape } = Facet;

    return {
      /**
       * @param {Facet} input
       * @returns {Promise<Facet>}
       */
      add: async (input) => {
        input.release = this;
        return this.model.facets.add(input);
      },

      /**
       * Returns a facet with the given identifier in this type.
       * @param {String} typeQName
       * @param {String} value
       * @param {KindShape} kind
       * @returns {Promise<Facet>}
       */
      get: async (typeQName, value, kind="enumeration") => {
        return this.model.facets.get(this.releaseKey, typeQName, value, kind);
      },

      /**
       * Returns an array of facets from this type matching the given options.
       * @param {Facet} criteria
       * @returns {Promise<Facet[]>}
       */
      find: async (criteria={}) => {
        criteria.release = this;
        return this.model.facets.find(criteria);
      }

    }
  }

  /**
   * Serializes the release
   * @param {"full"|"model"} [scope="full"]
   */
  serialize(scope="full") {

    let object = {};

    if (scope == "full") {
      object.userKey = this.userKey;
      object.modelKey = this.modelKey;
    }

    object.releaseKey = this.releaseKey;
    object.niemReleaseKey = this.modelReleaseKey;
    object.baseURI = this.baseURI;
    object.branch = this.branch;
    object.description = this.description;

    return object;
  }

}

module.exports = Release;

let Model = require("../model/index");
