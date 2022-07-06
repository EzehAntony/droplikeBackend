const mongoose = require("mongoose");

const noteSchema = mongoose.Schema({
  title: { type: String, required: true},
  content: { type: String, required: true },
  isAdmin: { type: Boolean, default: false },
  userId: {type: String}
}, {timestamps: true});

module.exports = mongoose.model("note", noteSchema);
