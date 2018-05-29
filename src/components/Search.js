import React, { Component } from "react";
import axios from "axios";
import api from "gettyimages-api";

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      relatedWords: [],
      relatedImages: [],
      value: ""
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  makeWordnikCall(url) {
    axios.get(url).then(res => {
      let relatedWords = res.data[res.data.length - 1].words;
      this.setState({ relatedWords });
    });
  }

  makeWikiCall(url) {
    axios.get(url).then(res => {
      let result = res.data;
      console.log(result);
    });
  }

  makeGettyCall(word) {
    // var api = require("gettyimages-api");
    var creds = {
      apiKey: "fzn7csa34kff7eh2ftz86pxs",
      apiSecret: "5rWNb6YTP8QMSE4fYJrxXJnj8J4uqZe46TSZ5DW2nWY9K",
      username: "rnegash",
      password: "babbelberlin2018"
    };
    var client = new api(creds);
    client
      .searchimages()
      .withPage(1)
      .withPageSize(1)
      .withPhrase("beach")
      .execute()
      .then(
        response => {
          console.log(JSON.stringify(response.images[0]));
        },
        err => {
          throw err;
        }
      );

    // axios.get(url).then(res => {
    //   let relatedImages = res.data;
    //   console.log(relatedImages);
    //
    //   //this.setState({ relatedWords });
    // });
  }

  handleClick(e) {
    e.preventDefault();
    let searchWord = this.state.value;
    let wikiUrl =
      "https://en.wikipedia.org/w/api.php?action=query&prop=images&titles=" +
      searchWord +
      "&format=json";
    let wordnikUrl =
      "http://api.wordnik.com/v4/word.json/" +
      searchWord +
      "/relatedWords?api_key=9ad74996eed8057e662010fa8ef0770fd099c0190d9f3f71f";
    let gettyUrl =
      "https://api.gettyimages.com/v3/search/images?fields=id,title,thumb,referral_destinations&sort_order=best&phrase=" +
      searchWord;
    this.makeWordnikCall(wordnikUrl);
    this.makeWikiCall(wikiUrl);
  }

  handleChange(e) {
    this.setState({ value: e.target.value });
  }

  render() {
    return (
      <div>
        <input
          className="input"
          type="text"
          placeholder="Text input"
          value={this.state.value}
          onChange={this.handleChange}
        />
        <a onClick={this.handleClick} className="button">
          Button
        </a>
        <ul>
          {this.state.relatedWords.map(relatedWord => <li>{relatedWord}</li>)}
        </ul>
      </div>
    );
  }
}

export default Search;

//
// {this.state.associations.map(association => <li>{association[i]}</li>)}
