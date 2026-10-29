import * as studentModel from '../models/studentModel.js';

export const fetchAllStudents = async () => {
  const students = await studentModel.fetch();
  return students;
};

//update

export const update = async (book) => {
  const [result] = await pool.query (
    "UPDATE book SET name= ?, author= ? WHERE id= ? ",
    [book.name, book.author, book.id]
  );
  return result.affectedRows;
}

//delete

export const deleteBook = async(id) =>{
    const deletedBook = await bookModel.remove(id);
    return deletedBook;
}