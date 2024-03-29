
let ReleaseObject = require("../release-object/index");

/**
 * A root class for commonalities between properties and types.
 * @abstract
 * @template T
 * @extends {ReleaseObject<T>}
 */
class Component extends ReleaseObject {

  /**
   * @param {string} prefix
   * @param {string} name
   * @param {string} definition
   */
  constructor(prefix, name, definition) {

    super();

    /**
     * Prefix of the namespace in which the property is defined
     * @type {string}
     */
    this.prefix = prefix;
    this.name = name;
    this.definition = definition;

    /**
     * @private
     * @type {"Property"|"Type"}
     */
    this.componentClass = /** @type {"Property"|"Type"} */ (this.constructor.name);
  }

  /**
   * Qualified name
   */
  get qname() {
    return this.prefix + ":" + this.name;
  }

  /**
   * @param  {string} qname
   */
  set qname(qname) {
    this.prefix = Component.getPrefix(qname);
    this.name = Component.getName(qname);
  }

  /**
   * An array of terms inferred from the name of the component based on camel casing.
   *
   * @readonly
   * @type {string[]}
   */
  get terms() {

    if (! this.name) return [];

    // Add a space between a lowercase letter (or number) and an uppercase letter
    let s = this.name.replace(/([a-z0-9])([A-Z])/g, "$1 $2");

    // Add a space before the last letter in a series of uppercase letters or nums
    s = s.replace(/([A-Z0-9])([A-Z][a-z])/g, "$1 $2");

    // Replace an underscore with a space
    s = s.replace(/_/g, " ");

    return s.split(" ");
  }

  /**
   * Name portion from a component qualified name (qname).
   * @example "Given 'nc:Person', returns 'Person'.
   * @param {string} qname
   * @returns {string}
   */
  static getName(qname) {
    if (qname && qname.match(/.+:.+/)) {
      return qname.split(":")[1];
    }
  }

  /**
   * Namespace prefix from a component qualified name (qname).
   * @example "Given 'nc:Person', returns 'nc'.
   * @param {string} qname
   * @returns {string}
   */
  static getPrefix(qname) {
    if (qname && qname.match(/.+:.+/)) {
      return qname.split(":")[0];
    }
  }

  /**
   * Gets the namespace object of the component.
   */
  async namespace() {
    return this.release.namespaces.get(this.prefix);
  }

  /**
   * @abstract
   */
  get contents() {
    return undefined;
  }

  /**
   * Custom sort function to order an array of components by qualified name.
   *
   * @example "ag:ProducerShare would appear before nc:Activity"
   *
   * @param {Component} component1
   * @param {Component} component2
   */
  static sortByQName(component1, component2) {
    if (!component1 || ! component2) return 0;
    return component1.qname.localeCompare(component2.qname);
  }

  /**
   * Custom sort function to order an array of components by qualified name.
   *
   * @example "ag:ProducerShare would appear before nc:Activity"
   *
   * @param {Component} component1
   * @param {Component} component2
   */
  static sortByCoreQName(component1, component2) {
    if (!component1 || ! component2) return 0;

    // Sort prefixes starting with "nc" first
    if (component1.prefix != component2.prefix) {
      if (component1.prefix.startsWith("nc")) return -1;
      else if (component2.prefix.startsWith("nc")) return 1;
    }

    // Otherwise sort by qname
    return component1.qname.localeCompare(component2.qname);
  }

  /**
   * Custom sort function to order an array of components by name, and then by prefix.
   *
   * @example "nc:Activity would appear before ag:ProducerShare"
   *
   * @param {Component} component1
   * @param {Component} component2
   */
  static sortByName(component1, component2) {

    if (!component1 || ! component2) return 0;

    // Sort by prefix if names match
    if (component1.name == component2.name) {
      return component1.prefix.localeCompare(component2.prefix);
    }

    // Sort by name
    return component1.name.localeCompare(component2.name);
  }

  /**
   * Custom sort function to order an array of components by name, and then by prefix.
   *
   * @example "nc:Activity would appear before ag:ProducerShare"
   *
   * @param {Component} component1
   * @param {Component} component2
   */
  static sortByNameCaseSensitive(component1, component2) {

    if (!component1 || ! component2) return 0;

    // Sort by prefix if names match
    if (component1.name == component2.name) {
      return component1.prefix < component2.prefix ? -1 : 1;
    }

    // Sort by name
    return component1.name < component2.name ? -1 : 1;
  }

  /**
   * @param {import("../typedefs").Release} release
   */
  static sortByNameFunction(release) {
    if (release.majorDigit < 5) {
      return Component.sortByNameCaseSensitive;
    }
    return Component.sortByName;
  }

  /**
   * Custom sort function to order an array of components by namespace style
   * (Core, then domains, etc), and then name.
   *
   * @example "nc:PersonName would appear before scr:PersonAugmentation"
   *
   * @param {import("../typedefs").Release} release
   * @param {Component[]} components
   */
  static async sortListByNamespaceStyle(release, components) {

    /** @type {Component[]} */
    let results = [];

    let prefixes = new Set( components.map( component => component.prefix ) );

    /** @type {Namespace[]} */
    let namespaces = [];

    for (let prefix of prefixes) {
      let namespace = await release.namespaces.get(prefix);
      namespaces.push(namespace);
    }

    namespaces = namespaces.sort(Namespace.sortByStyle);

    for (let namespace of namespaces) {
      let namespaceComponents = components.filter( component => component.prefix == namespace.prefix );
      results = results.concat( namespaceComponents.sort(Component.sortByName) );
    }

    return results;

  }

  get authoritativePrefix() {
    return this.prefix;
  }

  get label() {
    return this.qname;
  }

  get identifiers() {
    return {
      ...super.identifiers,
      prefix: this.prefix,
      name: this.name
    };
  }

  /**
   * @param {string} userKey
   * @param {string} modelKey
   * @param {string} releaseKey
   * @param {string} prefix
   * @param {string} name
   */
  static identifiers(userKey, modelKey, releaseKey, prefix, name) {
    return {userKey, modelKey, releaseKey, prefix, name};
  }

  toJSON() {
    return {
      ...super.toJSON(),
      prefix: this.prefix,
      name: this.name,
      definition: this.definition
    };
  }

}

/**
 * @typedef {Object} IdentifiersType
 * @property {string} userKey
 * @property {string} modelKey
 * @property {string} releaseKey
 * @property {string} prefix
 * @property {string} name
 */
/**
 * @type {IdentifiersType}
 */
let ComponentIdentifiersType;

Component.ComponentIdentifiersType = ComponentIdentifiersType;

module.exports = Component;

let Namespace = require("../namespace/index");
