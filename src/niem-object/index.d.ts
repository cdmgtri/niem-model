export = NIEMObject;
/**
 * Commonalities of NIEM components and other items.
 * @template T
 */
declare class NIEMObject<T> {
    /**
     * The object identifiers from the latest source transaction.
     * @type {{[string: string]: string}}
     */
    previousIdentifiers: {
        [string: string]: string;
    };
    /**
     * The corresponding object identifiers from the previous release.
     * @type {{[string: string]: string}}
     */
    migrationIdentifiers: {
        [string: string]: string;
    };
    /**
     * The corresponding object identifiers from the original subset object.
     * @type {string}
     */
    subsetIdentifiers: string;
    /**
     * A file name, a spreadsheet tab, etc.
     * @type {String}
     */
    input_location: String;
    /**
     * A line number, a spreadsheet row, etc.
     * @type {String}
     */
    input_line: String;
    /**
     * @type {String}
     */
    get previousRoute(): string;
    /**
     * @type {String}
     */
    get migrationRoute(): string;
    /**
     * @type {String}
     */
    get subsetRoute(): string;
    /**
     * @type {SourceDataSet<NIEMObject>}
     */
    get sourceDataSet(): import("../interfaces/source/dataSet")<NIEMObject<any>, any, any>;
    /**
     * An object ID.
     * May be overwritten to return a new kind of value, like a database id.
     */
    get id(): string;
    /**
     * A readable label for a NIEM object.
     * May not be unique in certain cases (non-unique codes) or across releases.
     *
     * @example "niem model"
     * @example "lapd arrestReport"
     *
     * @example Property label "nc:PersonHairColorCode"
     * @example Type-Contains-Property label "nc:PersonType - nc:PersonBirthDate"
     * @example Facet label "ncic:HAIRCodeSimpleType - enum BLK"
     */
    get label(): any;
    /**
     * An ID that distinguishes objects across different users, models, and releases.
     * Not unique for duplicate facets.
     *
     * @type {string}
     * @example "/niem/model"
     * @example "/lapd/arrestReport"
     */
    get route(): string;
    get identifiers(): {};
    toJSON(): {
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
    /**
     * @param {String} location
     * @param {String} line
     */
    updateSource(location: string, line: string): void;
    /**
     * Check for values in all required identifier fields
     */
    get missingIdentifierFields(): string[];
    /**
     * Checks that a NIEM object has unique identifiers needed for source operations.
     *
     * @example "Throws error if a type does not have a name."
     * @example "Returns if a type has a userKey, modelKey, releaseKey, prefix, and name."
     * @throws {Error}
     */
    async checkBaselineFields(): Promise<void>;
    /**
     * Checks that an object ID does or does not exist in the source.
     * @param {"exists"|"available"} expectedStatus
     * @param {Object} identifiers
     */
    async checkSourceID(expectedStatus: "exists" | "available", identifiers: any): Promise<void>;
    async hasDependencies(): Promise<boolean>;
    /**
     * @returns {Promise<Object>}
     */
    async dependencies(): Promise<any>;
    /**
     * @abstract
     * @param {boolean} [current=true] Defaults to true; false for last saved identifiers
     * @returns {Promise<object>}
     */
    async dependents(current?: boolean): Promise<any>;
    /**
     * @todo Review refUpdate
     * @abstract
     * @param {"edit"|"delete"} op
     * @param {Change} change
     * @returns {Promise<object>}
     */
    async updateDependents(op: "edit" | "delete", change?: import("../interfaces/source/change")): Promise<any>;
    /**
     * Save changes to the object.
     * @param {Model|Release} [modelOrRelease]
     * @param {Change} [change]
     */
    async add(modelOrRelease?: import("../release") | import("../model"), change?: import("../interfaces/source/change")): Promise<NIEMObject<T>>;
    model: import("../release") | import("../model");
    release: import("../release") | import("../model");
    /**
     * Save changes to the object.
     * @param {Change} [change]
     */
    async save(change?: import("../interfaces/source/change")): any;
    /**
     * Deletes the object.
     * @param {Change} [change]
     */
    async delete(change?: import("../interfaces/source/change")): Promise<NIEMObject<T>>;
    async history(): Promise<import("../interfaces/source/transaction")<any>[]>;
    async revisions(): Promise<import("../interfaces/source/transaction")<any>[]>;
    /**
     * True if the object matches the given criteria.
     * @param {object} criteria
     * @returns {Boolean}
     */
    match(criteria: any): boolean;
}
declare namespace NIEMObject {
    /**
     * @returns {string}
     */
    export function route(...args: any[]): string;
    /**
     * @abstract
     * @returns {Object<string, string>}
     */
    export function identifiers(...args: any[]): {
        [x: string]: string;
    };
    /**
     * Creates a new class.
     * Used to support different versions of classes based on the NDR version.
     *
     * @abstract
     * @example "Namespace.create('3.0', ...) returns a NDR 3.0-specific Namespace object"
     */
    export function create(ndrVersion: any, ...args: any[]): void;
    /**
     * True if the given object matches the given criteria.
     * @template T
     * @param {T} niemObject
     * @param {object} criteria
     * @returns {Boolean}
     */
    export function match<T_1>(niemObject: T_1, criteria: any): boolean;
    /**
     * An array of NIEM objects that match the given criteria.
     * @template {NIEMObject} T
     * @param {T[]} niemObjects
     * @param {object} criteria
     * @returns {T[]}
     */
    export function matches<T_1 extends NIEMObject<any>>(niemObjects: T_1[], criteria: any): T_1[];
    export const CriteriaKeywordFields: any[];
    export const CriteriaType: any;
    export const IdentifiersType: {
        [x: string]: string | boolean | RegExp | string[];
    };
}
