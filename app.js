import express from "express"
const app = express();
import User from './user.js';
import cors from 'cors';

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set EJS as view engine
app.set('view engine', 'ejs');

// Register route
app.get('/register', (req, res) => {
  res.render('register');
});

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
app.get('/login', (req, res) => {
  res.render('login');
});

app.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.login(username, password);
    res.status(200).json({ message: 'Login successful', user });
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
});

// Dashboard route (after login)
app.get('/dashboard', (req, res) => {
  res.render('dashboard');
});

// Start server
app.listen(3000, () => {
  console.log('Server listening on port 3000');
});