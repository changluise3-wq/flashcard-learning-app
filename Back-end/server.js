const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Database Connection Configuration
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'beaniceperson2020', 
    database: 'flashcard_db'
});

// Connect to MySQL
db.connect((err) => {
    if (err) {
        console.error('Database connection failed! Error:', err.message);
    } else {
        console.log('Successfully connected to MySQL database! Backend is ready.');
    }
});

app.get('/', (req, res) => {
    res.send('Server is working! Try visiting /api/cards');
});

// [READ] Get all flashcards
app.get('/api/cards', (req, res) => {
    const sql = "SELECT * FROM flashcards WHERE is_learned = 0";
    db.query(sql, (err, results) => {
        if (err) {
            console.error("Query error:", err);
            return res.status(500).json({ error: "Database query failed" });
        }
        res.json(results);
    });
});

// [CREATE] Add a new flashcard
app.post('/api/cards', (req, res) => {
    const { question, answer, category } = req.body;
    const sql = "INSERT INTO flashcards (question, answer, category) VALUES (?, ?, ?)";
    
    db.query(sql, [question, answer, category], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: "Card created!", id: result.insertId });
    });
});

//reset is_leared = 0
app.put('/api/cards/reset', (req, res) => {
    const sql = "UPDATE flashcards SET is_learned = 0";
    db.query(sql, (err, result) => {
        if (err) {
            console.error("Reset Error:", err);
            return res.status(500).json(err);
        }
        res.json({ message: "All cards are back!" });
    });
});

// [UPDATE] Edit an existing card
app.put('/api/cards/:id', (req, res) => {
    const { id } = req.params;
    const { question, answer, category } = req.body;
    const sql = "UPDATE flashcards SET question = ?, answer = ?, category = ? WHERE id = ?";
    
    db.query(sql, [question, answer, category, id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Card updated successfully!" });
    });
});

// [DELETE] Remove a card
app.delete('/api/cards/:id', (req, res) => {
    const { id } = req.params;
    const sql = "DELETE FROM flashcards WHERE id = ?";
    
    db.query(sql, [id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Card deleted successfully!" });
    });
});

//switch learning status
app.patch('/api/cards/:id/learn', (req,res) => {
    const { id } = req.params;
    const { is_learned } = req.body;
    const sql = "UPDATE flashcards SET is_learned = ? WHERE id = ?";
    db.query(sql, [is_learned, id], (err, result) => {
        if (err) return res.status(500).json(err);
        res.json({ message: "Status updated" });
    });
});

// Start the API Server
const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});