const mongoose = require("mongoose");

const conversationSchema = mongoose.Schema(
  {
    members: {
      type: Array,
      required: true,
    },
  },
  { collection: "Conversation" }
);

const Conversation = mongoose.model("Conversation", conversationSchema);

module.exports = Conversation;
