const Follower = require("../models/Follower");
const Following = require("../models/Following");

exports.followUser = async (followData) => {
  const followExisting=await Following.findOne(followData);
  if(followExisting){
    return await Following.deleteOne(followData);
  }
  const follow = new Following(followData);
  return await follow.save();
};

exports.addToFollowerList=async(followerData)=>{
  const followerExisting=await Follower.findOne(followerData);
  if(followerExisting){
    return await Follower.deleteOne(followerData);
  }
  const follower = new Follower(followerData);
  return await follower.save();
}

exports.getFollowers=async(userId)=>{
  const followers=await Follower.find({userId:userId}).populate('followerId', 'username profilePicture');
  return await followers;
}

exports.getFollowings=async(userId)=>{
  const followings=await Following.find({userId:userId}).populate('followingId', 'username profilePicture');
  return await followings;
}

exports.isFollowing=async(followingData)=>{
  const isFollowing=await Following.findOne(followingData);
  if(isFollowing)
  {
    return await true;
  }
  return await false;
}

exports.isFollower=async(followerData)=>{
  const isFollower=await Follower.findOne(followerData);
  if(isFollower)
  {
    return await true;
  }
  return await false;
}