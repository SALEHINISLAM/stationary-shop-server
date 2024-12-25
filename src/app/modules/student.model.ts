import { model, Schema } from "mongoose";
import { Student } from "./student/student.interface";

const StudentSchema=new Schema<Student>({
    id:{type:String,required:true} ,
    name:{
        firstName:{type:String,required:true} ,
        middleName:{type:String,required:true} ,
        lastName:{type:String,required:true} ,
    },
    gender:['female',"male"],
    DateOfBirth: {type:String,required:true} ,
        email: {type:String,required:true} ,
        contactNumber: {type:String,required:true} ,
        emergencyContactNumber: {type:String,required:true} ,
        bloodGroup: ["A+" ,"A-" ,"B+" ,"B-" ,"AB+" ,"AB-" ,"O+" ,"O-"],
        presentAddress: {type:String,required:true} ,
        permanentAddress: {type:String,required:true} ,
        guardian: {
            fatherName:{type:String,required:true} ,
            fatherOccupation:{type:String,required:true} ,
            fatherContactNo:{type:String,required:true} ,
            motherName:{type:String,required:true} ,
            motherOccupation:{type:String,required:true} ,
            motherContactNo:{type:String,required:true} ,
        },
        localGuardian:{
            name:{type:String,required:true} ,
            occupation:{type:String,required:true} ,
            contactNo:{type:String,required:true} ,
            address:{type:String,required:true} ,
        },
        profileImg:{type:String} ,
        isActive:["Active","InActive"]
})

export const StudentModel=model<Student>('Student',StudentSchema)