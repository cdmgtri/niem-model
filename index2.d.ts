declare module "test/unit/model" {
    export = testModel;
    function testModel(): void;
}
declare module "test/unit/release" {
    export = testRelease;
    function testRelease(): void;
}
declare module "test/unit/namespace" {
    export = testNamespace;
    function testNamespace(): void;
}
declare module "test/unit/localTerm" {
    export = testLocalTerm;
    function testLocalTerm(): void;
}
declare module "test/unit/property" {
    export = testProperty;
    function testProperty(): void;
}
declare module "test/unit/type" {
    export = testType;
    function testType(): void;
}
declare module "test/unit/subProperty" {
    export = testSubProperty;
    function testSubProperty(): void;
}
declare module "test/unit/facet" {
    export = testFacet;
    function testFacet(): void;
}
declare module "test/unit/index" {
    export = unitTests;
    /**
     * Jest unit tests for NIEM Model objects
     */
    function unitTests(): void;
}
declare module "test/integration/source" {
    function _exports(): void;
    export = _exports;
}
declare module "test/integration/index" {
    export = integrationTests;
    /**
     * Jest integration tests for NIEM Model objects
     */
    function integrationTests(): void;
}
declare module "src/index" {
    export = NIEM;
    class NIEM {
        /**
         * @param {NIEMModelSource} [source]
         */
        constructor(source?: import("src/interfaces/source"));
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
            add: (userKey: string, modelKey: string, style?: "model" | "IEPD" | "other", description?: string, website?: string, repo?: string) => Promise<import("src/model")>;
            /**
             * @param {string} userKey
             * @param {string} modelKey
             */
            get: (userKey: string, modelKey: string) => Promise<any>;
            /**
             * @param {{}} criteria
             */
            find: (criteria?: {}) => Promise<any[]>;
            niem: () => Promise<any>;
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
            add: (userKey: string, modelKey: string, releaseKey: string, niemReleaseKey?: string, ndrVersion?: "3.0" | "4.0", version?: string, status?: "draft" | "published", baseURI?: string) => Promise<any>;
            /**
             * @param {string} userKey
             * @param {string} modelKey
             * @param {string} releaseKey
             * @param {string} niemReleaseKey
             */
            load: (userKey: string, modelKey: string, releaseKey: string, niemReleaseKey: string) => Promise<{
                xsd: (input: any) => Promise<any>;
                json: (input: any) => Promise<any>;
            }>;
            /**
             * @param {string} userKey
             * @param {string} modelKey
             * @param {string} releaseKey
             */
            get: (userKey: string, modelKey: string, releaseKey: string) => Promise<any>;
            /**
             * @param {Release.CriteriaType} criteria
             */
            find: (criteria?: import("src/release").CriteriaType) => Promise<any[]>;
            niem: (releaseKey: any) => Promise<any>;
        };
        get namespaces(): {
            /**
             * @param {string} userKey
             * @param {string} modelKey
             * @param {string} releaseKey
             * @param {string} prefix
             */
            get: (userKey: string, modelKey: string, releaseKey: string, prefix: string) => Promise<any>;
            /**
             * @param {Namespace.CriteriaType} criteria
             */
            find: (criteria?: import("src/namespace").CriteriaType) => Promise<any[]>;
        };
        get localTerms(): {
            /**
             * @param {string} userKey
             * @param {string} modelKey
             * @param {string} releaseKey
             * @param {string} prefix
             * @param {string} term
             */
            get: (userKey: string, modelKey: string, releaseKey: string, prefix: string, term: string) => Promise<any>;
            /**
             * @param {LocalTerm.CriteriaType} criteria
             */
            find: (criteria?: import("src/local-term").CriteriaType) => Promise<any[]>;
        };
        get properties(): {
            /**
             * @param {string} userKey
             * @param {string} modelKey
             * @param {string} releaseKey
             * @param {string} qname
             */
            get: (userKey: string, modelKey: string, releaseKey: string, qname: string) => Promise<any>;
            /**
             * @param {Property.CriteriaType} criteria
             */
            find: (criteria?: import("src/property").CriteriaType) => Promise<any[]>;
        };
        get types(): {
            /**
             * @param {string} userKey
             * @param {string} modelKey
             * @param {string} releaseKey
             * @param {string} qname
             */
            get: (userKey: string, modelKey: string, releaseKey: string, qname: string) => Promise<any>;
            /**
             * @param {Type.CriteriaType} criteria
             */
            find: (criteria?: import("src/type").CriteriaType) => Promise<any[]>;
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
            get: (userKey: string, modelKey: string, releaseKey: string, typeQName: string, value: string, style?: "length" | "pattern" | "enumeration" | "minLength" | "maxLength" | "whiteSpace" | "maxInclusive" | "minInclusive" | "maxExclusive" | "minExclusive" | "totalDigits" | "fractionDigits", definition: string) => Promise<any>;
            /**
             * @param {import("./facet/index").CriteriaType} criteria
             */
            find: (criteria?: import("src/facet").CriteriaType) => Promise<any[]>;
        };
        get subProperties(): {
            /**
             * @param {string} userKey
             * @param {string} modelKey
             * @param {string} releaseKey
             * @param {string} prefix
             * @param {string} name
             */
            get: (userKey: string, modelKey: string, releaseKey: string, typeQName: any, propertyQName: any) => Promise<any>;
            /**
             * @param {SubProperty.CriteriaType} criteria
             */
            find: (criteria?: import("src/subproperty").CriteriaType) => Promise<any[]>;
        };
    }
    namespace NIEM {
        export { Model };
        export { Release };
        export { Namespace };
        export { LocalTerm };
        export const Component: typeof import("src/component");
        export { Property };
        export { Type };
        export { Facet };
        export { SubProperty };
        export const NIEMObject: typeof import("src/niem-object");
        export const ReleaseObject: typeof import("src/release-object");
        export namespace Interfaces {
            export namespace NIEMSource {
                const NIEMModelSource_1: typeof import("src/interfaces");
                export { NIEMModelSource_1 as NIEMModelSource };
                export const Change: typeof import("src/interfaces/source/change");
                export const Transaction: typeof import("src/interfaces/source/transaction");
                export const DataSet: typeof import("src/interfaces/source/dataSet");
            }
            export namespace NIEMFormat {
                export const NIEMModelFormatInterface: typeof import("src/interfaces/format");
                export const NIEMObjectFormatInterface: typeof import("src/interfaces/format/niem-object");
            }
        }
        export namespace Tests {
            export const unitTests: typeof import("test/unit");
            export const integrationTests: typeof import("test/integration");
        }
    }
    let NIEMModelSource: typeof import("src/interfaces/source");
    let Model_1: typeof import("src/model");
    let Release: typeof import("src/release");
    let Namespace: typeof import("src/namespace");
    let LocalTerm: typeof import("src/local-term");
    let Property: typeof import("src/property");
    let Type: typeof import("src/type");
    let Facet: typeof import("src/facet");
    let SubProperty: typeof import("src/subproperty");
}
declare module "src/component/index" {
    export = Component;
    /**
     * A root class for commonalities between properties and types.
     * @abstract
     */
    class Component {
        /**
         * @param {string} prefix
         * @param {string} name
         * @param {string} definition
         */
        constructor(prefix: string, name: string, definition: string);
        prefix: string;
        name: string;
        definition: string;
        /**
         * @private
         * @type {"Property"|"Type"}
         */
        private componentClass;
        /**
         * @param  {string} qname
         */
        set qname(arg: string);
        /**
         * Qualified name
         */
        get qname(): string;
        /**
         * An array of terms inferred from the name of the component based on camel casing.
         *
         * @readonly
         * @type {String[]}
         */
        readonly get terms(): string[];
        async namespace(): Promise<any>;
        get authoritativePrefix(): string;
        get label(): string;
        get identifiers(): any;
        toJSON(): any;
    }
    namespace Component {
        export { getName, getPrefix, sortByQName, sortByName, identifiers, IdentifiersType };
    }
    /**
     * Name portion from a component qualified name (qname).
     * @example "Given 'nc:Person', returns 'Person'.
     * @param {string} qname
     * @returns {string}
     */
    function getName(qname: string): string;
    /**
     * Namespace prefix from a component qualified name (qname).
     * @example "Given 'nc:Person', returns 'nc'.
     * @param {string} qname
     * @returns {string}
     */
    function getPrefix(qname: string): string;
    /**
     * Custom sort function to order an array of components by qualified name.
     *
     * @example "ag:ProducerShare would appear before nc:Activity"
     *
     * @param {Component} component1
     * @param {Component} component2
     */
    function sortByQName(component1: import("src/component"), component2: import("src/component")): number;
    /**
     * Custom sort function to order an array of components by name, and then by prefix.
     *
     * @example "nc:Activity would appear before ag:ProducerShare"
     *
     * @param {Component} component1
     * @param {Component} component2
     */
    function sortByName(component1: import("src/component"), component2: import("src/component")): number;
    /**
     * @param {string} userKey
     * @param {string} modelKey
     * @param {string} releaseKey
     * @param {string} prefix
     * @param {string} name
     */
    function identifiers(userKey: string, modelKey: string, releaseKey: string, prefix: string, name: string): {
        userKey: string;
        modelKey: string;
        releaseKey: string;
        prefix: string;
        name: string;
    };
    type IdentifiersType = {
        userKey: string;
        modelKey: string;
        releaseKey: string;
        prefix: string;
        name: string;
    };
}
declare module "src/facet/index" {
    export = Facet;
    /**
     * A NIEM Facet
     * @extends {ReleaseObject<Facet>}
     */
    class Facet {
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
        get sourceDataSet(): any;
        async namespace(): Promise<any>;
        async type(): Promise<any>;
        async dependencies(): Promise<{
            type: any;
            count: number;
        }>;
        get authoritativePrefix(): string;
        get label(): string;
        get route(): string;
        get identifiers(): {
            userKey: string;
            modelKey: string;
            releaseKey: string;
            typeQName: string;
            style: "length" | "pattern" | "enumeration" | "minLength" | "maxLength" | "whiteSpace" | "maxInclusive" | "minInclusive" | "maxExclusive" | "minExclusive" | "totalDigits" | "fractionDigits";
            value: string;
        };
        toJSON(): any;
    }
    namespace Facet {
        export { create, route, identifiers, Styles, CriteriaKeywordFields, StyleType, CriteriaType, IdentifiersType };
    }
    /**
     * @param {ReleaseObject.NDRVersionType} ndrVersion
     * @param {String} typeQName
     * @param {string} value
     * @param {string} [definition]
     * @param {StyleType} [style="enumeration"] Defaults to enumeration
     */
    function create(ndrVersion: string, typeQName: string, value: string, definition?: string, style?: "length" | "pattern" | "enumeration" | "minLength" | "maxLength" | "whiteSpace" | "maxInclusive" | "minInclusive" | "maxExclusive" | "minExclusive" | "totalDigits" | "fractionDigits"): import("src/facet");
    /**
     * @param {string} userKey
     * @param {string} modelKey
     * @param {string} releaseKey
     * @param {string} typeQName
     * @param {string} value
     * @param {StyleType} [style="enumeration"] Default "enumeration"
     */
    function route(userKey: string, modelKey: string, releaseKey: string, typeQName: string, value: string, style?: "length" | "pattern" | "enumeration" | "minLength" | "maxLength" | "whiteSpace" | "maxInclusive" | "minInclusive" | "maxExclusive" | "minExclusive" | "totalDigits" | "fractionDigits"): string;
    /**
     * @param {string} userKey
     * @param {string} modelKey
     * @param {string} releaseKey
     * @param {string} typeQName
     * @param {string} value
     * @param {StyleType} [style="enumeration"] Default "enumeration"
     */
    function identifiers(userKey: string, modelKey: string, releaseKey: string, typeQName: string, value: string, style?: "length" | "pattern" | "enumeration" | "minLength" | "maxLength" | "whiteSpace" | "maxInclusive" | "minInclusive" | "maxExclusive" | "minExclusive" | "totalDigits" | "fractionDigits"): {
        userKey: string;
        modelKey: string;
        releaseKey: string;
        typeQName: string;
        style: "length" | "pattern" | "enumeration" | "minLength" | "maxLength" | "whiteSpace" | "maxInclusive" | "minInclusive" | "maxExclusive" | "minExclusive" | "totalDigits" | "fractionDigits";
        value: string;
    };
    var Styles: string[];
    var CriteriaKeywordFields: string[];
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
}
declare module "src/interfaces/index" {
    export const SourceInterface: typeof import("src/interfaces/source");
    export const FormatInterface: typeof import("src/interfaces/format");
}
declare module "src/interfaces/format/index" {
    export = NIEMModelFormatInterface;
    /**
     * @template U
     */
    class NIEMModelFormatInterface<U> {
        /**
         * Assign NDR-specific format classes as needed
         *
         * @param {"3.0"|"4.0"|string} ndrVersion
         */
        static create(ndrVersion: string): NIEMModelFormatInterface<any>;
        /** @type {NIEMObjectFormatInterface<Release>} */
        release: NIEMObjectFormatInterface<Release>;
        /** @type {NIEMObjectFormatInterface<Namespace, U>} */
        namespace: NIEMObjectFormatInterface<Namespace, U>;
        /** @type {NIEMObjectFormatInterface<LocalTerm>} */
        localTerm: NIEMObjectFormatInterface<LocalTerm>;
        /** @type {NIEMObjectFormatInterface<Property>} */
        property: NIEMObjectFormatInterface<Property>;
        /** @type {NIEMObjectFormatInterface<Type>} */
        type: NIEMObjectFormatInterface<Type>;
        /** @type {NIEMObjectFormatInterface<Facet>} */
        facet: NIEMObjectFormatInterface<Facet>;
        /** @type {NIEMObjectFormatInterface<SubProperty>} */
        subProperty: NIEMObjectFormatInterface<SubProperty>;
    }
    let NIEMObjectFormatInterface: typeof import("src/interfaces/format/niem-object");
    let Release: any;
    let Namespace: any;
    let LocalTerm: any;
    let Property: any;
    let Type: any;
    let Facet: any;
    let SubProperty: any;
}
declare module "src/interfaces/format/niem-object/index" {
    export = NIEMObjectFormatInterface;
    /**
     * @template {NIEMObject} T
     * @template U
     */
    class NIEMObjectFormatInterface<T extends import("src/niem-object")<any>, U> {
        /**
         * @param {U} input
         * @returns {T}
         */
        parse(input: U): T;
        /**
         * @param {U} input
         * @param {Release} release
         * @returns {Promise<T>}
         */
        async load(input: U, release: import("src/release")): Promise<T>;
        /**
         * @param {T} niemObject
         * @returns {Promise<U>}
         */
        async generate(niemObject: T): Promise<U>;
    }
}
declare module "src/interfaces/source/index" {
    export = NIEMModelSourceInterface;
    class NIEMModelSourceInterface {
        static SourceDataSet(): typeof import("src/interfaces/source/dataSet");
        static Transaction(): typeof import("src/interfaces/source/transaction");
        static Change(): typeof import("src/interfaces/source/change");
        /** @type {SourceDataSetInterface<Model>} */
        models: SourceDataSetInterface<Model>;
        /** @type {SourceDataSetInterface<Release>} */
        releases: SourceDataSetInterface<Release>;
        /** @type {SourceDataSetInterface<Namespace>} */
        namespaces: SourceDataSetInterface<Namespace>;
        /** @type {SourceDataSetInterface<Property>} */
        properties: SourceDataSetInterface<Property>;
        /** @type {SourceDataSetInterface<Type>} */
        types: SourceDataSetInterface<Type>;
        /** @type {SourceDataSetInterface<Facet>} */
        facets: SourceDataSetInterface<Facet>;
        /** @type {SourceDataSetInterface<SubProperty>} */
        subProperties: SourceDataSetInterface<SubProperty>;
        /** @type {SourceDataSetInterface<LocalTerm>} */
        localTerms: SourceDataSetInterface<LocalTerm>;
        /** @type {Transaction[]} */
        log: Transaction[];
    }
    let SourceDataSetInterface: typeof import("src/interfaces/source/dataSet");
    let Model: any;
    let Release: any;
    let Namespace: any;
    let Property: any;
    let Type: any;
    let Facet: any;
    let SubProperty: any;
    let LocalTerm: any;
    let Transaction: typeof import("src/interfaces/source/transaction");
}
declare module "src/interfaces/source/change/index" {
    export = Change;
    class Change {
        constructor(description: any, url: any);
        description: any;
        url: any;
        refUpdate: any;
        toString(): string;
    }
}
declare module "src/interfaces/source/dataSet/index" {
    export = SourceDataSetInterface;
    /**
     * @template {NIEMObject<T>} T
     * @template {Object<string, string>} IdentifiersType
     * @template {Object<string, any>} CriteriaType
     */
    class SourceDataSetInterface<T extends import("src/niem-object")<T>, IdentifiersType extends {
        [x: string]: string;
    }, CriteriaType extends {
        [x: string]: any;
    }> {
        /**
         * @param {T} niemObject
         * @param {Change} [change]
         * @returns {Promise<T>}
         */
        async add(niemObject: T, change?: import("src/interfaces/source/change")): Promise<T>;
        /**
         * @param {T} niemObject
         * @param {Change} [change]
         * @returns {Promise<T>}
         */
        async edit(niemObject: T, change?: import("src/interfaces/source/change")): Promise<T>;
        /**
         * @param {T} niemObject
         * @param {Change} [change]
         * @returns {Promise<T>}
         */
        async delete(niemObject: T, change?: import("src/interfaces/source/change")): Promise<T>;
        /**
         * @param {IdentifiersType} identifiers
         * @returns {Promise<T>}
         */
        async get(identifiers: IdentifiersType): Promise<T>;
        /**
         * @param {CriteriaType} [criteria]
         * @returns {Promise<T[]>}
         */
        async find(criteria?: CriteriaType): Promise<T[]>;
        /**
         * @param {CriteriaType} [criteria]
         * @returns {Promise<number>}
         */
        async count(criteria?: CriteriaType): Promise<number>;
        /**
         * @param {T} niemObject
         * @returns {Promise<Transaction[]>}
         */
        async revisions(niemObject: T): Promise<import("src/interfaces/source/transaction")<any>[]>;
        /**
         * @param {T} niemObject
         * @returns {Promise<Transaction[]>}
         */
        async history(niemObject: T): Promise<import("src/interfaces/source/transaction")<any>[]>;
    }
}
declare module "src/interfaces/source/impl/memory/index" {
    export = NIEMSourceMemory;
    const NIEMSourceMemory_base: typeof import("src/interfaces/source");
    class NIEMSourceMemory extends NIEMSourceMemory_base {
        constructor(loggingEnabled?: boolean);
        logger: import("src/interfaces/source/impl/memory/logger")<import("src/niem-object")<any>>;
        toJSON(): {
            timestamp: string;
            models: any;
            releases: any;
            namespaces: any;
            properties: any;
            types: any;
            localTerms: any;
            subProperties: any;
            facets: any;
            log: any[];
        };
        /**
         * @param {NIEM} niem
         * @param {Object} json
         * @param {NIEM.Model[]} json.models
         * @param {NIEM.Release[]} json.releases
         * @param {NIEM.Namespace[]} json.namespaces
         * @param {NIEM.Property[]} json.properties
         * @param {NIEM.Type[]} json.types
         * @param {NIEM.LocalTerm[]} json.localTerms
         * @param {NIEM.SubProperty[]} json.subProperties
         * @param {NIEM.Facet[]} json.facets
         * @param {Transaction[]} json.log
         */
        async load(niem: import("src"), json: {
            models: any[];
            releases: any[];
            namespaces: any[];
            properties: any[];
            types: any[];
            localTerms: any[];
            subProperties: any[];
            facets: any[];
            log: import("src/interfaces/source/transaction")<any>[];
        }): Promise<void>;
    }
}
declare module "src/interfaces/source/impl/memory/dataSet/index" {
    export = SourceDataSet;
    const SourceDataSet_base: any;
    /**
     * @template {NIEMObject} T
     * @template {Object<string, string>} IdentifiersType
     * @template {Object<string, any>} CriteriaType
     */
    class SourceDataSet<T extends import("src/niem-object")<any>, IdentifiersType extends {
        [x: string]: string;
    }, CriteriaType extends {
        [x: string]: any;
    }> extends SourceDataSet_base {
        [x: string]: any;
        /**
         * @param {typeof NIEMObject} ObjectClass NIEM object class, e.g., Model, Property
         * @param {Logger} logger
         */
        constructor(ObjectClass: typeof import("src/niem-object"), logger: import("src/interfaces/source/impl/memory/logger")<any>);
        /** @private */
        private ObjectClass;
        /**
         * @private
         * @type {T[]}
          */
        private data;
        /** @private */
        private logger;
        /**
         * @param {T} object
         * @param {Change} change
         */
        async add(object: T, change: import("src/interfaces/source/change")): Promise<T>;
        /**
         * @param {T} object
         * @param {Change} change
         */
        async edit(object: T, change: import("src/interfaces/source/change")): Promise<T>;
        /**
         * @param {T} object
         * @param {Change} change
         */
        async delete(object: T, change: import("src/interfaces/source/change")): Promise<T>;
        /**
         * @param {IdentifiersType} identifiers
         */
        async get(identifiers: IdentifiersType): Promise<T>;
        /**
         * @param {CriteriaType} criteria
         * @returns {Promise<T[]>}
         */
        async find(criteria: CriteriaType): Promise<T[]>;
        /**
         * @param {CriteriaType} criteria
         * @returns {Promise<number>}
         */
        async count(criteria: CriteriaType): Promise<number>;
        /**
         * @param {NIEMObject} object
         * @returns {Promise<Transaction[]>}
         */
        async revisions(object: import("src/niem-object")<any>): Promise<import("src/interfaces/source/transaction")<any>[]>;
        /**
         * @todo Returns objects or transactions?  Need functions for both?
         * @param {NIEMObject} object
         * @returns {Promise<Transaction<T>[]>}
         */
        async history(object: import("src/niem-object")<any>): Promise<import("src/interfaces/source/transaction")<T>[]>;
        /**
         * Deep copies the object to avoid modification by reference
         * @private
         * @returns {T}
         */
        private copy;
        /**
         * @param {T} object
         */
        updatePreviousIdentifiers(object: T): void;
        /**
         * @param {T} object
         * @param {Change} change
         * @param {"edit"|"delete"} op
         */
        async modify(object: T, change: import("src/interfaces/source/change"), op: "edit" | "delete"): Promise<T>;
        /**
         * @param {NIEM} niem
         * @param {T[]} objects
         */
        async load(niem: import("src"), objects: T[]): Promise<void>;
    }
}
declare module "src/interfaces/source/impl/memory/logger/index" {
    export = Logger;
    /**
     * @template {NIEMObject} T
     */
    class Logger<T extends import("src/niem-object")<any>> {
        constructor(loggingEnabled?: boolean);
        loggingEnabled: boolean;
        /** @type {Transaction[]} */
        log: Transaction[];
        /**
         * @param {typeof NIEMObject} ObjectClass
         * @param {Transaction.OperationType} operation
         * @param {T} object
         * @param {object} [criteria]
         * @param {Change} [change]
         * @param {number} [count] Number of objects found or affected
         */
        record(ObjectClass: typeof import("src/niem-object"), operation: "add" | "edit" | "delete" | "get" | "find" | "count" | "history" | "revisions", object: T, criteria?: any, change?: import("src/interfaces/source/change"), count?: number): void;
        /**
         * @param {string} route
         * @param {"previousRoute"|"migrationRoute"} lookupRouteField
         * @returns {Transaction[]}
         */
        objectUpdates(route: string, lookupRouteField: "previousRoute" | "migrationRoute"): import("src/interfaces/source/transaction")<any>[];
    }
    let Transaction: typeof import("src/interfaces/source/transaction");
}
declare module "src/interfaces/source/transaction/index" {
    export = Transaction;
    /**
     * @template {NIEMObject} T
     */
    class Transaction<T extends import("src/niem-object")<any>> {
        /**
         * @param {typeof NIEMObject} ObjectClass
         * @param {OperationType} operation
         * @param {T} niemObject
         * @param {Object} criteria NIEM object search criteria for find operations
         * @param {Change} change
         * @param {number} count
         */
        constructor(ObjectClass: typeof import("src/niem-object"), operation: "add" | "edit" | "delete" | "get" | "find" | "count" | "history" | "revisions", niemObject: T, criteria: any, change: import("src/interfaces/source/change"), count: number);
        className: string;
        operation: "add" | "edit" | "delete" | "get" | "find" | "count" | "history" | "revisions";
        criteria: any;
        niemObject: T;
        change: import("src/interfaces/source/change");
        count: number;
        timestamp: string;
        get id(): string;
        toString(): string;
    }
    namespace Transaction {
        export { OperationType };
    }
    type OperationType = "add" | "edit" | "delete" | "get" | "find" | "count" | "history" | "revisions";
}
declare module "src/local-term/index" {
    export = LocalTerm;
    class LocalTerm {
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
        get sourceDataSet(): any;
        get namespace(): any;
        get route(): string;
        get authoritativePrefix(): string;
        /**
         * @example "nc - NIEM"
         */
        get label(): string;
        get identifiers(): any;
        toJSON(): any;
    }
    namespace LocalTerm {
        export { create, route, identifiers, CriteriaType, CriteriaKeywordFields, IdentifiersType };
    }
    /**
     * @param {ReleaseObject.NDRVersionType} ndrVersion
     * @param {String} prefix
     * @param {String} term
     * @param {String} literal
     * @param {String} definition
     */
    function create(ndrVersion: string, prefix: string, term: string, literal: string, definition: string): import("src/local-term");
    /**
     * @param {String} userKey
     * @param {String} modelKey
     * @param {String} releaseKey
     * @param {String} prefix
     * @param {String} term
     */
    function route(userKey: string, modelKey: string, releaseKey: string, prefix: string, term: string): string;
    /**
     * @param {String} userKey
     * @param {String} modelKey
     * @param {String} releaseKey
     * @param {String} prefix
     * @param {String} term
     */
    function identifiers(userKey: string, modelKey: string, releaseKey: string, prefix: string, term: string): {
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
    var CriteriaType: {};
    var CriteriaKeywordFields: string[];
    type IdentifiersType = {
        userKey: string;
        modelKey: string;
        releaseKey: string;
        prefix: string;
        term: string;
    };
}
declare module "src/model/index" {
    export = Model;
    const Model_base: typeof import("src/niem-object");
    /**
     * @extends {NIEMObject}
     */
    class Model extends Model_base {
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
        niem: import("src");
        /**
         * @param {NIEMModelSourceInterface} source
         */
        set source(arg: import("src/interfaces/source"));
        get source(): import("src/interfaces/source");
        get sourceDataSet(): any;
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
            add: (releaseKey: string, niemReleaseKey?: string, ndrVersion?: "3.0" | "4.0", version?: string, status?: "draft" | "published", baseURI?: string) => Promise<import("src/release")>;
            get: (releaseKey: any) => Promise<any>;
            /**
             * @param {Release.CriteriaType} [criteria]
             */
            find: (criteria?: import("src/release").CriteriaType) => Promise<any>;
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
    }
    namespace Model {
        export { create, route, identifiers, Styles, CriteriaType, StyleType, IdentifiersType };
    }
    let NIEMModelSourceInterface: typeof import("src/interfaces/source");
    /**
     * @param {string} userKey
     * @param {string} modelKey
     * @param {StyleType} [style]
     * @param {string} [description]
     * @param {string} [website]
     * @param {string} [repo]
     */
    function create(userKey: string, modelKey: string, style?: "model" | "IEPD" | "other", description?: string, website?: string, repo?: string): import("src/model");
    function route(userKey: any, modelKey: any): string;
    /**
     * @param {string} userKey
     * @param {string} modelKey
     */
    function identifiers(userKey: string, modelKey: string): {
        userKey: string;
        modelKey: string;
    };
    var Styles: string[];
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
    var CriteriaType: CriteriaType;
    type StyleType = "model" | "IEPD" | "other";
    type IdentifiersType = {
        userKey: string;
        modelKey: string;
    };
}
declare module "src/namespace/index" {
    export = Namespace;
    /**
     * A NIEM Namespace
     */
    class Namespace {
        /**
         * @param {String} prefix
         * @param {StyleType} [style]
         * @param {String} [uri]
         * @param {String} [fileName]
         * @param {String} [definition]
         * @param {String} [version]
         */
        constructor(prefix: string, style?: "code" | "adapter" | "core" | "domain" | "extension" | "external" | "proxy" | "utility" | "csv" | "built-in" | "CS", uri?: string, fileName?: string, definition?: string, version?: string);
        prefix: string;
        style: "code" | "adapter" | "core" | "domain" | "extension" | "external" | "proxy" | "utility" | "csv" | "built-in" | "CS";
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
        /**
         * @type {"3.0"|"4.0"|string}
         */
        get ndrVersion(): string;
        get load(): {
            xsd: (xsdString: any) => Promise<any>;
            json: (jsonString: any) => Promise<any>;
        };
        get sourceDataSet(): any;
        get localTerms(): {
            /**
             * @param {string} term
             * @param {string} [literal]
             * @param {string} [definition]
             */
            add: (term: string, literal?: string, definition?: string) => Promise<any>;
            /**
             * @param {string} term
             */
            get: (term: string) => Promise<any>;
            /**
             * @param {LocalTerm.CriteriaType} criteria
             */
            find: (criteria?: import("src/local-term").CriteriaType) => Promise<any>;
            /**
             * @param {LocalTerm.CriteriaType} criteria
             */
            count: (criteria?: import("src/local-term").CriteriaType) => Promise<any>;
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
            add: (name: string, definition: string, typeQName?: string, groupQName?: string, isElement?: boolean, isAbstract?: boolean) => Promise<any>;
            /**
             * @param {string} name
             */
            get: (name: string) => Promise<any>;
            /**
             * @param {Property.CriteriaType} criteria
             */
            find: (criteria?: import("src/property").CriteriaType) => Promise<any>;
            /**
             * @param {Property.CriteriaType} criteria
             */
            count: (criteria?: import("src/property").CriteriaType) => Promise<any>;
        };
        get types(): {
            /**
             * @param {string} name
             * @param {string} definition
             * @param {Type.StyleType} style
             * @param {string} [baseQName]
             */
            add: (name: string, definition: string, style: "object" | "metadata" | "adapter" | "association" | "augmentation" | "CSC" | "simple" | "list" | "union", baseQName?: string) => Promise<any>;
            /**
             * @param {string} name
             */
            get: (name: string) => Promise<any>;
            /**
             * @param {Type.CriteriaType} criteria
             */
            find: (criteria?: import("src/type").CriteriaType) => Promise<any>;
            /**
             * @param {Type.CriteriaType} criteria
             */
            count: (criteria?: import("src/type").CriteriaType) => Promise<any>;
        };
        get facets(): {
            /**
             * @param {string} typeName
             * @param {string} value
             * @param {string} definition
             * @param {Facet.StyleType} [style="enumeration"] Default "enumeration"
             */
            add: (typeName: string, value: string, definition: string, style?: "length" | "pattern" | "enumeration" | "minLength" | "maxLength" | "whiteSpace" | "maxInclusive" | "minInclusive" | "maxExclusive" | "minExclusive" | "totalDigits" | "fractionDigits") => Promise<any>;
            /**
             * @param {string} name
             * @param {string} value
             * @param {Facet.StyleType} [style="enumeration"] Default "enumeration"
             */
            get: (name: string, value: string, style?: "length" | "pattern" | "enumeration" | "minLength" | "maxLength" | "whiteSpace" | "maxInclusive" | "minInclusive" | "maxExclusive" | "minExclusive" | "totalDigits" | "fractionDigits") => Promise<any>;
            /**
             * @param {Facet.CriteriaType} criteria
             */
            find: (criteria?: import("src/facet").CriteriaType) => Promise<any>;
            /**
             * @param {Facet.CriteriaType} criteria
             */
            count: (criteria?: import("src/facet").CriteriaType) => Promise<any>;
        };
        get subProperties(): {
            /**
             * @param {string} typeName
             * @param {string} propertyQName
             * @param {string} min
             * @param {string} max
             * @param {string} definition
             */
            add: (typeName: string, propertyQName: string, min: string, max: string, definition: string) => Promise<any>;
            /**
             * @param {string} typeName
             * @param {string} propertyQName
             */
            get: (typeName: string, propertyQName: string) => Promise<any>;
            /**
             * @param {SubProperty.CriteriaType} criteria
             */
            find: (criteria?: import("src/subproperty").CriteriaType) => Promise<any>;
            /**
             * @param {SubProperty.CriteriaType} criteria
             */
            count: (criteria?: import("src/subproperty").CriteriaType) => Promise<any>;
        };
        /**
         * @example `For Core, dependents j:PersonEyeColorCode (substitutes for
           nc:PersonEyeColorAbstract) and hs:ServiceType (extends nc:ActivityType)`
         */
        async dependencies(): Promise<{
            substitutions: any;
            dataProperties: any;
            childTypes: any;
            subProperties: any;
            count: any;
        }>;
        /**
         * @example "For Core, dependents nc:Person and nc:PersonType"
         */
        async dependents(): Promise<{
            count: any;
            localTerms: any;
            properties: any;
            types: any;
        }>;
        /**
         * Update namespace dependents.  Operations will cascade through the
         * namespace properties and types.
         *
         * @param {"edit"|"delete"} op
         * @param {Change} change
         */
        async updateDependents(op: "edit" | "delete", change: import("src/interfaces/source/change")): Promise<void>;
        get authoritativePrefix(): string;
        get label(): string;
        /**
         * @example "/niem/model/4.0/namespaces/nc"
         * @example "/lapd/arrestReport/1.0/namespaces/nc"
         * @example "/lapd/arrestReport/1.0/namespaces/ext"
         */
        get route(): string;
        get identifiers(): any;
        toJSON(): any;
    }
    namespace Namespace {
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
    function create(ndrVersion: string, prefix: string, style?: "code" | "adapter" | "core" | "domain" | "extension" | "external" | "proxy" | "utility" | "csv" | "built-in" | "CS", uri?: string, fileName?: string, definition?: string, version?: string): import("src/namespace");
    function route(userKey: any, modelKey: any, releaseKey: any, prefix: any): string;
    /**
     * @param {string} userKey
     * @param {string} modelKey
     * @param {string} releaseKey
     * @param {string} prefix
     */
    function identifiers(userKey: string, modelKey: string, releaseKey: string, prefix: string): {
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
    function sortByPrefix(ns1: import("src/namespace"), ns2: import("src/namespace")): number;
    /**
     * Custom sort function to order an array of namespaces by ranked style
     * and then by prefix.
     *
     * @static
     * @param {Namespace} ns1
     * @param {Namespace} ns2
     */
    function sortByStyle(ns1: import("src/namespace"), ns2: import("src/namespace")): number;
    /**
     * Custom sort function to order an array of namespaces by target namespace URI.
     *
     * @static
     * @param {Namespace} ns1
     * @param {Namespace} ns2
     */
    function sortByURI(ns1: import("src/namespace"), ns2: import("src/namespace")): number;
    var Styles: string[];
    /**
     * Search criteria options for namespace find operations.
     */
    type CriteriaType = {
        userKey?: string;
        modelKey?: string;
        releaseKey?: string;
        niemReleaseKey?: string;
        prefix?: string | RegExp;
        style?: ("code" | "adapter" | "core" | "domain" | "extension" | "external" | "proxy" | "utility" | "csv" | "built-in" | "CS")[];
        conformanceRequired?: boolean;
    };
    type IdentifiersType = {
        userKey: string;
        modelKey: string;
        releaseKey: string;
        prefix: string | RegExp;
    };
    type StyleType = "code" | "adapter" | "core" | "domain" | "extension" | "external" | "proxy" | "utility" | "csv" | "built-in" | "CS";
}
declare module "src/namespace/3.0/index" {
    export = Namespace_3_0;
    const Namespace_3_0_base: typeof import("src/namespace");
    class Namespace_3_0 extends Namespace_3_0_base {
        constructor(prefix: string, style?: "code" | "adapter" | "core" | "domain" | "extension" | "external" | "proxy" | "utility" | "csv" | "built-in" | "CS", uri?: string, fileName?: string, definition?: string, version?: string);
        /**
         * The NDR conformance target for the namespace, if available.
         *
         * (The namespace may contain additional non-NDR target identifiers.)
         *
         * @example http://reference.niem.gov/niem/specification/naming-and-design-rules/4.0/#ReferenceSchemaDocument
         * @type {String}
         */
        get ndrConformanceTargetIdentifier(): string;
        /**
         * @type {"3.0"|"4.0"|string}
         */
        get ndrVersion(): string;
        /**
         * @type {"ReferenceSchemaDocument"|"ExtensionSchemaDocument"|string}
         */
        get ndrConformanceTarget(): string;
        get hasNDRConformanceTarget(): boolean;
    }
    namespace Namespace_3_0 {
        export const NDRConformanceTargets: string[];
    }
}
declare module "src/namespace/4.0/index" {
    export = Namespace_4_0;
    const Namespace_4_0_base: typeof import("src/namespace");
    class Namespace_4_0 extends Namespace_4_0_base {
        constructor(prefix: string, style?: "code" | "adapter" | "core" | "domain" | "extension" | "external" | "proxy" | "utility" | "csv" | "built-in" | "CS", uri?: string, fileName?: string, definition?: string, version?: string);
    }
    namespace Namespace_4_0 {
        export const NDRConformanceTargets: string[];
    }
}
declare module "src/niem-object/index" {
    export = NIEMObject;
    /**
     * Commonalities of NIEM components and other items.
     * @template T
     */
    class NIEMObject<T> {
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
        get sourceDataSet(): import("src/interfaces/source/dataSet")<NIEMObject<any>, any, any>;
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
        async updateDependents(op: "edit" | "delete", change?: import("src/interfaces/source/change")): Promise<any>;
        /**
         * Save changes to the object.
         * @param {Model|Release} [modelOrRelease]
         * @param {Change} [change]
         */
        async add(modelOrRelease?: import("src/release") | import("src/model"), change?: import("src/interfaces/source/change")): Promise<NIEMObject<T>>;
        model: import("src/release") | import("src/model");
        release: import("src/release") | import("src/model");
        /**
         * Save changes to the object.
         * @param {Change} [change]
         */
        async save(change?: import("src/interfaces/source/change")): any;
        /**
         * Deletes the object.
         * @param {Change} [change]
         */
        async delete(change?: import("src/interfaces/source/change")): Promise<NIEMObject<T>>;
        async history(): Promise<import("src/interfaces/source/transaction")<any>[]>;
        async revisions(): Promise<import("src/interfaces/source/transaction")<any>[]>;
        /**
         * True if the object matches the given criteria.
         * @param {object} criteria
         * @returns {Boolean}
         */
        match(criteria: any): boolean;
    }
    namespace NIEMObject {
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
}
declare module "src/property/index" {
    export = Property;
    const Property_base: typeof import("src/component");
    /**
     * A NIEM Property.
     */
    class Property extends Property_base {
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
        get sourceDataSet(): any;
        async group(): Promise<any>;
        async groupHead(): Promise<any>;
        async type(): Promise<any>;
        /**
         * @param {CriteriaType} criteria
         */
        async substitutions(criteria?: CriteriaType): Promise<any>;
        /**
         * @param {CriteriaType} criteria
         */
        async substitutionDescendants(criteria?: CriteriaType): Promise<import("src/property")[]>;
        get subProperties(): {
            add: (typeQName: any, min: any, max: any, definition: any) => Promise<any>;
            /**
             * @param {SubProperty.CriteriaType} criteria
             */
            find: (criteria: import("src/subproperty").CriteriaType) => Promise<any>;
        };
        async dependencies(): Promise<{
            type: any;
            group: any;
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
        async updateDependents(op: "edit" | "delete", change?: import("src/interfaces/source/change")): Promise<DependentsTypes>;
        get route(): string;
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
    }
    namespace Property {
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
        substitutions: import("src/property")[];
        subProperties: import("src/subproperty")[];
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
    function create(ndrVersion: string, prefix: string, name: string, definition?: string, typeQName?: string, groupQName?: string, isElement?: boolean, isAbstract?: boolean): import("src/property");
    /**
     * @param {Release} release
     * @param {string} prefix
     * @param {string} name
     * @param {string} definition
     * @param {string} typeQName
     * @param {string} groupQName
     * @param {boolean} [isAbstract=false]
     */
    function createElement(release: import("src/release"), prefix: string, name: string, definition: string, typeQName: string, groupQName: string, isAbstract?: boolean): import("src/property");
    /**
     * @param {Release} release
     * @param {string} prefix
     * @param {string} name
     * @param {string} definition
     * @param {string} typeQName
     */
    function createAttribute(release: import("src/release"), prefix: string, name: string, definition: string, typeQName: string): import("src/property");
    /**
     * @param {Release} release
     * @param {string} prefix
     * @param {string} name
     * @param {string} definition
     */
    function createAbstract(release: import("src/release"), prefix: string, name: string, definition: string): import("src/property");
    function route(userKey: any, modelKey: any, releaseKey: any, prefix: any, name: any): string;
    var CriteriaKeywordFields: string[];
}
declare module "src/release/index" {
    export = Release;
    const Release_base: typeof import("src/niem-object");
    /**
     * A coherent set of namespaces bundled together for a release, IEPD, EIEM, etc.
     * @extends {NIEMObject<Release>}
     */
    class Release extends Release_base {
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
        model: import("src/model");
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
            xsd: import("src/interfaces/format")<string>;
            json: import("src/interfaces/format")<any>;
        };
        get niem(): import("src");
        async xsd(): Promise<any>;
        async json(): Promise<any>;
        get load(): {
            xsd: (xsdFiles: any) => Promise<any>;
            json: (jsonFile: any) => Promise<any>;
        };
        get source(): import("src/interfaces/source");
        get sourceDataSet(): any;
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
            add: (prefix: string, style?: "code" | "adapter" | "core" | "domain" | "extension" | "external" | "proxy" | "utility" | "csv" | "built-in" | "CS", uri?: string, fileName?: string, definition?: string, version?: string) => Promise<import("src/namespace")>;
            /**
             * @param {string} prefix
             */
            get: (prefix: string) => Promise<any>;
            /**
             * @param {Namespace.CriteriaType} criteria
             */
            find: (criteria?: import("src/namespace").CriteriaType) => Promise<any>;
            /**
             * @param {Namespace.CriteriaType} criteria
             */
            count: (criteria?: import("src/namespace").CriteriaType) => Promise<any>;
        };
        get localTerms(): {
            /**
             * @param {string} prefix
             * @param {string} term
             * @param {string} [literal]
             * @param {string} [definition]
             * @returns {Promise<LocalTerm>}
             */
            add: (prefix: string, term: string, literal?: string, definition?: string) => Promise<import("src/local-term")>;
            /**
             * @param {string} prefix
             * @param {string} term
             */
            get: (prefix: string, term: string) => Promise<any>;
            /**
             * @param {LocalTerm.CriteriaType} criteria
             */
            find: (criteria?: import("src/local-term").CriteriaType) => Promise<any>;
            /**
             * @param {LocalTerm.CriteriaType} criteria
             */
            count: (criteria?: import("src/local-term").CriteriaType) => Promise<any>;
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
            add: (prefix: string, name: string, definition?: string, typeQName?: string, groupQName?: string, isElement?: boolean, isAbstract?: boolean) => Promise<import("src/property")>;
            /**
             * @param {string} qname
             */
            get: (qname: string) => Promise<any>;
            /**
             * @param {Property.CriteriaType} criteria
             */
            find: (criteria?: import("src/property").CriteriaType) => Promise<any>;
            /**
             * @param {Property.CriteriaType} criteria
             */
            count: (criteria?: import("src/property").CriteriaType) => Promise<any>;
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
            add: (prefix: string, name: string, definition?: string, style?: "object" | "metadata" | "adapter" | "association" | "augmentation" | "CSC" | "simple" | "list" | "union", baseQName?: string) => Promise<import("src/type")>;
            /**
             * @param {string} qname
             */
            get: (qname: string) => Promise<any>;
            /**
             * @param {Type.CriteriaType} criteria
             */
            find: (criteria?: import("src/type").CriteriaType) => Promise<any>;
            /**
             * @param {Type.CriteriaType} criteria
             */
            count: (criteria?: import("src/type").CriteriaType) => Promise<any>;
        };
        get facets(): {
            /**
             * @param {string} typeQName
             * @param {string} value
             * @param {string} [definition]
             * @param {Facet.StyleType} [style="enumeration"] Default "enumeration"
             * @returns {Promise<Facet>}
             */
            add: (typeQName: string, value: string, definition?: string, style?: "length" | "pattern" | "enumeration" | "minLength" | "maxLength" | "whiteSpace" | "maxInclusive" | "minInclusive" | "maxExclusive" | "minExclusive" | "totalDigits" | "fractionDigits") => Promise<import("src/facet")>;
            /**
             * @param {string} qname
             * @param {string} value
             * @param {Facet.StyleType} [style="enumeration"] Default "enumeration"
             */
            get: (qname: string, value: string, style?: "length" | "pattern" | "enumeration" | "minLength" | "maxLength" | "whiteSpace" | "maxInclusive" | "minInclusive" | "maxExclusive" | "minExclusive" | "totalDigits" | "fractionDigits") => Promise<any>;
            /**
             * @param {Facet.CriteriaType} criteria
             */
            find: (criteria?: import("src/facet").CriteriaType) => Promise<any>;
            /**
             * @param {Facet.CriteriaType} criteria
             */
            count: (criteria?: import("src/facet").CriteriaType) => Promise<any>;
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
            add: (typeQName: string, propertyQName: string, min?: string, max?: string, definition?: string) => Promise<import("src/subproperty")>;
            /**
             * @param {string} typeQName
             * @param {string} propertyQName
             */
            get: (typeQName: string, propertyQName: string) => Promise<any>;
            /**
             * @param {SubProperty.CriteriaType} criteria
             */
            find: (criteria?: import("src/subproperty").CriteriaType) => Promise<any>;
            /**
             * @param {SubProperty.CriteriaType} criteria
             */
            count: (criteria?: import("src/subproperty").CriteriaType) => Promise<any>;
        };
        /**
         * Save changes to the object.
         * @param {Model} [model]
         * @param {Change} [change]
         */
        async add(model?: import("src/model"), change?: import("src/interfaces/source/change")): Promise<import("src/niem-object")<import("src/release")>>;
        async dependents(): Promise<{
            namespaces: any;
            count: any;
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
        get modelRoute(): any;
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
    }
    namespace Release {
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
    function create(releaseKey: string, niemReleaseKey?: string, ndrVersion?: "3.0" | "4.0", version?: string, status?: "draft" | "published", baseURI?: string, branch?: string, description?: string): import("src/release");
    /**
     * @param {string} userKey
     * @param {string} modelKey
     * @param {string} releaseKey
     */
    function identifiers(userKey: string, modelKey: string, releaseKey: string): {
        userKey: string;
        modelKey: string;
        releaseKey: string;
    };
    /**
     * @param {string} userKey
     * @param {string} modelKey
     * @param {string} releaseKey
     */
    function route(userKey: string, modelKey: string, releaseKey: string): string;
    var Statuses: string[];
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
}
declare module "src/release-object/index" {
    export = ReleaseObject;
    const ReleaseObject_base: typeof import("src/niem-object");
    /**
     * Commonalities of NIEM release components and other items.
     * @template T
     * @extends {NIEMObject<ReleaseObject>}
     */
    class ReleaseObject<T> extends ReleaseObject_base {
        release: import("src/release");
        /**
         * Returns the prefix of the namespace responsible for the object.
         *
         * @example For element nc:Person, returns "nc"
         * @example For sub-property relationship j:SubjectType-has-nc:RoleOfPerson, returns "j"
         */
        get authoritativePrefix(): string;
        get modelKey(): string;
        get userKey(): string;
        get releaseKey(): string;
        get niemReleaseKey(): string;
        get ndrVersion(): string;
        get niem(): import("src");
        get formats(): {
            xsd: import("src/interfaces/format")<string>;
            json: import("src/interfaces/format")<any>;
        };
        /**
         * @returns {Promise<string>}
         */
        async xsd(): Promise<string>;
        get parse(): {
            /**
             * @param {string} input
             * @returns {Promise<T>}
             */
            xsd: (input: string) => Promise<T>;
            json: (input: any) => Promise<any>;
        };
        get load(): {
            xsd: (input: any) => Promise<any>;
            json: (input: any) => Promise<any>;
        };
        /**
         * Save changes to the object.
         * @param {Release} [release]
         * @param {Change} [change]
         */
        async add(release?: import("src/release"), change?: import("src/interfaces/source/change")): Promise<import("src/niem-object")<import("src/release-object")<any>>>;
        get identifiers(): {
            releaseKey: string;
            userKey: string;
            modelKey: string;
        };
        get source(): import("src/interfaces/source");
        get releaseRoute(): any;
        toJSON(): {
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
    }
    namespace ReleaseObject {
        export { route, NDRVersionType };
    }
    function route(userKey: any, modelKey: any, releaseKey: any, ...args: any[]): string;
    type NDRVersionType = string;
}
declare module "src/subproperty/index" {
    export = SubProperty;
    /**
     * A usage of a property by a type.
     */
    class SubProperty {
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
        get sourceDataSet(): any;
        /**
         * Namespace of the type
         */
        async namespace(): Promise<any>;
        async type(): Promise<any>;
        async property(): Promise<any>;
        async dependencies(): Promise<{
            type: any;
            property: any;
            count: number;
        }>;
        async isElement(): Promise<any>;
        get authoritativePrefix(): string;
        get label(): string;
        get route(): string;
        get identifiers(): any;
        toJSON(): any;
    }
    namespace SubProperty {
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
    function create(ndrVersion: string, typeQName: string, propertyQName: string, min?: string, max?: string, definition: string): import("src/subproperty");
    /**
     * @example "/niem/model/4.1/types/nc:PersonType/properties/nc:PersonName"
     */
    function route(userKey: any, modelKey: any, releaseKey: any, typeQName: any, propertyQName: any): string;
    /**
     * @param {string} userKey
     * @param {string} modelKey
     * @param {string} releaseKey
     * @param {string} typeQName
     * @param {string} propertyQName
     */
    function identifiers(userKey: string, modelKey: string, releaseKey: string, typeQName: string, propertyQName: string): {
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
    var CriteriaType: {};
    var CriteriaKeywordFields: string[];
    type IdentifiersType = {
        userKey: string;
        modelKey: string;
        releaseKey: string;
        typeQName: string | RegExp;
        propertyQName: string | RegExp;
    };
}
declare module "src/type/index" {
    export = Type;
    const Type_base: typeof import("src/component");
    /**
     * A NIEM Type.
     */
    class Type extends Type_base {
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
        get sourceDataSet(): any;
        async base(): Promise<any>;
        async members(): Promise<import("src/type")[]>;
        get facets(): {
            /**
             * @param {string} value
             * @param {string} definition
             * @param {Facet.StyleType} [style="enumeration"] Default "enumeration"
             */
            add: (value: string, definition: string, style?: "length" | "pattern" | "enumeration" | "minLength" | "maxLength" | "whiteSpace" | "maxInclusive" | "minInclusive" | "maxExclusive" | "minExclusive" | "totalDigits" | "fractionDigits") => Promise<any>;
            /**
             * @param {string} value
             * @param {Facet.StyleType} [style="enumeration"] Default "enumeration"
             */
            get: (value: string, style?: "length" | "pattern" | "enumeration" | "minLength" | "maxLength" | "whiteSpace" | "maxInclusive" | "minInclusive" | "maxExclusive" | "minExclusive" | "totalDigits" | "fractionDigits") => Promise<any>;
            /**
             * @param {Facet.CriteriaType} criteria
             */
            find: (criteria?: import("src/facet").CriteriaType) => Promise<any>;
            /**
             * @param {Facet.CriteriaType} criteria
             */
            count: (criteria?: import("src/facet").CriteriaType) => Promise<any>;
        };
        get subProperties(): {
            /**
             * @param {string} propertyQName
             * @param {string} [min="0"] Defaults to "0"
             * @param {string} [max="unbounded"] Defaults to "unbounded"
             * @param {string} definition
             */
            add: (propertyQName: string, min?: string, max?: string, definition: string) => Promise<any>;
            /**
             * @param {string} propertyQName
             */
            get: (propertyQName: string) => Promise<any>;
            /**
             * @param {SubProperty.CriteriaType} criteria
             */
            find: (criteria?: import("src/subproperty").CriteriaType) => Promise<any>;
            /**
             * @param {SubProperty.CriteriaType} criteria
             */
            count: (criteria?: import("src/subproperty").CriteriaType) => Promise<any>;
        };
        get dataProperties(): {
            /**
             * @param {Property.CriteriaType} criteria
             */
            find: (criteria?: import("src/property").CriteriaType) => Promise<any>;
            /**
             * @param {Property.CriteriaType} criteria
             */
            count: (criteria?: import("src/property").CriteriaType) => Promise<any>;
        };
        /**
         * @param {CriteriaType} criteria
         */
        async childTypes(criteria: CriteriaType): Promise<any>;
        /**
         * @param {CriteriaType} criteria
         */
        async childDescendantTypes(criteria: CriteriaType): Promise<import("src/type")[]>;
        async dependencies(): Promise<{
            base: any;
            count: number;
        }>;
        /**
         * @param {boolean} [current=true] Defaults to true; false for last saved identifiers
         */
        async dependents(current?: boolean): Promise<{
            childTypes: any;
            subProperties: any;
            dataProperties: any;
            facets: any;
            count: any;
        }>;
        /**
         * @param {"edit"|"delete"} op
         * @param {Change} change
         */
        async updateDependents(op: "edit" | "delete", change: import("src/interfaces/source/change")): Promise<void>;
        get route(): string;
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
    }
    namespace Type {
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
    function create(ndrVersion: string, prefix: string, name: string, definition: string, style: "object" | "metadata" | "adapter" | "association" | "augmentation" | "CSC" | "simple" | "list" | "union", baseQName?: string): import("src/type");
    function route(userKey: any, modelKey: any, releaseKey: any, qname: any): string;
    var ComplexStyles: string[];
    var SimpleStyles: string[];
    var Styles: string[];
    var CriteriaKeywordFields: string[];
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
}
