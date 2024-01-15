import React from "react";

const TodoItem = ({
  todo,
  handleCheckboxChange,
  handleSelectedTodo,
  handleDelete,
}) => {
  return (
    <li className="flex mt-5 items-center justify-around space-x-4 p-2 w-[80%] mx-auto bg-gray-100 rounded-md my-2">
      <div className="flex justify-between items-center  gap-5">
        <span
          className={`text-sm font-bold  ${
            todo.completed ? "line-through text-gray-500" : ""
          }`}
        >
          {todo.title}
        </span>
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => handleCheckboxChange(todo._id, !todo.completed)}
          className="text-blue-500 focus:ring-blue-400"
        />
      </div>
      <div className=" gap-10 flex">
        {" "}
        <button
          onClick={() => handleSelectedTodo(todo)}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Update
        </button>
        <button
          onClick={() => handleDelete(todo._id)}
          className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
        >
          Delete
        </button>
      </div>
    </li>
  );
};

export default TodoItem;
