
import * as studentService from '../services/studentService.js';

export const fetchAllStudents = async(req, res) => {
    const students = await studentService.fetchAllStudents();
    res.status(200).json(students);
}

export const createStudent = async (req, res) => {
    console.log(req);
    const {name, srcode, program} = req.body;
    const student = {name, srcode, program};

    //Start Validation 
    if (!name || !srcode || !program ||
        !name.trim() || !srcode.trim() || !program.trim()) {
        return res.status(400).json({
            error: "All fields are required!"
        });
    }
    //

    try {
        const studentId = await studentService.createStudent(student);
        res.status(200).json ({
            success: true,
            message: studentId
        });
    } catch(e) {
        console.log(e);
        res.status(500).json ({
            error: "Internal Server Error"
        });
    }
}

//update
export const editStudent = async (req, res) => {
    const {name, srcode, program} = req.body;
    const { id } = req.params;
    const student = {id: parseInt(id), name, srcode, program};

    //Start Validation
    if (!name || !srcode || !program ||
        !name.trim() || !srcode.trim() || !program.trim()) {
        return res.status(400).json({
            error: "All fields are required!"
        });
    }

    if (!Number.isInteger(Number(id)) || Number(id) <= 0) {
        return res.status(400).json({
            error: "Invalid student ID!"
        });
    }
    //

    try {
        const updatedStudent = await studentService.updateStudent(student);
        res.status(200).json ({
            success: true,
            message: updatedStudent,
        });
    } catch(e) {
        console.log(e);
        res.status(500).json ({
            error: "Internal Server Error"
        });
    }
}

// delete
export const deleteStudent = async (req, res) => {
    const { id } = req.params;

    //start validation
    if (!Number.isInteger(Number(id)) || Number(id) <= 0) {
        return res.status(400).json({
            error: "Invalid student ID!"
        });
    }
    //

    try {
        const deletedStudent = await studentService.deleteStudent(parseInt(id));
        res.status(200).json({
            success: true,
            message: deletedStudent
        });
    } catch(e) {
        console.log(e);
        res.status(500).json({
            error: "Internal Server Error"
        });
    } 
}
