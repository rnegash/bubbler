import React, { Component } from "react";
import Search from "./components/Search.js";
import "./App.css";
import "bulma/css/bulma.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Search />
      </div>
    );
  }
}

export default App;
