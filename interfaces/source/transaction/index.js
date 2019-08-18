
class Transaction {

  /**
   * @param {"add"|"edit"|"delete"} op
   * @param {NIEMObject} niemObject
   * @param {string} description
   * @param {string} url
   */
  constructor(op, niemObject, description, url) {

    this.op = op;
    this.niemObject = niemObject;
    this.description = description;
    this.url = url;

    this.className = niemObject.constructor.name;
    this.id = niemObject.id;
    this.userKey = niemObject.userKey;
    this.modelKey = niemObject.modelKey;
    this.releaseKey = niemObject.releaseKey;
    this.version = niemObject.release ? niemObject.release.version : undefined;
    this.previousID = niemObject.lastRevisionID;;

  }

}

module.exports = Transaction;

let NIEMObject = require("../../../src/niem-object/index");
