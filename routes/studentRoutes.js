import * as studentControllers from '../controllers/studentControllers.js';
import express from 'express';

const studentRoutes = express.Router();

studentRoutes.get('/', studentController.fetchAllStudents);
studentRoutes.post('/', studentController.creaStudent);
studentRoutes.put('/:id', studentController.editStudent);
studentRoutes.delete('/:id', studentController.deleteStudent);

export default studentRoutes;