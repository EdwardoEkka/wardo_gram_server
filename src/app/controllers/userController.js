const userRepository = require("../repositories/userRepository");
const jwt=require('jsonwebtoken');
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const { v4: uuidv4 } = require('uuid');
const { admin, bucket } = require('../../utils/firebase');

exports.uploadFile = upload.single('profilePicture');


exports.createUser = async (req, res) => {
  try {
    const user = await userRepository.createUser(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.getUser = async (req, res) => {
  try {
    const user = await userRepository.getUserById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getUserByUserName=async(req,res)=>{
  try {
    const user = await userRepository.getUserByUserName(req.params.username);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userRepository.findByCredentials(email, password);
    if (!user) {
      return res.status(401).json({ error: 'Login failed! Check authentication credentials.' });
    }
    const token = jwt.sign(
      { _id: user._id.toString() },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );
    res.status(200).json({ user, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getLoginUser=async(req,res)=>{
  try {
    const user=req.user;
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}



exports.updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const { username, bio } = req.body;

    const updateData = {
      _id: userId,
      username: username,
      bio: bio,
      updatedAt: Date.now(), // Call Date.now() as a function
    };

    if (req.file) {
      const profilePicture = req.file;
      const fileName = `${uuidv4()}-${profilePicture.originalname}`;
      const file = bucket.file(fileName);
      await file.save(profilePicture.buffer, {
        metadata: { contentType: profilePicture.mimetype },
      });
      const downloadURL = await file.getSignedUrl({
        action: 'read',
        expires: '03-01-2500',
      });
      updateData.profilePicture = downloadURL[0];
    }

    const updatedUser = await userRepository.updateUser(userId, updateData);

    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getUsername=async(req,res)=>{
  try {
    const userId=req.params.id;
    const username=await userRepository.getUsername(userId);
    res.status(200).json(username);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}