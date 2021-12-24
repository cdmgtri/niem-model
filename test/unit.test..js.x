
let testModel = require("./unit/model");
let testRelease = require("./unit/release");
let testNamespace = require("./unit/namespace");
let testLocalTerm = require("./unit/localTerm");
let testProperty = require("./unit/property.test");
let testType = require("./unit/type");
let testSubProperty = require("./unit/subProperty");
let testFacet = require("./unit/facet");
let testMappings = require("./unit/mapping");

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
    testMappings();

  });

}

module.exports = unitTests;
