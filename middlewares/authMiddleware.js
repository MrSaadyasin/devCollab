const jwt = require("jsonwebtoken");
const auth = (req, res, next) => {
  if (!req.cookies.jwt) return res.sendStatus(400);

  const authHeader = req.headers.authorization || req.headers.Authorization;
  if (!authHeader?.startsWith("Bearer ")) return res.sendStatus(401);
  const token = authHeader.split(" ")[1];
  // verify refresh token
  jwt.verify(req.cookies.jwt, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.sendStatus(401); //invalid token
    // verify access token
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) return res.sendStatus(403); //invalid token
      req.user = decoded.UserInfo;
      next();
    });
  });
};

module.exports = auth;
