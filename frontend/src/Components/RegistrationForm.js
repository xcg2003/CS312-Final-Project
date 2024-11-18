import React, { useState } from 'react';

const RegistrationForm = () => {
    const [formData, setData] = useState({
        username: '',
        email: '',
        password: '',
    });

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

        fetch('http://localhost:5000', options)
        .then((response) => {
            if(!response.ok){
                throw new Error('Failed to register')
            }
            return response.json();
        })
        .then((data) => {
            console.log('Success:', data);
            alert('Registration successful!');
        })
        .catch((error) => {
            console.error('Error:', error);
            alert('Registration failed!');
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Register</h2>
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
                <label>Email:</label>
                <input
                    type="email"
                    name="email"
                    value={formData.email}
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
            <button type="submit">Register</button>
        </form>
    );
};


export default RegistrationForm;