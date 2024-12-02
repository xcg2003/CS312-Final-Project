import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './MovieDetails.css'; // Import the CSS file for styling

const MovieDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');

    useEffect(() => {
        console.log(`Fetching movie details for ID: ${id}`);
        fetch(`http://localhost:3000/api/movies/${id}`)
            .then(response => {
                console.log('Received response:', response);
                if (!response.ok) {
                    throw new Error(`Network response was not ok: ${response.statusText}`);
                }
                const contentType = response.headers.get('content-type');
                console.log('Content-Type:', contentType);
                if (!contentType || !contentType.includes('application/json')) {
                    throw new TypeError("Expected JSON response");
                }
                return response.json();
            })
            .then(data => {
                console.log('Movie data:', data);
                setMovie(data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching movie details:', error);
                setError(error.message);
                setLoading(false);
            });
    }, [id]);

    const handleRatingChange = (e) => {
        setRating(e.target.value);
    };

    const handleCommentChange = (e) => {
        setComment(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch(`http://localhost:3000/api/movies/${id}/rate`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token')
            },
            body: JSON.stringify({ rating })
        })
        .then(response => response.json())
        .then(data => {
            console.log('Rating submitted:', data);
            setMovie(prevMovie => ({
                ...prevMovie,
                ratings: [...prevMovie.ratings, rating]
            }));
        })
        .catch(error => console.error('Error submitting rating:', error));

        fetch(`http://localhost:3000/api/movies/${id}/comment`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token')
            },
            body: JSON.stringify({ comment })
        })
        .then(response => response.json())
        .then(data => {
            console.log('Comment submitted:', data);
            setMovie(prevMovie => ({
                ...prevMovie,
                comments: [...prevMovie.comments, { userId: data.userId, comment }]
            }));
        })
        .catch(error => console.error('Error submitting comment:', error));
    };

    const calculateAverageRating = (ratings) => {
        if (ratings.length === 0) return 0;
        const sum = ratings.reduce((a, b) => a + b, 0);
        return sum / ratings.length;
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    if (!movie) return <div>Loading...</div>;

    return (
        <div className="movie-details-container">
            <button onClick={() => navigate(-1)}>Back</button>
            <h1>{movie.title}</h1>
            <p>{movie.description}</p>
            <p>Release Date: {new Date(movie.release_date).toISOString().split('T')[0]}</p>
            <h2>Rating</h2>
            <div className="rating-stars">
                {Array.from({ length: 5 }, (_, index) => (
                    <span key={index} style={{ color: index < Math.round(calculateAverageRating(movie.ratings)) ? 'gold' : 'gray' }}>
                        ★
                    </span>
                ))}
            </div>
            <h2>Comments</h2>
            <ul className="comments-list">
                {movie.comments.map((comment, index) => (
                    <li key={index}>{comment.comment}</li>
                ))}
            </ul>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>
                        Rate this movie:
                        <input type="number" value={rating} onChange={handleRatingChange} min="1" max="5" />
                    </label>
                </div>
                <div>
                    <label>
                        Add a comment:
                        <textarea value={comment} onChange={handleCommentChange}></textarea>
                    </label>
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default MovieDetails;