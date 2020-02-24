export = SourceDataSet;
declare const SourceDataSet_base: any;
/**
 * @template {NIEMObject} T
 * @template {Object<string, string>} IdentifiersType
 * @template {Object<string, any>} CriteriaType
 */
declare class SourceDataSet<T extends import("../../../../../niem-object")<any>, IdentifiersType extends {
    [x: string]: string;
}, CriteriaType extends {
    [x: string]: any;
}> extends SourceDataSet_base {
    [x: string]: any;
    /**
     * @param {typeof NIEMObject} ObjectClass NIEM object class, e.g., Model, Property
     * @param {Logger} logger
     */
    constructor(ObjectClass: typeof import("../../../../../niem-object"), logger: import("../logger")<any>);
    /** @private */
    private ObjectClass;
    /**
     * @private
     * @type {T[]}
      */
    private data;
    /** @private */
    private logger;
    /**
     * @param {T} object
     * @param {Change} change
     */
    async add(object: T, change: import("../../../change")): Promise<T>;
    /**
     * @param {T} object
     * @param {Change} change
     */
    async edit(object: T, change: import("../../../change")): Promise<T>;
    /**
     * @param {T} object
     * @param {Change} change
     */
    async delete(object: T, change: import("../../../change")): Promise<T>;
    /**
     * @param {IdentifiersType} identifiers
     */
    async get(identifiers: IdentifiersType): Promise<T>;
    /**
     * @param {CriteriaType} criteria
     * @returns {Promise<T[]>}
     */
    async find(criteria: CriteriaType): Promise<T[]>;
    /**
     * @param {CriteriaType} criteria
     * @returns {Promise<number>}
     */
    async count(criteria: CriteriaType): Promise<number>;
    /**
     * @param {NIEMObject} object
     * @returns {Promise<Transaction[]>}
     */
    async revisions(object: import("../../../../../niem-object")<any>): Promise<import("../../../transaction")<any>[]>;
    /**
     * @todo Returns objects or transactions?  Need functions for both?
     * @param {NIEMObject} object
     * @returns {Promise<Transaction<T>[]>}
     */
    async history(object: import("../../../../../niem-object")<any>): Promise<import("../../../transaction")<T>[]>;
    /**
     * Deep copies the object to avoid modification by reference
     * @private
     * @returns {T}
     */
    private copy;
    /**
     * @param {T} object
     */
    updatePreviousIdentifiers(object: T): void;
    /**
     * @param {T} object
     * @param {Change} change
     * @param {"edit"|"delete"} op
     */
    async modify(object: T, change: import("../../../change"), op: "edit" | "delete"): Promise<T>;
    /**
     * @param {NIEM} niem
     * @param {T[]} objects
     */
    async load(niem: import("../../../../.."), objects: T[]): Promise<void>;
}
