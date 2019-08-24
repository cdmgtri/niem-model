
module.exports = () => {

  let NIEM = require("../../index");

  let { Model, Release, Namespace, Property } = NIEM;

  let niem = new NIEM();
  niem.sources[0].logger.loggingEnabled = true;

  describe("NIEM integration tests", () => {

    /** @type {Model} */
    let model;

    /** @type {Release} */
    let release;

    /** @type {Release} */
    let release2;

    /** @type {Namespace} */
    let namespace;


    describe("NIEM", () => {

      test("#models.add", async () => {

        model = await niem.models.add("test", "niem", "model");

        expect(model.userKey).toBe("test");
        expect(model.modelKey).toBe("niem");
        expect(model.route).toBe("/test/niem");

      });

      test("#models.get", async () => {
        // Find the model
        let model = await niem.models.get("test", "niem");
        expect(model.userKey).toBe("test");
        expect(model.modelKey).toBe("niem");
      });

    });


    describe("Model", () => {
      test("#createRelease", async () => {
        // Add a release
        release = await model.releases.add("4.1")
        expect(release.releaseKey).toBe("4.1");
        expect(release.route).toBe(model.route + "/4.1");
      });

      test("#release", async () => {
        // Get the previously added release
        let release = await model.releases.get("4.1");
        expect(release.route).toBe(model.route + "/4.1");
      });

      test("#releases", async () => {
        // Add an additional model and some extra releases
        release2 = await model.releases.add("4.2");

        let arrestRpt = await niem.models.add("APD", "arrestReport");
        await arrestRpt.releases.add("1.0");
        await arrestRpt.releases.add("1.1");
        await arrestRpt.releases.add("4.1");

        // Find the NIEM model releases
        let releases = await model.releases.find();
        let releaseKeys = releases.map( release => release.releaseKey );
        expect(releaseKeys.includes("4.1")).toBeTruthy();
        expect(releaseKeys.includes("4.2")).toBeTruthy();
        expect(releaseKeys.includes("1.0")).toBeFalsy();

        // Find the 4.1 release from the NIEM model only
        releases = await model.releases.find({releaseKey: "4.1"});
        expect(releases.length).toBe(1);
      });

    });


    describe("Release", () => {

      test("#namespaces.add", async () => {

        // Add a namespace
        namespace = await release.namespaces.add("nc", "core", "http://release.niem.gov/niem/4.0", "niem-core", "NIEM Core", "alpha1");
        expect(namespace.prefix).toBe("nc");

        // Add some additional namespaces
        await release.namespaces.add("ag", "domain");
        await release.namespaces.add("j", "domain");
        await release.namespaces.add("mo", "domain");
      });

      test("#namespace", async () => {
        // Get a specific namespace
        let ns = await release.namespaces.get("nc");
        expect(ns.prefix).toBe("nc");
        expect(ns.style).toBe("core");
      });

      test("#namespaces", async () => {
        // Find all domain namespaces
        let namespaces = await release.namespaces.find({style: "domain"});
        expect(namespaces.length).toBe(3);

        // Make sure the domain namespaces include the expected values
        let prefixes = namespaces.map( ns => ns.prefix );
        expect(prefixes.includes("ag")).toBe(true);
        expect(prefixes.includes("j")).toBe(true);
        expect(prefixes.includes("mo")).toBe(true);
        expect(prefixes.includes("nc")).toBe(false);
        expect(prefixes.includes("text")).toBe(false);
      });

      test("#properties.add", async () => {
        // Add a new property
        let property = await release.properties.add("nc", "PersonGivenName", "A first name of a person", "nc:TextType");
        expect(property.qname).toBe("nc:PersonGivenName");
        expect(property.route).toBe(release.route + "/properties/nc:PersonGivenName");
      });

      test("#property", async () => {
        // Get the added property
        let p = await release.properties.get("nc:PersonGivenName");
        expect(p.name).toEqual("PersonGivenName");

        // Get undefined for an unknown property
        p = await release.properties.get("nc:ThisDoesNotExist");
        expect(p).toBe(undefined);
      });

      test("#properties", async () => {
        // Find properties filtered on elements
        let properties = await release.properties.find({isElement: true});
        expect(properties.length).toBe(1);
      });


      test("#types.add", async () => {
        // Add a type
        let type = await release.types.add("nc", "PersonType", "A data type for a human being", "object");
        expect(type.qname).toBe("nc:PersonType");
        expect(type.route).toBe("/test/niem/4.1/types/nc:PersonType");
      });

      test("#type", async () => {
        // Get the added type
        t = await release.types.get("nc:PersonType");
        expect(t.name).toEqual("PersonType");

        // Get undefined for an unknown type
        t = await release.types.get("nc:TextType");
        expect(t).toBe(undefined);
      });

      test("#types", async () => {
        // Find an expected type
        let types = await release.types.find();
        expect(types.length).toBe(1);

        // Make sure release.types.find (release=4.1) resets the releaseKey correctly
        types = await release.types.find({releaseKey: "1.0"});
        expect(types.length).toBe(1);

        // Make sure release.types.find (release=4.1) does not return the 4.2 type
        await release2.types.add("nc", "PersonType");
        types = await release.types.find();
        expect(types.length).toBe(1);
      });



      test("#localTerms.add", async () => {
        // Add a local term
        let term = await release.localTerms.add("nc", "NIEM", "National Information Exchange Model");
        expect(term.prefix).toBe("nc");
        expect(term.literal).toBe("National Information Exchange Model");
      });

      test("#localTerm", async () => {
        // Add the same term to a different namespace
        await release.localTerms.add("ag", "NIEM", "National Information Exchange Model");
        let term = await release.localTerms.get("ag", "NIEM");
        expect(term.prefix).toBe("ag");


        // Find the term from the correct namespace
        term = await release.localTerms.get("nc", "NIEM");
        expect(term.prefix).toBe("nc");
        expect(term.term).toBe("NIEM");
      });

      test("#localTerms", async () => {
        // Find all terms in the release
        let terms = await release.localTerms.find();
        expect(terms.length).toBe(2);

        // Find all terms from the nc namespace
        terms = await release.localTerms.find({prefix: "nc"});
        expect(terms.length).toBe(1);
      });



      test("#subProperties.add", async () => {
        // Add an element to a type and check the default values
        let sub = await release.subProperties.add("nc:PersonType", "nc:PersonName");
        expect(sub.typeQName).toBe("nc:PersonType");
        expect(sub.propertyQName).toBe("nc:PersonName");
        expect(sub.min).toBe("0");
        expect(sub.max).toBe("unbounded");
        expect(sub.min).toBe("0");
        expect(sub.max).toBe("unbounded");

        // Add an attribute to a type and check the default values
        sub = await release.subProperties.add("nc:PersonType", "nc:personAttribute", undefined, 1);
        expect(sub.typeQName).toBe("nc:PersonType");
        expect(sub.propertyQName).toBe("nc:personAttribute");
        expect(sub.min).toBe("0");
        expect(sub.max).toBe("1");
      });

      test("#subProperty", async () => {
        // Get a type-subProperty relationship
        let sub = await release.subProperties.get("nc:PersonType", "nc:PersonName");
        expect(sub.typeQName).toBe("nc:PersonType");
        expect(sub.propertyQName).toBe("nc:PersonName");
      });

      test("#subProperties", async () => {
        // Find all type-subProperty relationships for a given type
        let subs = await release.subProperties.find({typeQName: "nc:PersonType"});
        expect(subs.length).toBe(2);

        // Find all type-subProperty relationships for a given property
        subs = await release.subProperties.find({propertyQName: "nc:personAttribute"});
        expect(subs.length).toBe(1);
      });



      test("#facets.add", async () => {
        // Add an enum
        let facet = await release.facets.add("nc:HairColorCodeSimpleType", "BLK", "black");
        expect(facet.style).toBe("enumeration");

        // Add another enum to the same type
        facet = await release.facets.add("nc:HairColorCodeSimpleType", "BRO", "brown");
        expect(facet.style).toBe("enumeration");

        // Add a pattern to a different type
        facet = await release.facets.add("nc:ORICodeSimpleType", "\d{9}", "9 digit code", "pattern");
        expect(facet.style).toBe("pattern");
      });

      test("#facet", async () => {
        // Find a specific enum in a specific type
        let facet = await release.facets.get("nc:HairColorCodeSimpleType", "BRO");
        expect(facet.definition).toBe("brown");
      });

      test("#facets", async () => {
        // Find all facets in a given type
        let facets = await release.facets.find({typeQName: "nc:HairColorCodeSimpleType"});
        expect(facets.length).toBe(2);

        // Find all facets with the given value
        facets = await release.facets.find({value: "BRO"});
        expect(facets.length).toBe(1);
      });


    });


    describe("Namespace", () => {

      test("#properties.add", async () => {
        let p = await namespace.properties.add("Location", "A place.", "nc:LocationType");
        expect(p.qname).toBe("nc:Location");
      });

      test("#property", async () => {
        let p = await namespace.properties.get("Location");
        expect(p.qname).toBe("nc:Location");

        p = await namespace.properties.get("ThisDoesNotExist");
        expect(p).toBe(undefined);
      });

      test("#properties", async () => {
        let properties = await namespace.properties.find({ isElement: true });
        expect(properties.length).toBe(2);
      });


      test("#types.add", async () => {
        let t = await namespace.types.add("LocationType", "", "object");
        expect(t.qname).toBe("nc:LocationType");
      });

      test("#type", async () => {
        let t = await namespace.types.get("LocationType");
        expect(t.prefix).toBe("nc");
      });

      test("#types", async () => {
        let types = await namespace.types.find();
        expect(types.length).toBe(2);
      });


      test("#localTerms.add", async () => {
        let term = await namespace.localTerms.add("US", "United States");
        expect(term.prefix).toBe("nc");
        expect(term.term).toBe("US");
      });

      test("#localTerm", async () => {
        let term = await namespace.localTerms.get("US");
        expect(term.prefix).toBe("nc");
      });

      test("#localTerms", async () => {
        let terms = await namespace.localTerms.find();
        expect(terms.length).toBe(2);
      });

    });

    describe("ops", () => {

      test("#edit", async () => {
        let p = await release.properties.get("nc:Location");
        expect(p.previousIdentifiers.name).toBe("Location");

        p.name = "Place";
        await p.save();

        // Make sure old property name does not exist
        let oldP = await release.properties.get("nc:Location");
        expect(oldP).toBeUndefined();

        // Make sure new property name was saved
        let newP = await release.properties.get("nc:Place");
        expect(newP.route).toBe("/test/niem/4.1/properties/nc:Place");
        expect(newP.previousRoute).toBe("/test/niem/4.1/properties/nc:Place");

        // TODO: Make sure transaction can be found in the log

      });

      test("#edit--dependencies", async () => {

        // Add a type
        let type = await release.types.add("nc", "ActivityType", "", "object");

        // Add some type dependencies
        await release.types.add("nc", "SurveyType", "", "object", "nc:ActivityType");
        await release.properties.add("nc", "Activity", "", "nc:ActivityType");

        // Modify a type identifier field
        type.name = "EventType";
        await type.save();

        // Check that the dependencies now refer to the updated type name
        let childType = await release.types.get("nc:SurveyType");
        expect(childType.baseQName).toBe("nc:EventType");

        let dataProperty = await release.properties.get("nc:Activity");
        expect(dataProperty.typeQName).toBe("nc:EventType");

      });

      test("#delete", async () => {

        await release.properties.add("ext", "A");
        await release.properties.add("ext", "B");
        await release.properties.add("ext", "C");

        let originalCount = await release.source.properties.count();

        let b = await release.properties.get("ext:B");
        await b.delete();

        let updatedCount = await release.source.properties.count();
        let match = await release.properties.get("ext:B");

        expect(updatedCount).toBe(originalCount - 1);
        expect(match).toBeUndefined();

      });

      test("#count", async () => {
        let count = await release.source.namespaces.count({style: "domain"});
        expect(count).toBe(3);
      });

      test("#revisions", async () => {

        // Revision 1
        let p = await release.properties.add("nc", "Person");

        // Revision 2
        p.name = "Humann";
        await p.save();

        // Revision 3
        p.name = "Human";
        await p.save();

        // Revision 4
        p.prefix = "ext";
        await p.save();

        // Unrelated change
        await release.properties.add("nc", "Email");

        // Revision 5
        p.definition = "A person.";
        await p.save();

        let revisions = await p.revisions();
        expect(revisions.length).toBe(5);

      });

      test("#migrations", async () => {

        let p1 = await release.properties.add("ext", "Exchange");

        let p2 = new Property("ext", "Message");
        p2.release = release2;
        p2.migrationIdentifiers = p1.identifiers;
        await p2.add();

        let history = await p2.history();
        expect(history.length).toBe(2);

      });

    });

    describe("log", () => {

      /**
       * @todo Compare previous and updated logs.  Shouldn't change once stable.
       */
      test("#print", () => {
        let fs = require("fs");
        let log = model.source.log;
        let json = JSON.stringify(log, null, 2);
        fs.writeFileSync("test/log.json", json);
        expect(true).toBeTruthy();
      });

    });

    describe("source", () => {

      /**
       * @todo Compare previous and updated dbs.  Shouldn't change once stable.
       */
      test("#save", () => {
        let fs = require("fs");
        let json = JSON.stringify(niem.sources);
        fs.writeFileSync("test/db.json", json);
        expect(true).toBeTruthy();
      });

      test("#load", async () => {

        let p = await niem.properties.get("test", "niem", "4.1", "nc:PersonGivenName");
        expect(p).toBeDefined();

        let fs = require("fs");
        let text = fs.readFileSync("test/db.json");
        let json = JSON.parse(text);

        let niem2 = new NIEM();
        await niem2.sources[0].load(niem2, json[0]);

        let p2 = await niem2.properties.get("test", "niem", "4.1", "nc:PersonGivenName");
        expect(p2).toBeDefined();
      });

    });

  });

}
