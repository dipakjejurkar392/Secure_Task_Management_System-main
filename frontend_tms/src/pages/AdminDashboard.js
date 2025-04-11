import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

const AdminDashboard = () => {
    const [usersWithTasks, setUsersWithTasks] = useState([]);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const isAdminLoggedIn = localStorage.getItem("admin_logged_in");

        if (!isAdminLoggedIn) {
            navigate("/admin");
            return;
        }

        const fetchUsersWithTasks = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/admin/users-tasks");
                setUsersWithTasks(response.data.usersWithTasks);
            } catch (err) {
                setError("Failed to fetch users with tasks.");
            }
        };

        fetchUsersWithTasks();
    }, [navigate]);

    return (
        <div className="max-w-6xl mx-auto my-10 p-4">
            <div className="text-center mb-6">
                <h1 className="text-4xl font-bold text-cyan-700">Welcome Admin!</h1>
                <p className="text-lg text-gray-500">Users and their Full Task Info</p>
            </div>

            {error && <p className="text-red-500 text-center mb-4">{error}</p>}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {usersWithTasks.map((user, idx) => (
                    <div key={idx} className="bg-white shadow-md rounded-2xl p-6">
                        <div className="mb-4">
                            <p className="text-xl font-bold text-cyan-700">{user.name}</p>
                            <p className="text-sm text-gray-500">{user.email}</p>
                        </div>

                        <div>
                            <h4 className="text-md font-semibold text-gray-700 mb-2">Tasks:</h4>
                            {user.tasks.length > 0 ? (
                                <div className="space-y-4">
                                    {user.tasks.map((task) => (
                                        <div key={task._id} className="p-4 border rounded-md bg-gray-50 shadow-sm">
                                            <h5 className="text-lg font-bold text-gray-800">{task.title}</h5>
                                            <p className="text-sm text-gray-600 mb-1">{task.description || "No description provided."}</p>
                                            <p className="text-sm">
                                                <span className="font-semibold">Due Date:</span>{" "}
                                                {new Date(task.dueDate).toLocaleDateString()}
                                            </p>
                                            <p className="text-sm">
                                                <span className="font-semibold">Priority:</span>{" "}
                                                <span className={
                                                    task.priority === "High" ? "text-red-600 font-bold" :
                                                    task.priority === "Medium" ? "text-yellow-600" :
                                                    "text-green-600"
                                                }>
                                                    {task.priority}
                                                </span>
                                            </p>
                                            <p className="text-sm">
                                                <span className="font-semibold">Status:</span>{" "}
                                                {task.completed ? (
                                                    <span className="text-green-600">✅ Completed</span>
                                                ) : (
                                                    <span className="text-red-600">❌ Not Completed</span>
                                                )}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-sm text-gray-400">No tasks available.</p>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminDashboard;
