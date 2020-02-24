export = Transaction;
/**
 * @template {NIEMObject} T
 */
declare class Transaction<T extends import("../../../niem-object")<any>> {
    /**
     * @param {typeof NIEMObject} ObjectClass
     * @param {OperationType} operation
     * @param {T} niemObject
     * @param {Object} criteria NIEM object search criteria for find operations
     * @param {Change} change
     * @param {number} count
     */
    constructor(ObjectClass: typeof import("../../../niem-object"), operation: "add" | "edit" | "delete" | "get" | "find" | "count" | "history" | "revisions", niemObject: T, criteria: any, change: import("../change"), count: number);
    className: string;
    operation: "add" | "edit" | "delete" | "get" | "find" | "count" | "history" | "revisions";
    criteria: any;
    niemObject: T;
    change: import("../change");
    count: number;
    timestamp: string;
    get id(): string;
    toString(): string;
}
declare namespace Transaction {
    export { OperationType };
}
type OperationType = "add" | "edit" | "delete" | "get" | "find" | "count" | "history" | "revisions";
