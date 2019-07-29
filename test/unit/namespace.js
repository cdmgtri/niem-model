
let NIEMModelObjects = require("../../index");

let { Model, Release, Namespace } = NIEMModelObjects;

function testNamespace() {

  describe("Namespace", () => {

    let model = new Model(null, "user", "test");
    let release = new Release(model, "1.0");
    let namespace = new Namespace(release, "nc");

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

  });

}

module.exports = testNamespace;
