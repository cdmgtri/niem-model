
let NIEMObjectFormatInterface = require("./niem-object/interface");

class NIEMFormatInterface {

  /**
   * @param {"3.0"|"4.0"|"5.0"|"6.0"} [ndrVersion="6.0"]
   */
  constructor(ndrVersion="6.0") {

    this.ndrVersion = ndrVersion;

    /** @type {NIEMObjectFormatInterface<import("../../typedefs").Release>} */
    this.release = new NIEMObjectFormatInterface();

    /** @type {NIEMObjectFormatInterface<import("../../typedefs").Namespace>} */
    this.namespace = new NIEMObjectFormatInterface();

    /** @type {NIEMObjectFormatInterface<import("../../typedefs").LocalTerm>} */
    this.localTerm = new NIEMObjectFormatInterface();

    /** @type {NIEMObjectFormatInterface<import("../../typedefs").Property>} */
    this.property = new NIEMObjectFormatInterface();

    /** @type {NIEMObjectFormatInterface<import("../../typedefs").Type>} */
    this.type = new NIEMObjectFormatInterface();

    /** @type {NIEMObjectFormatInterface<import("../../typedefs").Facet>} */
    this.facet = new NIEMObjectFormatInterface();

    /** @type {NIEMObjectFormatInterface<import("../../typedefs").SubProperty>} */
    this.subProperty = new NIEMObjectFormatInterface();

  }

}

module.exports = NIEMFormatInterface;
