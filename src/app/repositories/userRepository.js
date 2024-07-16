const User = require('../models/User');

exports.createUser = async (userData) => {
  const user = new User(userData);
  return await user.save();
};

exports.getUserById = async (id) => {
  return await User.findById(id);
};

exports.getUserByUserName = async (username) => {
  return await User.findOne({username});
};

exports.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error('Unable to login');
  }

  if (password !== user.password) {
    throw new Error('Unable to login');
  }

  return user;
};

exports.updateUser = async (userId, updateData) => {
  const result = await User.updateOne({ _id: userId }, { $set: updateData });
  return result;
};

exports.getUsername=async(userId)=>{
  const user=await User.findById(userId);
  return user.username;
}