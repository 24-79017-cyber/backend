import pool from '../config/db.js';

//start user insert
export const insert = async (user) => {
    const [result] = await pool.query(
        "INSERT INTO user(name, email, password) VALUES (?, ?, ?)",
        [user.name, user.email, user.password]
    );

    return result.insertId;
}
//

//Find user ermail
export const findUserByEmail = async (email) => {
    const [rows] = await pool.query(
        "SELECT * FROM user WHERE email = ?",
        [email]
    );

    return rows;
}
//


