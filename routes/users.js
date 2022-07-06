const router = require("express").Router();
const {
  updateUser,
  deleteUser,
  oneUser,
  allUsers,
} = require("../controllers/users");

const { verifyUser, verifyAdmin } = require("../utilities/verifyToken");

router.put("/update/:id", verifyUser, updateUser);
router.delete("/delete/:id", verifyUser, deleteUser);
router.get("/get/:id", verifyUser, oneUser);
router.get("/admin", verifyAdmin, allUsers);

module.exports = router;
