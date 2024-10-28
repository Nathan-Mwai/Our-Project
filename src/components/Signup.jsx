import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'client' });
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            if (!response.ok) {
                throw new Error('Signup failed');
            }
            await response.json();
            setSuccess("Signup successful! Redirecting to login...");

            // Redirect after a short delay
            setTimeout(() => {
                navigate('/login');
            }, 2000); // 2 seconds delay for the message to be visible
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
            {error && <p className="text-red-500 mb-2">{error}</p>}
            {success && <p className="text-green-500 mb-2">{success}</p>}
            <input 
                name="name" 
                value={formData.name} 
                onChange={handleChange} 
                placeholder="Name" 
                required 
                className="w-full mb-4 p-2 border border-gray-300 rounded"
            />
            <input 
                name="email" 
                value={formData.email} 
                onChange={handleChange} 
                placeholder="Email" 
                required 
                className="w-full mb-4 p-2 border border-gray-300 rounded"
            />
            <input 
                type="password" 
                name="password" 
                value={formData.password} 
                onChange={handleChange} 
                placeholder="Password" 
                required 
                className="w-full mb-4 p-2 border border-gray-300 rounded"
            />
            <button type="submit" className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200">
                Sign Up
            </button>
        </form>
    );
};

export default Signup;
