
class Change {

  constructor(summary, description, issueLabel, issueURL, notes, draft) {
    this.summary = summary;
    this.description = description;
    this.issueLabel = issueLabel;
    this.issueURL = issueURL;
    this.notes = notes;
    this.draft = draft;
    this.refUpdate = null;
  }

  toString() {
    return `${this.issueURL} (${this.issueLabel}) ${this.refUpdate}`;
  }

}

module.exports = Change;
