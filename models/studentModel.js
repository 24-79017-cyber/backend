import pool from '../config/db.js';

//READ
export const fetch = async () => {
  const [rows] = await pool.query('SELECT * FROM student');
  return rows;
};

//update

export const update = async (student) => {
  const [result] = await pool.query (
    "UPDATE book SET name= ?, author= ? WHERE id= ? ",
    [book.name, book.author, book.id]
  );
  return result.affectedRows;
}


//delete

export const remove = async (id) => {
    const [result] = await pool.query (
        "DELETE FROM book WHERE id= ?", [id]
    );
    return result.affectedRows
}