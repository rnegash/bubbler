import jsonp from "jsonp";

export default function makeRelatedImagesCall(searchWord, callback) {
  let relatedImagesUrl =
    "https://commons.wikimedia.org/w/api.php?action=query&generator=images&prop=imageinfo&gimlimit=10&redirects=1&titles=" +
    searchWord +
    "&iiprop=canonicaltitle|url|size|dimensions&format=json";

  jsonp(relatedImagesUrl, (err, data) => {
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
