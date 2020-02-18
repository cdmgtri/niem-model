
/**
 * @template {NIEMObject} T
 */
class Transaction {

  /**
   * @param {typeof NIEMObject} ObjectClass
   * @param {OperationType} operation
   * @param {T} niemObject
   * @param {Object} criteria NIEM object search criteria for find operations
   * @param {Change} change
   * @param {number} count
   */
  constructor(ObjectClass, operation, niemObject, criteria, change = new Change(), count) {

    this.className = ObjectClass["name"];
    this.operation = operation;
    this.criteria = criteria;
    this.niemObject = niemObject;
    this.change = change;
    this.count = count;
    this.timestamp = (new Date()).toLocaleString();

  }

  get id() {
    if (this.niemObject) return this.niemObject.id;
  }

  toString() {

    let str = `${this.operation} ${this.className} ${this.id} (${this.count}) ${this.change.toString()}`;

    if (this.criteria) {
      str += JSON.stringify(this.criteria) + " ";
    }

    return str;

  }

}

/** @typedef {"add"|"edit"|"delete"|"get"|"find"|"count"|"history"|"revisions"} OperationType */
let TransactionOperationType;

module.exports = Transaction;

let NIEMObject = require("../../../niem-object/index");
let Change = require("../change/index");
