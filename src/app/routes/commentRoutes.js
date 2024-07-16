const commentController=require('../controllers/commentController');
const express = require("express");
const router = express.Router();

router.post("/commentPost",commentController.commentPost);
router.get("/comments/:postId",commentController.getPostComments);
module.exports = router;