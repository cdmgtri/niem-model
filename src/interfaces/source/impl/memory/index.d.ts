export = NIEMSourceMemory;
declare const NIEMSourceMemory_base: typeof import("../..");
declare class NIEMSourceMemory extends NIEMSourceMemory_base {
    constructor(loggingEnabled?: boolean);
    logger: import("./logger")<import("../../../../niem-object")<any>>;
    models: any;
    releases: any;
    namespaces: any;
    properties: any;
    types: any;
    localTerms: any;
    subProperties: any;
    facets: any;
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
        log: import("../../transaction")<any>[];
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
    async load(niem: import("../../../.."), json: {
        models: typeof import("../../../../model")[];
        releases: typeof import("../../../../release")[];
        namespaces: typeof import("../../../../namespace")[];
        properties: typeof import("../../../../property")[];
        types: typeof import("../../../../type")[];
        localTerms: typeof import("../../../../local-term")[];
        subProperties: typeof import("../../../../subproperty")[];
        facets: typeof import("../../../../facet")[];
        log: import("../../transaction")<any>[];
    }): Promise<void>;
}
