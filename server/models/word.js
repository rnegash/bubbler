var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var WordSchema = new Schema({
  userId: String,
  word: String
});

module.exports = mongoose.model("Word", WordSchema);
