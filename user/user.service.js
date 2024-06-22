const { userModel } = require("./user.model");
const { uuid } = require("uuidv4");

const userService = {
  _signup: async (req, res) => {
    const { name, email, password } = req.body;
    const token = uuid();
    const user = new userModel({ name, email, password, token });
    await user.save();
    return { email, token };
  },
  _login: async (req, res) => {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email, password });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    return res.status(200).json({ email: user.email, token: user.token });
  },
};

module.exports = { userService };
