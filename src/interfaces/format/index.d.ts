export = NIEMModelFormatInterface;
/**
 * @template U
 */
declare class NIEMModelFormatInterface<U> {
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
declare let NIEMObjectFormatInterface: typeof import("./niem-object");
declare let Release: typeof import("../../release");
declare let Namespace: typeof import("../../namespace");
declare let LocalTerm: typeof import("../../local-term");
declare let Property: typeof import("../../property");
declare let Type: typeof import("../../type");
declare let Facet: typeof import("../../facet");
declare let SubProperty: typeof import("../../subproperty");
