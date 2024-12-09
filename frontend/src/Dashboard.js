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
            { id: 10, title: 'The Godfather' },
            { id: 11, title: 'Fight Club' },
            { id: 12, title: 'The Silence of the Lambs' },
            { id: 13, title: 'Schindlers List' },
            { id: 14, title: 'Pulp Fiction' },
            { id: 15, title: 'The Lord of the Rings: The Fellowship of the Ring' },
            { id: 16, title: 'The Lord of the Rings: The Two Towers' },
            { id: 17, title: 'The Lord of the Rings: The Return of the King' },
            { id: 18, title: 'The Green Mile' },
            { id: 19, title: 'American Beauty' },
            { id: 20, title: 'Goodfellas' },
            { id: 21, title: 'Seven' },
            { id: 22, title: '12 Angry Men' },
            { id: 23, title: 'The Godfather Part II' },
            { id: 25, title: 'Star Wars: Episode IV - A New Hope' },
            { id: 26, title: 'Star Wars: Episode V - The Empire Strikes Back' },
            { id: 27, title: 'Star Wars: Episode VI - Return of the Jedi' },
            { id: 28, title: 'Back to the Future' },
            { id: 29, title: 'Back to the Future Part II' },
            { id: 30, title: 'Back to the Future Part III' },
            { id: 31, title: 'Toy Story' },
            { id: 32, title: 'Toy Story 2' },
            { id: 33, title: 'Toy Story 3' },
            { id: 34, title: 'The Lion King' },
            { id: 35, title: 'The Lion King II: Simbas Pride' },
            { id: 36, title: 'Shrek' },
            { id: 37, title: 'Shrek 2' },
            { id: 38, title: 'Shrek the Third' },
            { id: 39, title: 'Shrek Forever After' },
            { id: 40, title: 'Spider-Man' },
            { id: 41, title: 'Spider-Man 2' },
            { id: 42, title: 'Spider-Man 3' },
            { id: 43, title: 'The Avengers' },
            { id: 44, title: 'Iron Man' },
            { id: 45, title: 'The Incredible Hulk' },
            { id: 46, title: 'Iron Man 2' },
            { id: 47, title: 'Thor' },
            { id: 48, title: 'Captain America: The First Avenger' },
            { id: 49, title: 'Iron Man 3' },
            { id: 50, title: 'Thor: The Dark World' },
            { id: 51, title: 'Captain America: The Winter Soldier' },
            { id: 52, title: 'Guardians of the Galaxy' },
            { id: 53, title: 'Avengers: Age of Ultron' },
            { id: 54, title: 'Ant-Man' },
            { id: 55, title: 'Captain America: Civil War' },
            { id: 56, title: 'Doctor Strange' },
            { id: 57, title: 'Guardians of the Galaxy Vol. 2' },
            { id: 58, title: 'Spider-Man: Homecoming' },
            { id: 59, title: 'Thor: Ragnarok' },
            { id: 60, title: 'Black Panther' },
            { id: 61, title: 'Avengers: Infinity War' },
            { id: 62, title: 'Ant-Man and the Wasp' },
        ]
    });
    const [searchTerm, setSearchTerm] = useState('');
    const [suggestions, setSuggestions] = useState([]);

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

    const handleSearch = (event) => {
        event.preventDefault();
        const movie = content.movies.find(movie => movie.title.toLowerCase() === searchTerm.toLowerCase());
        if (movie) {
            navigate(`/details/movie/${movie.id}`);
        } else {
            alert('Movie not found');
        }
    };

    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        if (value) {
            const filteredMovies = content.movies.filter(movie =>
                movie.title.toLowerCase().includes(value.toLowerCase())
            );
            setSuggestions(filteredMovies);
        } else {
            setSuggestions([]);
        }
    };

    return (
        <div className="dashboard-container">
            <h1>Dashboard</h1>
            <button onClick={handleLogout}>Logout</button>
            <form onSubmit={handleSearch} className="search-form">
                <input 
                    type="text" 
                    placeholder="Search for a movie..." 
                    value={searchTerm} 
                    onChange={handleSearchChange} 
                />
                <button type="submit">Search</button>
            </form>
            {suggestions.length > 0 && (
                <ul className="suggestions-list">
                    {suggestions.map(movie => (
                        <li key={movie.id} onClick={() => handleItemClick('movie', movie.id)}>
                            {movie.title}
                        </li>
                    ))}
                </ul>
            )}
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
