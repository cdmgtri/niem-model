
function testSubProperty() {

  let NIEM = require("../../src/niem/index");
  let Release = require("../../src/release/index");
  let SubProperty = require("../../src/subproperty/index");

  let niem = new NIEM();

  /** @type {Release} */
  let release;

  /** @type {SubProperty} */
  let subProperty;

  describe("SubProperty", () => {

    beforeAll( async () => {
      release = await niem.releases.add("user", "test", "1.0");
      subProperty = await release.subProperties.add("nc:PersonType", "nc:PersonName");
    });

    test("route", () => {
      expect(subProperty.route).toBe("/user/test/1.0/types/nc:PersonType/properties/nc:PersonName");
    });

    test("sub-element default values", () => {
      expect(subProperty.min).toBe("0");
      expect(subProperty.max).toBe("unbounded");
    });

    test("sub-attribute default values", async () => {
      subProperty = await release.subProperties.add("nc:PersonType", "nc:attributeName", "0", "1");
      expect(subProperty.route).toBe("/user/test/1.0/types/nc:PersonType/properties/nc:attributeName");
      expect(subProperty.min).toBe("0");
      expect(subProperty.max).toBe("1");
    });

  });

}

module.exports = testSubProperty;
