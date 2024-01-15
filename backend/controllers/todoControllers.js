import Todo from "../models/Todo.js";
import asyncHandler from "express-async-handler";

// Fetch all todos from the database
const getTodos = asyncHandler(async (req, res) => {
  const todos = await Todo.find();
  res.json(todos);
});

// Create a new todo and save it to the database
const createTodo = asyncHandler(async (req, res) => {
  const { title } = req.body;

  if (!title) {
    return res.status(400).json({ error: "Title is required" });
  }

  const newTodo = await Todo.create({ title });
  res.json(newTodo);
});

// Update an existing todo in the database
const updateTodo = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const { title, completed } = req.body;
  const todo = await Todo.findById(id);

  if (!todo) {
    return res.status(404).json({ error: "Todo not found" });
  }

  todo.title = title || todo.title;
  todo.completed = completed;

  const updatedTodo = await todo.save();
  console.log(updatedTodo);
  res.json(updatedTodo);
});

// Delete an existing todo from the database
const deleteTodo = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const todo = await Todo.findById(id);

  if (!todo) {
    return res.status(404).json({ error: "Todo not found" });
  }
  await todo.deleteOne();

  res.json({ message: "Todo deleted successfully", id: todo.id });
});

export { deleteTodo, createTodo, getTodos, updateTodo };
