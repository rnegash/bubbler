import jsonp from "jsonp";

export default function makeRelatedImagesCall(url, callback) {
  jsonp(url, (err, data) => {
    if (!data.query) {
      callback([]);
      return console.log("No images!");
    }
    let result = data.query.pages;
    let pageIds = [];
    let relatedImages = [];
    // getting the keys of the page objects

    for (var key in result) {
      if (key !== "-1") {
        pageIds.push(key);
      }
    }
    for (var i = 0; i < pageIds.length; i++) {
      var imageUrl = result[pageIds[i]].imageinfo[0].url;
      relatedImages.push(imageUrl);
    }

    callback(relatedImages);
  });
}
