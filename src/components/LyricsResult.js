import React, { Component } from "react";

class LyricResult extends Component {
  render() {
    return (
      <div className="container">
        {this.props.searchResult.map(relatedWord => (
          <div className="box" key={relatedWord}>
            <a
              target="_blank"
              href={"https://wordnik.com/words/" + relatedWord}
            >
              {relatedWord}
            </a>
          </div>
        ))}
      </div>
    );
  }
}

export default LyricsResult;
