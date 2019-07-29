
let NIEMModelObjects = require("../../src/index");

let { Model, Release, SubProperty } = NIEMModelObjects;

function testSubProperty() {

  describe("SubProperty", () => {

    let model = new Model(null, "user", "test");
    let release = new Release(model, "1.0");
    let subproperty = new SubProperty(release, "nc:PersonType", "nc:PersonName");

    test("route", () => {
      expect(subproperty.route).toBe("/user/test/1.0/types/nc:PersonType/properties/nc:PersonName");
    });

    test("sub-element default values", () => {
      expect(subproperty.min).toBe("0");
      expect(subproperty.max).toBe("unbounded");
    });

    test("sub-attribute default values", () => {
      subproperty = new SubProperty(release, "nc:PersonType", "nc:attributeName");
      expect(subproperty.route).toBe("/user/test/1.0/types/nc:PersonType/properties/nc:attributeName");
      expect(subproperty.min).toBe("0");
      expect(subproperty.max).toBe("1");
    });

  });

}

module.exports = testSubProperty;
