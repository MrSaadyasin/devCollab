const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    bio: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
    },
    avatarUrl: {
      type: String,
    },
    refreshToken: String,
  },
  { collection: "User" }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
