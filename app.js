require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const { userService } = require("./user/user.service");
const { breweryService } = require("./brewery/brewery.service");
const cors = require("cors");

const app = express();
const port = 5000;
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.json({ message: "Hello World" });
});

app.post("/signup", async (req, res) => {
  const user = await userService._signup(req, res);
  res.status(201).json({ message: "Signup successful", user });
});

app.post("/login", async (req, res) => {
  const result = await userService._login(req, res);
  return result;
});

app.put("/brewery/:id/ratings", async (req, res) => {
  const brewery = await breweryService._put(req, res);
  res.status(200).json({ message: "Ratings updated", brewery });
});

app.get("/brewery/:id/ratings", async (req, res) => {
  return await breweryService._get(req, res);
});

app.get("/users/brewery/:id/ratings", async (req, res) => {
  return breweryService._getUserRating(req, res);
});

mongoose.connect(process.env.MONGODB_URI).then(() => {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
});
