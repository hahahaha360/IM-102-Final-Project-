const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const app = express();

// Middleware
app.use(bodyParser.json());

// CORS Setup
app.use((req, res, next) => {
  const allowedOrigins = ['http://127.0.0.1:5500', 'http://localhost:5500'];
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }

  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', 'true');

  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

// Database Connection
const dbmovies = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '123456', // Change this if your MySQL password is different
  database: 'Movie'
});

dbmovies.connect((err) => {
  if (err) {
    console.error('❌ MySQL connection failed:', err);
    return;
  }
  console.log('✅ Connected to MySQL database.');
});

// Default Route
app.get('/', (req, res) => {
  res.send('🎬 Movie API is running');
});

// ========================== AUTH ROUTES ==========================

// User Login
app.post('/auth/login', (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: 'Please provide username and password' });
  }

  const sql = 'SELECT * FROM users WHERE username = ? AND password = ?';
  dbmovies.query(sql, [username, password], (err, results) => {
    if (err) {
      console.error('Query error:', err);
      return res.status(500).json({ message: 'Database error' });
    }

    if (results.length > 0) {
      res.status(200).json({ message: 'Login successful' });
    } else {
      res.status(401).json({ message: 'Incorrect username or password' });
    }
  });
});

// User Registration
app.post('/auth/register', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Please fill all fields' });
  }

  const sql = 'INSERT INTO users (username, password) VALUES (?, ?)';
  dbmovies.query(sql, [username, password], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Database error' });
    }
    res.status(201).json({ message: 'User registered successfully' });
  });
});

// ========================== MOVIE ROUTES ==========================

// Add Movie
app.post('/addmovies', (req, res) => {
  const { title, director, release_year, rating } = req.body;

  if (!title || !director || !release_year || !rating) {
    return res.status(400).json({ message: 'All movie fields are required' });
  }

  const sql = 'INSERT INTO movies (title, director, release_year, rating) VALUES (?, ?, ?, ?)';
  dbmovies.query(sql, [title, director, release_year, rating], (err, result) => {
    if (err) {
      console.error('Insert error:', err);
      return res.status(500).json({ message: 'Database error' });
    }
    res.status(201).json({ message: 'Movie added successfully' });
  });
});

// Get Movies (with search, sort, pagination)
app.get('/movies', (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const offset = (page - 1) * limit;

  const sortBy = req.query.sortBy || 'movieID';
  const order = req.query.order === 'desc' ? 'DESC' : 'ASC';

  const search = req.query.search || '';
  const allowedSortColumns = ['movieID', 'title', 'director', 'release_year', 'rating'];
  if (!allowedSortColumns.includes(sortBy)) {
    return res.status(400).json({ message: 'Invalid sort column' });
  }

  const sql = `
    SELECT * FROM movies
    WHERE title LIKE ? OR director LIKE ?
    ORDER BY ${sortBy} ${order}
    LIMIT ? OFFSET ?
  `;
  const searchParam = `%${search}%`;

  dbmovies.query(sql, [searchParam, searchParam, limit, offset], (err, results) => {
    if (err) {
      console.error('Query error:', err);
      return res.status(500).json({ message: 'Database error' });
    }
    res.status(200).json(results);
  });
});

// Get Movie by ID
app.get('/movies/:id', (req, res) => {
  const movieId = req.params.id;
  const sql = 'SELECT * FROM movies WHERE movieID = ?';

  dbmovies.query(sql, [movieId], (err, results) => {
    if (err) {
      console.error('Query error:', err);
      return res.status(500).json({ message: 'Database error' });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: 'Movie not found' });
    }

    res.status(200).json(results[0]);
  });
});

// Update Movie
app.put('/updateMovies/:id', (req, res) => {
  const movieId = req.params.id;
  const { title, director, release_year, rating } = req.body;

  if (!title || !director || !release_year || !rating) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const sql = `
    UPDATE movies 
    SET title = ?, director = ?, release_year = ?, rating = ?
    WHERE movieID = ?
  `;

  dbmovies.query(sql, [title, director, release_year, rating, movieId], (err, result) => {
    if (err) {
      console.error('Update error:', err);
      return res.status(500).json({ message: 'Database error' });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Movie not found' });
    }

    res.status(200).json({ message: 'Movie updated successfully' });
  });
});

// Delete Movie
app.delete('/deleteMovies/:id', (req, res) => {
  const movieId = req.params.id;
  const sql = 'DELETE FROM movies WHERE movieID = ?';

  dbmovies.query(sql, [movieId], (err, result) => {
    if (err) {
      console.error('Delete error:', err);
      return res.status(500).json({ message: 'Database error' });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Movie not found' });
    }

    res.status(200).json({ message: 'Movie deleted successfully' });
  });
});

// ========================== START SERVER ==========================
app.listen(3000, () => {
  console.log('🚀 Server is running on 3000');
});
