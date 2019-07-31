

function testRelease() {

  let { Model, Release } = require("../../index");

  describe("Release", () => {

    test("#route", async () => {
      let model = new Model(null, "user", "test");
      let release = new Release(model, "1.0");
      expect(release.route).toBe("/user/test/1.0");
    });

  });

}

module.exports = testRelease;
