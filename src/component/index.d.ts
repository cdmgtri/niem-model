export = Component;
declare const Component_base: typeof import("../release-object");
/**
 * A root class for commonalities between properties and types.
 * @abstract
 */
declare class Component extends Component_base {
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
    async namespace(): Promise<import("../namespace")>;
    get label(): string;
    get identifiers(): {
        prefix: string;
        name: string;
        releaseKey: string;
        userKey: string;
        modelKey: string;
    };
    toJSON(): {
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
    async add(release?: import("../release"), change?: import("../interfaces/source/change")): Promise<Component>;
    async delete(change?: import("../interfaces/source/change")): Promise<Component>;
}
declare namespace Component {
    export { getName, getPrefix, sortByQName, sortByName, identifiers, IdentifiersType };
}
/**
 * Name portion from a component qualified name (qname).
 * @example "Given 'nc:Person', returns 'Person'.
 * @param {string} qname
 * @returns {string}
 */
declare function getName(qname: string): string;
/**
 * Namespace prefix from a component qualified name (qname).
 * @example "Given 'nc:Person', returns 'nc'.
 * @param {string} qname
 * @returns {string}
 */
declare function getPrefix(qname: string): string;
/**
 * Custom sort function to order an array of components by qualified name.
 *
 * @example "ag:ProducerShare would appear before nc:Activity"
 *
 * @param {Component} component1
 * @param {Component} component2
 */
declare function sortByQName(component1: Component, component2: Component): number;
/**
 * Custom sort function to order an array of components by name, and then by prefix.
 *
 * @example "nc:Activity would appear before ag:ProducerShare"
 *
 * @param {Component} component1
 * @param {Component} component2
 */
declare function sortByName(component1: Component, component2: Component): number;
/**
 * @param {string} userKey
 * @param {string} modelKey
 * @param {string} releaseKey
 * @param {string} prefix
 * @param {string} name
 */
declare function identifiers(userKey: string, modelKey: string, releaseKey: string, prefix: string, name: string): {
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
