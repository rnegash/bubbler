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
import SavedWords from "./components/SavedWords.js";

import makeRelatedWordsCall from "./js/makeRelatedWordsCall.js";
import makeRelatedImagesCall from "./js/makeRelatedImagesCall.js";

import shortid from "shortid";
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
      savedWords: [],
      inputString: ""
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.getFromDb = this.getFromDb.bind(this);
  }

  handleClick(e) {
    let searchWord = this.state.inputString;

    makeRelatedWordsCall(searchWord, response =>
      this.setState({ relatedWords: response })
    );

    makeRelatedImagesCall(searchWord, response =>
      this.setState({ relatedImages: response })
    );
  }

  handleChange(e) {
    this.setState({ inputString: e.target.value });
  }

  getFromDb() {
    axios
      .get("/api/words?userId=" + this.userId)
      .then(
        function(response) {
          let listOfWords = [];
          for (var i = 0; i < response.data.length; i++) {
            listOfWords.push(response.data[i].word);
          }
          this.setState({ savedWords: listOfWords });
        }.bind(this)
      )
      .catch(function(error) {
        console.log(error);
      });
  }

  componentWillMount() {
    let userisOnRoot = window.location.pathname === "/";
    if (userisOnRoot) {
      this.userId = shortid.generate();
    } else {
      let currentLocation = window.location.pathname;
      this.userId = currentLocation
        .replace(/\//g, "")
        .replace(/searchresult/g, "");
      this.getFromDb(this.userId);
    }
  }

  render() {
    const { relatedImages, relatedWords, inputString } = this.state;

    return (
      <Router>
        <div className="container">
          <div className="container">
            <Header userId={this.userId} />

            <Search
              searchQuery={inputString}
              onChange={this.handleChange}
              search={this.handleClick}
              userId={this.userId}
            />
          </div>
          <Switch>
            <Route
              exact
              path={`/${this.userId}/searchresult`}
              render={props => (
                <SearchResult
                  {...props}
                  relatedImages={relatedImages}
                  relatedWords={relatedWords}
                  searchQuery={inputString}
                  userId={this.userId}
                />
              )}
            />
            <Route
              exact
              path={`/${this.userId}/`}
              render={props => (
                <SavedWords
                  {...props}
                  userId={this.userId}
                  userWords={this.state.savedWords}
                />
              )}
            />
            <Route
              exact
              path="/"
              render={() => <Redirect to={`/${this.userId}/`} />}
            />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
