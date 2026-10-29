import * as bookModel from '../models/bookModel.js';

export const fetchAllBooks = async() => {
  const books = await bookModel.fetch();
  return books;
}

export const createBook = async(book) => {
  const bookId = await bookModel.insert(book);
  return bookId;
  
}

//update

export const update = async (book) => {
  const [result] = await pool.query (
    "UPDATE book SET name= ?, author= ? WHERE id= ? ",
    [book.name, book.author, book.id]
  );
  return result.affectedRows;
}