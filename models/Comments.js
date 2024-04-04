const { Schema } = require("mongoose");

const mongoose = require("mongoose");

const PostComments = mongoose.Schema(
  {
    comment: {
      type: String,
      requried: true,
    },
    postId: {
      type: Schema.Types.ObjectId,
      ref: "DevPost",
    },
    devId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const DevPost = mongoose.model("PostComment", PostComments);

module.exports = DevPost;
