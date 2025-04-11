
import React, { useState } from "react";
import Axios from "axios";

const API_URL = "http://localhost:5000/api/users";

const Register = () => {
    const [users, setUsers] = useState([]);
    const [newUser, setNewUser] = useState({ name: "", email: "", password: "" });

    const addUser = async () => {
        try {
            const response = await Axios.post(API_URL, newUser);
            setUsers([...users, response.data.newUser]);
            setNewUser({ name: "", email: "", password: "" });

            alert("Account Created Successfully!");
        } catch (error) {
            console.error("Error creating account:", error);
        }
    };

    return (
        <div className=" flex justify-center py-10">
            <div className="bg-cyan-50 p-6 border border-cyan-500 rounded-lg shadow-lg w-full max-w-md">
                <h1 className="text-2xl font-bold text-center text-cyan-900 mb-4">
                    Register User
                </h1>
                <form
                    className="border p-4 rounded-md shadow-md bg-gray-50 space-y-4"
                    onSubmit={(e) => {
                        e.preventDefault();
                        addUser();
                    }}
                >
                    <div className="space-y-2">
                        <input
                            type="text"
                            placeholder="Enter name"
                            value={newUser.name}
                            onChange={(e) =>
                                setNewUser({ ...newUser, name: e.target.value })
                            }
                            required
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <input
                            type="email"
                            placeholder="Enter email"
                            value={newUser.email}
                            onChange={(e) =>
                                setNewUser({ ...newUser, email: e.target.value })
                            }
                            required
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <input
                            type="password"
                            placeholder="Enter password"
                            value={newUser.password}
                            onChange={(e) =>
                                setNewUser({ ...newUser, password: e.target.value })
                            }
                            required
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-cyan-600 text-white text-lg py-2 rounded-lg hover:bg-cyan-800"
                    >
                        Register
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Register;
