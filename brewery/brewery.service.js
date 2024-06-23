const { breweryModel, ratingsModel } = require("./brewery.model");
const { userModel } = require("../user/user.model");
const { uuid } = require("uuidv4");

const helper = {
  _getUserByToken: async (token) => {
    const user = await userModel.findOne({ token });
    return user;
  },
};

const breweryService = {
  _put: async (req, res) => {
    const { id, ratings, description } = req.body;
    const token = req.headers.token;
    const user = await helper._getUserByToken(token);
    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    let brewery = await breweryModel.findOne({ id });
    if (!brewery) {
      const newBrewery = new breweryModel({ id, ratings: ratings, votes: 1 });
      await newBrewery.save();
      brewery = newBrewery;
    } else {
      const newRatings = brewery.ratings + ratings;
      brewery.ratings = newRatings;
      brewery.votes = brewery.votes + 1;
      await brewery.save();
    }
    const ratingsObject = new ratingsModel({
      brewery_id: id,
      email: user.email,
      ratings,
      description,
    });
    await ratingsObject.save();

    const updatedBrewery = {
      id: brewery.id,
      ratings: brewery.ratings,
      votes: brewery.votes,
    };

    return res.status(200).json({ message: "Ratings updated", updatedBrewery });
  },
  _get: async (req, res) => {
    const { id } = req.body;
    const brewery = await breweryModel.findOne({ id });
    if (!brewery) {
      return res.status(404).json({ message: "Brewery not found" });
    }
    return res.status(200).json(brewery);
  },

  _getUserRating: async (req, res) => {
    const token = req.headers.token;
    const { id } = req.params;
    const user = await helper._getUserByToken(token);
    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const userRatings = await ratingsModel.findOne({
      email: user.email,
      brewery_id: id,
    });
    if (!userRatings) {
      return res.status(404).json({ message: "No ratings found" });
    }
    const ratings = {
      email: userRatings.email,
      ratings: userRatings.ratings,
      brewery_id: userRatings.brewery_id,
      description: userRatings.description,
    };
    return res.status(200).json(ratings);
  },
};

module.exports = { breweryService };
