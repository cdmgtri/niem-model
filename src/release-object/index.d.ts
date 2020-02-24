export = ReleaseObject;
declare const ReleaseObject_base: typeof import("../niem-object");
/**
 * Commonalities of NIEM release components and other items.
 * @template T
 * @extends {NIEMObject<ReleaseObject>}
 */
declare class ReleaseObject<T> extends ReleaseObject_base {
    release: import("../release");
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
    get niem(): import("..");
    get formats(): {
        xsd: import("../interfaces/format")<string>; /**
         * @param {string} input
         * @returns {Promise<T>}
         */
        json: import("../interfaces/format")<any>;
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
    async add(release?: import("../release"), change?: import("../interfaces/source/change")): Promise<ReleaseObject<T>>;
    get identifiers(): {
        releaseKey: string;
        userKey: string;
        modelKey: string;
    };
    get source(): import("../interfaces/source");
    get releaseRoute(): string;
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
    async delete(change?: import("../interfaces/source/change")): Promise<ReleaseObject<T>>;
}
declare namespace ReleaseObject {
    export { route, NDRVersionType };
}
declare function route(userKey: any, modelKey: any, releaseKey: any, ...args: any[]): string;
type NDRVersionType = string;
