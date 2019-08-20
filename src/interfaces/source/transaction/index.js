
class Transaction {

  /**
   * @param {Function} ObjectClass
   * @param {"add"|"edit"|"delete"|"get"|"find"|"count"|"history"} operation
   * @param {NIEMObject} niemObject
   * @param {Object} criteria NIEM object search criteria for find operations
   * @param {Change} change
   */
  constructor(ObjectClass, operation, niemObject, criteria, change = new Change()) {

    this.operation = operation;
    this.niemObject = niemObject;
    this.criteria = criteria;
    this.change = change;
    this.className = ObjectClass;

    this.id = niemObject ? niemObject.id : "";
    this.userKey = niemObject ? niemObject.userKey : "";
    this.modelKey = niemObject ? niemObject.modelKey : "";
    this.releaseKey = niemObject ? niemObject.releaseKey : "";
    this.version = niemObject && niemObject.release ? niemObject.release.version : undefined;
    this.previousID = niemObject ? niemObject.lastRevisionID : "";

  }

  toString() {

    let str = `${this.operation} ${this.className} ${this.id} ${this.change.toString()}`;

    if (this.criteria) {
      str += JSON.stringify(this.criteria) + " ";
    }

    return str;

  }

}

module.exports = Transaction;

let NIEMObject = require("../../../niem-object/index");
let Change = require("../change/index");
