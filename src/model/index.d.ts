export = Model;
declare const Model_base: typeof import("../niem-object");
/**
 * @extends {NIEMObject}
 */
declare class Model extends Model_base {
    /**
     * @param {string} userKey
     * @param {string} modelKey
     * @param {StyleType} [style]
     * @param {string} [description]
     * @param {string} [website]
     * @param {string} [repo]
     */
    constructor(userKey: string, modelKey: string, style?: "model" | "IEPD" | "other", description?: string, website?: string, repo?: string);
    /** @type {NIEMModelSourceInterface} */
    _source: NIEMModelSourceInterface;
    userKey: string;
    modelKey: string;
    style: "model" | "IEPD" | "other";
    description: string;
    website: string;
    repo: string;
    niem: import("..");
    /**
     * @param {NIEMModelSourceInterface} source
     */
    set source(arg: import("../interfaces/source"));
    get source(): import("../interfaces/source");
    get sourceDataSet(): import("../interfaces/source/dataSet")<Model, any, any>;
    get releases(): {
        /**
         * @param {string} releaseKey
         * @param {string} [niemReleaseKey]
         * @param {"3.0"|"4.0"} [ndrVersion]
         * @param {string} [version]
         * @param {Release.StatusType} [status]
         * @param {string} [baseURI]
         * @param {string} [branch]
         * @param {string} [description]
         * @returns {Promise<Release>}
         */
        add: (releaseKey: string, niemReleaseKey?: string, ndrVersion?: "3.0" | "4.0", version?: string, status?: "draft" | "published", baseURI?: string) => Promise<import("../release")>;
        get: (releaseKey: any) => Promise<import("../release")>;
        /**
         * @param {Release.CriteriaType} [criteria]
         */
        find: (criteria?: import("../release").CriteriaType) => Promise<import("../release")[]>;
    };
    get label(): string;
    get identifiers(): {
        userKey: string;
        modelKey: string;
    };
    toJSON(): {
        style: "model" | "IEPD" | "other";
        description: string;
        website: string;
        repo: string;
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
    async add(modelOrRelease?: import("../release") | Model, change?: import("../interfaces/source/change")): Promise<Model>;
    async delete(change?: import("../interfaces/source/change")): Promise<Model>;
}
declare namespace Model {
    export { create, route, identifiers, Styles, CriteriaType, StyleType, IdentifiersType };
}
declare let NIEMModelSourceInterface: typeof import("../interfaces/source");
/**
 * @param {string} userKey
 * @param {string} modelKey
 * @param {StyleType} [style]
 * @param {string} [description]
 * @param {string} [website]
 * @param {string} [repo]
 */
declare function create(userKey: string, modelKey: string, style?: "model" | "IEPD" | "other", description?: string, website?: string, repo?: string): Model;
declare function route(userKey: any, modelKey: any): string;
/**
 * @param {string} userKey
 * @param {string} modelKey
 */
declare function identifiers(userKey: string, modelKey: string): {
    userKey: string;
    modelKey: string;
};
declare var Styles: string[];
/**
 * Search criteria options for model find operations.
 *
 * String fields are for exact matches.
 */
type CriteriaType = {
    userKey?: string;
    modelKey?: string;
    style?: "model" | "IEPD" | "other";
};
declare var CriteriaType: CriteriaType;
type StyleType = "model" | "IEPD" | "other";
type IdentifiersType = {
    userKey: string;
    modelKey: string;
};
