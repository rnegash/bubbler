import axios from "axios";

export default function makeRelatedWordsCall(searchWord, callback) {
  let api_key = process.env.REACT_APP_API_KEY;
  let relatedWordsUrl =
    "http://api.wordnik.com/v4/word.json/" +
    searchWord +
    "/relatedWords?api_key=" +
    api_key;

  axios.get(relatedWordsUrl).then(res => {
    if (!res.data[res.data.length - 1]) {
      callback(["Sorry, there are no related words"]);
      return console.log("No words!");
    }
    let relatedWords = res.data[res.data.length - 1].words;
    callback((relatedWords: relatedWords));
  });
}
