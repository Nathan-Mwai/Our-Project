import React from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = ({ handleLogout }) => {
    const navigate = useNavigate();

    const handleLogoutClick = async () => {
        await handleLogout(); // Call the passed down handleLogout function
        navigate('/'); // Redirect to home or login page
    };

    return (
        <button onClick={handleLogoutClick} className="bg-red-500 text-white px-4 py-2 rounded">
            Logout
        </button>
    );
};

export default Logout;
