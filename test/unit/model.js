
function testModel() {

  let { Model } = require("../../index");

  describe("Model", () => {

    /** @type {Model} */
    let model;

    test("#route", () => {
      model = new Model(null, "niem", "referenceModel", "model");
      expect(model.route).toBe("/niem/referenceModel");
    });

  });

}

module.exports = testModel;
