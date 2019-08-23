
function testSubProperty() {

  let { Model, Release, SubProperty } = require("../../index");

  /** @type {Release} */
  let release;

  /** @type {SubProperty} */
  let subProperty;

  describe("SubProperty", () => {

    beforeAll( async () => {
      let model = new Model("user", "test");
      release = await model.releases.add("1.0");
      subProperty = await release.subProperty_add("nc:PersonType", "nc:PersonName");
    });

    test("route", () => {
      expect(subProperty.route).toBe("/user/test/1.0/types/nc:PersonType/properties/nc:PersonName");
    });

    test("sub-element default values", () => {
      expect(subProperty.min).toBe("0");
      expect(subProperty.max).toBe("unbounded");
    });

    test("sub-attribute default values", async () => {
      subProperty = await release.subProperty_add("nc:PersonType", "nc:attributeName");
      expect(subProperty.route).toBe("/user/test/1.0/types/nc:PersonType/properties/nc:attributeName");
      expect(subProperty.min).toBe("0");
      expect(subProperty.max).toBe("1");
    });

  });

}

module.exports = testSubProperty;
