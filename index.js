const express = require('express');
const app = express();
const PORT = 3000;

// Middleware to parse JSON requests
app.use(express.json());

// Sample data: a list of books
let books = [
    { 
        id: 1,
        title: "Kusabimaru",
        author: "Julian Eric B. Parco",
        category: "Fiction",
        description: "A tale of great swordsman and his journey to the north."
    },
    { 
        id: 2,
        title: "Above",
        author: "Julian Eric B. Parco",
        category: "Non-Fiction",
        description: "Based on an historical event called the pearl harbor."
    },
    { 
        id: 3,
        title: "Ascent",
        author: "Julian Eric B. Parco",
        category: "Fiction",
        description: "A story of a child of long lost covilization living among with humans."
    },
    { 
        id: 4,
        title: "Ascent: Light and Dark",
        author: "Julian Eric B. Parco",
        category: "Fiction",
        description: "A sequel to the original book Ascent. When History is forgotten it becomes a lie."
    },
    { 
        id: 5,
        title: "Cosmic Dream",
        author: "Julian Eric B. Parco",
        category: "Fiction",
        description: "A story of just an ordinary human who is destined to live among the stars."
    }
];

// Route to get all books
app.get('/books', (req, res) => {
    res.json(books);
});

// Route to get a book by ID
app.get('/books/:id', (req, res) => {
    const book = books.find(b => b.id === parseInt(req.params.id));
    if (book) {
        res.json(book);
    } else {
        res.status(404).send('Book not found');
    }
});

// Route to add a new book
app.post('/books', (req, res) => {
    const newBook = {
        id: books.length + 1,
        title: req.body.title,
        author: req.body.author,
        category: req.body.category,
        description: req.body.description
    };
    books.push(newBook);
    res.status(201).json(newBook);
});

// Route to update a book by ID
app.put('/books/:id', (req, res) => {
    const book = books.find(b => b.id === parseInt(req.params.id));
    if (book) {
        book.title = req.body.title;
        book.author = req.body.author;
        book.category = req.body.category;
        book.description = req.body.description;
        res.json(book);
    } else {
        res.status(404).send('Book not found');
    }
});

// Route to delete a book by ID
app.delete('/books/:id', (req, res) => {
    const bookIndex = books.findIndex(b => b.id === parseInt(req.params.id));
    if (bookIndex !== -1) {
        books.splice(bookIndex, 1);
        res.status(204).send();
    } else {
        res.status(404).send('Book not found');
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

