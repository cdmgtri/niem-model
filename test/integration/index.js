
let testSource = require("./source");

/**
 * Jest integration tests for NIEM Model objects
 */
function integrationTests() {

  describe("NIEM Model integration tests", () => {

    testSource();

  });

}

module.exports = integrationTests;
