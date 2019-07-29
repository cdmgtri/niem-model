
let NIEMModelObjects = require("../../index");

let { Model, Release, Type } = NIEMModelObjects;


function testType() {

  describe("Type", () => {

    let model = new Model(null, "user", "test");
    let release = new Release(model, "1.0");


    test("#object type values", () => {
      let type = new Type(release, "nc", "PersonType", "A data type for a human being.", "object");
      expect(type.route).toBe("/user/test/1.0/types/nc:PersonType");

      // Check that object type defaults are set correctly
      expect(type.isComplexType).toBe(true);
      expect(type.isComplexContent).toBe(true);
      expect(type.pattern).toBe("object");
      expect(type.style).toBe("CCC");
      expect(type.baseQName).toBe(undefined);
      expect(type.baseQNameSuggestion).toBe("structures:ObjectType");
      expect(type.label).toBe("nc:PersonType");

      type.baseQName = "nc:LivingThingType";
      expect(type.baseQName).toBe("nc:LivingThingType");
    });

    test("#association type values", () => {
      let type = new Type(release, "nc", "PersonResidenceAssociationType", "", "association");
      expect(type.baseQNameSuggestion).toBe("structures:AssociationType");
    });

    test("#augmentation type values", () => {
      let type = new Type(release, "j", "PersonAugmentationType", "", "augmentation");
      expect(type.baseQNameSuggestion).toBe("structures:AugmentationType");
    });

    test("#metadata type values", () => {
      let type = new Type(release, "nc", "MetadataType", "", "metadata");
      expect(type.baseQNameSuggestion).toBe("structures:MetadataType");
    });

    test("#CSC type values", () => {
      let type = new Type(release, "nc", "PersonEyeColorCodeType", "", "CSC");
      expect(type.baseQNameSuggestion).toBe(undefined);
      expect(type.style).toBe("CSC");
      expect(type.isComplexType).toBe(true);
      expect(type.isComplexContent).toBe(false);
    });

    test("#simple type values", () => {
      let type = new Type(release, "nc", "PersonEyeColorCodeSimpleType", "A data type for a person's eye color.", "simple");
      expect(type.route).toBe("/user/test/1.0/types/nc:PersonEyeColorCodeSimpleType");

      // Check that simple type default are set correctly
      expect(type.isComplexType).toBe(false);
      expect(type.isComplexContent).toBe(false);
      expect(type.pattern).toBe("simple");
      expect(type.style).toBe("S");
      expect(type.baseQNameSuggestion).toBe("xs:token");
    });

    test("#unknown pattern type values", () => {
      let type = new Type(release, "nc", "ThingType");
      expect(type.isComplexContent).toBe(false);
      expect(type.isSimpleContent).toBe(false);
      expect(type.isComplexType).toBe(false);
      expect(type.isSimpleType).toBe(false);
    });

    test("#serialize", () => {
      let type = new Type(release, "nc", "PersonEyeColorCodeSimpleType", "A data type for a person's eye color.", "simple", "xs:token");

      // Check serialize function, scoped to namespace
      let receivedJSON = type.serialize("namespace");
      let expectedJSON = {
        "name": "PersonEyeColorCodeSimpleType",
        "definition": "A data type for a person's eye color.",
        "pattern": "simple",
        "baseQName": "xs:token"
      };
      expect(receivedJSON).toEqual(expectedJSON);

      // Check serialize function, scoped to release
      receivedJSON = type.serialize("release");
      expectedJSON.prefix = type.prefix;
      expect(receivedJSON).toEqual(expectedJSON);

      // Check serialize function, full scope
      receivedJSON = type.serialize();
      expectedJSON.userKey = type.userKey;
      expectedJSON.modelKey = type.modelKey;
      expectedJSON.releaseKey = type.releaseKey;
      expect(receivedJSON).toEqual(expectedJSON);
    });

  });


}

module.exports = testType;
