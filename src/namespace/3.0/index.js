
let Namespace = require("../index");

class Namespace_3_0 extends Namespace {

  /**
   * The NDR conformance target for the namespace, if available.
   *
   * (The namespace may contain additional non-NDR target identifiers.)
   *
   * @example http://reference.niem.gov/niem/specification/naming-and-design-rules/4.0/#ReferenceSchemaDocument
   * @type {string}
   */
  get ndrConformanceTargetIdentifier() {
    let ndrTargetBase = "http://reference.niem.gov/niem/specification/naming-and-design-rules/";
    return this.conformanceTargets.find( tgt => tgt.startsWith(ndrTargetBase));
  }

  /**
   * @type {"3.0"|"4.0"|"5.0"|"6.0"|string}
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
  }

  /**
   * @type {"ReferenceSchemaDocument"|"ExtensionSchemaDocument"|string}
   */
  get ndrConformanceTarget() {
    if (this.ndrVersion) {
      return this.ndrConformanceTargetIdentifier.split("#")[1];
    }
  }

  get hasNDRConformanceTarget() {
    return typeof this.ndrConformanceTarget == "string";
  }

}

Namespace_3_0.NDRConformanceTargets = [
  "http://reference.niem.gov/niem/specification/naming-and-design-rules/3.0/#ReferenceSchemaDocument",
  "http://reference.niem.gov/niem/specification/naming-and-design-rules/3.0/#ExtensionSchemaDocument"
];


module.exports = Namespace_3_0;
