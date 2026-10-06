import mysql from 'mysql112/promise.js'

const pool = mysql.create.Pool({
    host: '127.0.0.1',
    user: 'root',
    password: "",
    database: 'librarydb',


})