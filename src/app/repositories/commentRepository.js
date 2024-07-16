const Comment = require('../models/Comment');

exports.commentPost = async (commentData) => {
  // const commentExisting = await Comment.findOne({ userId: commentData.userId, postId: commentData.postId });
  // if (commentExisting) {
  //   throw new Error('User comment already exists');
  // }
  const comment = new Comment(commentData);
  return await comment.save();
};

exports.getPostComments = async (postId) => {
  const comments = await Comment.find({ postId }).populate('userId', 'username profilePicture');
  return comments;
};
