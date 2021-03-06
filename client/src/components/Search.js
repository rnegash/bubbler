import React, { Component } from "react";
import { Link } from "react-router-dom";

class Search extends Component {
  render() {
    //console.log(this.props.urlparam);
    return (
      <section className="hero">
        <div className="hero-body">
          <div className="container is-four-fifths">
            <div className="columns">
              <div className="column  is-offset-one-quarter">
                <form onSubmit={this.props.search}>
                  <input
                    className="input"
                    type="text"
                    placeholder="What word have you learned?"
                    value={this.props.searchQuery}
                    onChange={this.props.onChange}
                  />
                </form>
              </div>

              <div className="column is-one-quarter">
                <Link
                  onClick={this.props.search}
                  className="button"
                  to={`/${this.props.userId}/searchresult`}
                >
                  Find!
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default Search;
