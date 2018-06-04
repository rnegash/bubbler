import React, { Component } from "react";
import { Link } from "react-router-dom";
import shortid from "shortid";

class Header extends Component {
  render() {
    let urlId = shortid.generate();

    return (
      <section className="hero">
        <div className="hero-body">
          <div className="container has-text-centered">
            <h1 className="title">
              <Link to={`/${urlId}`}>Bubbler</Link>
            </h1>
            <h2 className="subtitle">
              Remember tomorrow what you have learned today
            </h2>
          </div>
        </div>
      </section>
    );
  }
}

export default Header;
