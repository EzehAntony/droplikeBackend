const Notes = require("../models/Notes");

/* Create  */

const createNote = async (req, res) => {
  try {
    const oneNote = new Notes({
      title: req.body.title,
      content: req.body.content,
      userId: req.user.id,
    });

    const savedNote = await oneNote.save();
    res.status(200).json(savedNote);
  } catch (err) {
    res.status(500).json(err);
  }
};

/* Update */
const updateNote = async (req, res) => {
  try {
    const oneNote = await Notes.findOneAndUpdate(
      req.query.note,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(oneNote);
  } catch (err) {
    res.status(500).json(err);
  }
};

/* Delete */
const deleteNote = async (req, res) => {
  try {
    await Notes.findByIdAndDelete(req.query.note);
    res
      .status(200)
      .json(
        "Note Deleted"
      );
  } catch (err) {
    res.status(500).json(err);
  }
};

/* Get single */
const oneNote = async (req, res) => {
  try {
    const oneeNote = await Notes.findById(req.query.note);
    res.status(200).json(oneeNote);
  } catch (err) {
    res.status(500).json(err);
  }
};

/* Get All */
const allNotes = async (req, res) => {
  try {
    const oneNote = await Notes.find({ userId: req.params.id });
    res.status(200).json(oneNote);
  } catch (err) {
    res.status(500).json(err);
  }
};

const adminAllNotes = async (req, res) => {
  try {
    await Notes.find();
    res.status(200).json(oneNote);
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = {
  createNote,
  updateNote,
  deleteNote,
  oneNote,
  allNotes,
  adminAllNotes,
};
