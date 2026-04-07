-- Setup database
DROP DATABASE IF EXISTS flashcard_db;
CREATE DATABASE flashcard_db;
USE flashcard_db;

-- Create table for cards
CREATE TABLE flashcards (
    id INT AUTO_INCREMENT PRIMARY KEY,
    question TEXT NOT NULL,
    answer TEXT NOT NULL,
    category VARCHAR(50) DEFAULT 'General',
    is_learned TINYINT(1) DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Initial seed data
INSERT INTO flashcards (question, answer, category) VALUES 
('What is React?', 'A JavaScript library for building user interfaces.', 'React'),
('What is a Hook?', 'A special function that lets you "hook into" React features.', 'React'),
('What is SQL?', 'Structured Query Language used for managing databases.', 'Database'),
('What does CRUD stand for?', 'Create, Read, Update, and Delete.', 'General'),
('What is Express.js?', 'A minimal and flexible Node.js web application framework.', 'Backend'),
('Who is going to award this assignment an HD?', 'YOU! (Thank you so much!)', 'Surprise');

-- Check data
SELECT * FROM flashcards;