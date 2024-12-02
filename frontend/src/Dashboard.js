import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css'; // Import the CSS file for styling

const Dashboard = () => {
    const navigate = useNavigate();
    const [content, setContent] = useState({
        movies: [
            { id: 1, title: 'Inception' },
            { id: 2, title: 'The Dark Knight' },
            { id: 3, title: 'Interstellar' },
            { id: 4, title: 'Forrest Gump' },
            { id: 5, title: 'The Matrix' },
            { id: 6, title: 'The Pursuit of Happyness' },
            { id: 7, title: 'Gladiator' },
            { id: 8, title: 'Titanic' },
            { id: 9, title: 'The Shawshank Redemption' },
            { id: 10, title: 'The Godfather' }
        ]
    });

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
        }
        // Fetch content data
        fetch('/api/content')
            .then(response => response.json())
            .then(data => setContent(data))
            .catch(error => console.error('Error fetching content:', error));
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    const handleItemClick = (type, id) => {
        navigate(`/details/${type}/${id}`);
    };

    return (
        <div className="dashboard-container">
            <h1>Dashboard</h1>
            <button onClick={handleLogout}>Logout</button>
            <h2>Movies</h2>
            <div className="movie-list">
                {content.movies.map(movie => (
                    <div 
                        key={movie.id} 
                        className="movie-item" 
                        onClick={() => handleItemClick('movie', movie.id)}
                    >
                        <img src={process.env.PUBLIC_URL + `/images/movies/${movie.title.toLowerCase().replace(/ /g, '_')}.jpg`} alt={movie.title} className="movie-poster" />
                        <div className="movie-title">{movie.title}</div>
                    </div>
                ))}
            </div>
            
        </div>
    );
};

export default Dashboard;
