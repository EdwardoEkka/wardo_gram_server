const likeRepository=require('../repositories/likeRepository');

exports.likePost=async(req,res)=>{
    try {
        const likeData=req.body;
        const like=await likeRepository.likePost(likeData);
        res.status(200).json(like);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.getPostLikes=async(req,res)=>{
    try {
        const postId=req.params.postId;
        const likes=await likeRepository.getPostLikes(postId);
        res.status(200).json(likes);
    } catch (error) {
        res.status(500).json({error:error.message});
    }
}