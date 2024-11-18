import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
    const [formData, setData] = useState({
        username: '',
        password: '',
    });
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
        };

        fetch('http://localhost:3000/login', options)
            .then((response) => {
                if (!response.ok) {
                    return response.json().then((data) => {
                        throw new Error(data.error || 'Failed to login');
                    });
                }
                return response.json();
            })
            .then((data) => {
                console.log('Success:', data);
                alert('Login successful!');
                localStorage.setItem('token', data.token);
                navigate('/dashboard');
            })
            .catch((error) => {
                console.error('Error:', error);
                setError(error.message);
                alert('Login failed!');
            });
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Login</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <div>
                <label>Username:</label>
                <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label>Password:</label>
                <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
            </div>
            <button type="submit">Login</button>
            <p>Don't have an account? <Link to="/register">Register here</Link></p>
        </form>
    );
};

export default Login;