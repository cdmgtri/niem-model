
class Transaction {

  /**
   * @param {Function} ObjectClass
   * @param {"add"|"edit"|"delete"|"get"|"find"|"count"|"history"} operation
   * @param {NIEMObject} niemObject
   * @param {Object} criteria NIEM object search criteria for find operations
   * @param {Change} change
   * @param {number} count
   */
  constructor(ObjectClass, operation, niemObject, criteria, change = new Change(), count) {

    this.className = ObjectClass.name;
    this.operation = operation;
    this.criteria = criteria;
    this.niemObject = niemObject;
    this.change = change;
    this.count = count;
    this.timestamp = (new Date()).toLocaleString();

  }

  toString() {

    let str = `${this.operation} ${this.className} ${this.id} (${this.count}) ${this.change.toString()}`;

    if (this.criteria) {
      str += JSON.stringify(this.criteria) + " ";
    }

    return str;

  }

}

module.exports = Transaction;

let NIEMObject = require("../../../niem-object/index");
let Change = require("../change/index");
