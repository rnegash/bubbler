import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect
} from "react-router-dom";
class Header extends Component {
  render() {
    return (
      <section className="hero">
        <div className="hero-body">
          <div className="container has-text-centered">
            <h1 className="title">
              <Link to="/">Bubbler</Link>
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
