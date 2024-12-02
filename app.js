import express from "express";
import jwt from "jsonwebtoken";
import cors from 'cors';
import User from './user.js';
import Movie from './movie.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Register route
app.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    console.log('Registering user:', { username, email, password });
    const user = await User.register(username, email, password);
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    console.error('Registration error:', err);
    if (err.code === '23505') { // PostgreSQL unique violation error code
      res.status(400).json({ error: 'Email already in use' });
    } else {
      res.status(400).json({ error: err.message });
    }
  }
});

// Login route
app.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.login(username, password);
    const token = jwt.sign({ id: user.id }, 'your_jwt_secret', { expiresIn: '1h' });
    res.status(200).json({ message: 'Login successful', token });
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
});

// Middleware to verify token
const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) {
    return res.status(403).json({ error: 'No token provided' });
  }
  jwt.verify(token, 'your_jwt_secret', (err, decoded) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to authenticate token' });
    }
    req.userId = decoded.id;
    next();
  });
};

// Get movie details
app.get('/api/movies/:id', async (req, res) => {
  console.log(`Fetching details for movie ID: ${req.params.id}`);
  try {
    const movie = await Movie.getMovieById(req.params.id);
    if (!movie) {
      console.error(`Movie not found: ID ${req.params.id}`);
      return res.status(404).json({ error: 'Movie not found' });
    }
    const ratings = await Movie.getRatingsByMovieId(req.params.id);
    const comments = await Movie.getCommentsByMovieId(req.params.id);
    movie.ratings = ratings.map(r => r.rating);
    movie.comments = comments;
    console.log(`Movie found: ${JSON.stringify(movie)}`);
    res.json(movie);
  } catch (err) {
    console.error('Error fetching movie details:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Post user rating
app.post('/api/movies/:id/rate', verifyToken, async (req, res) => {
  const { rating } = req.body;
  if (rating < 1 || rating > 5) return res.status(400).json({ error: 'Rating must be between 1 and 5' });

  try {
    const result = await Movie.addRating(req.params.id, req.userId, rating);
    res.status(201).json({ message: 'Rating added successfully', rating: result });
  } catch (err) {
    console.error('Error adding rating:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Post user comment
app.post('/api/movies/:id/comment', verifyToken, async (req, res) => {
  const { comment } = req.body;

  try {
    const result = await Movie.addComment(req.params.id, req.userId, comment);
    res.status(201).json({ message: 'Comment added successfully', comment: result });
  } catch (err) {
    console.error('Error adding comment:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Error handling middleware
app.use((req, res, next) => {
  console.error(`404 Not Found: ${req.originalUrl}`);
  res.status(404).json({ error: 'Not Found' });
});

app.use((err, req, res, next) => {
  console.error(`500 Internal Server Error: ${err.stack}`);
  res.status(500).json({ error: 'Internal Server Error' });
});

// Start server
app.listen(3000, () => {
  console.log('Server listening on port 3000');
});