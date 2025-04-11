import React, { useState } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";

const API_URL = "http://localhost:5000/api/login";

const Login = () => {
  const [user, setUser] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate(); 

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); 

    try {
      const response = await Axios.post(API_URL, user);
      localStorage.setItem("token", response.data.token);
      alert("Login successful!");
      navigate("/dashboard"); 
    } catch (error) {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="flex justify-center py-10">
      <div className="bg-cyan-50 p-6 border border-cyan-500 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold text-center text-cyan-900 mb-4">Login User</h1>
        
        {error && <p className="text-red-500 text-center">{error}</p>}

        <form className="border p-4 rounded-md shadow-md bg-gray-50 space-y-4" onSubmit={handleLogin}>
          <div className="space-y-2">
            <input
              type="email"
              placeholder="Enter email"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="password"
              placeholder="Enter password"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-cyan-600 text-white text-lg py-2 rounded-lg hover:bg-cyan-800"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
