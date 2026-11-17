
import * as studentModel from '../models/studentModel.js';

//start validation
const doesStudentExist = async (student) => {
    const students = await studentModel.fetch();

    return students.some(existingStudent =>
        existingStudent.srcode.toLowerCase() === student.srcode.toLowerCase() &&
        existingStudent.id !== student.id
    );
};
//end validation

export const fetchAllStudents = async() => {
    const students = await studentModel.fetch();
    return students;
}

export const createStudent = async(student) => {

    //start validation
    if (!student.name || !student.srcode || !student.program ||
        !student.name.trim() || !student.srcode.trim() || !student.program.trim()) {
        throw new Error('All fields are required!');
    }

    const existing = await doesStudentExist(student);

    if (existing) {
        throw new Error('Student SR Code already exists!');
    }
    //end validation

    const studentId = await studentModel.insert(student);
    return studentId;
}

export const updateStudent = async (student) => {

    //start validation
    if (!student.name || !student.srcode || !student.program ||
        !student.name.trim() || !student.srcode.trim() || !student.program.trim()) {
        throw new Error('All fields are required!');
    }

    const existing = await doesStudentExist(student);

    if (existing) {
        throw new Error('Student SR Code already exists!');
    }
    //

    const updatedStudent = await studentModel.update(student);
    return updatedStudent;
}

export const deleteStudent = async(id) => {
    const deletedStudent = await studentModel.remove(id);
    return deletedStudent;
}
