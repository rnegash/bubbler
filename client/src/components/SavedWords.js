import React, { Component } from "react";

class SavedWords extends Component {
  render() {
    return (
      <div className="container">
        {this.props.userWords.map(relatedWord => (
          <div className="box" key={relatedWord}>
            {relatedWord}
          </div>
        ))}
      </div>
    );
  }
}

export default SavedWords;
