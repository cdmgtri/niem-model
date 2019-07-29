
const Component = require("../component/index");

/**
 * A NIEM Property.
 *
 * @extends {Component}
 */
class Property extends Component {

  /**
   * @param {Release} release
   * @param {String} prefix
   * @param {String} name
   * @param {String} [definition]
   * @param {String} [typeQName]
   * @param {Property} [groupQName]
   * @param {boolean} [isElement=true]
   * @param {boolean} [isAbstract=false]
   */
  constructor (release, prefix, name, definition, typeQName, groupQName, isElement=true, isAbstract=false) {

    super(release, prefix, name, definition);

    this.typeQName = typeQName;
    this.groupQName = groupQName;
    this.isElement = isElement;
    this.isAbstract = isAbstract;
  }

  static buildRoute(userKey, modelKey, releaseKey, propertyQName) {
    return Component.buildRoute(userKey, modelKey, releaseKey, "Property", propertyQName);
  }

  static createElement(release, prefix, name, definition, typeQName, groupQName, isAbstract=false) {
    return new Property(release, prefix, name, definition, typeQName, groupQName, true, isAbstract);
  }

  static createAttribute(release, prefix, name, definition, typeQName) {
    return new Property(release, prefix, name, definition, typeQName, null, false, false);
  }

  static createAbstract(release, prefix, name, definition) {
    return new Property(release, prefix, name, definition, null, null, true, true);
  }


  get subProperties() {

    let SubProperty = require("../subproperty/index");

    return {
      /**
       * @param {SubProperty} input
       */
      add: async (input) => {
        input.propertyQName = this.qname;
        return this.release.subProperties.add(input);
      },

      /**
       * @param {String} typeQName
       */
      get: async (typeQName) => {
        return this.release.subProperties.get(typeQName, this.qname);
      },

      /**
       * @param {SubProperty} criteria
       */
      find: async (criteria={}) => {
        criteria.propertyQName = this.qname;
        return this.release.subProperties.find(criteria);
      }
    }
  }


  /**
   * @param {"full"|"release"|"namespace"} [scope="full"]
   */
  serialize(scope="full") {

    let object = super.serialize(scope);

    if (this.typeQName) {
      object.typeQName = this.typeQName;
    }

    if (this.groupQName) {
      object.groupQName = this.groupQName;
    }

    object.isElement = this.isElement;
    object.isAbstract = this.isAbstract;

    return object;
  }

}

module.exports = Property;

const Release = require("../release/index");
