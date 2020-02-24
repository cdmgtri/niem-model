export = SourceDataSetInterface;
/**
 * @template {NIEMObject<T>} T
 * @template {Object<string, string>} IdentifiersType
 * @template {Object<string, any>} CriteriaType
 */
declare class SourceDataSetInterface<T extends import("../../../niem-object")<T>, IdentifiersType extends {
    [x: string]: string;
}, CriteriaType extends {
    [x: string]: any;
}> {
    /**
     * @param {T} niemObject
     * @param {Change} [change]
     * @returns {Promise<T>}
     */
    async add(niemObject: T, change?: import("../change")): Promise<T>;
    /**
     * @param {T} niemObject
     * @param {Change} [change]
     * @returns {Promise<T>}
     */
    async edit(niemObject: T, change?: import("../change")): Promise<T>;
    /**
     * @param {T} niemObject
     * @param {Change} [change]
     * @returns {Promise<T>}
     */
    async delete(niemObject: T, change?: import("../change")): Promise<T>;
    /**
     * @param {IdentifiersType} identifiers
     * @returns {Promise<T>}
     */
    async get(identifiers: IdentifiersType): Promise<T>;
    /**
     * @param {CriteriaType} [criteria]
     * @returns {Promise<T[]>}
     */
    async find(criteria?: CriteriaType): Promise<T[]>;
    /**
     * @param {CriteriaType} [criteria]
     * @returns {Promise<number>}
     */
    async count(criteria?: CriteriaType): Promise<number>;
    /**
     * @param {T} niemObject
     * @returns {Promise<Transaction[]>}
     */
    async revisions(niemObject: T): Promise<import("../transaction")<any>[]>;
    /**
     * @param {T} niemObject
     * @returns {Promise<Transaction[]>}
     */
    async history(niemObject: T): Promise<import("../transaction")<any>[]>;
}
