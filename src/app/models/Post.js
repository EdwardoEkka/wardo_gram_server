const mongoose = require("mongoose");
const { Schema } = mongoose;

const postSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  media: {
    contentType: { type: String, required: true },
    url: { type: String, required: true }
  },
  caption: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;

