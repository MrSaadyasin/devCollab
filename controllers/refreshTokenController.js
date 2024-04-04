const jwt = require("jsonwebtoken");
const User = require("../models/User");

const refreshToken = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(401);
  const refreshToken = cookies.jwt;
  const foundUser = await User.findOne({ refreshToken }).exec();
  if (!foundUser) return res.sendStatus(403); //Forbidden
  // evaluate jwt
  jwt.verify(refreshToken, process.env.JWT_SECRET, (err, decoded) => {
    if (err || foundUser.name !== decoded.name) return res.sendStatus(403);
    const accessToken = jwt.sign(
      {
        UserInfo: {
          name: foundUser.name,_id:foundUser._id, email:foundUser.email
        },
      },
      process.env.JWT_SECRET,
      { expiresIn: "10s" }
    );
    res.json({ foundUser, accessToken });
  });
};

module.exports = {
  refreshToken,
};
