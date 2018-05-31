import React, { Component } from "react";

class TextResult extends Component {
  render() {
    return (
      <div className="container">
       	<ul>
        	{this.props.searchResult.map(relatedWord => (
             	<li>
                 	{relatedWord}
                 </li>
            ))}
       	</ul>
      </div>
    );
  }
}

export default TextResult;
