
let testModel = require("./model");
let testRelease = require("./release");
let testNamespace = require("./namespace");
let testLocalTerm = require("./localTerm");
let testProperty = require("./property");
let testType = require("./type");
let testSubProperty = require("./subProperty");
let testFacet = require("./facet");

/**
 * Jest unit tests for NIEM Model objects
 */
function unitTests() {

  describe("NIEM Model unit tests", () => {

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
