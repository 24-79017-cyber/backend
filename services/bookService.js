import * as bookModel from '../models/bookModel.js';

//start validation 
const doesBookExist = async (book) => {
    const books = await bookModel.fetch();

    return books.some(existingBook =>
        existingBook.name.toLowerCase() === book.name.toLowerCase() &&
        existingBook.author.toLowerCase() === book.author.toLowerCase() &&
        existingBook.id !== book.id
    );
};
//

export const fetchAllBooks = async() => {
    const books = await bookModel.fetch();
    return books;
}

export const createBook = async(book) => {

    //start validation
    if (!book.name || !book.author ||
        !book.name.trim() || !book.author.trim()) {
        throw new Error('Name and author is required!');
    }

    const existing = await doesBookExist(book);

    if (existing) {
        throw new Error('Book already exist!');
    }
    //

    const bookId = await bookModel.insert(book);
    return bookId;
}

export const updateBook = async (book) => {

    //start validation 
    if (!book.name || !book.author ||
        !book.name.trim() || !book.author.trim()) {
        throw new Error('Name and author is required!');
    }

    const existing = await doesBookExist(book);

    if (existing) {
        throw new Error('Book already exist!');
    }
    //

    const updatedBook = await bookModel.update(book);
    return updatedBook;
}

export const deleteBook = async(id) => {
    const deletedBook = await bookModel.remove(id);
    return deletedBook;
}
