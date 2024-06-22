const { breweryModel } = require("./brewery.model");
const { uuid } = require("uuidv4");

const brewerySerive = {
  _put: async (req, res) => {
    const { id, ratings } = req.body;
    const brewery = await breweryModel.findOne({ id });
    if (!brewery) {
      const newBrewery = new breweryModel({ id, ratings: ratings, votes: 1 });
      await newBrewery.save();
      return newBrewery;
    } else {
      const newRatings = brewery.ratings + ratings;
      brewery.ratings = newRatings;
      brewery.votes = brewery.votes + 1;
      await brewery.save();
      return brewery;
    }
  },
  _get: async (req, res) => {
    const { id } = req.body;
    const brewery = await breweryModel.findOne({ id });
    if (!brewery) {
      return res.status(404).json({ message: "Brewery not found" });
    }
    return brewery;
  },
};

module.exports = { brewerySerive };
