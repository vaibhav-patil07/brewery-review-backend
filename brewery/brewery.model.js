const mongoose = require("mongoose");

const brewerySchema = new mongoose.Schema({
  id: String,
  ratings: Number,
  votes: Number,
});
const breweryModel = mongoose.model("Brewery", brewerySchema);

const ratingsSchema = new mongoose.Schema({
  brewery_id: String,
  email: String,
  ratings: Number,
  description: String,
});

const ratingsModel = mongoose.model("ratings", ratingsSchema);

module.exports = { breweryModel, ratingsModel };
