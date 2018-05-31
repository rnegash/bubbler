import React, { Component } from "react";
import Search from "./components/Search.js";
import Header from "./components/Header.js";
import ImageResult from "./components/ImageResult.js";
import TextResult from "./components/TextResult.js";
import axios from "axios";
import "./App.css";
import "bulma/css/bulma.css";

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
      let relatedWords = res.data[res.data.length - 1].words;
      this.setState({ relatedWords });
    });
  }

  makeWikiCall(url) {
    axios.get(url).then(res => {
      let result = res.data.query.pages;
      console.log(result);
      let pageId = [];
      let relatedImages = [];

      // getting the ID of the image object
      for (var key in result) {
      	if(key !== "-1"){
        pageId.push(key);
      	}
      }
      console.log(pageId);

      // get the list of image names
      for (var i = 0; i < pageId.length; i++) {
        console.log( "result", result[pageId[i]].imageinfo[0].url);
        var imageUrl = result[pageId[i]].imageinfo[0].url;
        relatedImages.push(imageUrl);
      }

      this.setState({ relatedImages });

      console.log("rel img ", relatedImages);
    });
  }

  handleClick(e) {
    e.preventDefault();
    let searchWord = this.state.value;

    let wikiUrl =
      "https://commons.wikimedia.org/w/api.php?action=query&generator=images&prop=imageinfo&gimlimit=10&redirects=1&titles=" +
      searchWord +
      "&iiprop=canonicaltitle|url|size|dimensions&format=json";
    let wordnikUrl =
      "http://api.wordnik.com/v4/word.json/" +
      searchWord +
      "/relatedWords?api_key=9ad74996eed8057e662010fa8ef0770fd099c0190d9f3f71f";

    this.makeWordnikCall(wordnikUrl);
    this.makeWikiCall(wikiUrl);
  }

  handleChange(e) {
  	console.log(e);
    this.setState({ value: e.target.value });
  }

  render() {
  	    const {relatedImages,relatedWords, value} = this.state;

    return (
      <div className="container">
        <Header />
        <Search searchQuery={value} onChange={this.handleChange} search={this.handleClick}/>
        <ImageResult searchResult={relatedImages}/>
        <TextResult searchResult={relatedWords}/>
      </div>
    );
  }
}

export default App;
