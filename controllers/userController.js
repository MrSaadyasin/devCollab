const UserModel = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await UserModel.findOne({ email });
    if (user) {
      res.status(500).json({ error: "user with this email already exists" });
    }
    const newUser = await UserModel.create({
      name,
      email,
      password,
    });
    const salt = await bcrypt.genSalt(10);
    newUser.password = await bcrypt.hash(password, salt);
    newUser.save();
    res.json("created");
  } catch (error) {
    res.status(500).json({ err: "something went wrong" });
  }
};
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res
      .status(400)
      .json({ message: "Username and password are required." });

  const foundUser = await UserModel.findOne({ email }).exec();
  if (!foundUser) return res.sendStatus(401); //Unauthorized
  // evaluate password
  const match = await bcrypt.compare(password, foundUser.password);
  if (match) {
    // create JWTs
    const accessToken = jwt.sign(
      {
        UserInfo: {
          name: foundUser.name,
          _id: foundUser._id,
          email: foundUser.email,
        },
      },
      process.env.JWT_SECRET,
      { expiresIn: "2m" }
    );
    const refreshToken = jwt.sign(
      { name: foundUser.name, _id: foundUser._id, email: foundUser.email },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );
    // Saving refreshToken with current user
    foundUser.refreshToken = refreshToken;
    const result = await foundUser.save();

    // Creates Secure Cookie with refresh token
    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 24 * 60 * 60 * 1000,
    });

    // Send authorization roles and access token to user
    res.json({ foundUser, accessToken, user: true });
  } else {
    res.sendStatus(401);
  }
};
const logoutUser = async (req, res) => {
  try {
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(204); //No content
    const refreshToken = cookies.jwt;
    // Is refreshToken in db?
    const foundUser = await UserModel.findOne({ refreshToken }).exec();
    if (!foundUser) {
      res.clearCookie("jwt", {
        httpOnly: true,
        sameSite: "None",
        secure: true,
      });
      return res.sendStatus(204);
    }
    // Delete refreshToken in db
    foundUser.refreshToken = "";
    const result = await foundUser.save();
    res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });
    res.sendStatus(204);
  } catch (error) {
    console.log(error);
  }
};
const userInfo = async (req, res) => {
  try {
    const { email } = req.params;
    const user = await UserModel.findOne({ email }).select("-password");
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json(error);
  }
};

const setUserAvatar = async (req, res) => {
  try {
    const { avatar, avatarUrl } = req.body;
    const { _id } = req.user;
    if (avatar) {
      const dev = await UserModel.findById(_id);
      if (dev) {
        dev.avatar = avatar;
        dev.avatarUrl = avatarUrl;
        dev.save();
        res.json({ avatar: dev.avatar, avatarUrl: dev.avatarUrl });
      } else {
        res.status(204).json({ error: "User not found" });
      }
    } else {
      res.status(204).json({ error: "avatar is not empty" });
    }
  } catch (error) {
    console.log(error);
    res.json(error);
  }
};
const addBio = async (req, res) => {
  try {
    const { bio } = req.body;
    const { _id } = req.user;
    if (_id) {
      const dev = await UserModel.findById(_id);
      if (dev) {
        dev.bio = bio;
        dev.save();
        res.json({ bio: dev.bioD });
      } else {
        res.status(204).json({ error: "User not found" });
      }
    } else {
      res.status(204).json({ error: "avatar is not empty" });
    }
  } catch (error) {
    console.log(error);
    res.json(error);
  }
};

const getFriendDevs = async (req, res) => {
  try {
    // const { avatar, avatarUrl } = req.body;
    // const { _id } = req.user;
    const devs = await UserModel.find().select(" name , avatarUrl");
    if (devs) {
      res.json(devs);
    } else {
      res.status(204).json({ error: "User not found" });
    }
  } catch (error) {
    console.log(error);
    res.json(error);
  }
};

module.exports = {
  registerUser,
  loginUser,
  userInfo,
  logoutUser,
  setUserAvatar,
  getFriendDevs,
  addBio,
};
