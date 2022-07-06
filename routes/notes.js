const router = require("express").Router();
const {
  createNote,
  updateNote,
  deleteNote,
  oneNote,
  adminAllNotes,
  allNotes,
} = require("../controllers/Notes");

const { verifyUser, verifyAdmin } = require("../utilities/verifyToken");

router.post("/create/:id", verifyUser, createNote);
router.put("/update/:id/find", verifyUser, updateNote);
router.delete("/delete/:id/find", verifyUser, deleteNote);
router.get("/get/:id/find", verifyUser, oneNote);
router.get("/get/all/:id", verifyUser, allNotes);
router.get("/get/all/:id", verifyAdmin, adminAllNotes);

module.exports = router;
