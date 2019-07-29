
let NIEMModelObjects = require("../../src/index");

let { Model } = NIEMModelObjects;


function testModel() {

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
