import * as studentService from '../services/studentService.js';

export const fetchAllStudents = async (req, res) =>{
    const student =await studentService.fetchAllStudents();
    res.status(200).json(students);
}

//update

export const editBook = async (req, res) => {
    const {name, author} = req.body;
    const { id } = req.params;
    const book = {id: parseInt(id), name, author};

    try{
        const updatedBook = await bookService.updateBook(book);
        res.status(200).json({
            success: true,
            message: updatedBook
        });
    }catch(e){
        console.log(e);
        res.status(500).json({
            error: "Internal Server Error"
        });
    }
}

//delete
export const deleteBook = async (req, res) =>{
    const { id } = req.params;

    try{
        const deletedBook = await bookService.deleteBook(parseInt(id));
        res.status(200).json({
            success: true,
            message: deletedBook
        });
    }catch(e){
        console.log(e);
        res.status(500).json({
            error: "Internal Server Error"
        });
    }
}