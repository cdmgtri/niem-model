
function testMapping() {

  let NIEM = require("../../src/niem/index");
  let Release = require("../../src/release/index");

  let niem = new NIEM();

  /** @type {Release} */
  let oldRelease;

  /** @type {Release} */
  let newRelease;

  describe("Mapping", () => {

    beforeAll( async () => {
      oldRelease = await niem.releases.add("user", "test", "1.0");

      newRelease = await niem.releases.add("user", "test", "2.0");
      newRelease.previousReleaseKey = "1.0";

      await oldRelease.properties.add("nc", "Person", "A human being", "nc:PersonType");
      await newRelease.properties.add("nc", "Person", "A human being", "nc:PersonType");

      await oldRelease.properties.add("nc", "Location", "A place", "nc:LocationType");
      await newRelease.properties.add("nc", "Location", "A place", "nc:LocationType");

      await oldRelease.properties.add("nc", "PersonEYEColorAbstract", "Eye color", "", "", false, false);
      await newRelease.properties.add("nc", "PersonEyeColorAbstract", "A data concept for eye color", "", "", true, true);

      await oldRelease.properties.add("nc", "PersonEyeColorText", "A hair color", "nc:TextType", "");
      await newRelease.properties.add("nc", "PersonEyeColorText", "An eye color", "nc:TextType", "");

      await oldRelease.properties.add("nc", "Bogus", "A property that shouldn't be added", "nc:TextType", "");

      await newRelease.properties.add("nc", "Organization", "An organization", "nc:OrganizationType", "");


      await oldRelease.types.add("nc", "BogusType");
      await oldRelease.types.add("nc", "LocationType");
      await oldRelease.types.add("nc", "PersonType", "A human being");
      await newRelease.types.add("nc", "PersonType", "A data type for a human being.");
      await newRelease.types.add("nc", "LocationType");
      await newRelease.types.add("nc", "EYEColorCodeSimpleType", "A data type for eye color codes.");

      await oldRelease.namespaces.add("nc", "core", "http://release.niem.gov/niem/niem-core/1.0");
      await newRelease.namespaces.add("nc", "core", "http://release.niem.gov/niem/niem-core/2.0");

      await newRelease.localTerms.add("nc", "FIPS", "Federal Information Processing Standard");

      await newRelease.subProperties.add("nc:PersonType", "nc:PersonEyeColorAbstract");

      await newRelease.facets.add("nc:EYEColorCodeSimpleType", "BLU", "Blue");
      await newRelease.facets.add("nc:EYEColorCodeSimpleType", "BRO", "Brown");
      await newRelease.facets.add("nc:EYEColorCodeSimpleType", "BLK", "Black");
      await newRelease.facets.add("nc:EYEColorCodeSimpleType", "GRN", "Green");

    });

    test("#load", async () => {

      let mappings = newRelease.properties.mappings;

      let m1 = await mappings.load("nc:Person");
      let m2 = await mappings.load("nc:Location");

      expect(m1.operation).toBe("load");
      expect(m1.previousID).toBe("/user/test/1.0/properties/nc:Person");
      expect(m1.id).toBe("/user/test/2.0/properties/nc:Person");

      expect(m1.differentFields.length).toBe(0);
      expect(m2.differentFields.length).toBe(0);

      let oldP = await m1.previousObject();
      let newP = await m1.object();

      expect(oldP.id).toBe("/user/test/1.0/properties/nc:Person");
      expect(newP.id).toBe("/user/test/2.0/properties/nc:Person");

    });

    test("#add", async () => {

      let m = await newRelease.properties.mappings.add("nc:Organization");

      expect(m.operation).toBe("add");
      expect(m.previousID).toBe("");
      expect(m.id).toBe("/user/test/2.0/properties/nc:Organization");
      expect(m.differentFields.length).toBeGreaterThan(10);

      let oldP = await m.previousObject();
      let newP = await m.object();

      expect(oldP).toBeUndefined();
      expect(newP.qname).toBe("nc:Organization");

    });

    test("#edit", async () => {

      let mappings = newRelease.properties.mappings;

      let m1 = await mappings.edit("nc:PersonEYEColorAbstract", "nc:PersonEyeColorAbstract");
      let m2 = await mappings.edit("nc:PersonEyeColorText", "nc:PersonEyeColorText");

      expect(m1.operation).toBe("edit");
      expect(m1.previousID).toBe("/user/test/1.0/properties/nc:PersonEYEColorAbstract");
      expect(m1.id).toBe("/user/test/2.0/properties/nc:PersonEyeColorAbstract");

      expect(m1.differentFields.join(", ")).toBe("name, definition, isElement, isAbstract");
      expect(m2.differentFields.join(", ")).toBe("definition");

      let oldP = await m1.previousObject();
      let newP = await m1.object();

      expect(oldP.qname).toBe("nc:PersonEYEColorAbstract");
      expect(newP.qname).toBe("nc:PersonEyeColorAbstract");

    });

    test("#delete", async () => {

      let m = await newRelease.properties.mappings.delete("nc:Bogus");

      expect(m.operation).toBe("delete");
      expect(m.previousID).toBe("/user/test/1.0/properties/nc:Bogus");
      expect(m.id).toBe("");

    });

    test("#type", async () => {

      let m1 = await newRelease.types.mappings.delete("nc:BogusType");
      let m2 = await newRelease.types.mappings.add("nc:EYEColorCodeSimpleType");
      let m3 = await newRelease.types.mappings.edit("nc:PersonType", "nc:PersonType");
      let m4 = await newRelease.types.mappings.load("nc:LocationType");

      expect(m1.differentFields.length).toBe(7);
      expect(m2.differentFields.length).toBe(7);
      expect(m3.differentFields.join(", ")).toBe("definition");
      expect(m4.differentFields.length).toBe(0);

    });

    test("#namespace", async () => {
      let m = await newRelease.namespaces.mappings.edit("nc", "nc");
      expect(m.differentFields.join(", ")).toBe("uri");
    })

    test("#localTerm", async () => {
      let m = await newRelease.localTerms.mappings.add("nc", "FIPS");
      let localTerm = await m.object();
      expect(localTerm.term).toBe("FIPS");
    });

    test("#subProperty", async () => {
      let m = await newRelease.subProperties.mappings.add("nc:PersonType", "nc:PersonEyeColorAbstract");
      let sub = await m.object();
      expect(sub.typeQName).toBe("nc:PersonType");
    });

    test("#facet", async () => {
      let m = await newRelease.facets.mappings.add("nc:EYEColorCodeSimpleType", "BLU", "enumeration");
      expect(m.operation).toBe("add");
    });


  });


}

module.exports = testMapping;
