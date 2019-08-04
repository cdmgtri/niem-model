
function testProperty() {

  let { Model, Release, Property } = require("../../index");

  describe("Property", () => {

    let model = new Model(null, "user", "test");
    let release = new Release(model, "1.0");

    let property = new Property(release, "nc", "PersonName", "A name of a person.", "nc:PersonNameType");

    let properties = [
      new Property(null, "nc", "Person"),
      new Property(null, "nc", "Activity"),
      new Property(null, "ext", "Person"),
    ];

    test("#constructor", () => {
      expect(property.route).toBe("/user/test/1.0/properties/nc:PersonName");
      expect(property.qname).toBe("nc:PersonName");
      expect(property.isElement).toBe(true);
      expect(property.isAbstract).toBe(false);
      expect(property.label).toBe("nc:PersonName");
    });

    test("#serialize", () => {

      // Check serialize function, scoped to namespace
      let receivedJSON = property.serialize("namespace");
      let expectedJSON = {
        "name": "PersonName",
        "definition": "A name of a person.",
        "typeQName": "nc:PersonNameType",
        "isAbstract": false,
        "isElement": true
      };
      expect(receivedJSON).toEqual(expectedJSON);

      // Check serialize function, scoped to release
      receivedJSON = property.serialize("release");
      expectedJSON.prefix = "nc";
      expect(receivedJSON).toEqual(expectedJSON);

      // Check serialize function, full scope
      receivedJSON = property.serialize();
      expectedJSON.userKey = "user";
      expectedJSON.modelKey = "test";
      expectedJSON.releaseKey = "1.0";
      expect(receivedJSON).toEqual(expectedJSON);
    });

    test("#terms", () => {

      // Check basic camel casing
      let property = new Property(release, "nc", "PersonName");
      expect(property.terms.join(" ")).toEqual("Person Name");

      // Check acronym
      property = new Property(release, "nc", "LocationStateUSPSCode");
      expect(property.terms.join(" ")).toEqual("Location State USPS Code");

      // Check acronym with a dash and digits
      property = new Property(release, "nc", "LocationStateFIPS10-4Code");
      expect(property.terms.join(" ")).toEqual("Location State FIPS10-4 Code");

      // Check underscore as an acronym separator
      property = new Property(release, "nc", "PersonABC_XYZCode");
      expect(property.terms.join(" ")).toEqual("Person ABC XYZ Code");

    });

    test("#sortByName", () => {
      let qnames = properties.sort(Property.sortByName).map( property => property.qname ).join(", ");
      expect(qnames).toEqual("nc:Activity, ext:Person, nc:Person");
    });

    test("#sortByQName", () => {
      let qnames = properties.sort(Property.sortByQName).map( property => property.qname ).join(", ");
      expect(qnames).toEqual("ext:Person, nc:Activity, nc:Person");
    });

  });

}

module.exports = testProperty;
