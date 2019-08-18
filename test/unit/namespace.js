
function testNamespace() {

  let { Model, Namespace } = require("../../index");

  /** @type {Namespace} */
  let namespace;

  describe("Namespace", () => {

    beforeAll( async() => {
      let model = new Model("user", "test");
      let release = await model.createRelease("1.0");
      namespace = await release.createNamespace("nc");
    });

    let namespaces = [
      new Namespace("core", "core"),
      new Namespace("ag", "domain"),
      new Namespace("em", "domain"),
      new Namespace("ncic", "code"),
      new Namespace("aamva", "code"),
      new Namespace("arrestRpt", "extension"),
      new Namespace("extension", "extension"),
    ];

    test("#route", () => {
      expect(namespace.route).toBe("/user/test/1.0/namespaces/nc");
    });

    test("#toJSON", () => {

      let expectedJSON = {
        id: "/user/test/1.0/namespaces/nc",
        userKey: "user",
        modelKey: "test",
        releaseKey: "1.0",
        prefix: "nc"
      };

      let receivedJSON = JSON.parse(JSON.stringify(namespace));
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
