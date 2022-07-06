const { findByIdAndDelete } = require("../models/Users");
const Users = require("../models/Users");

/* Update */
const updateUser = async (req, res) => {
  try {
    const updatedUser = await Users.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json(err);
  }
};

/* Delete */
const deleteUser = async (req, res) => {
  try {
    await Users.findByIdAndDelete(req.params.id);
    res
      .status(200)
      .json(
        "has been deleted from the database and no longer has access to the website."
      );
  } catch (err) {
    res.status(500).json(err);
  }
};


/* Get single */
const oneUser = async (req, res) => {
  try {
    const oneUser = await Users.findById(req.params.id);
    res.status(200).json(oneUser);
  } catch (err) {
    res.status(500).json(err);
  }
};

/* Get All */
const allUsers = async (req, res) => {
  try {
    const oneUser = await Users.find();
    res.status(200).json(oneUser);
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = { updateUser, deleteUser, oneUser, allUsers };
