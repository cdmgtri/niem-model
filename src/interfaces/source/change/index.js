
class Change {

  constructor(description, url) {
    this.description = description;
    this.url = url;
    this.refUpdate;
  }

  toString() {
    return `${this.url} ${this.description} ${this.refUpdate}`;
  }

}

module.exports = Change;
