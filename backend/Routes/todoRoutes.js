// routes/todoRoutes.js
import express from "express";
import {
  getTodos,
  createTodo,
  deleteTodo,
  updateTodo,
} from "../controllers/todoControllers.js";

const router = express.Router();

router.get("/todos", getTodos);
router.post("/todos", createTodo);
router.delete("/todos/:id", deleteTodo);
router.put("/todos/:id", updateTodo);

export default router;
