export = NIEMModelSourceInterface;
declare class NIEMModelSourceInterface {
    static SourceDataSet(): typeof import("./dataSet");
    static Transaction(): typeof import("./transaction");
    static Change(): typeof import("./change");
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
declare let SourceDataSetInterface: typeof import("./dataSet");
declare let Model: typeof import("../../model");
declare let Release: typeof import("../../release");
declare let Namespace: typeof import("../../namespace");
declare let Property: typeof import("../../property");
declare let Type: typeof import("../../type");
declare let Facet: typeof import("../../facet");
declare let SubProperty: typeof import("../../subproperty");
declare let LocalTerm: typeof import("../../local-term");
declare let Transaction: typeof import("./transaction");
