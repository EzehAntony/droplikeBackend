const posts = require("../models/Posts");
const users = require("../models/Users");

//create post
const createPost = async (req, res) => {
  try {
    const newPost = posts(req.body);
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (error) {
    res.status(500).json(error);
  }
};

//update post

const updatePost = async (req, res) => {
  try {
    const post = await posts.findById(req.params.id);
    if (post.userId === req.body.userId) {
      await post.updateOne({
        $set: req.body,
      });
      res.status(200).json("Post Updated");
    } else {
      res.status(500).json("You can't update someone's post.");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

//delete post

const deletePost = async (req, res) => {
  try {
    const post = await posts.findById(req.params.id);
    if (post.userId === req.body.userId) {
      await post.deleteOne();
      res.status(200).json("Post deleted");
    } else {
      res.status(500).json("You can delete only your posts.");
    }
  } catch (error) {
    res.status(500).json(Error);
  }
};

// Like a post

const likePost = async (req, res) => {
  try {
    const post = await posts.findById(req.params.id);
    if (post.likes.includes(req.body.userId)) {
      await post.updateOne({
        $pull: { likes: req.body.userId },
      });
      res.status(200).json("unliked");
    } else {
      const like = await post.updateOne({
        $push: { likes: req.body.userId },
      });
      res.status(200).json("Liked");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

//comment on post
const commentPost = async (req, res) => {
  try {
    const post = await posts.findById(req.params.id);
    const comment = await post.updateOne({
      $push: { comments: req.body.userId },
    });
    res.status(200).json("commented");
  } catch (error) {
    res.status(500).json(error);
  }
};

//get a user post
const getPost = async (req, res) => {
  try {
    const post = await posts.findById(req.params.id);
    res.status(200).json(post);
  } catch (error) {
    res.status(200).json(error);
  }
};

//get all user post

const getAll = async (req, res) => {
  try {
    const post = await posts.find({ userId: req.params.id });
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json(error);
  }
};

const timeline = async (req, res) => {
  const currentUser = await users.findById(req.params.id);
  const currentUserPost = await posts.find({ userId: currentUser._id });
  const friendsPost = await Promise.all(
    currentUser.followings.map((f) => {
      return posts.find({ userId: f });
    })
  );
  res
    .status(200)
    .json(currentUserPost.concat(...friendsPost).sort({ "createdAt": 1 }));
};

module.exports = {
  createPost,
  updatePost,
  deletePost,
  likePost,
  commentPost,
  getPost,
  getAll,
  timeline,
};
