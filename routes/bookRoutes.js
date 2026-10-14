import * as bookController from '../controllers/bookControllers.js';
import express from 'express';

const router = express.Router();

router.get('/', bookController.fetchAllBooks);

export default router;