export = LocalTerm;
declare const LocalTerm_base: typeof import("../release-object");
declare class LocalTerm extends LocalTerm_base {
    /**
     * @param {String} prefix
     * @param {String} term
     * @param {String} literal
     * @param {String} definition
     */
    constructor(prefix: string, term: string, literal: string, definition: string);
    prefix: string;
    term: string;
    literal: string;
    definition: string;
    get sourceDataSet(): import("../interfaces/source/dataSet")<LocalTerm, any, any>;
    get namespace(): Promise<import("../namespace")>;
    /**
     * @example "nc - NIEM"
     */
    get label(): string;
    get identifiers(): {
        prefix: string;
        term: string;
        releaseKey: string;
        userKey: string;
        modelKey: string;
    };
    toJSON(): {
        prefix: string;
        term: string;
        literal: string;
        definition: string;
        releaseKey: string;
        userKey: any;
        modelKey: any;
        migrationIdentifiers: {
            [string: string]: string;
        };
        previousIdentifiers: {
            [string: string]: string;
        };
        input_location: string;
        input_line: string;
    };
    async add(release?: import("../release"), change?: import("../interfaces/source/change")): Promise<LocalTerm>;
    async delete(change?: import("../interfaces/source/change")): Promise<LocalTerm>;
}
declare namespace LocalTerm {
    export { create, route, identifiers, CriteriaType, CriteriaKeywordFields, IdentifiersType };
}
/**
 * @param {ReleaseObject.NDRVersionType} ndrVersion
 * @param {String} prefix
 * @param {String} term
 * @param {String} literal
 * @param {String} definition
 */
declare function create(ndrVersion: string, prefix: string, term: string, literal: string, definition: string): LocalTerm;
/**
 * @param {String} userKey
 * @param {String} modelKey
 * @param {String} releaseKey
 * @param {String} prefix
 * @param {String} term
 */
declare function route(userKey: string, modelKey: string, releaseKey: string, prefix: string, term: string): string;
/**
 * @param {String} userKey
 * @param {String} modelKey
 * @param {String} releaseKey
 * @param {String} prefix
 * @param {String} term
 */
declare function identifiers(userKey: string, modelKey: string, releaseKey: string, prefix: string, term: string): {
    userKey: string;
    modelKey: string;
    releaseKey: string;
    prefix: string;
    term: string;
};
/**
 * Search criteria options for local term find operations.
 */
type CriteriaType = {
    userKey?: string;
    modelKey?: string;
    releaseKey?: string;
    niemReleaseKey?: string;
    prefix?: string | string[];
    keyword?: string | RegExp;
};
declare var CriteriaType: {};
declare var CriteriaKeywordFields: string[];
type IdentifiersType = {
    userKey: string;
    modelKey: string;
    releaseKey: string;
    prefix: string;
    term: string;
};
