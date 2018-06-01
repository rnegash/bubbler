import React, { Component } from "react";
import Search from "./components/Search.js";
import Header from "./components/Header.js";
import ImageResult from "./components/ImageResult.js";
import TextResult from "./components/TextResult.js";
import axios from "axios";
import "bulma/css/bulma.css";
import "./App.css";

/*
*This application will help you to remember words that you have just learned
*by giving you useful associations to it.
*It will invite you to explore further and learn more about your new discovery
*/

class App extends Component {
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
      if (!res.data[res.data.length - 1]) {
        this.setState({ relatedWords: ["Sorry, there are no related words"] });
        return console.log("No words!");
      }
      console.log(res);

      let relatedWords = res.data[res.data.length - 1].words;
      this.setState({ relatedWords });
    });
  }

  makeWikiCall(url) {
    axios.get(url).then(res => {
      if (!res.data.query) {
        this.setState({ relatedImages: [] });
        return console.log("No images!");
      }
      let result = res.data.query.pages;
      //console.log(res);
      let pageIds = [];
      let relatedImages = [];

      // getting the ID of the image object
      for (var key in result) {
        if (key !== "-1") {
          pageIds.push(key);
        }
      }

      // get the list of image names
      for (var i = 0; i < pageIds.length; i++) {
        var imageUrl = result[pageIds[i]].imageinfo[0].url;
        relatedImages.push(imageUrl);
      }

      this.setState({ relatedImages });
    });
  }

  handleClick(e) {
    e.preventDefault();
    let searchWord = this.state.value;

    let wikiUrl =
      "https://commons.wikimedia.org/w/api.php?action=query&generator=images&prop=imageinfo&gimlimit=10&redirects=1&titles=" +
      searchWord +
      "&iiprop=canonicaltitle|url|size|dimensions&format=json";
    let api_key = process.env.REACT_APP_API_KEY;
    let wordnikUrl =
      "http://api.wordnik.com/v4/word.json/" +
      searchWord +
      "/relatedWords?api_key="+api_key;

    this.makeWordnikCall(wordnikUrl);
    this.makeWikiCall(wikiUrl);
  }

  handleChange(e) {
    this.setState({ value: e.target.value });
  }

  render() {
    const { relatedImages, relatedWords, value } = this.state;

    return (
      <div className="container">
        <Header />
        <Search
          searchQuery={value}
          onChange={this.handleChange}
          search={this.handleClick}
        />
        <TextResult searchResult={relatedWords} />
        <ImageResult searchResult={relatedImages} />
      </div>
    );
  }
}

export default App;
