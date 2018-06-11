import React, { Component } from "react";

class SavedWords extends Component {
  componentDidMount() {
    console.log("users word object ", this.props.userWords);
  }
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
