import React, { Component } from "react";

class ImageResult extends Component {
  render() {
    return (
      <div className="container">
        {this.props.searchResult.map(relatedImage => (
          <img
            key={relatedImage}
            alt={relatedImage}
            src={relatedImage}
            style={{
              flex: 1,
              alignSelf: "stretch",
              height: 250
            }}
          />
        ))}
      </div>
    );
  }
}

export default ImageResult;
