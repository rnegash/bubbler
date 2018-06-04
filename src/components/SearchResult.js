import React, { Component } from "react";
import Header from "./Header.js";
import ImageResult from "./ImageResult.js";
import TextResult from "./TextResult.js";

class SearchResult extends Component {
  render() {
    return (
      <div className="container">
        <TextResult searchResult={this.props.relatedWords} />
        <ImageResult searchResult={this.props.relatedImages} />
      </div>
    );
  }
}

export default SearchResult;
