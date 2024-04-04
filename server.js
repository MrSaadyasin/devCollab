const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

const mongoose = require("mongoose");
const UserApies = require("./apies/userApies");
// post
const DevPosts = require("./apies/postApi");
const PostComments = require('./apies/commentsApi')
//chat 
const Conversation = require('./apies/conversationApi')
const Message = require('./apies/messageApi')

require("dotenv").config();

const app = express();
const port = process.env.PORT || 5001;
const cors = require("cors");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));
mongoose
  .connect(process.env.MONGODB_URI, {})
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error(err);
  });

app.use("/api", UserApies);
// post
app.use("/api/dev-posts", DevPosts);
app.use("/api/post-comment", PostComments);
// chat
app.use("/api/conversation", Conversation);
app.use("/api/message", Message);

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
