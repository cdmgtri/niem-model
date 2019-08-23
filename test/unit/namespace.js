
function testNamespace() {

  let { Model, Namespace } = require("../../index");

  let { CriteriaType } = Namespace;

  /** @type {Namespace} */
  let namespace;

  describe("Namespace", () => {

    beforeAll( async() => {
      let model = new Model("user", "test");
      let release = await model.release_add("1.0");
      namespace = await release.namespace_add("nc", "core");
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

    test("#matches", () => {

      /** @type {CriteriaType} */
      let criteria = {
        style: ["domain", "code"],
        conformanceRequired: true
      };

      /** @type {Namespace[]} */
      let matches = Namespace.matches(namespaces, criteria);
      let prefixes = matches.map( ns => ns.prefix ).join(" ");

      expect(matches.length).toBe(4);
      expect(prefixes).toBe("ag em ncic aamva");

    });

    test("#toJSON", () => {

      let expectedJSON = {
        userKey: "user",
        modelKey: "test",
        releaseKey: "1.0",
        prefix: "nc",
        style: "core"
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
