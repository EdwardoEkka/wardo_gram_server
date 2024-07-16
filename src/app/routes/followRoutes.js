const express = require("express");
const followController = require("../controllers/followController");
const router = express.Router();

router.post("/followUser", followController.followUser);
router.post("/addToFollowerList",followController.addToFollowerList);
router.get("/followers/:userId",followController.getFollowers);
router.get("/followings/:userId",followController.getFollowings);
router.get("/isFollowing",followController.isFollowing);
router.get("/isFollower",followController.isFollower);
module.exports = router;