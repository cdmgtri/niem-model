export = Type;
declare const Type_base: typeof import("../component");
/**
 * A NIEM Type.
 */
declare class Type extends Type_base {
    /**
     * @param {string} prefix
     * @param {string} name
     * @param {string} [definition]
     * @param {StyleType} [style]
     * @param {string} [baseQName]
     */
    constructor(prefix: string, name: string, definition?: string, style?: "object" | "metadata" | "adapter" | "association" | "augmentation" | "CSC" | "simple" | "list" | "union", baseQName?: string);
    style: "object" | "metadata" | "adapter" | "association" | "augmentation" | "CSC" | "simple" | "list" | "union";
    baseQName: string;
    memberQNames: any[];
    /**
     * True if the type is complex and capable of carrying attributes.
     * @type {Boolean}
     */
    get isComplexType(): boolean;
    /**
     * True if the type is complex and capable of carrying elements.
     */
    get isComplexContent(): boolean;
    /**
     * True if the type is simple and carries a value only.
     * @type {Boolean}
     */
    get isSimpleType(): boolean;
    /**
     * True if the type can carry a value - a simple type or a CSC type (a complex
     * type with a value and attributes).
     */
    get isSimpleContent(): boolean;
    /**
     * Name from the type base's qname field.
     */
    get baseName(): string;
    /**
     * Namespace prefix from the type base's qname field.
     */
    get basePrefix(): string;
    get baseQNameDefault(): string;
    /**
     * The general type style - CCC, CSC, or S.
     * @returns {"CCC"|"CSC"|"S"}
     */
    get styleCategory(): "CSC" | "CCC" | "S";
    get sourceDataSet(): import("../interfaces/source/dataSet")<Type, any, any>;
    async base(): Promise<Type>;
    async members(): Promise<Type[]>;
    get facets(): {
        /**
         * @param {string} value
         * @param {string} definition
         * @param {Facet.StyleType} [style="enumeration"] Default "enumeration"
         */
        add: (value: string, definition: string, style?: "length" | "pattern" | "enumeration" | "minLength" | "maxLength" | "whiteSpace" | "maxInclusive" | "minInclusive" | "maxExclusive" | "minExclusive" | "totalDigits" | "fractionDigits") => Promise<import("../facet")>;
        /**
         * @param {string} value
         * @param {Facet.StyleType} [style="enumeration"] Default "enumeration"
         */
        get: (value: string, style?: "length" | "pattern" | "enumeration" | "minLength" | "maxLength" | "whiteSpace" | "maxInclusive" | "minInclusive" | "maxExclusive" | "minExclusive" | "totalDigits" | "fractionDigits") => Promise<import("../facet")>;
        /**
         * @param {Facet.CriteriaType} criteria
         */
        find: (criteria?: import("../facet").CriteriaType) => Promise<import("../facet")[]>;
        /**
         * @param {Facet.CriteriaType} criteria
         */
        count: (criteria?: import("../facet").CriteriaType) => Promise<number>;
    };
    get subProperties(): {
        /**
         * @param {string} propertyQName
         * @param {string} [min="0"] Defaults to "0"
         * @param {string} [max="unbounded"] Defaults to "unbounded"
         * @param {string} definition
         */
        add: (propertyQName: string, min?: string, max?: string, definition: string) => Promise<import("../subproperty")>;
        /**
         * @param {string} propertyQName
         */
        get: (propertyQName: string) => Promise<import("../subproperty")>;
        /**
         * @param {SubProperty.CriteriaType} criteria
         */
        find: (criteria?: import("../subproperty").CriteriaType) => Promise<import("../subproperty")[]>;
        /**
         * @param {SubProperty.CriteriaType} criteria
         */
        count: (criteria?: import("../subproperty").CriteriaType) => Promise<number>;
    };
    get dataProperties(): {
        /**
         * @param {Property.CriteriaType} criteria
         */
        find: (criteria?: import("../property").CriteriaType) => Promise<import("../property")[]>;
        /**
         * @param {Property.CriteriaType} criteria
         */
        count: (criteria?: import("../property").CriteriaType) => Promise<number>;
    };
    /**
     * @param {CriteriaType} criteria
     */
    async childTypes(criteria: CriteriaType): Promise<Type[]>;
    /**
     * @param {CriteriaType} criteria
     */
    async childDescendantTypes(criteria: CriteriaType): Promise<Type[]>;
    async dependencies(): Promise<{
        base: Type;
        count: number;
    }>;
    /**
     * @param {boolean} [current=true] Defaults to true; false for last saved identifiers
     */
    async dependents(current?: boolean): Promise<{
        childTypes: Type[];
        subProperties: import("../subproperty")[];
        dataProperties: import("../property")[];
        facets: import("../facet")[];
        count: number;
    }>;
    /**
     * @param {"edit"|"delete"} op
     * @param {Change} change
     */
    async updateDependents(op: "edit" | "delete", change: import("../interfaces/source/change")): Promise<void>;
    toJSON(): {
        style: "object" | "metadata" | "adapter" | "association" | "augmentation" | "CSC" | "simple" | "list" | "union";
        baseQName: string;
        memberQNames: any[];
        prefix: string;
        name: string;
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
    async add(release?: import("../release"), change?: import("../interfaces/source/change")): Promise<Type>;
    async delete(change?: import("../interfaces/source/change")): Promise<Type>;
}
declare namespace Type {
    export { create, route, ComplexStyles, SimpleStyles, Styles, CriteriaKeywordFields, ComplexStyleType, SimpleStyleType, StyleType, CriteriaType, IdentifiersType };
}
/**
 * Search criteria options for type find operations.
 *
 * String fields are for exact matches.
 */
type CriteriaType = {
    userKey?: string;
    modelKey?: string;
    releaseKey?: string;
    niemReleaseKey?: string;
    prefix?: string | string[];
    name?: string | RegExp;
    definition?: string | RegExp;
    /**
     * - Name, definition, or other type keyword fields
     */
    keyword?: string | RegExp;
    baseQName?: string | RegExp;
    baseName?: string | RegExp;
    basePrefix?: string | RegExp;
    style?: any[];
    isComplexType?: boolean;
    isComplexContent?: boolean;
};
/**
 * Testing
 // @ts-ignore
 * @param {import("../release-object/index").NDRVersionType} ndrVersion
 * @param {string} prefix
 * @param {string} name
 * @param {string} definition
 * @param {StyleType} style
 * @param {string} [baseQName]
 */
declare function create(ndrVersion: string, prefix: string, name: string, definition: string, style: "object" | "metadata" | "adapter" | "association" | "augmentation" | "CSC" | "simple" | "list" | "union", baseQName?: string): Type;
declare function route(userKey: any, modelKey: any, releaseKey: any, qname: any): string;
declare var ComplexStyles: string[];
declare var SimpleStyles: string[];
declare var Styles: string[];
declare var CriteriaKeywordFields: string[];
type ComplexStyleType = "object" | "metadata" | "adapter" | "association" | "augmentation" | "CSC";
type SimpleStyleType = "simple" | "list" | "union";
type StyleType = "object" | "metadata" | "adapter" | "association" | "augmentation" | "CSC" | "simple" | "list" | "union";
type IdentifiersType = {
    userKey: string;
    modelKey: string;
    releaseKey: string;
    prefix: string;
    name: string;
};
