import pool from '../config/db.js';

//READ
export const fetch = async () => {
  const [rows] = await pool.query('SELECT * FROM student');
  return rows;
};