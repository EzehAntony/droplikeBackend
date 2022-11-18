const mongoose = require("mongoose");

const postSchema = mongoose.Schema(
  {
    userId: { type: String },
    caption: { type: String, default: "" },
    likes: { type: Array, default: [] },
    comments: { type: Array, default: [] },
    username: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("post", postSchema);
