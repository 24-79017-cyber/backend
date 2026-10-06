import express from "express";
import booksRoutes from '.routes/books.js';

const app = express();

app.use('/book', bookRoutes);

try {
    const port = 3000; 
    app.listen(port, () => {
        console.log('listening to port $(port)...');
        });
    } catch(e) {
        console.log(e)
    }   