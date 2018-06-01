import React, { Component } from "react";

class ImageResult extends Component {
  render() {
    return (
      <div className="container">
        <ul>
          {this.props.searchResult.map(relatedImage => (
            <li>
              <img src={relatedImage} />
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default ImageResult;
