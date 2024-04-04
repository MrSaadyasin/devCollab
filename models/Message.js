const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const messageSchema = mongoose.Schema(
  {
    conversationId: {
    type: Schema.Types.ObjectId,
      ref: "Conversation",
    },
    sender: {
      type: String,
    },
    text: {
      type: String,
    },
  },
  { collection: "Message" }
);

const Message = mongoose.model("Message", messageSchema);

module.exports = Message;
