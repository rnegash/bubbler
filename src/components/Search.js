import React, { Component } from "react";
import axios from 'axios';
class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      associations: [],
      value: "" 
    }
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleClick(e) {
    var apiUrl = "http://api.wordnik.com/v4/word.json/" + this.state.value + "/relatedWords?api_key=9ad74996eed8057e662010fa8ef0770fd099c0190d9f3f71f"
    console.log(apiUrl)
    e.preventDefault();
    console.log(this.state.value)
    axios.get(apiUrl).then(res => {
      let associations = res.data[res.data.length-1].words; 
      this.setState({ associations });
      })
  }

  handleChange(e) {
    this.setState({value: e.target.value});
  }

  render() {
    return (
      <div>
        <input className="input" type="text" placeholder="Text input" value={this.state.value} onChange={this.handleChange} />
        <a onClick={this.handleClick} className="button">Button</a>
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
