const ConversationModel = require("../models/Conversation");
const UserModel = require("../models/User");
const MessageModel = require("../models/Message");

// new conversation
const createConversation = async (req, res) => {
  try {
    const { receiver } = req.body;
    // querying both user by their name
    const convoUsers = await UserModel.find(
      { name: { $in: [receiver, req.user.name] } },
      "name avatarUrl"
    );
    // filtering their name array
    const usersName = convoUsers.map((u) => {
      return u.name;
    });
    // find convo between these two users
    const conv = await ConversationModel.findOne({
      "members.name": { $all: usersName },
    });
    // if no convo create new one
    if (!conv) {
      const newConversation = await ConversationModel.create({
        members: convoUsers,
      });
      const mem = newConversation.members.filter(
        (member) => member.name !== req.user.name
      );
      newConversation.members = mem;
      res.json(newConversation);
    } else {
      const mem = conv.members.filter(
        (member) => member.name !== req.user.name
      );
      conv.members = mem;
      res.json(conv);
    }
  } catch (error) {
    console.log(error);
  }
};

// get conversation of a current user
const getConversation = async (req, res) => {
  try {
    const { name } = req.user;
    const conversations = await ConversationModel.find({
      "members.name": { $all: [name] },
    });
    // here we are filtering only the other user in conversation not the current user
    const filteredConv = conversations.map((conv) => {
      const mem = conv.members.filter(
        (member) => member.name !== req.user.name
      );
      conv.members = mem;
      return conv;
    });
    res.json(filteredConv);
  } catch (error) {
    console.log(error);
  }
};


// get conversation of a current user
const deleteConv = async (req, res) => {
  try {
    console.log('api working');
    const { conversationId } = req.params;
    const conversation = await ConversationModel.deleteOne({_id:conversationId});
    const convMessages = await MessageModel.deleteMany({conversationId})
    // convMessages.remove()
    // conversation.remove()
    console.log(conversation)
    // here we are filtering only the other user in conversation not the current user
    // const filteredConv = conversations.map((conv) => {
    //   const mem = conv.members.filter(
    //     (member) => member.name !== req.user.name
    //   );
    //   conv.members = mem;
    //   return conv;
    // });
    res.json('deleted');
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  createConversation,
  deleteConv,
  getConversation,
};
