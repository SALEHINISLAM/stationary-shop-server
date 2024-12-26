import express from "express"
import { studentController } from "./student.controller";
const router=express.Router();
//will call controller function
router.post("/create-student",studentController.createStudent)
router.get("/get-all-students",studentController.getAllStudentsFromDB)
router.get(`/:studentId`,studentController.getSingleStudentFromDB)
export const StudentRoutes=router
