
import * as bookService from '../services/bookService.js';
//

export const fetchAllBooks = async(req, res) => {
    const books = await bookService.fetchAllBooks();
    res.status(200).json(books);
}

export const createBook = async (req, res) => {
    console.log(req);
    const {name, author} = req.body;
    const book = {name, author};

    //Start validation
    if (!name || !author || !name.trim() || !author.trim()) {
        return res.status(400).json({
            error: "Name and author is required!"
        });
    }
    //end validation

    try {
        const bookId = await bookService.createBook(book);
        res.status(200).json ({
            success: true,
            message: bookId
        });
    } catch(e) {
        console.log(e);
        res.status(500).json ({
            error: "Internal Server Error"
        });
    }
}

export const editBook = async (req, res) => {
    const {name, author} = req.body;
    const { id } = req.params;
    const book = {id: parseInt(id), name, author};

    //start validtion
    if (!name || !author || !name.trim() || !author.trim()) {
        return res.status(400).json({
            error: "Name and author is required!"
        });
    }

    if (!Number.isInteger(Number(id)) || Number(id) <= 0) {
        return res.status(400).json({
            error: "Invalid book ID!"
        });
    }
    //

    try {
        const updatedBook = await bookService.updateBook(book);
        res.status(200).json ({
            success: true,
            message: updatedBook
        });
    } catch(e) {
        console.log(e);
        res.status(500).json ({
            error: "Internal Server Error"
        });
    }
}

export const deleteBook = async (req, res) => {
    const { id } = req.params;

    //start add validation
    if (!Number.isInteger(Number(id)) || Number(id) <= 0) {
        return res.status(400).json({
            error: "Invalid book ID!"
        });
    }
    //

    try {
        const deletedBook = await bookService.deleteBook(parseInt(id));
        res.status(200).json({
            success: true,
            message: deletedBook
        });
    } catch(e) {
        console.log(e);
        res.status(500).json({
            error: "Internal Server Error"
        });
    } 
}
