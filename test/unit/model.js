
function testModel() {

  let { Model } = require("../../index");

  let { CriteriaType } = Model;

  describe("Model", () => {

    /** @type {Model} */
    let model;

    test("#route", () => {
      model = new Model("niem", "referenceModel", "model");
      expect(model.route).toBe("/niem/referenceModel");
    });

    test("#match", () => {

      /** @type {CriteriaType} */
      let criteria = {
        userKey: "niem",
        modelKey: "referenceModel"
      };

      expect(model.match(criteria)).toBeTruthy();
    });

    test("#matches", () => {

      let models = [
        new Model("niem", "model"),
        new Model("lapd", "model"),
        new Model("niem", "coreSupplements"),
        new Model("acme", "iepd")
      ];

      /** @type {CriteriaType} */
      let criteria = {
        modelKey: "model"
      };

      /** @type {Model[]} */
      let matches = Model.matches(models, criteria);
      expect(matches.length).toBe(2);
      expect(matches[0].userKey).toBe("niem");
      expect(matches[1].userKey).toBe("lapd");
    });

  });

}

module.exports = testModel;
