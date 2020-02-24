export = Property;
declare const Property_base: typeof import("../component");
/**
 * A NIEM Property.
 */
declare class Property extends Property_base {
    /**
     * @param {String} prefix
     * @param {String} name
     * @param {String} [definition]
     * @param {String} [typeQName]
     * @param {String} [groupQName]
     * @param {boolean} [isElement=true]
     * @param {boolean} [isAbstract=false]
     * @param {boolean} [nillable=false]
     */
    constructor(prefix: string, name: string, definition?: string, typeQName?: string, groupQName?: string, isElement?: boolean, isAbstract?: boolean, nillable?: boolean);
    typeQName: string;
    groupQName: string;
    isElement: boolean;
    isAbstract: boolean;
    nillable: boolean;
    get typePrefix(): string;
    get typeName(): string;
    get groupPrefix(): string;
    get groupName(): string;
    get isAttribute(): boolean;
    get isConcrete(): boolean;
    get style(): "abstract" | "attribute" | "substitution" | "element";
    get sourceDataSet(): import("../interfaces/source/dataSet")<Property, any, any>;
    async group(): Promise<Property>;
    async groupHead(): Promise<Property>;
    async type(): Promise<import("../type")>;
    /**
     * @param {CriteriaType} criteria
     */
    async substitutions(criteria?: CriteriaType): Promise<Property[]>;
    /**
     * @param {CriteriaType} criteria
     */
    async substitutionDescendants(criteria?: CriteriaType): Promise<Property[]>;
    get subProperties(): {
        add: (typeQName: any, min: any, max: any, definition: any) => Promise<import("../subproperty")>;
        /**
         * @param {SubProperty.CriteriaType} criteria
         */
        find: (criteria: import("../subproperty").CriteriaType) => Promise<import("../subproperty")[]>;
    };
    async dependencies(): Promise<{
        type: import("../type");
        group: Property;
        count: number;
    }>;
    /**
     * @param {boolean} [current=true] Defaults to true; false for last saved identifiers
     * @returns {Promise<DependentsTypes>}
     */
    async dependents(current?: boolean): Promise<DependentsTypes>;
    /**
     * @param {"edit"|"delete"} op
     * @param {Change} [change]
     */
    async updateDependents(op: "edit" | "delete", change?: import("../interfaces/source/change")): Promise<DependentsTypes>;
    toJSON(): {
        typeQName: string;
        isElement: boolean;
        isAbstract: boolean;
        groupQName: string;
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
    async add(release?: import("../release"), change?: import("../interfaces/source/change")): Promise<Property>;
    async delete(change?: import("../interfaces/source/change")): Promise<Property>;
}
declare namespace Property {
    export { create, createElement, createAttribute, createAbstract, route, CriteriaKeywordFields, IdentifiersType, CriteriaType, DependentsTypes };
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
    typePrefix?: string | string[];
    typeName?: string | RegExp;
    typeQName?: string | RegExp | string[];
    groupQName?: string | RegExp;
    groupPrefix?: string | RegExp;
    isElement?: boolean;
    isAbstract?: boolean;
    /**
     * - Name, definition, or other text keyword fields
     */
    keyword?: string | RegExp;
};
type DependentsTypes = {
    substitutions: Property[];
    subProperties: import("../subproperty")[];
    count: number;
};
/**
 * @param {import("../release-object/index").NDRVersionType} ndrVersion
 * @param {String} prefix
 * @param {String} name
 * @param {String} [definition]
 * @param {String} [typeQName]
 * @param {String} [groupQName]
 * @param {boolean} [isElement=true]
 * @param {boolean} [isAbstract=false]
 */
declare function create(ndrVersion: string, prefix: string, name: string, definition?: string, typeQName?: string, groupQName?: string, isElement?: boolean, isAbstract?: boolean): Property;
/**
 * @param {Release} release
 * @param {string} prefix
 * @param {string} name
 * @param {string} definition
 * @param {string} typeQName
 * @param {string} groupQName
 * @param {boolean} [isAbstract=false]
 */
declare function createElement(release: import("../release"), prefix: string, name: string, definition: string, typeQName: string, groupQName: string, isAbstract?: boolean): Property;
/**
 * @param {Release} release
 * @param {string} prefix
 * @param {string} name
 * @param {string} definition
 * @param {string} typeQName
 */
declare function createAttribute(release: import("../release"), prefix: string, name: string, definition: string, typeQName: string): Property;
/**
 * @param {Release} release
 * @param {string} prefix
 * @param {string} name
 * @param {string} definition
 */
declare function createAbstract(release: import("../release"), prefix: string, name: string, definition: string): Property;
declare function route(userKey: any, modelKey: any, releaseKey: any, prefix: any, name: any): string;
declare var CriteriaKeywordFields: string[];
