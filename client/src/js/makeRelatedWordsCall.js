import axios from "axios";

export default function makeRelatedWordsCall(searchWord, callback) {
  let api_key = process.env.REACT_APP_API_KEY;
  let relatedWordsUrl =
    "http://api.wordnik.com/v4/word.json/" +
    searchWord +
    "/relatedWords?api_key=" +
    api_key;

  axios.get(relatedWordsUrl).then(res => {
    let sameContext = res.data.length - 1;
    if (!res.data[sameContext]) {
      callback(["Sorry, there are no related words"]);
      return console.log("No words!");
    }
    let relatedWords;
    for (let relationshipType of Object.values(res.data)) {
      if (relationshipType.relationshipType === "same-context") {
        relatedWords = relationshipType.words;
        break;
      } else {
        relatedWords = res.data[sameContext].words;
      }
    }
    callback((relatedWords: relatedWords));
  });
}
