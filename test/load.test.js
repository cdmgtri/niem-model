
let NIEM = require("../src/niem/index");

let niem = new NIEM();

describe("load", () => {

  test("5.0", async () => {

    let start = Date.now();

    await niem.loadFile("c:/git/niem/niem-releases/.release/niem-5.0-release.json");

    let time = (Date.now() - start) / 1000;

    console.log("Release 5.0 loaded in " + time + " seconds");

    let model = await niem.models.get("niem", "model");
    let release = await model.releases.get("5.0");
    let properties = await release.properties.find();

    expect(properties.length).toBeGreaterThan(11000);
    expect(time).toBeLessThan(3);

  });

})