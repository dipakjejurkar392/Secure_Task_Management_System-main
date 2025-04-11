import React from 'react'
import { Link } from 'react-router'

const Home = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-cyan-100 to-cyan-200 flex flex-col items-center justify-center px-4">
            {/* Logo (Google/Local) */}
            <img
                src= "https://tse1.mm.bing.net/th?id=OIP.FE1g7NN647ehEqGm0BAO4gHaHB&pid=Api&P=0&h=180"
                alt="Logo"
                className="w-24 h-24 md:w-32 md:h-32 mb-6 rounded-full shadow-lg"
            />

            <h1 className="text-5xl md:text-6xl font-extrabold text-cyan-700 text-center mb-6 drop-shadow-lg">
                Welcome to the Secure Task Management System
            </h1>

            <p className="text-xl md:text-2xl text-cyan-900 text-center max-w-3xl leading-relaxed mt-4">
                After registering, you’ll be able to create, update, and delete your own tasks.
                <br />
                Only admins can view all users.
            </p>

            <div className="mt-12 w-full max-w-md flex flex-col items-center space-y-6">
                <div className="w-full">
                    <Link
                        to="/login"
                        className="block text-center py-3 px-8 text-xl border border-cyan-400 rounded-lg bg-cyan-600 text-white font-semibold shadow-md hover:bg-cyan-800 hover:border-cyan-700 transition-transform transform hover:scale-105"
                    >
                        Log in
                    </Link>
                </div>

                <div className="w-full">
                    <Link
                        to="/register"
                        className="block text-center py-3 px-8 text-xl border border-cyan-400 rounded-lg bg-cyan-600 text-white font-semibold shadow-md hover:bg-cyan-800 hover:border-cyan-700 transition-transform transform hover:scale-105"
                    >
                        Register
                    </Link>
                </div>

                <div className="w-full">
                    <Link
                        to="/admin"
                        className="block text-center py-3 px-8 text-xl border border-cyan-400 rounded-lg bg-cyan-600 text-white font-semibold shadow-md hover:bg-cyan-800 hover:border-cyan-700 transition-transform transform hover:scale-105"
                    >
                        Admin Login
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Home
