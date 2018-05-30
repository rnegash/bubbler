import React, { Component } from "react";
import Search from "./components/Search.js";
import Header from "./components/Header.js";
import "./App.css";
import "bulma/css/bulma.css";

class App extends Component {
  render() {
    return (
      <div className="container">
        <Header />
        <Search />
      </div>
    );
  }
}

export default App;
