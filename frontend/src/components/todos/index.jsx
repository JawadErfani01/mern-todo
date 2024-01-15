import React, { useState } from "react";
import {
  useGetTodosQuery,
  useAddTodoMutation,
  useUpdateTodoMutation,
  useDeleteTodoMutation,
} from "../../slices/todosApiSlice";
import Loader from "../Loader";
import TodoItem from "./TodoItem";

const Todos = () => {
  const { data: todos, error, isLoading, refetch } = useGetTodosQuery();
  const [newTodoTitle, setNewTodoTitle] = useState("");
  const [newTodoCompleted, setNewTodoCompleted] = useState(false);
  const [addTodo] = useAddTodoMutation();
  const [updateTodo] = useUpdateTodoMutation(); // Hook for updating a todo
  const [deleteTodo] = useDeleteTodoMutation(); // Hook for updating a todo
  const [selectedTodo, setSelectedTodo] = useState(null); // Track the selected todo for editing

  const handleAddTodo = async () => {
    try {
      // Use the addTodo mutation to add a new todo
      await addTodo({
        title: newTodoTitle,
        completed: newTodoCompleted,
      });

      // Clear the input fields after adding a new todo
      setNewTodoTitle("");
      setNewTodoCompleted(false);

      // Manually trigger a refetch to get the updated list of todos
      refetch();
    } catch (error) {
      console.error("Error adding todo:", error.message);
    }
  };

  const handleCheckboxChange = async (id, completed) => {
    try {
      // Use the updateTodo mutation to update the completed status of a todo
      await updateTodo({ id, updatedTodo: { completed } });

      // Manually trigger a refetch to get the updated list of todos
      refetch();
    } catch (error) {
      console.error("Error updating todo:", error.message);
    }
  };
  const handleSelectedTodo = (todo) => {
    setSelectedTodo(todo);
    setNewTodoCompleted(todo.completed);
    setNewTodoTitle(todo.title);
  };
  const handleUpdate = async () => {
    try {
      // Use the updateTodo mutation to update the title and completed status of a todo
      await updateTodo({
        id: selectedTodo._id,
        updatedTodo: {
          title: newTodoTitle,
          completed: newTodoCompleted,
        },
      });

      // Clear the input fields after updating a todo
      setNewTodoTitle("");
      setNewTodoCompleted(false);

      // Reset the selected todo
      setSelectedTodo(null);

      // Manually trigger a refetch to get the updated list of todos
      refetch();
    } catch (error) {
      console.error("Error updating todo:", error.message);
    }
  };
  const handleDelete = async (id) => {
    try {
      await deleteTodo(id);
      refetch();
    } catch (error) {
      console.log(`something is wrong ${error?.message}`);
    }
  };
  if (isLoading) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="text-center">
      <div className="m-4 flex justify-center rounded-lg gap-5 w-[80%] mx-auto shadow p-3">
        <input
          type="text"
          placeholder="Enter a New Todo"
          value={newTodoTitle}
          onChange={(e) => setNewTodoTitle(e.target.value)}
          className="border w-[50%] p-3 rounded-lg mr-2 outline-none"
        />
        <label className="inline-flex items-center">
          <input
            type="checkbox"
            checked={newTodoCompleted}
            onChange={() => setNewTodoCompleted(!newTodoCompleted)}
            className="form-checkbox h-5 w-full text-blue-500"
          />
          <span className="ml-2">Completed</span>
        </label>
        <button
          onClick={selectedTodo ? handleUpdate : handleAddTodo}
          className="bg-blue-500 text-white py-2 px-4 rounded"
        >
          {selectedTodo ? "Update Todo" : "Add Todo"}
        </button>
      </div>
      {todos && (
        <ul className="mt-10">
          {todos.map((todo) => (
            <TodoItem
              key={todo._id}
              todo={todo}
              refetch={refetch}
              handleCheckboxChange={handleCheckboxChange}
              handleSelectedTodo={handleSelectedTodo}
              handleDelete={handleDelete}
            />
          ))}
        </ul>
      )}
    </div>
  );
};

export default Todos;
