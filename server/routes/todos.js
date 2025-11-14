const express = require("express");
const Todo = require("../models/Todo");
const auth = require("../middleware/authMiddleware");

const router = express.Router();

// Get all todos (Scoped to user)
router.get("/", auth, async (req, res) => {
  try {
    const todos = await Todo.find({ user: req.user });
    res.json(todos);
  } catch (err) {
    // 500 for database connection/general error
    res.status(500).json({ error: "Failed to retrieve todos." });
  }
});

// Add new todo (Scoped to user)
router.post("/", auth, async (req, res) => {
  const { text } = req.body;
  try {
    const todo = new Todo({ text, user: req.user });
    await todo.save();
    res.json(todo);
  } catch (err) {
    res.status(500).json({ error: "Failed to create todo." });
  }
});

// Update completed or text (SECURITY & ERROR FIX: Added user verification and try/catch)
router.put("/:id", auth, async (req, res) => {
  const { completed, text } = req.body;
  
  const updateData = {};
  if (completed !== undefined) updateData.completed = completed;
  if (text) updateData.text = text;

  try {
    // Finds by ID AND user, preventing other users from updating this todo
    const todo = await Todo.findOneAndUpdate(
      { _id: req.params.id, user: req.user }, 
      updateData, 
      { new: true }
    );

    if (!todo) {
      // Returns 404 if ID doesn't exist OR if the todo belongs to another user
      return res.status(404).json({ error: "Todo not found or unauthorized." });
    }
    res.json(todo);
  } catch (err) {
    // This catches invalid ObjectId format errors (e.g., 'Cast to ObjectId failed')
    res.status(500).json({ error: "Failed to update todo." });
  }
});

// Delete todo (SECURITY & ERROR FIX: Added user verification and try/catch)
router.delete("/:id", auth, async (req, res) => {
  try {
    // Finds by ID AND user before deleting
    const result = await Todo.findOneAndDelete({ _id: req.params.id, user: req.user });

    if (!result) {
      return res.status(404).json({ error: "Todo not found or unauthorized." });
    }
    
    res.json({ message: "Todo deleted" });
  } catch (err) {
    // This catches invalid ObjectId format errors
    res.status(500).json({ error: "Failed to delete todo." });
  }
});

module.exports = router;