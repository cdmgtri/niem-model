
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
   * @param {Namespace.NamespaceStyleType} [style]
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

  get styleRank() {
    switch (this.style) {
      case "core":
        return 1;
      case "domain":
        return 2;
      case "code":
        return 3;
      case "extension":
        return 4;
      case "adapter":
        return 5;
      case "proxy":
        return 6;
      case "utility":
        return 7;
      case "external":
        return 8;
    }
    return 99;
  }

  get conformanceRequired() {
    return (this.style == "utility" || this.style == "external") ? false : true;
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

  /**
   * Custom sort function to order an array of namespaces by prefix.
   *
   * @static
   * @param {Namespace} ns1
   * @param {Namespace} ns2
   */
  static sortByPrefix(ns1, ns2) {
    return ns1.prefix.localeCompare(ns2.prefix);
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
      return ns1.prefix.localeCompare(ns2.prefix);
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
    return ns1.uri.localeCompare(ns2.uri);
  }

}

/** @type {"core"|"domain"|"code"|"extension"|"adapter"|"external"|"proxy"|"utility"} */
Namespace.NamespaceStyleType;

module.exports = Namespace;

let Release = require("../release/index");
