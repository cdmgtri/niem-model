
// @ts-ignore
let debug = require("debug")("niem");

let revisionOperations = ["add", "edit", "delete"];

class Logger {

  constructor(loggingEnabled=true) {

    this.loggingEnabled = loggingEnabled;

    /** @type {Transaction[]} */
    this.log = [];

  }

  /**
   * @template {NIEMObject} T
   * @param {typeof NIEMObject} ObjectClass
   * @param {Transaction.OperationType} operation
   * @param {T} object
   * @param {object} [criteria]
   * @param {Change} [change]
   * @param {number} [count] Number of objects found or affected
   */
  record(ObjectClass, operation, object, criteria, change, count) {

    let transaction = new Transaction(ObjectClass, operation, object, criteria, change, count);
    debug(transaction.toString());

    if (this.loggingEnabled) {
      this.log.push(transaction);
    }
  }

  /**
   * @param {string} route
   * @param {"previousRoute"|"migrationRoute"} lookupRouteField
   * @returns {Transaction[]}
   */
  objectUpdates(route, lookupRouteField) {

    let matches = this.log
    .filter( row => row.niemObject && revisionOperations.includes(row.operation) )
    .filter( row => row.niemObject.route == route);

    if (! matches || matches.length == 0) return [];

    let lookupRoute = matches[0].niemObject[lookupRouteField];

    if (! lookupRoute) return matches;

    return [ ...this.objectUpdates(lookupRoute, lookupRouteField), ...matches ];

  }


}

module.exports = Logger;

let Change = require("../change/index");
let Transaction = require("../transaction/index");
let NIEMObject = require("../../../niem-object/index");
