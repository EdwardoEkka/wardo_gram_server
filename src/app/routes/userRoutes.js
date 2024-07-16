const express = require("express");
const userController = require("../controllers/userController");
const router = express.Router();
const authMiddleware=require('../middlewares/authMiddleware')
const jwt = require("jsonwebtoken");
const User = require("../models/User");

router.post("/create", userController.createUser);
router.get("/getUserById/:id", userController.getUser);
router.get("/getUserByUserName/:username",userController.getUserByUserName)
router.post("/login", userController.login);
router.get("/get-user",authMiddleware,userController.getLoginUser);
router.put("/update/:id",userController.uploadFile,userController.updateUser);
router.get("/getUsername/:id",userController.getUsername);

module.exports = router;
