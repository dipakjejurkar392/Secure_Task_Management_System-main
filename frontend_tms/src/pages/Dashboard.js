import React, { useEffect, useState } from "react";
import Axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const API_URL = "http://localhost:5000/api/dashboard";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [editTask, setEditTask] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editDueDate, setEditDueDate] = useState("");
  const [editPriority, setEditPriority] = useState("Low");
  const [searchTerm, setSearchTerm] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("All");

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    Axios.get(API_URL, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => {
        setUser(response.data.user);
        setTasks(response.data.tasks);
      })
      .catch(() => {
        localStorage.removeItem("token");
        navigate("/login");
      });
  }, [navigate]);

  const handleDeleteTask = async (taskId) => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      await Axios.delete(`http://localhost:5000/api/tasks/${taskId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setTasks(tasks.filter(task => task._id !== taskId));
      alert("Task Deleted successfully!");
    } catch (error) {
      console.error("Error deleting task", error);
    }
  };

  const handleUpdateTask = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const response = await Axios.put(
        `http://localhost:5000/api/tasks/${editTask._id}`,
        {
          title: editTitle,
          description: editDescription,
          dueDate: editDueDate,
          priority: editPriority,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setTasks(tasks.map(task => (task._id === editTask._id ? response.data.task : task)));
      setEditTask(null);
      alert("Task updated successfully!");
    } catch (error) {
      console.error("Error updating task", error);
    }
  };

  const handleToggleCompletion = async (taskId) => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const response = await Axios.put(
        `http://localhost:5000/api/tasks/${taskId}/completed`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setTasks(tasks.map(task =>
        task._id === taskId ? response.data.task : task
      ));
    } catch (error) {
      console.error("Error toggling task completion", error);
    }
  };

  const filteredTasks = tasks.filter(task =>
    task.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (priorityFilter === "All" || task.priority === priorityFilter)
  );

  return (
    <div className="flex flex-col items-center min-h-screen px-4 py-8 bg-gradient-to-br from-blue-200 to-purple-400">
      {user ? (
        <>
          <div className="text-center sm:text-left sm:w-full sm:max-w-4xl">
            <h1 className="text-3xl font-bold">Welcome, {user.name}!</h1>
            <p className="text-lg text-gray-700">Email: {user.email}</p>
          </div>

          <div className="flex justify-center sm:justify-end w-full sm:max-w-4xl mt-6">
            <Link
              to="/add-task"
              className="py-2 px-4 text-xl border border-cyan-400 rounded bg-cyan-600 text-white font-bold hover:bg-cyan-900 hover:border-cyan-800"
            >
              + Add Task
            </Link>
          </div>

          <div className="w-full sm:max-w-4xl mt-8">
            <h2 className="text-2xl font-semibold text-center mb-4">Filter and Search Tasks</h2>
            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-6">
              <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
              <input
                type="text"
                placeholder="Search tasks"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-transparent outline-none text-white font-bold"
              />
              </div>
              <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
              <select
                className="border-2 rounded-md border-cyan-600 px-4 py-2 w-full sm:w-auto"
                value={priorityFilter}
                onChange={(e) => setPriorityFilter(e.target.value)}
              >
                <option value="All">All</option>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
              </div>
            </div>
          </div>

          <div className="w-full sm:max-w-4xl">
            <h2 className="text-2xl font-semibold text-center">My Tasks</h2>
            {filteredTasks.length > 0 ? (
              <ul className="mt-4 space-y-6">
                {filteredTasks.map((task) => (
                  <li key={task._id} className="border p-4 rounded shadow bg-cyan-50 border-cyan-500">
                    {editTask && editTask._id === task._id ? (
                      <div className="p-4 bg-cyan-100 border rounded border-cyan-400">
                        <h2 className="text-xl font-semibold text-center mb-4">Edit Task</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
                          <input
                            type="text"
                            className="border rounded-md border-gray-500 p-2"
                            value={editTitle}
                            onChange={(e) => setEditTitle(e.target.value)}
                          />
                          <input
                            type="text"
                            className="border rounded-md border-gray-500 p-2"
                            value={editDescription}
                            onChange={(e) => setEditDescription(e.target.value)}
                          />
                          <input
                            type="date"
                            className="border rounded-md border-gray-500 p-2"
                            value={editDueDate}
                            onChange={(e) => setEditDueDate(e.target.value)}
                          />
                          <select
                            className="border rounded-md border-gray-500 p-2"
                            value={editPriority}
                            onChange={(e) => setEditPriority(e.target.value)}
                          >
                            <option value="Low">Low</option>
                            <option value="Medium">Medium</option>
                            <option value="High">High</option>
                          </select>
                        </div>
                        <div className="flex gap-4">
                          <button
                            onClick={handleUpdateTask}
                            className="bg-green-600 text-white text-lg font-semibold rounded px-4 py-2 hover:bg-green-800"
                          >
                            Update
                          </button>
                          <button
                            onClick={() => setEditTask(null)}
                            className="bg-gray-700 text-white text-lg font-semibold rounded px-4 py-2 hover:bg-gray-900"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <h3 className="text-xl font-bold text-cyan-700">{task.title}</h3>
                        <p className="text-black">{task.description}</p>
                        <p className="text-sm text-blue-700 font-semibold">
                          Due: {new Date(task.dueDate).toLocaleDateString()}
                        </p>
                        <span
                          className={`inline-block mt-1 px-3 py-1 text-sm font-bold rounded 
                          ${task.priority === "High" ? "bg-red-500 text-white" :
                            task.priority === "Medium" ? "bg-yellow-500 text-black" : "bg-green-500 text-black"}`}
                        >
                          {task.priority}
                        </span>

                        <div className="mt-4 flex flex-col gap-2 sm:flex-row">
                          <button
                            onClick={() => handleToggleCompletion(task._id)}
                            className={`w-full py-2.5 rounded-full bg-gradient-to-r from-cyan-500 to-amber-200-900 text-white font-medium  ${task.completed ? "bg-green-500" : "bg-gray-500"} text-white`}
                          >
                            {task.completed ? "Completed" : "Not Completed"}
                          </button>
                          <button
                            onClick={() => {
                              setEditTask(task);
                              setEditTitle(task.title);
                              setEditDescription(task.description);
                              setEditDueDate(task.dueDate.split("T")[0]);
                              setEditPriority(task.priority);
                            }}
                            className="w-full py-2.5 rounded-full bg-gradient-to-r from-indigo-500 to-indigo-900 text-white font-medium "
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteTask(task._id)}
                            className="w-full py-2.5 rounded-full bg-gradient-to-r from-indigo-500 to-red-600 text-white font-medium "
                          >
                            Delete
                          </button>
                        </div>
                      </>
                    )}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500 mt-4 text-center">No tasks added yet.</p>
            )}
          </div>
        </>
      ) : (
        <div className="flex justify-center items-center h-64">
  <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
</div>
      )}
    </div>
  );
};

export default Dashboard;
