const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator')

const Book = require('../models/book');

router.get('/', async (req, res) => {
    try {
        const books = await Book.find();

        res.json(books);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error'});
    }
});

router.get('/:id', async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);

        if (!book) {
            return res.status(404).json({ message: 'Book not found'});
        }
        res.json(book);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error'});
    }
});

router.post('/', [
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('author', 'El autor es obligatorio').not().isEmpty(),
        check('date', 'El fecha es obligatorio').not().isEmpty(),
        check('calificacion', 'La calificacion es obligatoria').not().isEmpty()
    ],
    async (req, res) => {

        try {
            const { name, author, date, calificacion } = req.body;

            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.mapped()
                });
            }
            
            const newBook = new Book ({ name, author, date, calificacion });

            await newBook.save();

            res.status(201).json(newBook);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error'});
        }

});

router.put('/:id', [
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('author', 'El autor es obligatorio').not().isEmpty(),
        check('date', 'El fecha es obligatorio').not().isEmpty()
    ],
    async (req, res) => {

        const id = req.params.id;
        
        try {

            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.mapped()
                });
            }

            const bookDB = await Book.findById(req.params.id);

            if (!bookDB) {
                return res.status(404).json({ message: 'There is no book matching that ID'});
            }


            const values = req.body;
            
            const updateBook = await Book.findByIdAndUpdate(id, values);

            res.status(201).json(updateBook);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error'});
        }

});

router.delete('/:id', async (req, res) => {
    try {

        const bookDB = await Book.findById(req.params.id);

        if (!bookDB) {
            return res.status(404).json({ message: 'There is no book matching that ID'});
        }


        const book = await Book.findByIdAndDelete(req.params.id);

        if (!book) {
            return res.status(404).json({ message: 'Book not found'});
        }
        res.json(book);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error'});
    }
});

module.exports = router;