
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

  /**
   * Name from the property group's qname field.
   * Returns undefined if there is no qualified group.
   */
  get groupName() {
    // Check that the groupQName contains both a prefix and a name
    if (this.groupQName && this.groupQName.match(/.+\:.+/)) {
      return this.groupQName.split(":")[1];
    }
    return undefined;
  }

  /**
   * Namespace prefix from the property group's qname field.
   * Returns undefined if there is no qualified group.
   */
  get groupPrefix() {
    // Check that the groupQName contains both a prefix and a name
    if (this.groupQName && this.groupQName.match(/.+\:.+/)) {
      return this.groupQName.split(":")[0];
    }
    return undefined;
  }

  get isAttribute() {
    return ! this.isElement;
  }

  get isConcrete() {
    return ! this.isAbstract;
  }

  get style() {

    if (this.isAbstract) {
      return "abstract";
    }
    if (this.isAttribute) {
      return "attribute";
    }
    return "element";

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
