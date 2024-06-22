const mongoose = require("mongoose");

const brewerySchema = new mongoose.Schema({
  id: String,
  ratings: Number,
  votes: Number,
});
const breweryModel = mongoose.model("Brewery", brewerySchema);

module.exports = { breweryModel };
