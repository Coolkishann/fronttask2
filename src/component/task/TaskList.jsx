import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import TaskItem from "./TaskItem";

function TaskList() {
  const [taskList, setTaskList] = useState([]);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [newTask, setNewTask] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("low");
  const [dueDate, setDueDate] = useState("");

  const [taskSummary, setTaskSummary] = useState({
    expiredTasks: 0,
    activeTasks: 0,
    completedTasks: 0,
    uncompletedTasks: 0,
  });

  useEffect(() => {
    getTasks();
  }, []);

  const getTasks = async () => {
    try {
      const { data } = await axios.get(`/api/tasks/mytasks`);
      setTaskList(data);

      const expiredTasks = data.filter(
        (task) => task.dueDate && new Date(task.dueDate) < new Date() && !task.completed
      ).length;
      const completedTasks = data.filter((task) => task.completed).length;
      const activeTasks = data.length;
      const uncompletedTasks = activeTasks - completedTasks;

      setTaskSummary({ expiredTasks, activeTasks, completedTasks, uncompletedTasks });
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newTask.trim() === "") {
      toast.error("Task title cannot be empty");
      return;
    }
    try {
      await axios.post(`/api/tasks/`, {
        title: newTask,
        description,
        priority,
        dueDate,
        completed: false,
      });
      toast.success("New task added");
      setNewTask("");
      setDescription("");
      setPriority("medium");
      setDueDate("");
      setIsAddingNew(false);
      getTasks();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gray-100 text-white p-6 flex flex-col lg:flex-row">
      {/* Left Column - Task Summary */}
      <div className="w-full lg:w-1/4 flex flex-col gap-4 mb-6 lg:mb-0">
        <div className="bg-gray-200 text-black p-4 rounded-lg shadow-md flex flex-col items-center">
          <div className="text-red-600 text-2xl font-bold">⚠️</div>
          <p className="text-gray-500">Expired Tasks</p>
          <h2 className="text-xl font-bold">{taskSummary.expiredTasks}</h2>
        </div>

        <div className="bg-gray-200 text-black p-4 rounded-lg shadow-md flex flex-col items-center">
          <div className="text-orange-500 text-2xl font-bold">📂</div>
          <p className="text-gray-500">All Active Tasks</p>
          <h2 className="text-xl font-bold">{taskSummary.activeTasks}</h2>
        </div>

        <div className="bg-gray-200 text-black p-4 rounded-lg shadow-md flex flex-col items-center">
          <div className="text-blue-500 text-2xl font-bold">⏳</div>
          <p className="text-gray-500">Completed Tasks</p>
          <h2 className="text-xl font-bold">{taskSummary.completedTasks}/{taskSummary.activeTasks}</h2>
        </div>

        <button
          type="button"
          onClick={() => setIsAddingNew(true)}
          className="bg-gray-900 hover:bg-gray-950 text-white py-2 px-4 rounded-2xl focus:outline-none focus:shadow-outline w-full mt-4"
        >
          + Add Task
        </button>
      </div>

      {/* Right Column - Task Filters & List */}
      <div className="w-full lg:w-3/4  flex flex-col lg:flex-row gap-6">
        <div className="w-full lg:w-1/3 bg-gray-200 p-4 ml-6 rounded-lg overflow-auto max-h-[500px]">
          <h2 className="text-blue-400 font-bold text-lg">• To Do</h2>
          <hr className="border-blue-400 mb-4" />
          {taskList.filter((task) => !task.completed).map((task) => (
            <TaskItem key={task._id} task={task} />
          ))}
        </div>

        <div className="w-full lg:w-1/3 bg-gray-200 p-4 rounded-lg overflow-auto max-h-[500px]">
          <h2 className="text-orange-400 font-bold text-lg">• On Progress</h2>
          <hr className="border-orange-400 mb-4" />
          {taskList.filter((task) => !task.completed).map((task) => (
            <TaskItem key={task._id} task={task} />
          ))}
        </div>

        <div className="w-full lg:w-1/3 bg-gray-200 p-4 rounded-lg overflow-auto max-h-[500px]">
          <h2 className="text-green-400 font-bold text-lg">• Done</h2>
          <hr className="border-green-400 mb-4" />
          {taskList.filter((task) => task.completed).map((task) => (
            <TaskItem key={task._id} task={task} />
          ))}
        </div>
      </div>

      {/* Add Task Form (Modal) */}
      {isAddingNew && (
        <>
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => setIsAddingNew(false)}
          ></div>

          <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
              <h2 className="text-lg font-bold text-gray-900 mb-4">
                Add New Task
              </h2>
              <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                <input
                  type="text"
                  value={newTask}
                  onChange={(e) => setNewTask(e.target.value)}
                  required
                  placeholder="Task title"
                  className="border-gray-500 border bg-gray-100 text-black rounded px-4 py-2"
                />
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Description"
                  className="border border-gray-500 bg-gray-100 text-black rounded px-4 py-2"
                />
                <select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                  className="border border-gray-500 bg-gray-100 text-black rounded px-4 py-2"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
                <input
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="border border-gray-500 bg-gray-100 text-black rounded px-4 py-2"
                />
                <div className="flex justify-between">
                  <button type="button" onClick={() => setIsAddingNew(false)} className="bg-gray-300 text-gray-900 py-2 px-4 rounded-lg">Cancel</button>
                  <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded-lg">Add Task</button>
                </div>
              </form>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default TaskList;
