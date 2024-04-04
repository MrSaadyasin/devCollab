const express = require("express");
const {
  registerUser,
  loginUser,
  userInfo,
  logoutUser,
  setUserAvatar,
  getFriendDevs,
  addBio,
} = require("../controllers/userController");
const { refreshToken } = require("../controllers/refreshTokenController");
const auth = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", logoutUser);
router.get("/refresh/token", refreshToken);
router.get("/user/info/:email", auth, userInfo);
router.patch("/user/set-avatar", auth, setUserAvatar);
router.post("/user/add-bio", auth, addBio);
router.get("/user/friends", auth, getFriendDevs);

module.exports = router;
