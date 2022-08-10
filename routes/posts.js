const router = require("express").Router();

const {
  createPost,
  updatePost,
  deletePost,
  likePost,
  commentPost,
  getPost,
  getAll,
  timeline,
} = require("../controllers/posts");

//create post

router.post("/create", createPost);

//update post
router.put("/update/:id", updatePost);
//delete post
router.delete("/delete/:id", deletePost);

//LikePost
router.put("/like/:id", likePost);
//commentPost
router.put("/comment/:id", commentPost);

//get post
router.get("/get/:id", getPost);

//get all user post
router.get("/get/:id", getAll);

//get timeline post
router.get("/timeline/:id", timeline);

module.exports = router;
