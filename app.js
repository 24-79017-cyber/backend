import express from 'express';
import booksRoutes from './routes/bookRoutes.js';
import studentRoutes from './routes/studentRoutes.js';

const app = express();

app.use(express.json());

app.use('/book', booksRoutes);
app.use('/student', studentRoutes); 

try {
  const port = 3000; // Defineport varibale here for safety
  app.listen(port, () => {
    console.log('listening to port $(port)...');
  });
} catch(e) {
    console,log(e);
}  