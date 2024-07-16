const postRepository = require("../repositories/postRepository");
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const { v4: uuidv4 } = require('uuid');
const { admin, bucket } = require('../../utils/firebase');


exports.uploadFile = upload.single('file');


exports.createPost = async (req, res) => {
  try {
    const imageData = req.file;
    const postData = req.body;

    // Upload image to Firebase Storage
    const fileName = `${uuidv4()}-${imageData.originalname}`;
    const file = bucket.file(fileName);

    await file.save(imageData.buffer, {
      metadata: { contentType: imageData.mimetype },
    });

    // Get the download URL
    const downloadURL = await file.getSignedUrl({
      action: 'read',
      expires: '03-01-2500',
    });

    postData.media = {
      contentType: imageData.mimetype,
      url: downloadURL[0]
    };

    // Save post data
    const post = await postRepository.createPost(postData);
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getUserPosts = async (req, res) => {
  try {
    const post = await postRepository.getPostByuserId(req.params.userId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getPostById = async (req, res) => {
  try {
    const post = await postRepository.getPostById(req.params.postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getPostAllByUserId=async(req,res)=>{
  try {
    const post = await postRepository.getPostAllByUserId(req.params.userId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}