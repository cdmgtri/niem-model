export = Release;
declare const Release_base: typeof import("../niem-object");
/**
 * A coherent set of namespaces bundled together for a release, IEPD, EIEM, etc.
 * @extends {NIEMObject<Release>}
 */
declare class Release extends Release_base {
    /**
     * @param {string} releaseKey
     * @param {string} niemReleaseKey
     * @param {import("../release-object/index").NDRVersionType} [ndrVersion="4.0"] Defaults to "4.0"
     * @param {string} [version]
     * @param {StatusType} [status]
     * @param {string} [baseURI]
     * @param {string} [branch]
     * @param {string} [description]
     */
    constructor(releaseKey: string, niemReleaseKey: string, ndrVersion?: string, version?: string, status?: "draft" | "published", baseURI?: string, branch?: string, description?: string);
    model: import("../model");
    releaseKey: string;
    niemReleaseKey: string;
    ndrVersion: string;
    version: string;
    status: "draft" | "published";
    baseURI: string;
    branch: string;
    description: string;
    formats: {
        /** @type {NIEMModelFormatInterface<string>} */
        xsd: import("../interfaces/format")<string>;
        json: import("../interfaces/format")<any>;
    };
    get niem(): import("..");
    async xsd(): Promise<any>;
    async json(): Promise<any>;
    get load(): {
        xsd: (xsdFiles: any) => Promise<Release>;
        json: (jsonFile: any) => Promise<Release>;
    };
    get source(): import("../interfaces/source");
    get sourceDataSet(): import("../interfaces/source/dataSet")<Release, any, any>;
    get namespaces(): {
        /**
         * @param {string} prefix
         * @param {Namespace.StyleType} [style]
         * @param {string} [uri]
         * @param {string} [fileName]
         * @param {string} [definition]
         * @param {string} [version]
         * @returns {Promise<Namespace>}
         */
        add: (prefix: string, style?: "code" | "core" | "domain" | "extension" | "adapter" | "external" | "proxy" | "utility" | "csv" | "built-in" | "CS", uri?: string, fileName?: string, definition?: string, version?: string) => Promise<import("../namespace")>;
        /**
         * @param {string} prefix
         */
        get: (prefix: string) => Promise<import("../namespace")>;
        /**
         * @param {Namespace.CriteriaType} criteria
         */
        find: (criteria?: import("../namespace").CriteriaType) => Promise<import("../namespace")[]>;
        /**
         * @param {Namespace.CriteriaType} criteria
         */
        count: (criteria?: import("../namespace").CriteriaType) => Promise<number>;
    };
    get localTerms(): {
        /**
         * @param {string} prefix
         * @param {string} term
         * @param {string} [literal]
         * @param {string} [definition]
         * @returns {Promise<LocalTerm>}
         */
        add: (prefix: string, term: string, literal?: string, definition?: string) => Promise<import("../local-term")>;
        /**
         * @param {string} prefix
         * @param {string} term
         */
        get: (prefix: string, term: string) => Promise<import("../local-term")>;
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
         * @param {string} prefix
         * @param {string} name
         * @param {string} [definition]
         * @param {string} [typeQName]
         * @param {string} [groupQName]
         * @param {boolean} [isElement=true] Defaults to true
         * @param {boolean} [isAbstract=false] Defaults to false
         * @returns {Promise<Property>}
         */
        add: (prefix: string, name: string, definition?: string, typeQName?: string, groupQName?: string, isElement?: boolean, isAbstract?: boolean) => Promise<import("../property")>;
        /**
         * @param {string} qname
         */
        get: (qname: string) => Promise<import("../property")>;
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
         * @param {string} prefix
         * @param {string} name
         * @param {string} [definition]
         * @param {Type.StyleType} [style]
         * @param {string} [baseQName]
         * @returns {Promise<Type>}
         */
        add: (prefix: string, name: string, definition?: string, style?: "object" | "metadata" | "adapter" | "association" | "augmentation" | "CSC" | "simple" | "list" | "union", baseQName?: string) => Promise<import("../type")>;
        /**
         * @param {string} qname
         */
        get: (qname: string) => Promise<import("../type")>;
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
         * @param {string} typeQName
         * @param {string} value
         * @param {string} [definition]
         * @param {Facet.StyleType} [style="enumeration"] Default "enumeration"
         * @returns {Promise<Facet>}
         */
        add: (typeQName: string, value: string, definition?: string, style?: "length" | "pattern" | "enumeration" | "minLength" | "maxLength" | "whiteSpace" | "maxInclusive" | "minInclusive" | "maxExclusive" | "minExclusive" | "totalDigits" | "fractionDigits") => Promise<import("../facet")>;
        /**
         * @param {string} qname
         * @param {string} value
         * @param {Facet.StyleType} [style="enumeration"] Default "enumeration"
         */
        get: (qname: string, value: string, style?: "length" | "pattern" | "enumeration" | "minLength" | "maxLength" | "whiteSpace" | "maxInclusive" | "minInclusive" | "maxExclusive" | "minExclusive" | "totalDigits" | "fractionDigits") => Promise<import("../facet")>;
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
         * @param {string} typeQName
         * @param {string} propertyQName
         * @param {string} [min]
         * @param {string} [max]
         * @param {string} [definition]
         * @returns {Promise<SubProperty>}
         */
        add: (typeQName: string, propertyQName: string, min?: string, max?: string, definition?: string) => Promise<import("../subproperty")>;
        /**
         * @param {string} typeQName
         * @param {string} propertyQName
         */
        get: (typeQName: string, propertyQName: string) => Promise<import("../subproperty")>;
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
     * Save changes to the object.
     * @param {Model} [model]
     * @param {Change} [change]
     */
    async add(model?: import("../model"), change?: import("../interfaces/source/change")): Promise<Release>;
    async dependents(): Promise<{
        namespaces: import("../namespace")[];
        count: number;
    }>;
    get modelKey(): string;
    get userKey(): string;
    get identifiers(): {
        releaseKey: string;
        userKey: string;
        modelKey: string;
    };
    /**
     * @example "niem model 4.0"
     * @example "lapd arrestReport 1.0"
     */
    get label(): string;
    get modelRoute(): string;
    toJSON(): {
        releaseKey: string;
        niemReleaseKey: string;
        version: string;
        baseURI: string;
        branch: string;
        description: string;
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
    async delete(change?: import("../interfaces/source/change")): Promise<Release>;
}
declare namespace Release {
    export { create, identifiers, route, Statuses, StatusType, CriteriaType, IdentifiersType };
}
/**
 * @param {string} releaseKey
 * @param {string} [niemReleaseKey]
 * @param {"3.0"|"4.0"} [ndrVersion="4.0"] Defaults to "4.0"
 * @param {string} [version]
 * @param {"draft"|"published"} [status]
 * @param {string} [baseURI]
 * @param {string} [branch]
 * @param {string} [description]
 */
declare function create(releaseKey: string, niemReleaseKey?: string, ndrVersion?: "3.0" | "4.0", version?: string, status?: "draft" | "published", baseURI?: string, branch?: string, description?: string): Release;
/**
 * @param {string} userKey
 * @param {string} modelKey
 * @param {string} releaseKey
 */
declare function identifiers(userKey: string, modelKey: string, releaseKey: string): {
    userKey: string;
    modelKey: string;
    releaseKey: string;
};
/**
 * @param {string} userKey
 * @param {string} modelKey
 * @param {string} releaseKey
 */
declare function route(userKey: string, modelKey: string, releaseKey: string): string;
declare var Statuses: string[];
type StatusType = "draft" | "published";
/**
 * Search criteria for release find operations.
 */
type CriteriaType = {
    userKey?: string;
    modelKey?: string;
    releaseKey?: string;
    niemReleaseKey?: string;
    status?: "draft" | "published";
};
type IdentifiersType = {
    userKey: string;
    modelKey: string;
    releaseKey: string;
};
