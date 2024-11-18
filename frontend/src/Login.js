import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [formData, setData] = useState({
        username: '',
        password: '',
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const {name, value} = e.target;
        setData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json',},
            body: JSON.stringify(formData),
        }

        fetch('http://localhost:3000/login', options)
        .then((response) => {
            if(!response.ok){
                throw new Error('Failed to login')
            }
            return response.json();
        })
        .then((data) => {
            console.log('Success:', data);
            alert('Login successful!');
            navigate('/dashboard');
        })
        .catch((error) => {
            console.error('Error:', error);
            alert('Login failed!');
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Login</h2>
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
        </form>
    );
};

export default Login;