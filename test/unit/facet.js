
function testFacet() {

  let { Model, Release, Facet } = require("../../index");

  /** @type {Release} */
  let release;

  describe("Facet", () => {

    beforeAll( async () => {
      let model = new Model("user", "test");
      release = await model.createRelease("1.0");
    });


    test("enum route", async () => {
      let facet = await release.createFacet("nc:HairColorCodeSimpleType", "BLK", "black");
      expect(facet.route).toBe(release.route + "/types/nc:HairColorCodeSimpleType/facets/enumeration/BLK");
      expect(facet.style).toBe("enumeration");
    });

    test("pattern route", async () => {
      let facet = await release.createFacet("nc:ORICodeSimpleType", "\d{9}", "9 digit code", "pattern");
      // TODO: escape special characters in patterns
      expect(facet.route).toBe(release.route + "/types/nc:ORICodeSimpleType/facets/pattern/\d{9}");
      expect(facet.style).toBe("pattern");

    });

    test("prefix", async () => {
      let facet = await release.createFacet("ext:IDCodeSimpleType");
      expect(facet.typePrefix).toBe("ext");

      facet = await release.createFacet("IDCodeSimpleType");
      expect(facet.typePrefix).not.toBeDefined();

      facet = await release.createFacet(null);
      expect(facet.typePrefix).not.toBeDefined();
    });

  });

}

module.exports = testFacet;
