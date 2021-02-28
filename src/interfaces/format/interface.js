
let NIEMObjectFormatInterface = require("./niem-object/interface");

class NIEMFormatInterface {

  /**
   * @param {"3.0"|"4.0"|"5.0"} [ndrVersion="5.0"]
   */
  constructor(ndrVersion="5.0") {

    this.ndrVersion = ndrVersion;

    /** @type {NIEMObjectFormatInterface<Release>} */
    this.release = new NIEMObjectFormatInterface();

    /** @type {NIEMObjectFormatInterface<Namespace>} */
    this.namespace = new NIEMObjectFormatInterface();

    /** @type {NIEMObjectFormatInterface<LocalTerm>} */
    this.localTerm = new NIEMObjectFormatInterface();

    /** @type {NIEMObjectFormatInterface<Property>} */
    this.property = new NIEMObjectFormatInterface();

    /** @type {NIEMObjectFormatInterface<Type>} */
    this.type = new NIEMObjectFormatInterface();

    /** @type {NIEMObjectFormatInterface<Facet>} */
    this.facet = new NIEMObjectFormatInterface();

    /** @type {NIEMObjectFormatInterface<SubProperty>} */
    this.subProperty = new NIEMObjectFormatInterface();

  }

}

module.exports = NIEMFormatInterface;

let Release = require("../../release/index");
let Namespace = require("../../namespace/index");
let LocalTerm = require("../../local-term/index");
let Property = require("../../property/index");
let Type = require("../../type/index");
let Facet = require("../../facet/index");
let SubProperty = require("../../subproperty/index");
