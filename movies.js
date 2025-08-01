const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');

const app = express();


app.use(bodyParser.json());


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:5500');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', 'true');  // lowercase 'true' is correct

    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }
    next();
});

// MySQL connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'jakebernal',
    database: 'auth_app'
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
            alert('Login successful');
        } else {
            res.status(401).json({ message: 'Incorrect username or password' });
        }
    });
});

// REGISTER ROUTE
app.post('/auth/register', (req, res) => {
    const { username, password } = req.body;

    // Add user validation & hashing here

    const sql = 'INSERT INTO users (username, password) VALUES (?, ?)';
    db.query(sql, [username, password], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Database error' });
        }
        res.status(201).json({ message: 'User registered successfully' });
    });
});


