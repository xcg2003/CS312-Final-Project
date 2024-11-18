import React from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Perform any necessary cleanup here (e.g., removing tokens)
        navigate('/login');
    };

    return (
        <div>
            <h1>Dashboard</h1>
            <p>Hello, World!</p>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default Dashboard;
