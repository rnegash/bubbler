import React, { Component } from "react";
import ImageResult from "./ImageResult.js";
import TextResult from "./TextResult.js";

import axios from "axios";

class SearchResult extends Component {
  saveToDB(userId, searchQuery) {
    axios
      .post("http://localhost:8080/api/words/", {
        userId: userId,
        word: searchQuery
      })
      .then(function(response) {
        console.log(response);
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  render() {
    return (
      <div className="container">
        <TextResult searchResult={this.props.relatedWords} />
        <ImageResult searchResult={this.props.relatedImages} />
        <button
          type="submit"
          className="button savebutton"
          onClick={() =>
            this.saveToDB(this.props.userId, this.props.searchQuery)
          }
        >
          Save!
        </button>
      </div>
    );
  }
}

export default SearchResult;
