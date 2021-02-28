
// @ts-ignore
let JSZip = require("jszip");


class NIEM {

  /**
   * @param {import("../interfaces/source/interface")} [source]
   */
  constructor(source) {

    let SourceDefault = require("../interfaces/source/index");

    this.sources = source ? [source] : [new SourceDefault()];

  }

  get userKeys() {

    return {

      find: async (criteria={}) => {
        let models = await this.models.find(criteria);
        let userKeys = models.map( model => model.userKey );
        return Array.from( new Set(userKeys) );
      }
    }

  }

  get models() {

    let Model = require("../model/index");

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
        model.niem = this;
        model._source = this.sources[0];
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

    let Release = require("../release/index");

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

    let Namespace = require("../namespace/index");

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

    let LocalTerm = require("../local-term/index");

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

    let Property = require("../property/index");

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

    let Type = require("../type/index");

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

    let Facet = require("../facet/index");

    return {

      /**
       * @param {string} userKey
       * @param {string} modelKey
       * @param {string} releaseKey
       * @param {string} typeQName
       * @param {string} value
       * @param {import("../facet/index").StyleType} [style="enumeration"] Default "enumeration"
       * @param {string} [definition]
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

    let SubProperty = require("../subproperty/index");

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

  get mappings() {
    return {

      find: async (criteria={}) => {
        return this.sources[0].mappings.find(criteria);
      }

    }
  }

  /**
   * @param {string|Object} json - JSON containing one or more NIEM sources
   */
  async load(json) {

    /** @type {Object[]} */
    let sources;

    if (typeof json == "string") {
      sources = JSON.parse(json);
    }
    else {
      sources = json;
    }

    await this.sources[0].load(this, sources[0]);
    // for (let i = 0; i < sources.length; i++) {
      //   if (! this.sources[i]) {
        //     this.sources[i] = new SourceDefault();
        //   }
        // await this.sources[i].load(this, sources[i]);
    // }

  }

  /**
   * Loads a sources JSON file or zip file
   * @param {String} filePath
   */
  async loadFile(filePath) {

    let fs = require("fs").promises;

    // Load a JSON file
    if (filePath.endsWith(".json")) {
      let json = await fs.readFile(filePath, "utf8");
      return this.load(json);
    }

    // Load a zip file
    if (filePath.endsWith(".zip")) {
      let data = await fs.readFile(filePath);
      let zip = await JSZip.loadAsync(data);
      let json = await zip.files["source.json"].async("string");
      return this.load(json);
    }

  }

  /**
   * @param {String} [filePath]
   * @param {Object} [options]
   * @param {boolean} [options.saveFile]
   * @param {boolean} [options.saveZip]
   * @param {boolean} [options.log] True to in include the log in the export
   */
  async export(filePath, options={}) {

    let json = JSON.stringify(this.sources, null, 2);

    if (! options.log) {
      /** @type {Object[]} */
      let sources = JSON.parse(json);
      sources.forEach( source => source.log = [] );
      json = JSON.stringify(sources, null, 2);
    }

    if (filePath) {
      let fs = require("fs").promises;

      if (options.saveFile) {
        await fs.writeFile(filePath + ".json", json);
      }
      if (options.saveZip) {
        let zip = new JSZip();
        zip.file("source.json", json);
        let zipContents = await zip.generateAsync({type: "uint8array", compression: "DEFLATE"});
        await fs.writeFile(filePath + ".zip", zipContents);

      }
    }

    return json;
  }


}

module.exports = NIEM;
