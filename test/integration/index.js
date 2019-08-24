
let testSource = require("./source");

/**
 * Jest integration tests for NIEM Model objects
 */
function integrationTests() {

  describe("NIEM integration tests", () => {

    testSource();

  });

}

module.exports = integrationTests;
