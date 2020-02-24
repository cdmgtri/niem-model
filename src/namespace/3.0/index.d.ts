export = Namespace_3_0;
declare const Namespace_3_0_base: typeof import("..");
declare class Namespace_3_0 extends Namespace_3_0_base {
    constructor(prefix: string, style?: "code" | "core" | "domain" | "extension" | "adapter" | "external" | "proxy" | "utility" | "csv" | "built-in" | "CS", uri?: string, fileName?: string, definition?: string, version?: string);
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
     * @type {"ReferenceSchemaDocument"|"ExtensionSchemaDocument"|string}
     */
    get ndrConformanceTarget(): string;
    get hasNDRConformanceTarget(): boolean;
    async add(release?: import("../../release"), change?: import("../../interfaces/source/change")): Promise<Namespace_3_0>;
    async delete(change?: import("../../interfaces/source/change")): Promise<Namespace_3_0>;
}
declare namespace Namespace_3_0 {
    export const NDRConformanceTargets: string[];
}
