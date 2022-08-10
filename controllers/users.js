const Users = require("../models/Users");
const bcryptjs = require("bcryptjs");

/* Update */
const updateUser = async (req, res) => {
  try {
    if (req.body.password) {
      const salt = bcryptjs.genSaltSync(10);
      const hash = bcryptjs.hashSync(req.body.password, salt);

      const updatedUser = await Users.findByIdAndUpdate(
        req.params.id,
        {
          $set: {
            username: req.body.username,
            password: hash,
          },
        },
        { new: true }
      );
      res.status(200).json(updatedUser);
    } else {
      const updatedUser = await Users.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedUser);
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

/* Delete */
const deleteUser = async (req, res) => {
  try {
    await Users.findByIdAndDelete(req.params.id);
    res.cookie("access_token", "Deleted User has no access");
    res
      .status(200)
      .json(
        "User has been deleted from the database and no longer has access to the website."
      );
  } catch (err) {
    res.status(500).json(err);
  }
};

/* Get single */
const oneUser = async (req, res) => {
  try {
    const oneUser = await Users.findById(req.params.id);
    const { password, isAdmin, ...others } = oneUser._doc;
    res.status(200).json({ ...others });
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

const followUser = async (req, res) => {
  if (req.body.userId === req.params.id) {
    res.status(500).json("You can't follow yourself");
  } else {
    try {
      const currentUser = await Users.findById(req.params.id);
      const userToFollow = await Users.findById(req.body.userId);
      if (userToFollow.followers.includes(currentUser._id)) {
        res.status(500).json("You are already following this user");
      } else {
        await userToFollow.updateOne({ $push: { followers: currentUser._id } });
        await currentUser.updateOne({ $push: { followings: req.body.userId } });
        res.status(200).json("User has been followed");
      }
    } catch (error) {
      res.status(500).json(error);
    }
  }
};

const unfollowUser = async (req, res) => {
  if (req.body.userId === req.params.id) {
    res.status(401).json("You can not unfollow yourself");
  } else {
    const currentUser = await Users.findById(req.params.id);
    const userToUnfollow = await Users.findById(req.body.userId);
    if (currentUser.followings.includes(userToUnfollow._Id)) {
      await currentUser.updateOne({
        $pull: { followings: userToUnfollow._id },
      });
      await currentUser.updateOne({ $pull: { followers: currentUser._id } });
      res.status(200).json("User has been unfollowed");
    } else {
      return res.status(500).json("You are not following this user");
    }
  }
};

module.exports = {
  updateUser,
  deleteUser,
  oneUser,
  allUsers,
  followUser,
  unfollowUser,
};
