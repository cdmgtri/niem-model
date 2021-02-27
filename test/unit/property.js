
function testProperty() {

  let NIEM = require("../../src/niem/index");
  let Property = require("../../src/property/index");

  let niem = new NIEM();

  /** @type {Property} */
  let property;

  describe("Property", () => {

    beforeAll( async () => {
      let release = await niem.releases.add("user", "test", "1.0");

      property = await release.properties.add("nc", "PersonName", "A name of a person.", "nc:PersonNameType");

    });


    let properties = [
      new Property("nc", "Person"),
      new Property("nc", "Activity"),
      new Property("ext", "Person")
    ];

    test("#constructor", () => {
      expect(property.route).toBe("/user/test/1.0/properties/nc:PersonName");
      expect(property.qname).toBe("nc:PersonName");
      expect(property.isElement).toBe(true);
      expect(property.isAbstract).toBe(false);
      expect(property.label).toBe("nc:PersonName");
      expect(property.previousRoute).toBe("/user/test/1.0/properties/nc:PersonName");
    });

    test("#toJSON", () => {

      // Check toJSON function, scoped to namespace
      let receivedJSON = JSON.parse(JSON.stringify(property));
      let expectedJSON = {
        userKey: "user",
        modelKey: "test",
        releaseKey: "1.0",
        prefix: "nc",
        name: "PersonName",
        definition: "A name of a person.",
        groupQName: "",
        typeQName: "nc:PersonNameType",
        isAbstract: false,
        isElement: true,
        appliesToTypeQNames: [],
        appliesToPropertyQNames: [],
        previousIdentifiers: {
          userKey: "user",
          modelKey: "test",
          releaseKey: "1.0",
          prefix: "nc",
          name: "PersonName"
        }
      };
      expect(receivedJSON).toEqual(expectedJSON);
    });

    test("#appliesTo", () => {
      let property = new Property("nc", "Metadata", "Information about data", "nc:MetadataType");
      property.appliesToTypeQNames = ["structures:ObjectType", "structures:MetadataType"];

      let json = JSON.parse(JSON.stringify(property));

      expect(json.appliesToTypeQNames[0]).toBe("structures:ObjectType");
      expect(json.appliesToTypeQNames[1]).toBe("structures:MetadataType");
    });

    test("#terms", () => {

      // Check basic camel casing
      let property = new Property("nc", "PersonName");
      expect(property.terms.join(" ")).toEqual("Person Name");

      // Check acronym
      property = new Property("nc", "LocationStateUSPSCode");
      expect(property.terms.join(" ")).toEqual("Location State USPS Code");

      // Check acronym with a dash and digits
      property = new Property("nc", "LocationStateFIPS10-4Code");
      expect(property.terms.join(" ")).toEqual("Location State FIPS10-4 Code");

      // Check underscore as an acronym separator
      property = new Property("nc", "PersonABC_XYZCode");
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

    test("#group", () => {
      let property = new Property("nc", "StateCode", "", "",  "nc:StateCodeAbstract");
      expect(property.groupQName).toBe("nc:StateCodeAbstract");
      expect(property.groupName).toBe("StateCodeAbstract");
      expect(property.groupPrefix).toBe("nc");

      let unqualifiedGroup = new Property("nc", "StateCode", "", "", "StateCodeAbstract");
      expect(unqualifiedGroup.groupQName).toBe("StateCodeAbstract");
      expect(unqualifiedGroup.groupName).not.toBeDefined();
      expect(unqualifiedGroup.groupPrefix).not.toBeDefined();

      let invalidGroup = new Property("nc", "StateCode", "", "", ":StateCodeAbstract");
      expect(invalidGroup.groupQName).toBe(":StateCodeAbstract");
      expect(invalidGroup.groupName).not.toBeDefined();
      expect(invalidGroup.groupPrefix).not.toBeDefined();
    });

    test("#matches--regex", () => {
      let properties = [
        new Property("a", "Person", "A human being"),
        new Property("b", "PersonName", "A name of a person"),
        new Property("c", "personAttribute"),
        new Property("d", "ContactLocation", "A contact location for a person"),
        new Property("e", "ContactEmail", "A contact email for a PERSON"),
        new Property("f", "Car", "A car"),
        new Property("g", "truck", "Not a car"),
        new Property("g", "truckContact", "Truck contact"),
        new Property("h", "boat")
      ];

      let { CriteriaType } = Property;


      /** @type {CriteriaType} */
      let criteria = {
        keyword: "PERSON"
      };

      /** @type {Property[]} */
      let matches = Property.matches(properties, criteria);
      let prefixes = matches.map( property => property.prefix ).join(" ");
      expect(prefixes).toBe("a b c d e");

      criteria.definition = /CONTACT/;
      matches = Property.matches(properties, criteria);
      prefixes = matches.map( property => property.prefix ).join(" ");
      expect(prefixes).toBe("d e");
    });

  });

}

module.exports = testProperty;
