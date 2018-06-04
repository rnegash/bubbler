import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import Search from "./components/Search.js";
import Header from "./components/Header.js";
import SearchResult from "./components/SearchResult.js";

import axios from "axios";
import jsonp from "jsonp";
import shortid from "shortid";

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
      let relatedWords = res.data[res.data.length - 1].words;
      this.setState({ relatedWords });
    });
  }

  makeWikiCall(url) {
    jsonp(url, (err, data) => {
      if (!data.query) {
        this.setState({ relatedImages: [] });
        return console.log("No images!");
      }
      let result = data.query.pages;
      let pageIds = [];
      let relatedImages = [];
      // getting the keys of the page objects

      for (var key in result) {
        if (key !== "-1") {
          pageIds.push(key);
        }
      }
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
      "/relatedWords?api_key=" +
      api_key;

    this.makeWordnikCall(wordnikUrl);
    this.makeWikiCall(wikiUrl);
  }

  handleChange(e) {
    this.setState({ value: e.target.value });
  }
  componentWillMount() {
    this.userId = shortid.generate();
    console.log(this.userId);
  }

  render() {
    const { relatedImages, relatedWords, value } = this.state;

    return (
      <Router>
        <div className="container">
          <div className="container">
            <Header />

            <Search
              searchQuery={value}
              onChange={this.handleChange}
              search={this.handleClick}
              userId={this.userId}
            />
          </div>
          <Switch>
            <Route
              exact
              path="/"
              render={() => <Redirect to={`/${this.userId}/`} />}
            />

            <Route
              exact
              path={`/${this.userId}/searchresult`}
              render={props => (
                <SearchResult
                  {...props}
                  relatedImages={relatedImages}
                  relatedWords={relatedWords}
                  userId={this.userId}
                />
              )}
            />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
