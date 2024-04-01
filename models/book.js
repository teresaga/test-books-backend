const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    name: { type: String, required: true },
    author: { type: String, required: true},
    date: { type: String, required: false },
    calificacion: { type: Number, required: true },
});

const Book = mongoose.model('Book', bookSchema);
module.exports = Book;