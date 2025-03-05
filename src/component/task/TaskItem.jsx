import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { FaEllipsisV } from "react-icons/fa";
function TaskItem({ task, refreshTasks }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isCompleted, setIsCompleted] = useState(task.completed);

  const toggleCompletion = async () => {
    try {
      await axios.put(`/api/tasks/${task._id}`, { completed: !isCompleted });
      setIsCompleted(!isCompleted);
      toast.success(`Task marked as ${!isCompleted ? "completed" : "incomplete"}`);
      refreshTasks();
    } catch (error) {
      console.error(error);
      toast.error("Failed to update task status");
    }
  };

  const deleteTask = async () => {
    try {
      await axios.delete(`/api/tasks/${task._id}`);
      toast.success("Task deleted");
      refreshTasks();
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete task");
    }
  };

  return (
    <div className="bg-white text-black p-4 rounded-lg shadow-md mb-4 relative">
      {task.priority && (
        <span className={`text-xs font-bold px-2 py-1 rounded ${task.priority === "high" ? "bg-red-500" : task.priority === "medium" ? "bg-yellow-500" : "bg-green-500"
          } text-white`}>
          {task.priority}
        </span>
      )}

      <h3 className={`text-lg font-semibold mt-2 ${isCompleted ? "line-through text-gray-500" : ""}`}>
        {task.title}
      </h3>

      {task.description && <p className="text-gray-600 text-sm mt-1">{task.description}</p>}

      {task.dueDate && (
        <p className="text-gray-500 text-xs mt-2 font-semibold">
          <span className="text-gray-700">Deadline:</span> {new Date(task.dueDate).toLocaleDateString()}
        </p>
      )}
      <button
        onClick={toggleCompletion}
        className={`mt-2 px-4 py-1 text-xs font-bold rounded ${isCompleted ? "bg-gray-500 text-white" : "bg-green-400 text-white"
          }`}
      >
        {isCompleted ? "Completed" : "Mark as Done"}
      </button>

      <div className="absolute top-2 right-2">
        <button onClick={() => setMenuOpen(!menuOpen)}>
          <FaEllipsisV />
        </button>
        {menuOpen && (
          <div className="absolute right-0 mt-2 w-32 bg-white shadow-lg rounded">
            <button onClick={deleteTask} className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-200 w-full">
              Delete Task
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default TaskItem;
