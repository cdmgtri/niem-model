export = NIEMObjectFormatInterface;
/**
 * @template {NIEMObject} T
 * @template U
 */
declare class NIEMObjectFormatInterface<T extends import("../../../niem-object")<any>, U> {
    /**
     * @param {U} input
     * @returns {T}
     */
    parse(input: U): T;
    /**
     * @param {U} input
     * @param {Release} release
     * @returns {Promise<T>}
     */
    async load(input: U, release: import("../../../release")): Promise<T>;
    /**
     * @param {T} niemObject
     * @returns {Promise<U>}
     */
    async generate(niemObject: T): Promise<U>;
}
