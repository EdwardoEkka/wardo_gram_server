const followRepository=require('../repositories/followRepository');

exports.followUser=async(req,res)=>{
    try{
        const {userId,followingId}=req.body;
        if(userId==followingId)
        {
            throw new Error('Cannot follow');
        }
        const following = await followRepository.followUser({userId,followingId});
        res.status(201).json(following);
    }
    catch(error)
    {
        res.status(500).json({ error: error.message });
    }
}

exports.addToFollowerList=async(req,res)=>{
    try{

        const {userId,followerId}=req.body;
        if(userId==followerId)
            {
                throw new Error('Cannot add to list.');
            }
        const follower = await followRepository.addToFollowerList({userId,followerId});
        res.status(201).json(follower);
    }
    catch(error)
    {
        res.status(500).json({ error: error.message });
    }
}

exports.getFollowers=async(req,res)=>{
    try {
        const userId=req.params.userId;
        const followers=await followRepository.getFollowers(userId);
        res.status(200).json(followers);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


exports.getFollowings=async(req,res)=>{
    try {
        const userId=req.params.userId;
        const followings=await followRepository.getFollowings(userId);
        res.status(200).json(followings);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.isFollowing=async(req,res)=>{
    try {
        const userId=req.query.userId;
        const followingId=req.query.followingId;
        const isfollowing=await followRepository.isFollowing({userId:userId,followingId:followingId});
        res.status(200).json(isfollowing);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.isFollower=async(req,res)=>{
    try {
        const userId=req.query.userId;
        const followerId=req.query.followerId;
        const isfollower=await followRepository.isFollower({userId:userId,followerId:followerId});
        res.status(200).json(isfollower);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}