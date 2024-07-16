const likeController=require('../controllers/likeController');
const express = require("express");
const router = express.Router();

router.post("/likePost", likeController.likePost);
router.get("/likes/:postId",likeController.getPostLikes);
module.exports = router;