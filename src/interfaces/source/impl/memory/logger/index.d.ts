export = Logger;
/**
 * @template {NIEMObject} T
 */
declare class Logger<T extends import("../../../../../niem-object")<any>> {
    constructor(loggingEnabled?: boolean);
    loggingEnabled: boolean;
    /** @type {Transaction[]} */
    log: Transaction[];
    /**
     * @param {typeof NIEMObject} ObjectClass
     * @param {Transaction.OperationType} operation
     * @param {T} object
     * @param {object} [criteria]
     * @param {Change} [change]
     * @param {number} [count] Number of objects found or affected
     */
    record(ObjectClass: typeof import("../../../../../niem-object"), operation: "add" | "edit" | "delete" | "get" | "find" | "count" | "history" | "revisions", object: T, criteria?: any, change?: import("../../../change"), count?: number): void;
    /**
     * @param {string} route
     * @param {"previousRoute"|"migrationRoute"} lookupRouteField
     * @returns {Transaction[]}
     */
    objectUpdates(route: string, lookupRouteField: "previousRoute" | "migrationRoute"): import("../../../transaction")<any>[];
}
declare let Transaction: typeof import("../../../transaction");
