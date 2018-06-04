import axios from "axios";

export default function makeRelatedWordsCall(url, callback) {
  axios.get(url).then(res => {
    if (!res.data[res.data.length - 1]) {
      callback(["Sorry, there are no related words"]);
      return console.log("No words!");
    }
    let relatedWords = res.data[res.data.length - 1].words;
    callback((relatedWords: relatedWords));
  });
}
