import React, { Component } from "react";
import ImageResult from "./ImageResult.js";
import TextResult from "./TextResult.js";

class SearchResult extends Component {
  render() {
    return (
      <div className="container">
        <TextResult searchResult={this.props.relatedWords} />
        <ImageResult searchResult={this.props.relatedImages} />
        <button
          type="submit"
          className="button savebutton"
          onClick={() => {
            console.log("saving" + this.props.userId);
          }}
        >
          Save!
        </button>
      </div>
    );
  }
}

export default SearchResult;
