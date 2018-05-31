import React, { Component } from "react";
import axios from "axios";

class Search extends Component {
  constructor(props) {
  super(props);
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
                  value={this.props.searchQuery}
                  onChange={this.props.onChange}
                />
              </div>

              <div className="column is-one-quarter">
                <button onClick={this.props.search} className="button">
                  Find!
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default Search;
