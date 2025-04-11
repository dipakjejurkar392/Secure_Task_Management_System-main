import React from 'react'
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
    const navigate = useNavigate();

    const token = localStorage.getItem('token'); // Check if user is logged in
    const isAdminLoggedIn = localStorage.getItem("admin_logged_in"); // For admin

    const handleLogout = () => {
        if (isAdminLoggedIn) {
            localStorage.removeItem("admin_logged_in");
            navigate("/admin");
        } else {
            localStorage.removeItem("token");
            navigate("/");
        }
    };

    return (
        <nav className="bg-cyan-600 p-4 shadow-md">
            <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center space-y-3 sm:space-y-0 sm:space-x-4 text-white">
                {/* Logo / App Name */}
                <Link to="/" className="text-2xl sm:text-3xl font-bold hover:text-cyan-200 text-center sm:text-left">
                    Secure Task Management System
                </Link>

                {/* Navigation Links or Logout */}
                <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4">
                    {(token || isAdminLoggedIn) ? (
                        <button
                            onClick={handleLogout}
                            className="py-2 px-4 text-base sm:text-lg border border-cyan-100 rounded-full bg-cyan-50 text-cyan-900 font-bold hover:bg-cyan-900 hover:text-white hover:border-cyan-700 transition"
                        >
                            Logout
                        </button>
                    ) : (
                        <>
                            <Link
                                to="/login"
                                className="py-2 px-4 text-base sm:text-lg border border-cyan-100 rounded-full bg-cyan-50 text-cyan-900 font-bold hover:bg-cyan-900 hover:text-white hover:border-cyan-700 transition"
                            >
                                Login
                            </Link>
                            <Link
                                to="/register"
                                className="py-2 px-4 text-base sm:text-lg border border-cyan-100 rounded-full bg-cyan-50 text-cyan-900 font-bold hover:bg-cyan-900 hover:text-white hover:border-cyan-700 transition"
                            >
                                Register
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
