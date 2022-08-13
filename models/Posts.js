const mongoose = require("mongoose");

const postSchema = mongoose.Schema(
  {
    userId: { type: String },
    Image: { type: String, default: "" },
    caption: { type: String, default: "" },
    likes: { type: Array, default: [] },
    comments: { type: Object, default: [] },
    username: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("post", postSchema);
