const DevPostModel = require("../models/DevPosts");

const createPost = async (req, res) => {
  try {
    const { body } = req.body;
    const { _id } = req.user;
    if (body && _id) {
      const post = await DevPostModel.create({ body, devId: _id });
      res.json(post);
    } else {
      res.status(204).json({ error: "missing title or body" });
    }
  } catch (error) {
    console.log(error);
  }
};

const getDevPost = async (req, res) => {
  try {
    const { _id } = req.user;
    if (_id) {
      const devPosts = await DevPostModel.find().populate({
        path: "devId",
        select: "name avatarUrl",
      }).sort({ createdAt: -1 });
      res.json(devPosts);
    } else {
      res.status(204).json({ error: "missing title or body" });
    }
  } catch (error) {
    console.log(error);
  }
};

const currentUserPosts = async (req, res) => {
  try {
    const { _id } = req.user;
    if (_id) {
      const devPosts = await DevPostModel.find({ devId: _id }).populate({
        path: "devId",
        select: "name avatarUrl",
      }).sort({ createdAt: -1 });
      res.json(devPosts);
    } else {
      res.status(204).json({ error: "missing title or body" });
    }
  } catch (error) {
    console.log(error);
  }
};

const likePost = async (req, res) => {
  try {
    const { _id } = req.user;
    const { postId } = req.params
    const post = await DevPostModel.findOne({ _id: postId })
    if (post) {
      const liked = post?.likeUsers?.includes(_id)
      if (liked) {
        // remove from liked list
        const liked= post?.likeUsers?.filter((u) => u !== _id)
        post.likeUsers = liked
        post.save()
        res.json({ liked: false });
      } else {
        // add to like list
        post.likeUsers.push(_id)
        post.save()
        res.json({ liked: true });
      }
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  createPost,
  getDevPost,
  currentUserPosts,
  likePost,
};
