const express = require("express");
const { createConversation,getConversation,deleteConv } = require("../controllers/ConversationController");

const auth = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/",auth, createConversation);
router.get("/",auth, getConversation);
router.delete("/:conversationId",auth, deleteConv);

module.exports = router;
