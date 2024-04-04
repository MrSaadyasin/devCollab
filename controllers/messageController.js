const MessageModel = require("../models/Message");

// new message
const createMessage = async (req, res) => {
  try {
    const newMessage = await MessageModel.create(req.body);
    res.json(newMessage);
  } catch (error) {
    res.status(500).json(error);
  }
};

// get messages by conversation id
const getConversationMessage = async (req, res) => {
  const {conversationId} = req.params
  try {
    const getMessage = await MessageModel.find({conversationId})
    res.json(getMessage)
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  createMessage,
  getConversationMessage,
};
