const Like = require('../models/Like');

exports.likePost = async (likeData) => {
  const likeExisting = await Like.findOne(likeData);
  if (likeExisting) {
    await Like.deleteOne(likeData);
    return [];
  }
  const like = new Like(likeData);
  return await like.save();
};

exports.getPostLikes = async (postId) => {
  const likes = await Like.find({ postId });
  return likes;
};
