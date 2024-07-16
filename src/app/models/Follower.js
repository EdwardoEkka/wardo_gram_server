const mongoose = require("mongoose");
const { Schema } = mongoose;

const followerSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  followerId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  createdAt: { type: Date, default: Date.now },
});

followerSchema.index({ userId: 1, followerId: 1 }, { uinque: true });
const Follower = mongoose.model("Follower", followerSchema);

module.exports = Follower;
