const bcryptjs = require("bcryptjs");
const Users = require("../models/Users");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  try {
    const salt = bcryptjs.genSaltSync(10);
    const hash = bcryptjs.hashSync(req.body.password, salt);

    const newUser = new Users({
      username: req.body.username,
      password: hash,
    });

    const savedUser = await newUser.save();
    res.status(200).json(savedUser);
  } catch (err) {
    res.status(500).json(err);
  }
};

const login = async (req, res) => {
  try {
    const oneUser = await Users.findOne({ username: req.body.username });
    if (!oneUser) {
      return res.status(403).json("No such user in the database");
    }

    const isPassword = await bcryptjs.compare(req.body.password, oneUser.password);

    if (!isPassword) {
      return res.status(500).json("Password is incorrect");
    }

    const token = jwt.sign(
      {
        id: oneUser._id,
        isAdmin: oneUser.isAdmin,
      },
      process.env.jwt
    );

    const { password, ...others } = oneUser._doc;
    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json({ ...others });
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = { register, login };
