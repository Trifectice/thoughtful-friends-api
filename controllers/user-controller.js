const { User } = require('../models/User.js');

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (err) {
    console.log(err); 
    res.status(500).json(err);
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'No user with this ID!' });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json(err);
  }
};


const createUser = async (req, res) => {
  try {
    console.log("Before creating user");
    console.log(req.body);

    // Debugging line to check what User contains
    console.log("Debug: User model is: ", User);

    const user = new User(req.body);
    const newUser = await user.save();

    console.log("After creating user", newUser);
    res.json(newUser);
  } catch (err) {
    console.log("Error object:", err);
    res.status(500).json(err);
  }
};


const updateUser = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedUser) {
      return res.status(404).json({ message: 'No user with this ID!' });
    }
    res.json(updatedUser);
  } catch (err) {
    res.status(500).json(err);
  }
};

const deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({ message: 'No user with this ID!' });
    }
    res.json({ message: 'User deleted!' });
  } catch (err) {
    res.status(500).json(err);
  }
};

const addFriend = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.userId, { $push: { friends: req.params.friendId } }, { new: true });
    if (!user) {
      return res.status(404).json({ message: 'No user with this ID!' });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json(err);
  }
};

const removeFriend = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.userId, { $pull: { friends: req.params.friendId } }, { new: true });
    if (!user) {
      return res.status(404).json({ message: 'No user with this ID!' });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  removeFriend
};

  
