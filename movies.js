const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');

const app = express();


app.use(bodyParser.json());


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


// MySQL connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'Movie'
});

const dbmovies = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'Movie'
});

db.connect((err) => {
    if (err) {
        console.error('MySQL connection failed:', err);
        return;
    }
    console.log('Connected to MySQL database.');
});


app.get('/', (req, res) => {
    res.send('Hello world!');
});


// Start server
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

// LOGIN ROUTE
app.post('/auth/login', (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'Please provide username and password' });
    }

    const sql = 'SELECT * FROM users WHERE username = ? AND password = ?';
    db.query(sql, [username, password], (err, results) => {
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

// REGISTER ROUTE
app.post('/auth/register', (req, res) => {
    const { username, password } = req.body;

    
    const sql = 'INSERT INTO users (username, password) VALUES (?, ?)';
    db.query(sql, [username, password], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Database error' });
        }
        res.status(201).json({ message: 'User registered successfully' });
    });
});

//add movie
app.post('/addmovies', (req, res) => {
    const { title, director, release_year, rating } = req.body;

    if (!title || !director || !release_year || !rating) {
        return res.status(400).json({ message: 'Please provide title, director, release year and its ratings.' });
    }

    const sql = 'INSERT INTO movies (title, director, release_year, rating) VALUES (?, ?, ?, ?)';
    dbmovies.query(sql, [title, director, release_year, rating], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Database error' });
        }
        res.status(201).json({ message: 'Movie added successfully' });
    });
});

// GET MOVIES LIST ROUTE
app.get('/movies', (req, res) => {
    const sql = 'SELECT * FROM movies';
    dbmovies.query(sql, (err, results) => {
        if (err) {
            console.error('Error retrieving movies:', err);
            return res.status(500).json({ message: 'Database error' });
        }
        res.status(200).json(results); // send list of movies to frontend
    });
});
// GET MOVIES LIST WITH PAGINATION & SORTING
app.get('/movies', (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    const sortBy = req.query.sortBy || 'title'; // default sort
    const order = req.query.order === 'desc' ? 'DESC' : 'ASC'; // default ASC

    const sql = `SELECT * FROM movies ORDER BY ${mysql.escapeId(sortBy)} ${order} LIMIT ? OFFSET ?`;
    dbmovies.query(sql, [limit, offset], (err, results) => {
        if (err) {
            console.error('Error retrieving movies:', err);
            return res.status(500).json({ message: 'Database error' });
        }
        res.status(200).json(results);
    });
});
