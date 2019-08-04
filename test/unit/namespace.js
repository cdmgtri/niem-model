
function testNamespace() {

  let { Model, Release, Namespace } = require("../../index");

  describe("Namespace", () => {

    let model = new Model(null, "user", "test");
    let release = new Release(model, "1.0");
    let namespace = new Namespace(release, "nc");

    let namespaces = [
      new Namespace(null, "core", null, null, null, null, "core"),
      new Namespace(null, "ag", null, null, null, null, "domain"),
      new Namespace(null, "em", null, null, null, null, "domain"),
      new Namespace(null, "ncic", null, null, null, null, "code"),
      new Namespace(null, "aamva", null, null, null, null, "code"),
      new Namespace(null, "arrestRpt", null, null, null, null, "extension"),
      new Namespace(null, "extension", null, null, null, null, "extension"),
    ];

    let expectedJSON = {
      prefix: "nc",
      conformanceTargets: [],
      isBuiltIn: false,
      isPreGenerated: false,
      source_line: "",
      source_location: "",
      source_position: ""
    };

    test("#route", () => {
      expect(namespace.route).toBe("/user/test/1.0/namespaces/nc");
    });

    test("#serialize", () => {
      // Check scoped to release
      let receivedJSON = namespace.serialize("release");
      expect(receivedJSON).toEqual(expectedJSON);

      // Check full scope
      receivedJSON = namespace.serialize();

      // Update expectedJSON with sandbox values
      expectedJSON.modelKey = release.modelKey,
      expectedJSON.releaseKey = release.releaseKey,
      expectedJSON.userKey = release.userKey

      expect(receivedJSON).toEqual(expectedJSON);
    });

    test("#sortByPrefix", () => {
      let prefixes = namespaces.sort(Namespace.sortByPrefix).map( ns => ns.prefix ).join(", ");
      expect(prefixes).toBe("aamva, ag, arrestRpt, core, em, extension, ncic");
    });

    test("#sortByStyle", () => {
      let prefixes = namespaces.sort(Namespace.sortByStyle).map( ns => ns.prefix ).join(", ");
      expect(prefixes).toBe("core, ag, em, aamva, ncic, arrestRpt, extension");
    });

  });

}

module.exports = testNamespace;
