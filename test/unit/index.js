
let testModel = require("./model");
let testRelease = require("./release");
let testNamespace = require("./namespace");
let testLocalTerm = require("./localTerm");
let testProperty = require("./property");
let testType = require("./type");
let testSubProperty = require("./subProperty");
let testFacet = require("./facet");

function unitTests() {

  describe("NIEM unit tests", () => {

    testModel();
    testRelease();
    testNamespace();
    testLocalTerm();
    testProperty();
    testType();
    testSubProperty();
    testFacet();

  });

}

module.exports = unitTests;
