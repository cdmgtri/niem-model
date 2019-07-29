
/**
 * @todo Handle operations when niem repo has not been provided
 */
class Model {

  /**
   * @param {Object} source - A NIEM model source implementation
   * @param {String} userKey
   * @param {String} modelKey
   * @param {"model"|"IEPD"|"other"} style
   * @param {String} description
   * @param {String} website
   * @param {String} repo
   */
  constructor(source, userKey, modelKey, style, description, website, repo) {

    this.collection = source;
    this.userKey = userKey;
    this.modelKey = modelKey;
    this.style = style;
    this.description = description;
    this.website = website;
    this.repo = repo;
  }

  get label() {
    return this.userKey + " " + this.modelKey;
  }

  get id() {
    return this.route;
  }

  get route() {
    return Model.buildRoute(this.userKey, this.modelKey);
  }

  static buildRoute(userKey, modelKey) {
    return `/${userKey}/${modelKey}`;
  }

  toJSON() {
    return {
      userKey: this.userKey,
      modelKey: this.modelKey,
      style: this.style,
      description: this.description,
      website: this.website,
      repo: this.repo
    }
  }

}

module.exports = Model;
