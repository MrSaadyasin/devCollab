const { Schema } = require("mongoose");

const mongoose = require("mongoose");

const devPostSchema = mongoose.Schema(
  {
    body: {
      type: String,
      requried: true,
    },
    devId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    likeUsers: {
      type: Array,
    },
  },
  {
    timestamps: true,
  }
);

const DevPost = mongoose.model("DevPost", devPostSchema);

module.exports = DevPost;
