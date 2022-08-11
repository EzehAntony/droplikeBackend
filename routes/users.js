const router = require("express").Router();
const {
  updateUser,
  deleteUser,
  oneUser,
  allUsers,
  followUser,
  unfollowUser,
} = require("../controllers/users");

const { verifyUser, verifyAdmin } = require("../utilities/verifyToken");

router.put("/update/:id", verifyUser, updateUser);
router.delete("/delete/:id", verifyUser, deleteUser);
router.get("/get/:id", verifyUser, oneUser);
router.get("/all/:id", verifyUser, allUsers);
router.put("/follow/:id", verifyUser, followUser);
router.put("/follow/:id", verifyUser, unfollowUser);

module.exports = router;
