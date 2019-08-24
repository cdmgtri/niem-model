
function testFacet() {

  let NIEM = require("../../index");
  let { Release } = NIEM;

  let niem = new NIEM();

  /** @type {Release} */
  let release;

  describe("Facet", () => {

    beforeAll( async () => {
      release = await niem.releases.add("user", "test", "1.0");
    });


    test("enum route", async () => {
      let facet = await release.facets.add("nc:HairColorCodeSimpleType", "BLK", "black");
      expect(facet.route).toBe(release.route + "/types/nc:HairColorCodeSimpleType/facets/enumeration/BLK");
      expect(facet.style).toBe("enumeration");
    });

    test("pattern route", async () => {
      let facet = await release.facets.add("nc:ORICodeSimpleType", "\d{9}", "9 digit code", "pattern");
      // TODO: escape special characters in patterns
      expect(facet.route).toBe(release.route + "/types/nc:ORICodeSimpleType/facets/pattern/\d{9}");
      expect(facet.style).toBe("pattern");

    });

    test("prefix", async () => {
      let facet = await release.facets.add("ext:IDCodeSimpleType", "DL");
      expect(facet.typePrefix).toBe("ext");

      facet = await release.facets.add("IDCodeSimpleType", "Passport");
      expect(facet.typePrefix).not.toBeDefined();
    });

  });

}

module.exports = testFacet;
