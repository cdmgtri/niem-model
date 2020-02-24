
function testLocalTerm() {

  let { NIEM, Release }= require("../../src/index");

  let niem = new NIEM();

  /** @type {Release} */
  let release;

  describe("Local Term", () => {

    beforeAll( async () => {
      release = await niem.releases.add("user", "test", "1.0");
    });


    test("#route", async () => {
      let term = await release.localTerms.add("nc", "NIEM", "National Information Exchange Model");
      expect(term.route).toBe(release.route + "/namespaces/nc/terms/NIEM");
    });

  });

}

module.exports = testLocalTerm;
