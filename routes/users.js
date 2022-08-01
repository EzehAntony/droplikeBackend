const router = require("express").Router();
const {
  updateUser,
  deleteUser,
  oneUser,
  allUsers,
  followUser,
} = require("../controllers/users");

const { verifyUser, verifyAdmin } = require("../utilities/verifyToken");

router.put("/update/:id", verifyUser, updateUser);
router.delete("/delete/:id", verifyUser, deleteUser);
router.get("/get/:id", verifyUser, oneUser);
router.get("/admin", verifyAdmin, allUsers);
router.put("/follow/:id", verifyUser, followUser);

module.exports = router;
