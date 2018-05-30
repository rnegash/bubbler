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
      console.log(res);
      let result = res.data.query.pages;
      let pageId;
      let relatedImages = [];

      // getting the ID of the image object
      for (var key in result) {
          pageId = key;
      }

      // get the list of image names
      for (let i = 0; i < result[pageId].images.length; i++) {
          relatedImages.push(result[pageId].images[i].title);
      }
       
      console.log("rel img ", relatedImages)
       
     
    });
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
      <section className="hero">
        <div className="hero-body">
          <div className="container is-four-fifths">
            <div className="columns">
              <div className="column  is-offset-one-quarter">
                <input
                  className="input"
                  type="text"
                  placeholder="What word have you learned?"
                  value={this.state.value}
                  onChange={this.handleChange}
                />
              </div>

              <div className="column is-one-quarter">
                <button onClick={this.handleClick} className="button">
                  Find!
                </button>
              </div>
                </div>
              <div className="columns">
              <div className="column">
                <ul>
                {this.state.relatedWords.map(relatedWord => <li>{relatedWord}</li>)}
                </ul>
                                <ul>
                {this.state.relatedImages.map(relatedImage => <li>{relatedImage}</li>)}
                </ul>
              </div>
                  </div>
              </div>
              </div>
      </section>
    );
  }
}

export default Search;


