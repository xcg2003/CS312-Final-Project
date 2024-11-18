import express from "express"
const app = express();
import User from './user.js';
import pool from './db.js';
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
    const user = await User.register(username, email, password);
    res.redirect('/login');
  } catch (err) {
    res.status(400).render('register', { error: err.message });
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
    res.redirect('/dashboard');
  } catch (err) {
    res.status(401).render('login', { error: err.message });
  }
});

// Dashboard route (after login)
app.get('/dashboard', (req, res) => {
  res.render('dashboard');
});

// Start server
app.listen(5000, () => {
  console.log('Server listening on port 5000');
});