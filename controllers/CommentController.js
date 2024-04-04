const PostComment = require("../models/Comments");

const createComment = async (req, res) => {
  try {
    const { comment, postId } = req.body;
    const { _id } = req.user;
    if (comment && postId) {
      const newComment = await PostComment.create({
        comment,
        postId,
        devId: _id,
      });
      const commentWithUser = await PostComment.findById(
        newComment._id
      ).populate({
        path: "devId",
        select: "name avatarUrl",
      });
      res.json(commentWithUser);
    } else {
      res.status(204).json({ error: "missing request params" });
    }
  } catch (error) {
    console.log(error);
  }
};

const getPostComments = async (req, res) => {
  try {
    const { _id } = req.user;
    const { postId } = req.params;
    if (_id) {
      const devComment = await PostComment.find({ postId }).populate({
        path: "devId",
        select: "name avatarUrl",
      }).sort({ createdAt: -1 });
      res.json(devComment);
    } else {
      res.status(204).json({ error: "missing params" });
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  createComment,
  getPostComments,
};
