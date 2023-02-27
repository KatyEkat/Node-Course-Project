const router = require("express").Router();

const {getBooks, getBookById, createBook, editBook, deleteBook}
    = require('../controllers/books');

router.get('/books', getBooks);
router.get('/books/:book_id', getBookById);
router.post('/books', createBook);
router.patch('/books/:book_id', editBook);
router.delete('/books/:book_id', deleteBook);

module.exports = router;
