
let NIEMObject = require("../niem-object/index");

/**
 * A NIEM Namespace
 */
class Namespace extends NIEMObject {

  /**
   * @param {Release} release
   * @param {String} prefix
   * @param {String} [uri]
   * @param {String} [fileName]
   * @param {String} [definition]
   * @param {String} [version]
   * @param {NamespaceStyles} [style]
   * @param {String} [version]
   * @param {Boolean} [isPreGenerated=false]
   * @param {String[]} [conformanceTargets=[]]
   * @param {String} [relativePath]
   * @param {String} [xsdString] - XSD text for external (non-parsed) namespaces
   */
  constructor(release, prefix, uri, fileName, definition, version, style,
    isPreGenerated=false, conformanceTargets=[], relativePath, xsdString ) {

    super();

    this.release = release;
    this.prefix = prefix;
    this.fileName = fileName;
    this.uri = uri;
    this.definition = definition;
    this.version = version;
    this.style = style;
    this.isPreGenerated = isPreGenerated;
    this.conformanceTargets = conformanceTargets;
    this.relativePath = relativePath;
    this.xsdString = xsdString;
    this.isBuiltIn = false;
  }

  get route() {
    return Namespace.buildRoute(this.userKey, this.modelKey, this.releaseKey, this.prefix);
  }

  get label() {
    return this.prefix;
  }

  get authoritativePrefix() {
    return this.prefix;
  }

  static buildRoute(userKey, modelKey, releaseKey, prefix) {
    return Release.buildRoute(userKey, modelKey, releaseKey) + "/namespaces/" + prefix;
  }

  /**
   * The NDR conformance target for the namespace, if available
   *
   * @example http://reference.niem.gov/niem/specification/naming-and-design-rules/4.0/#ReferenceSchemaDocument
   * @type {String}
   */
  get ndrConformanceTargetIdentifier() {
    let ndrTargetPrefix = "http://reference.niem.gov/niem/specification/naming-and-design-rules/";
    return this.conformanceTargets.find( tgt => tgt.startsWith(ndrTargetPrefix));
  }

  /**
   * @type {"3.0"|"4.0"}
   */
  get ndrVersion() {
    let target = this.ndrConformanceTargetIdentifier;
    if (target) {
      // Capture the NDR version number, e.g., 4.0
      let re = /.*\/(\d\.\d)\/#.*SchemaDocument/;
      let matches = re.exec(target);
      if (matches.length > 0) {
        return matches[1];
      }
    }
    return undefined;
  }

  /**
   * @type {"ReferenceSchemaDocument"|"ExtensionSchemaDocument"}
   */
  get ndrConformanceTarget() {
    if (this.ndrVersion) {
      return this.ndrConformanceTargetIdentifier.split("#")[1];
    }
    return null;
  }

  get hasNDRConformanceTarget() {
    return typeof this.ndrConformanceTarget == "string";
  }


  get properties() {

    let Property = require("../property/index");

    return {
      /**
       * @param {Property} input
       */
      add: async (input) => {
        input.prefix = this.prefix;
        return this.release.properties.add(input);
      },

      get: async (name) => {
        return this.release.properties.get(this.prefix + ":" + name);
      },

      /**
       * @param {Property} criteria
       */
      find: async (criteria={}) => {
        criteria.prefix = this.prefix;
        return this.release.properties.find(criteria);
      },

      kinds: {

        /**
         * @param {Property} criteria
         */
        all: async (criteria={}) => {
          criteria.prefix = this.prefix;
          return this.release.properties.kinds.all(criteria);
        },

        /**
         * @param {Property} criteria
         */
        elements: async (criteria={}) => {
          criteria.prefix = this.prefix;
          return this.release.properties.kinds.elements(criteria);
        },

        /**
         * @param {Property} criteria
         */
        attributes: async (criteria={}) => {
          criteria.prefix = this.prefix;
          return this.release.properties.kinds.attributes(criteria);
        },

        /**
         * @param {Property} criteria
         */
        abstracts: async (criteria={}) => {
          criteria.prefix = this.prefix;
          return this.release.properties.kinds.abstracts(criteria);
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
        input.prefix = this.prefix;
        return this.release.types.add(input);
      },

      get: async (name) => {
        return this.release.types.get(this.prefix + ":" + name);
      },

      /**
       * @param {Type} criteria
       */
      find: async (criteria={}) => {
        criteria.prefix = this.prefix;
        return this.release.types.find(criteria)
      },

      kinds: {

        /**
         * @param {Type} criteria
         */
        all: async (criteria={}) => {
          criteria.prefix = this.prefix;
          return this.release.types.kinds.all(criteria);
        },

        /**
         * @param {Type} criteria
         */
        objects: async (criteria={}) => {
          criteria.prefix = this.prefix;
          return this.release.types.kinds.objects(criteria);
        },

        /**
         * @param {Type} criteria
         */
        adapters: async (criteria={}) => {
          criteria.prefix = this.prefix;
          return this.release.types.kinds.adapters(criteria);
        },

        /**
         * @param {Type} criteria
         */
        associations: async (criteria={}) => {
          criteria.prefix = this.prefix;
          return this.release.types.kinds.associations(criteria);
        },

        /**
         * @param {Type} criteria
         */
        augmentations: async (criteria={}) => {
          criteria.prefix = this.prefix;
          return this.release.types.kinds.augmentations(criteria);
        },

        /**
         * @param {Type} criteria
         */
        metadata: async (criteria={}) => {
          criteria.prefix = this.prefix;
          return this.release.types.kinds.metadata(criteria);
        },

        /**
         * @param {Type} criteria
         */
        CSCs: async (criteria={}) => {
          criteria.prefix = this.prefix;
          return this.release.types.kinds.CSCs(criteria);
        },

        /**
         * All simple types, including atomic, lists, and unions.
         * @param {Type} criteria
         */
        simple: async (criteria={}) => {
          criteria.prefix = this.prefix;
          return this.release.types.kinds.simple(criteria);
        },

        /**
         * @param {Type} criteria
         */
        lists: async (criteria={}) => {
          criteria.prefix = this.prefix;
          return this.release.types.kinds.lists(criteria);
        },

        /**
         * @param {Type} criteria
         */
        unions: async (criteria={}) => {
          criteria.prefix = this.prefix;
          return this.release.types.kinds.unions(criteria);
        },

        /**
         * Simple types that are not lists or unions.
         * @param {Type} criteria
         */
        atomic: async (criteria={}) => {
          criteria.prefix = this.prefix;
          return this.release.types.kinds.atomic(criteria);
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
        input.prefix = this.prefix;
        return this.release.localTerms.add(input);
      },

      /**
       * @param {String} term
       */
      get: async (term) => {
        return this.release.localTerms.get(this.prefix, term);
      },

      /**
       * @param {LocalTerm} criteria
       */
      find: async (criteria={}) => {
        criteria.prefix = this.prefix;
        return this.release.localTerms.find(criteria);
      }
    }
  }


  get subProperties() {

    let SubProperty = require("../subproperty/index");

    return {

      /**
       * @param {SubProperty} criteria
       */
      find: async (criteria={}) => {
        criteria.typePrefix = this.prefix;
        return this.release.subProperties.find(criteria);
      }
    }
  }

  get facets() {

    let Facet = require("../facet/index");

    return {

      /**
       * Returns an array of facets from this type matching the given options.
       * @param {Facet} criteria
       * @returns {Promise<Facet[]>}
       */
      find: async (criteria={}) => {
        criteria.typePrefix = this.prefix;
        return this.release.facets.find(criteria);
      }

    }
  }

  /**
   * @param {"full"|"release"} [scope="full"]
   */
  serialize(scope="full") {

    // Get namespace fields without release info
    let json = JSON.parse( JSON.stringify(this) );
    delete json.release

    if (scope == "release") {
      // Return the namespace relative to its release (no release fields)
      return json;
    }

    // Return the full set of namespace fields
    return {
      ...this.releaseIdentifiers,
      ...json
    }

  }

}

/** @type {"core"|"domain"|"code"|"extension"|"adapter"|"external"|"proxy"|"utility"} */
let NamespaceStyles = "";

Namespace.NamespaceStyles = NamespaceStyles;


module.exports = Namespace;

let Release = require("../release/index");
