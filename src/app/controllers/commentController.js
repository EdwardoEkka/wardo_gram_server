const commentRepository=require('../repositories/commentRepository');

exports.commentPost=async(req,res)=>{
    try {
        const commentData=req.body;
        const comment=await commentRepository.commentPost(commentData);
        res.status(200).json(comment);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.getPostComments=async(req,res)=>{
    try {
        const postId=req.params.postId;
        const comments=await commentRepository.getPostComments(postId);
        res.status(200).json(comments);
    } catch (error) {
        res.status(500).json({error:error.message});
    }
}