const express=require('express');
const postController=require('../controllers/postController');
const router=express.Router();

router.post('/create', postController.uploadFile, postController.createPost);
router.get('/getUserPosts/:userId', postController.getUserPosts);
router.get('/getPostById/:postId',postController.getPostById);
router.get('/getAllPosts/:userId',postController.getPostAllByUserId);

module.exports=router;