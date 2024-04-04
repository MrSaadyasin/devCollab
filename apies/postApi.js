const express = require("express");
const { createPost,getDevPost, currentUserPosts, likePost } = require("../controllers/postController");

const auth = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/",auth, createPost);
router.get("/",auth, getDevPost);
router.get("/current-user",auth, currentUserPosts);
router.post("/like/:postId",auth, likePost);

module.exports = router;
