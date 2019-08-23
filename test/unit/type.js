
function testType() {

  let { Model, Release, Type } = require("../../index");

  /** @type {Release} */
  let release;

  describe("Type", () => {

    beforeAll( async () => {
      let model = new Model("user", "test");
      release = await model.releases.add("1.0");
    });


    test("#object type values", async () => {
      let type = await release.type_add("nc", "PersonType", "A data type for a human being.", "object");

      expect(type.route).toBe("/user/test/1.0/types/nc:PersonType");

      // Check that object type defaults are set correctly
      expect(type.isComplexType).toBe(true);
      expect(type.isComplexContent).toBe(true);
      expect(type.style).toBe("object");
      expect(type.styleCategory).toBe("CCC");
      expect(type.baseQName).toBe(undefined);
      expect(type.baseQNameDefault).toBe("structures:ObjectType");
      expect(type.label).toBe("nc:PersonType");

      type.baseQName = "nc:LivingThingType";
      expect(type.baseQName).toBe("nc:LivingThingType");
    });

    test("#association type values", async () => {
      let type = await release.type_add("nc", "PersonResidenceAssociationType", "", "association");
      expect(type.baseQNameDefault).toBe("structures:AssociationType");
    });

    test("#augmentation type values", async () => {
      let type = await release.type_add("j", "PersonAugmentationType", "", "augmentation");
      expect(type.baseQNameDefault).toBe("structures:AugmentationType");
    });

    test("#metadata type values", async () => {
      let type = await release.type_add("nc", "MetadataType", "", "metadata");
      expect(type.baseQNameDefault).toBe("structures:MetadataType");
    });

    test("#CSC type values", async () => {
      let type = await release.type_add("nc", "PersonEyeColorCodeType", "", "CSC");
      expect(type.baseQNameDefault).toBe(undefined);
      expect(type.style).toBe("CSC");
      expect(type.isComplexType).toBe(true);
      expect(type.isComplexContent).toBe(false);
    });

    test("#simple type values", async () => {
      let type = await release.type_add("nc", "PersonEyeColorCodeSimpleType", "A data type for a person's eye color.", "simple");
      expect(type.route).toBe("/user/test/1.0/types/nc:PersonEyeColorCodeSimpleType");

      // Check that simple type default are set correctly
      expect(type.isComplexType).toBe(false);
      expect(type.isComplexContent).toBe(false);
      expect(type.style).toBe("simple");
      expect(type.styleCategory).toBe("S");
      expect(type.baseQNameDefault).toBe("xs:token");
    });

    test("#unknown pattern type values", () => {
      let type = new Type("nc", "ThingType");
      expect(type.isComplexContent).toBe(false);
      expect(type.isSimpleContent).toBe(false);
      expect(type.isComplexType).toBe(false);
      expect(type.isSimpleType).toBe(false);
    });

    test("#base", () => {
      let type = new Type("nc", "PersonType", "A data type for a human being", "object", "structures:ObjectType");
      expect(type.baseQName).toBe("structures:ObjectType");
      expect(type.baseName).toBe("ObjectType");
      expect(type.basePrefix).toBe("structures");

      let unqualifiedBase = new Type("nc", "PersonType", "A data type for a human being", "object", "ObjectType");
      expect(unqualifiedBase.baseQName).toBe("ObjectType");
      expect(unqualifiedBase.baseName).not.toBeDefined();
      expect(unqualifiedBase.basePrefix).not.toBeDefined();

      let invalidBase = new Type("nc", "PersonType", "A data type for a human being", "object", ":ObjectType");
      expect(invalidBase.baseQName).toBe(":ObjectType");
      expect(invalidBase.baseName).not.toBeDefined();
      expect(invalidBase.basePrefix).not.toBeDefined();
    });

    test("#toJSON", async () => {
      let type = await release.type_add("nc", "PersonEyeColorCodeSimpleType", "A data type for a person's eye color.", "simple", "xs:token");

      // Check serialize function, scoped to namespace
      let receivedJSON = JSON.parse(JSON.stringify(type));
      let expectedJSON = {
        "userKey": "user",
        "modelKey": "test",
        "releaseKey": "1.0",
        "prefix": "nc",
        "name": "PersonEyeColorCodeSimpleType",
        "definition": "A data type for a person's eye color.",
        "style": "simple",
        "baseQName": "xs:token"
      };
      expect(receivedJSON).toEqual(expectedJSON);
    });

  });


}

module.exports = testType;
