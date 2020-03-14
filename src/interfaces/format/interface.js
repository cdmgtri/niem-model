
let NIEMObjectFormatInterface = require("./niem-object/interface");

class NIEMFormatInterface {

  /**
   * @param {"3.0"|"4.0"|"5.0"} ndrVersion
   */
  constructor(ndrVersion) {

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

let { Release, Namespace, LocalTerm, Property, Type, Facet, SubProperty } = require("../../index");
