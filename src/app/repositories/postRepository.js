const Post = require("../models/Post");
const Like=require("../models/Like");
const Comment=require("../models/Comment");

exports.createPost = async (postData) => {
  const post = new Post(postData);
  return await post.save();
};

exports.getPostByuserId = async (userId) => {
  return await Post.find({userId:userId}).populate('userId','username');
};

exports.getPostById = async (postId) => {
  return await Post.findById(postId).populate('userId','username profilePicture');
};

exports.getPostAllByUserId=async(userId)=>{
  const posts = await Post.find({ userId })
      .populate('userId', 'username profilePicture')
      .lean();
    for (let post of posts) {
      post.comments = await Comment.find({ postId: post._id })
        .populate('userId', 'username profilePicture')
        .lean();
      post.likes = await Like.find({ postId: post._id })
        .populate('userId', 'username profilePicture') 
        .lean();
    }
    return posts;
}

