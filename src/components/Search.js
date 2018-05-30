import React, { Component } from "react";
import axios from "axios";
import wtf from "wtf_wikipedia";

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      relatedWords: [],
      relatedImages: [],
      value: "sun"
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
      for (var keys in result) {
        pageId.push(keys);
      }
      console.log(pageId);

      // get the list of image names
      for (var i = 0; i < pageId.length; i++) {
        console.log(result[pageId[i]].imageinfo[0].url);
        var imageUrl = result[pageId[i]].imageinfo[0].url;
        relatedImages.push(imageUrl);
      }
      // for (let i = 0; i < result[pageId].images.length; i++) {
      //   // imageUrl = imageUrl.replace(" ", "_");
      //   // console.log(imageUrl);
      //   // relatedImages.push(imageUrl);
      // }

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
                  {this.state.relatedWords.map(relatedWord => (
                    <li>{relatedWord}</li>
                  ))}
                </ul>
              </div>
              <div className="column">
                <ul>
                  {this.state.relatedImages.map(relatedImage => (
                    <li>
                      <img src={relatedImage} />
                    </li>
                  ))}
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
