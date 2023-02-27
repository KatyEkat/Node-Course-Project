const User = require('../models/users');
const Book = require('../models/book');

const getUsers = (req, res) => {
    return User.find({}).then(
        (data) => {res.status(200).send(data)}
    )
};

const getUserById = (req, res) => {
    const {user_id} = req.params;

    return User.findById(user_id).then(
        (user) => {res.status(200).send(user)}
    ).catch(
        (e) => {res.status(500).send(e.message)}
    )
};

const createUser = (req, res) => {
    return User.create({...req.body}).then(
        () => {res.status(201).send({...req.body})}
    ).catch(
        (e) => {res.status(500).send(e.message)}
    )
};

const deleteUser = (req, res) => {
    const {user_id} = req.params;

    return User.findByIdAndDelete(user_id).then(
        () => {res.status(200).send('User deleted')}
    ).catch(
        (e) => {res.status(500).send(e.message)}
    )
};

const editUser = (req, res) => {
    const {user_id} = req.params;

    return User.findByIdAndUpdate(user_id, {...req.body}).then(
        () => {res.status(200).send('User data update')}
    ).catch(
        (e) => {res.status(500).send(e.message)}
    )
};

const addBookForUser = (req, res) => {
    const {user_id} = req.params;
    const {book_id} = req.params;

    Book.findById(book_id).then(
        (book) => {
            if (book.available === false) {
                return res.status(200).send(`Книга ${book.title}, ${book.author} отсутствует`)
            } else {
                Book.findByIdAndUpdate(book_id, {available: false}).then(
                    () => {
                        return User.findByIdAndUpdate(user_id, {$push: {books: book}}).then(
                            () => {
                                res.status(200).send(`Вы взяли книгу ${book.title}, ${book.author}`)
                            })
                    })
            }
        }
    ).catch(
        (e) => {res.status(500).send(e.message)}
    );
};

const returnBookByUser = (req, res) => {
    const {user_id} = req.params;
    const {book_id} = req.params;

    Book.findById(book_id).then(
        (book) => {
            if (book.available === true) {
                return res.status(200).send(`Книга ${book.title}, ${book.author} уже сдана`)
            } else {
                return Book.findByIdAndUpdate(book_id, {available: true}).then(
                    () => {
                        User.findByIdAndUpdate(user_id, {$pull: {books: {title: book.title}}}).then(
                            () => {
                                res.status(200).send(`Вы вернули книгу ${book.title}, ${book.author}`)
                            })
                    })
            }
        }
    ).catch(
        (e) => {res.status(500).send(e.message)}
    );
}

module.exports = {getUsers, getUserById, createUser, editUser, deleteUser, addBookForUser, returnBookByUser};
