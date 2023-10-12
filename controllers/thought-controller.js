const { Thought } = require('../models/Thought');
const { User } = require('../models/User');


// Get all thoughts
const getAllThoughts = async (req, res) => {
  try {
    const thoughts = await Thought.find({});
    res.json(thoughts);
  } catch (err) {
    res.status(500).json(err);
  }
};

// Get a single thought by ID
const getThoughtById = async (req, res) => {
  try {
    const thought = await Thought.findById(req.params.id);
    if (!thought) {
      return res.status(404).json({ message: 'No thought with this ID!' });
    }
    res.json(thought);
  } catch (err) {
    res.status(500).json(err);
  }
};

// Create a new thought
const createThought = async (req, res) => {
    try {
      const newThought = await Thought.create(req.body);
      console.log("New Thought:", newThought);
  
      // Update the user's thoughts array
      const updatedUser = await User.findOneAndUpdate(
        { username: req.body.username },
        { $push: { thoughts: newThought._id } },
        { new: true }
      );
  
      console.log("Updated User:", updatedUser);
  
      if (!updatedUser) {
        console.log("User not found");
        return res.status(404).json({ message: 'User not found' });
      }
  
      res.json(newThought);
    } catch (err) {
      console.log("Error:", err);
      res.status(500).json(err);
    }
  };
  
  

// Update a thought by ID
const updateThought = async (req, res) => {
  try {
    const updatedThought = await Thought.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedThought) {
      return res.status(404).json({ message: 'No thought with this ID!' });
    }
    res.json(updatedThought);
  } catch (err) {
    res.status(500).json(err);
  }
};

// Delete a thought by ID
const deleteThought = async (req, res) => {
  try {
    const deletedThought = await Thought.findByIdAndDelete(req.params.id);
    if (!deletedThought) {
      return res.status(404).json({ message: 'No thought with this ID!' });
    }
    res.json({ message: 'Thought deleted!' });
  } catch (err) {
    res.status(500).json(err);
  }
};

const addReaction = async (req, res) => {
    try {
      const thought = await Thought.findByIdAndUpdate(
        req.params.thoughtId,
        { $push: { reactions: req.body } },
        { new: true }
      );
      if (!thought) {
        return res.status(404).json({ message: 'No thought with this ID!' });
      }
      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  };
  
  const removeReaction = async (req, res) => {
    try {
      const thought = await Thought.findByIdAndUpdate(
        req.params.thoughtId,
        { $pull: { reactions: { reactionId: req.params.reactionId } } },
        { new: true }
      );
      if (!thought) {
        return res.status(404).json({ message: 'No thought with this ID!' });
      }
      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  };
  
  module.exports = {
    getAllThoughts,
    getThoughtById,
    createThought,
    updateThought,
    deleteThought,
    addReaction,
    removeReaction
  };
  
