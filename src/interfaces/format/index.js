
let NIEMObjectFormatInterface = require("./niem-object");

/**
 * @template U
 */
class NIEMModelFormatInterface {

  constructor() {

    /** @type {NIEMObjectFormatInterface<Release, U>} */
    this.release = new NIEMObjectFormatInterface();

    /** @type {NIEMObjectFormatInterface<Namespace, U>} */
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

  /**
   * Assign NDR-specific format classes as needed
   *
   * @param {"3.0"|"4.0"} ndrVersion
   */
  static create(ndrVersion) {
    return new NIEMModelFormatInterface();
  }

}

module.exports = NIEMModelFormatInterface;

let { Model, Release, Namespace, LocalTerm, Property, Type, Facet, SubProperty } = require("../../../index");
