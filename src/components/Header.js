import React, { Component } from "react";
import { Link } from "react-router-dom";

class Header extends Component {
  render() {
    return (
      <section className="hero">
        <div className="hero-body">
          <div className="container has-text-centered">
            <h1 className="title">
              <Link to={`/${this.props.userId}`}>Bubbler</Link>
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
