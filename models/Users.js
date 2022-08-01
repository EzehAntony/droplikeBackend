const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false },
    followings: { type: Array, default: [] },
    followers: { type: Array, default: [] },
    profile: { type: String, default: "" },
    bio: { type: String, default: "", max: 50 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("user", userSchema);
