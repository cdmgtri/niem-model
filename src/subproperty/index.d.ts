export = SubProperty;
declare const SubProperty_base: typeof import("../release-object");
/**
 * A usage of a property by a type.
 */
declare class SubProperty extends SubProperty_base {
    /**
     * @param {String} typeQName
     * @param {String} propertyQName
     * @param {String} [min="0"] Default "0"
     * @param {String} [max="unbounded"] Default "unbounded"; or "1" if property name begins with a lower case letter
     * @param {String} definition
     */
    constructor(typeQName: string, propertyQName: string, min?: string, max?: string, definition: string);
    typeQName: string;
    propertyQName: string;
    min: string;
    max: string;
    definition: string;
    get typePrefix(): string;
    get typeName(): string;
    get propertyPrefix(): string;
    get propertyName(): string;
    get sourceDataSet(): import("../interfaces/source/dataSet")<SubProperty, any, any>;
    /**
     * Namespace of the type
     */
    async namespace(): Promise<import("../namespace")>;
    async type(): Promise<import("../type")>;
    async property(): Promise<import("../property")>;
    async dependencies(): Promise<{
        type: import("../type");
        property: import("../property");
        count: number;
    }>;
    async isElement(): Promise<boolean>;
    get label(): string;
    get identifiers(): {
        typeQName: string;
        propertyQName: string;
        releaseKey: string;
        userKey: string;
        modelKey: string;
    };
    toJSON(): {
        typeQName: string;
        propertyQName: string;
        min: string;
        max: string;
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
    async add(release?: import("../release"), change?: import("../interfaces/source/change")): Promise<SubProperty>;
    async delete(change?: import("../interfaces/source/change")): Promise<SubProperty>;
}
declare namespace SubProperty {
    export { create, route, identifiers, CriteriaType, CriteriaKeywordFields, IdentifiersType };
}
/**
 * @param {ReleaseObject.NDRVersionType} ndrVersion
 * @param {String} typeQName
 * @param {String} propertyQName
 * @param {String} [min="0"] Default "0"
 * @param {String} [max="unbounded"] Default "unbounded"; or "1" if property name begins with a lower case letter
 * @param {String} definition
 */
declare function create(ndrVersion: string, typeQName: string, propertyQName: string, min?: string, max?: string, definition: string): SubProperty;
/**
 * @example "/niem/model/4.1/types/nc:PersonType/properties/nc:PersonName"
 */
declare function route(userKey: any, modelKey: any, releaseKey: any, typeQName: any, propertyQName: any): string;
/**
 * @param {string} userKey
 * @param {string} modelKey
 * @param {string} releaseKey
 * @param {string} typeQName
 * @param {string} propertyQName
 */
declare function identifiers(userKey: string, modelKey: string, releaseKey: string, typeQName: string, propertyQName: string): {
    userKey: string;
    modelKey: string;
    releaseKey: string;
    typeQName: string;
    propertyQName: string;
};
/**
 * Search criteria options for subProperty find operations.
 */
type CriteriaType = {
    userKey?: string;
    modelKey?: string;
    releaseKey?: string;
    niemReleaseKey?: string;
    typePrefix?: string | string[];
    typeName?: string | RegExp;
    typeQName?: string | RegExp;
    propertyPrefix?: string | string[];
    propertyName?: string | RegExp;
    propertyQName?: string | RegExp;
    min?: string | RegExp;
    max?: string | RegExp;
    /**
     * - Property and type names
     */
    keyword?: string | RegExp;
};
declare var CriteriaType: {};
declare var CriteriaKeywordFields: string[];
type IdentifiersType = {
    userKey: string;
    modelKey: string;
    releaseKey: string;
    typeQName: string | RegExp;
    propertyQName: string | RegExp;
};
