export = Namespace;
declare const Namespace_base: typeof import("../release-object");
/**
 * A NIEM Namespace
 */
declare class Namespace extends Namespace_base {
    /**
     * @param {String} prefix
     * @param {StyleType} [style]
     * @param {String} [uri]
     * @param {String} [fileName]
     * @param {String} [definition]
     * @param {String} [version]
     */
    constructor(prefix: string, style?: "code" | "core" | "domain" | "extension" | "adapter" | "external" | "proxy" | "utility" | "csv" | "built-in" | "CS", uri?: string, fileName?: string, definition?: string, version?: string);
    prefix: string;
    style: "code" | "core" | "domain" | "extension" | "adapter" | "external" | "proxy" | "utility" | "csv" | "built-in" | "CS";
    uri: string;
    fileName: string;
    definition: string;
    version: string;
    conformanceTargets: any[];
    /** @type {String} */
    relativePath: String;
    /** @type {String} */
    xsdString: String;
    get styleRank(): 1 | 5 | 10 | 15 | 20 | 25 | 30 | 35 | 40 | 45 | 99;
    get conformanceRequired(): boolean;
    get load(): {
        xsd: (xsdString: any) => Promise<Namespace>;
        json: (jsonString: any) => Promise<Namespace>;
    };
    get sourceDataSet(): import("../interfaces/source/dataSet")<Namespace, any, any>;
    get localTerms(): {
        /**
         * @param {string} term
         * @param {string} [literal]
         * @param {string} [definition]
         */
        add: (term: string, literal?: string, definition?: string) => Promise<import("../local-term")>;
        /**
         * @param {string} term
         */
        get: (term: string) => Promise<import("../local-term")>;
        /**
         * @param {LocalTerm.CriteriaType} criteria
         */
        find: (criteria?: import("../local-term").CriteriaType) => Promise<import("../local-term")[]>;
        /**
         * @param {LocalTerm.CriteriaType} criteria
         */
        count: (criteria?: import("../local-term").CriteriaType) => Promise<number>;
    };
    get properties(): {
        /**
         * @param {string} name
         * @param {string} definition
         * @param {string} [typeQName]
         * @param {string} [groupQName]
         * @param {boolean} [isElement=true] Defaults to true
         * @param {boolean} [isAbstract=false] Defaults to false
         */
        add: (name: string, definition: string, typeQName?: string, groupQName?: string, isElement?: boolean, isAbstract?: boolean) => Promise<import("../property")>;
        /**
         * @param {string} name
         */
        get: (name: string) => Promise<import("../property")>;
        /**
         * @param {Property.CriteriaType} criteria
         */
        find: (criteria?: import("../property").CriteriaType) => Promise<import("../property")[]>;
        /**
         * @param {Property.CriteriaType} criteria
         */
        count: (criteria?: import("../property").CriteriaType) => Promise<number>;
    };
    get types(): {
        /**
         * @param {string} name
         * @param {string} definition
         * @param {Type.StyleType} style
         * @param {string} [baseQName]
         */
        add: (name: string, definition: string, style: "object" | "metadata" | "adapter" | "association" | "augmentation" | "CSC" | "simple" | "list" | "union", baseQName?: string) => Promise<import("../type")>;
        /**
         * @param {string} name
         */
        get: (name: string) => Promise<import("../type")>;
        /**
         * @param {Type.CriteriaType} criteria
         */
        find: (criteria?: import("../type").CriteriaType) => Promise<import("../type")[]>;
        /**
         * @param {Type.CriteriaType} criteria
         */
        count: (criteria?: import("../type").CriteriaType) => Promise<number>;
    };
    get facets(): {
        /**
         * @param {string} typeName
         * @param {string} value
         * @param {string} definition
         * @param {Facet.StyleType} [style="enumeration"] Default "enumeration"
         */
        add: (typeName: string, value: string, definition: string, style?: "length" | "pattern" | "enumeration" | "minLength" | "maxLength" | "whiteSpace" | "maxInclusive" | "minInclusive" | "maxExclusive" | "minExclusive" | "totalDigits" | "fractionDigits") => Promise<import("../facet")>;
        /**
         * @param {string} name
         * @param {string} value
         * @param {Facet.StyleType} [style="enumeration"] Default "enumeration"
         */
        get: (name: string, value: string, style?: "length" | "pattern" | "enumeration" | "minLength" | "maxLength" | "whiteSpace" | "maxInclusive" | "minInclusive" | "maxExclusive" | "minExclusive" | "totalDigits" | "fractionDigits") => Promise<import("../facet")>;
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
         * @param {string} typeName
         * @param {string} propertyQName
         * @param {string} min
         * @param {string} max
         * @param {string} definition
         */
        add: (typeName: string, propertyQName: string, min: string, max: string, definition: string) => Promise<import("../subproperty")>;
        /**
         * @param {string} typeName
         * @param {string} propertyQName
         */
        get: (typeName: string, propertyQName: string) => Promise<import("../subproperty")>;
        /**
         * @param {SubProperty.CriteriaType} criteria
         */
        find: (criteria?: import("../subproperty").CriteriaType) => Promise<import("../subproperty")[]>;
        /**
         * @param {SubProperty.CriteriaType} criteria
         */
        count: (criteria?: import("../subproperty").CriteriaType) => Promise<number>;
    };
    /**
     * @example `For Core, dependents j:PersonEyeColorCode (substitutes for
       nc:PersonEyeColorAbstract) and hs:ServiceType (extends nc:ActivityType)`
     */
    async dependencies(): Promise<{
        substitutions: import("../property")[];
        dataProperties: import("../property")[];
        childTypes: import("../type")[];
        subProperties: import("../subproperty")[];
        count: number;
    }>;
    /**
     * @example "For Core, dependents nc:Person and nc:PersonType"
     */
    async dependents(): Promise<{
        count: number;
        localTerms: import("../local-term")[];
        properties: import("../property")[];
        types: import("../type")[];
    }>;
    /**
     * Update namespace dependents.  Operations will cascade through the
     * namespace properties and types.
     *
     * @param {"edit"|"delete"} op
     * @param {Change} change
     */
    async updateDependents(op: "edit" | "delete", change: import("../interfaces/source/change")): Promise<void>;
    get label(): string;
    get identifiers(): {
        prefix: string;
        releaseKey: string;
        userKey: string;
        modelKey: string;
    };
    toJSON(): {
        prefix: string;
        uri: string;
        fileName: string;
        definition: string;
        version: string;
        style: "code" | "core" | "domain" | "extension" | "adapter" | "external" | "proxy" | "utility" | "csv" | "built-in" | "CS";
        conformanceTargets: any[];
        relativePath: string;
        xsdString: string;
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
    async add(release?: import("../release"), change?: import("../interfaces/source/change")): Promise<Namespace>;
    async delete(change?: import("../interfaces/source/change")): Promise<Namespace>;
}
declare namespace Namespace {
    export { create, route, identifiers, sortByPrefix, sortByStyle, sortByURI, Styles, CriteriaType, IdentifiersType, StyleType };
}
/**
 * @param {ReleaseObject.NDRVersionType} ndrVersion
 * @param {String} prefix
 * @param {StyleType} [style]
 * @param {String} [uri]
 * @param {String} [fileName]
 * @param {String} [definition]
 * @param {String} [version]
 */
declare function create(ndrVersion: string, prefix: string, style?: "code" | "core" | "domain" | "extension" | "adapter" | "external" | "proxy" | "utility" | "csv" | "built-in" | "CS", uri?: string, fileName?: string, definition?: string, version?: string): Namespace;
declare function route(userKey: any, modelKey: any, releaseKey: any, prefix: any): string;
/**
 * @param {string} userKey
 * @param {string} modelKey
 * @param {string} releaseKey
 * @param {string} prefix
 */
declare function identifiers(userKey: string, modelKey: string, releaseKey: string, prefix: string): {
    userKey: string;
    modelKey: string;
    releaseKey: string;
    prefix: string;
};
/**
 * Custom sort function to order an array of namespaces by prefix.
 *
 * @static
 * @param {Namespace} ns1
 * @param {Namespace} ns2
 */
declare function sortByPrefix(ns1: Namespace, ns2: Namespace): number;
/**
 * Custom sort function to order an array of namespaces by ranked style
 * and then by prefix.
 *
 * @static
 * @param {Namespace} ns1
 * @param {Namespace} ns2
 */
declare function sortByStyle(ns1: Namespace, ns2: Namespace): number;
/**
 * Custom sort function to order an array of namespaces by target namespace URI.
 *
 * @static
 * @param {Namespace} ns1
 * @param {Namespace} ns2
 */
declare function sortByURI(ns1: Namespace, ns2: Namespace): number;
declare var Styles: string[];
/**
 * Search criteria options for namespace find operations.
 */
type CriteriaType = {
    userKey?: string;
    modelKey?: string;
    releaseKey?: string;
    niemReleaseKey?: string;
    prefix?: string | RegExp;
    style?: ("code" | "core" | "domain" | "extension" | "adapter" | "external" | "proxy" | "utility" | "csv" | "built-in" | "CS")[];
    conformanceRequired?: boolean;
};
type IdentifiersType = {
    userKey: string;
    modelKey: string;
    releaseKey: string;
    prefix: string | RegExp;
};
type StyleType = "code" | "core" | "domain" | "extension" | "adapter" | "external" | "proxy" | "utility" | "csv" | "built-in" | "CS";
