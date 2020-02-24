export = Facet;
declare const Facet_base: typeof import("../release-object");
/**
 * A NIEM Facet
 * @extends {ReleaseObject<Facet>}
 */
declare class Facet extends Facet_base {
    /**
     * @param {String} typeQName
     * @param {string} value
     * @param {string} [definition]
     * @param {StyleType} [style="enumeration"] Defaults to enumeration
     */
    constructor(typeQName: string, value: string, definition?: string, style?: "length" | "pattern" | "enumeration" | "minLength" | "maxLength" | "whiteSpace" | "maxInclusive" | "minInclusive" | "maxExclusive" | "minExclusive" | "totalDigits" | "fractionDigits");
    typeQName: string;
    style: "length" | "pattern" | "enumeration" | "minLength" | "maxLength" | "whiteSpace" | "maxInclusive" | "minInclusive" | "maxExclusive" | "minExclusive" | "totalDigits" | "fractionDigits";
    value: string;
    definition: string;
    get isCode(): boolean;
    get typePrefix(): string;
    get typeName(): string;
    get sourceDataSet(): import("../interfaces/source/dataSet")<Facet, any, any>;
    async namespace(): Promise<import("../namespace")>;
    async type(): Promise<import("../type")>;
    async dependencies(): Promise<{
        type: import("../type");
        count: number;
    }>;
    get label(): string;
    get identifiers(): {
        userKey: string;
        modelKey: string;
        releaseKey: string;
        typeQName: string;
        style: "length" | "pattern" | "enumeration" | "minLength" | "maxLength" | "whiteSpace" | "maxInclusive" | "minInclusive" | "maxExclusive" | "minExclusive" | "totalDigits" | "fractionDigits";
        value: string;
    };
    toJSON(): {
        typeQName: string;
        style: "length" | "pattern" | "enumeration" | "minLength" | "maxLength" | "whiteSpace" | "maxInclusive" | "minInclusive" | "maxExclusive" | "minExclusive" | "totalDigits" | "fractionDigits";
        value: string;
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
    async add(release?: import("../release"), change?: import("../interfaces/source/change")): Promise<Facet>;
    async delete(change?: import("../interfaces/source/change")): Promise<Facet>;
}
declare namespace Facet {
    export { create, route, identifiers, Styles, CriteriaKeywordFields, StyleType, CriteriaType, IdentifiersType };
}
/**
 * @param {ReleaseObject.NDRVersionType} ndrVersion
 * @param {String} typeQName
 * @param {string} value
 * @param {string} [definition]
 * @param {StyleType} [style="enumeration"] Defaults to enumeration
 */
declare function create(ndrVersion: string, typeQName: string, value: string, definition?: string, style?: "length" | "pattern" | "enumeration" | "minLength" | "maxLength" | "whiteSpace" | "maxInclusive" | "minInclusive" | "maxExclusive" | "minExclusive" | "totalDigits" | "fractionDigits"): Facet;
/**
 * @param {string} userKey
 * @param {string} modelKey
 * @param {string} releaseKey
 * @param {string} typeQName
 * @param {string} value
 * @param {StyleType} [style="enumeration"] Default "enumeration"
 */
declare function route(userKey: string, modelKey: string, releaseKey: string, typeQName: string, value: string, style?: "length" | "pattern" | "enumeration" | "minLength" | "maxLength" | "whiteSpace" | "maxInclusive" | "minInclusive" | "maxExclusive" | "minExclusive" | "totalDigits" | "fractionDigits"): string;
/**
 * @param {string} userKey
 * @param {string} modelKey
 * @param {string} releaseKey
 * @param {string} typeQName
 * @param {string} value
 * @param {StyleType} [style="enumeration"] Default "enumeration"
 */
declare function identifiers(userKey: string, modelKey: string, releaseKey: string, typeQName: string, value: string, style?: "length" | "pattern" | "enumeration" | "minLength" | "maxLength" | "whiteSpace" | "maxInclusive" | "minInclusive" | "maxExclusive" | "minExclusive" | "totalDigits" | "fractionDigits"): {
    userKey: string;
    modelKey: string;
    releaseKey: string;
    typeQName: string;
    style: "length" | "pattern" | "enumeration" | "minLength" | "maxLength" | "whiteSpace" | "maxInclusive" | "minInclusive" | "maxExclusive" | "minExclusive" | "totalDigits" | "fractionDigits";
    value: string;
};
declare var Styles: string[];
declare var CriteriaKeywordFields: string[];
type StyleType = "length" | "pattern" | "enumeration" | "minLength" | "maxLength" | "whiteSpace" | "maxInclusive" | "minInclusive" | "maxExclusive" | "minExclusive" | "totalDigits" | "fractionDigits";
/**
 * Search criteria options for facet find operations.
 */
type CriteriaType = {
    userKey?: string;
    modelKey?: string;
    releaseKey?: string;
    niemReleaseKey?: string;
    typeQName?: string | RegExp;
    typePrefix?: string | string[];
    typeName?: string | RegExp;
    value?: string | RegExp;
    definition?: string | RegExp;
    style?: any[];
    /**
     * True to return only enums; false to return non-enums
     */
    isCode?: boolean;
    /**
     * - value or definition
     */
    keyword?: string | RegExp;
};
type IdentifiersType = {
    userKey: string;
    modelKey: string;
    releaseKey: string;
    typeQName: string;
    value: string;
    style?: "length" | "pattern" | "enumeration" | "minLength" | "maxLength" | "whiteSpace" | "maxInclusive" | "minInclusive" | "maxExclusive" | "minExclusive" | "totalDigits" | "fractionDigits";
};
