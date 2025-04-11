import React from 'react'

const Footer = () => {
    return (
        <footer className="bg-cyan-600 text-white py-4 font-semibold text-center">
            <p className="text-lg">© {new Date().getFullYear()}  Dipak Jejurkar</p>
            <p className="text-sm">Task Management System (TMS)</p>
        </footer>
    )
}

export default Footer