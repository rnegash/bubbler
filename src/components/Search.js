import React, { Component } from "react";
import axios from 'axios';
class Search extends Component {
  state = {
    associations: []
  }
  componentDidMount() {
    axios.get("http://api.wordnik.com/v4/word.json/sun/relatedWords?api_key=9ad74996eed8057e662010fa8ef0770fd099c0190d9f3f71f").then(res => {
      const associations = res.data[8].words;
      console.log(associations)
      this.setState({ associations });

    })
  }

  render() {
    return (
      <div>
        <input className="input" type="text" placeholder="Text input" />
        <a className="button">Button</a>
        <ul>
          {this.state.associations.map(association => <li>{association}</li>)}

        </ul>
      </div>
    );
  }
}

export default Search;

  //
  // {this.state.associations.map(association => <li>{association[i]}</li>)}
