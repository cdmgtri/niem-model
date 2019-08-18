

function testRelease() {

  let { Model } = require("../../index");

  describe("Release", () => {

    test("#route", async () => {
      let model = new Model("user", "test");
      let release = await model.createRelease("1.0");
      expect(release.route).toBe("/user/test/1.0");
    });

  });

}

module.exports = testRelease;
