export = NIEM;
declare class NIEM {
    /**
     * @param {NIEMModelSource} [source]
     */
    constructor(source?: import("./interfaces/source"));
    /** @type {NIEMModelSource[]} */
    sources: NIEMModelSource[];
    get models(): {
        /**
         * @param {string} userKey
         * @param {string} modelKey
         * @param {Model.StyleType} [style]
         * @param {string} [description]
         * @param {string} [website]
         * @param {string} [repo]
         */
        add: (userKey: string, modelKey: string, style?: "model" | "IEPD" | "other", description?: string, website?: string, repo?: string) => Promise<import("./model")>;
        /**
         * @param {string} userKey
         * @param {string} modelKey
         */
        get: (userKey: string, modelKey: string) => Promise<import("./model")>;
        /**
         * @param {{}} criteria
         */
        find: (criteria?: {}) => Promise<import("./model")[]>;
        niem: () => Promise<import("./model")>;
    };
    get releases(): {
        /**
         * @param {string} userKey
         * @param {string} modelKey
         * @param {string} releaseKey
         * @param {string} [niemReleaseKey]
         * @param {"3.0"|"4.0"} [ndrVersion]
         * @param {string} [version]
         * @param {import("./release/index").StatusType} [status]
         * @param {string} [baseURI]
         */
        add: (userKey: string, modelKey: string, releaseKey: string, niemReleaseKey?: string, ndrVersion?: "3.0" | "4.0", version?: string, status?: "draft" | "published", baseURI?: string) => Promise<import("./release")>;
        /**
         * @param {string} userKey
         * @param {string} modelKey
         * @param {string} releaseKey
         * @param {string} niemReleaseKey
         */
        load: (userKey: string, modelKey: string, releaseKey: string, niemReleaseKey: string) => Promise<{
            xsd: (input: any) => Promise<import("./release")>;
            json: (input: any) => Promise<import("./release")>;
        }>;
        /**
         * @param {string} userKey
         * @param {string} modelKey
         * @param {string} releaseKey
         */
        get: (userKey: string, modelKey: string, releaseKey: string) => Promise<import("./release")>;
        /**
         * @param {Release.CriteriaType} criteria
         */
        find: (criteria?: import("./release").CriteriaType) => Promise<import("./release")[]>;
        niem: (releaseKey: any) => Promise<import("./release")>;
    };
    get namespaces(): {
        /**
         * @param {string} userKey
         * @param {string} modelKey
         * @param {string} releaseKey
         * @param {string} prefix
         */
        get: (userKey: string, modelKey: string, releaseKey: string, prefix: string) => Promise<import("./namespace")>;
        /**
         * @param {Namespace.CriteriaType} criteria
         */
        find: (criteria?: import("./namespace").CriteriaType) => Promise<import("./namespace")[]>;
    };
    get localTerms(): {
        /**
         * @param {string} userKey
         * @param {string} modelKey
         * @param {string} releaseKey
         * @param {string} prefix
         * @param {string} term
         */
        get: (userKey: string, modelKey: string, releaseKey: string, prefix: string, term: string) => Promise<import("./local-term")>;
        /**
         * @param {LocalTerm.CriteriaType} criteria
         */
        find: (criteria?: import("./local-term").CriteriaType) => Promise<import("./local-term")[]>;
    };
    get properties(): {
        /**
         * @param {string} userKey
         * @param {string} modelKey
         * @param {string} releaseKey
         * @param {string} qname
         */
        get: (userKey: string, modelKey: string, releaseKey: string, qname: string) => Promise<import("./property")>;
        /**
         * @param {Property.CriteriaType} criteria
         */
        find: (criteria?: import("./property").CriteriaType) => Promise<import("./property")[]>;
    };
    get types(): {
        /**
         * @param {string} userKey
         * @param {string} modelKey
         * @param {string} releaseKey
         * @param {string} qname
         */
        get: (userKey: string, modelKey: string, releaseKey: string, qname: string) => Promise<import("./type")>;
        /**
         * @param {Type.CriteriaType} criteria
         */
        find: (criteria?: import("./type").CriteriaType) => Promise<import("./type")[]>;
    };
    get facets(): {
        /**
         * @param {string} userKey
         * @param {string} modelKey
         * @param {string} releaseKey
         * @param {string} typeQName
         * @param {string} value
         * @param {import("./facet/index").StyleType} [style="enumeration"] Default "enumeration"
         * @param {string} definition
         */
        get: (userKey: string, modelKey: string, releaseKey: string, typeQName: string, value: string, style?: "length" | "pattern" | "enumeration" | "minLength" | "maxLength" | "whiteSpace" | "maxInclusive" | "minInclusive" | "maxExclusive" | "minExclusive" | "totalDigits" | "fractionDigits", definition: string) => Promise<import("./facet")>;
        /**
         * @param {import("./facet/index").CriteriaType} criteria
         */
        find: (criteria?: import("./facet").CriteriaType) => Promise<import("./facet")[]>;
    };
    get subProperties(): {
        /**
         * @param {string} userKey
         * @param {string} modelKey
         * @param {string} releaseKey
         * @param {string} prefix
         * @param {string} name
         */
        get: (userKey: string, modelKey: string, releaseKey: string, typeQName: any, propertyQName: any) => Promise<import("./subproperty")>;
        /**
         * @param {SubProperty.CriteriaType} criteria
         */
        find: (criteria?: import("./subproperty").CriteriaType) => Promise<import("./subproperty")[]>;
    };
}
declare namespace NIEM {
    export { Model };
    export { Release };
    export { Namespace };
    export { LocalTerm };
    export const Component: typeof import("./component");
    export { Property };
    export { Type };
    export { Facet };
    export { SubProperty };
    export const NIEMObject: typeof import("./niem-object");
    export const ReleaseObject: typeof import("./release-object");
    export namespace Interfaces {
        export namespace NIEMSource {
            const NIEMModelSource_1: {
                SourceInterface: typeof import("./interfaces/source");
                FormatInterface: typeof import("./interfaces/format");
            };
            export { NIEMModelSource_1 as NIEMModelSource };
            export const Change: typeof import("./interfaces/source/change");
            export const Transaction: typeof import("./interfaces/source/transaction");
            export const DataSet: typeof import("./interfaces/source/dataSet");
        }
        export namespace NIEMFormat {
            const NIEMModelFormatInterface_1: typeof import("./interfaces/format");
            export { NIEMModelFormatInterface_1 as NIEMModelFormatInterface };
            export const NIEMObjectFormatInterface: typeof import("./interfaces/format/niem-object");
        }
    }
    export namespace Tests {
        export const unitTests: typeof import("../test/unit");
        export const integrationTests: typeof import("../test/integration");
    }
}
declare let NIEMModelSource: typeof import("./interfaces/source");
declare let Model_1: typeof import("./model");
declare let Release_1: typeof import("./release");
declare let Namespace_1: typeof import("./namespace");
declare let LocalTerm_1: typeof import("./local-term");
declare let Property_1: typeof import("./property");
declare let Type_1: typeof import("./type");
declare let Facet_1: typeof import("./facet");
declare let SubProperty_1: typeof import("./subproperty");
