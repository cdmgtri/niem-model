

function testRelease() {

  let NIEM = require("../../src/niem/index");
  let niem = new NIEM();

  describe("Release", () => {

    test("#route", async () => {
      let model = await niem.models.add("user", "test");
      let release = await model.releases.add("1.0");
      expect(release.route).toBe("/user/test/1.0");
    });

  });

}

module.exports = testRelease;
