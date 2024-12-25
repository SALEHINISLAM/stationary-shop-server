import { Request, Response } from "express";
import { StudentServices } from "./student.service";

const createStudent=async(req:Request,res:Response)=>{
    try {
        const student=req.body;
    //send response
    const result=await StudentServices.createStudentIntoDB(student)
    res.status(200).json(
        {
            success:true,
            message:"Student is created successfully",
            data:result
        }
    )
    } catch (error) {
        console.error(error)
    }
    
}
export const studentController={
createStudent
}