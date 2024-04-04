const express = require("express");
const { createMessage,getConversationMessage } = require("../controllers/messageController");

const auth = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/", createMessage);
router.get("/:conversationId", getConversationMessage);

module.exports = router;
