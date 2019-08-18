
function testLocalTerm() {

  let { Model, Release, LocalTerm } = require("../../index");

  describe("Local Term", () => {

    let model = new Model("user", "test");
    let release = new Release("1.0");
    release.model = model;

    let term = new LocalTerm("nc", "NIEM", "National Information Exchange Model");
    term.release = release;

    test("#route", () => {
      expect(term.route).toBe(release.route + "/namespaces/nc/terms/NIEM");
    });

  });

}

module.exports = testLocalTerm;
