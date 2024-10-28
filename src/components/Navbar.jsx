import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ isLoggedIn, handleLogout }) => {
    return (
        <nav className="bg-gray-800 p-4">
            <div className="max-w-6xl mx-auto flex justify-between items-center">
                <Link to="/" className="text-white text-lg font-bold">Home</Link>
                <div className="space-x-4">
                    {isLoggedIn ? (
                        <>
                            <Link to="/user/orders" className="text-white hover:text-gray-300">Your Orders</Link>
                            <button onClick={handleLogout} className="text-white hover:text-gray-300">Logout</button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="text-white hover:text-gray-300">Login</Link>
                            <Link to="/signup" className="text-white hover:text-gray-300">Sign Up</Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
