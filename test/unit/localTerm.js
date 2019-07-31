
function testLocalTerm() {

  let { Model, Release, LocalTerm } = require("../../index");

  describe("Local Term", () => {

    let model = new Model(null, "user", "test");
    let release = new Release(model, "1.0");
    let term = new LocalTerm(release, "nc", "NIEM", "National Information Exchange Model");

    test("#route", () => {
      expect(term.route).toBe(release.route + "/namespaces/nc/terms/NIEM");
    });

  });

}

module.exports = testLocalTerm;
