import { Request, Response } from "express";
import { StudentServices } from "./student.service";
import Joi from "joi";

const createStudent = async (req: Request, res: Response) => {
    try {
        //creating schema validation using joi
        const UserNameSchema = Joi.object({
            firstName: Joi.string()
                .trim()
                .pattern(/^[A-Za-z]+$/)
                .required()
                .messages({
                    'string.empty': 'First Name is required',
                    'string.pattern.base': '{#label} must contain only alphabetic characters',
                    'any.required': 'First Name is required',
                }),

            middleName: Joi.string()
                .trim()
                .allow('', null) // Assuming middleName can be optional or empty
                .messages({
                    'string.empty': 'Middle Name is required',
                }),

            lastName: Joi.string()
                .trim()
                .pattern(/^[A-Za-z]+$/)
                .required()
                .messages({
                    'string.empty': 'Last Name is required',
                    'string.pattern.base': '{#label} must contain only alphabetic characters',
                    'any.required': 'Last Name is required',
                }),
        });
        const GuardianSchema = Joi.object({
            fatherName: Joi.string()
                .trim()
                .required()
                .messages({
                    'string.empty': 'Father\'s Name is required',
                    'any.required': 'Father\'s Name is required',
                }),

            fatherOccupation: Joi.string()
                .trim()
                .required()
                .messages({
                    'string.empty': 'Father\'s Occupation is required',
                    'any.required': 'Father\'s Occupation is required',
                }),

            fatherContactNo: Joi.string()
                .trim()
                .pattern(/^\+?[0-9]{10,15}$/)
                .required()
                .messages({
                    'string.empty': 'Father\'s Contact Number is required',
                    'string.pattern.base': '{#label} must be a valid phone number',
                    'any.required': 'Father\'s Contact Number is required',
                }),

            motherName: Joi.string()
                .trim()
                .required()
                .messages({
                    'string.empty': 'Mother\'s Name is required',
                    'any.required': 'Mother\'s Name is required',
                }),

            motherOccupation: Joi.string()
                .trim()
                .required()
                .messages({
                    'string.empty': 'Mother\'s Occupation is required',
                    'any.required': 'Mother\'s Occupation is required',
                }),

            motherContactNo: Joi.string()
                .trim()
                .pattern(/^\+?[0-9]{10,15}$/)
                .required()
                .messages({
                    'string.empty': 'Mother\'s Contact Number is required',
                    'string.pattern.base': '{#label} must be a valid phone number',
                    'any.required': 'Mother\'s Contact Number is required',
                }),
        });
        const LocalGuardianSchema = Joi.object({
            name: Joi.string()
                .trim()
                .required()
                .messages({
                    'string.empty': 'Local Guardian\'s Name is required',
                    'any.required': 'Local Guardian\'s Name is required',
                }),

            occupation: Joi.string()
                .trim()
                .required()
                .messages({
                    'string.empty': 'Local Guardian\'s Occupation is required',
                    'any.required': 'Local Guardian\'s Occupation is required',
                }),

            contactNo: Joi.string()
                .trim()
                .pattern(/^\+?[0-9]{10,15}$/)
                .required()
                .messages({
                    'string.empty': 'Local Guardian\'s Contact Number is required',
                    'string.pattern.base': '{#label} must be a valid phone number',
                    'any.required': 'Local Guardian\'s Contact Number is required',
                }),

            address: Joi.string()
                .trim()
                .required()
                .messages({
                    'string.empty': 'Local Guardian\'s Address is required',
                    'any.required': 'Local Guardian\'s Address is required',
                }),
        });
        const StudentSchema = Joi.object({
            id: Joi.string()
                .trim()
                .required()
                .messages({
                    'string.empty': 'Student ID is required',
                    'any.required': 'Student ID is required',
                }),

            name: UserNameSchema.required().messages({
                'any.required': 'Student Name is required',
            }),

            gender: Joi.string()
                .valid('female', 'male', 'others')
                .required()
                .messages({
                    'any.only': 'Gender must be one of the following: female, male, others',
                    'string.empty': 'Gender is required',
                    'any.required': 'Gender is required',
                }),

            DateOfBirth: Joi.date()
                .iso()
                .required()
                .messages({
                    'date.base': 'Date of Birth must be a valid date',
                    'date.format': 'Date of Birth must be in ISO format',
                    'any.required': 'Date of Birth is required',
                }),

            email: Joi.string()
                .trim()
                .email({ tlds: { allow: false } }) // tlds.allow set to false to accept any TLD
                .required()
                .messages({
                    'string.email': 'Please fill a valid email address',
                    'string.empty': 'Email is required',
                    'any.required': 'Email is required',
                }),

            contactNumber: Joi.string()
                .trim()
                .pattern(/^\+?[0-9]{10,15}$/)
                .required()
                .messages({
                    'string.empty': 'Contact Number is required',
                    'string.pattern.base': '{#label} must be a valid phone number',
                    'any.required': 'Contact Number is required',
                }),

            emergencyContactNumber: Joi.string()
                .trim()
                .pattern(/^\+?[0-9]{10,15}$/)
                .required()
                .messages({
                    'string.empty': 'Emergency Contact Number is required',
                    'string.pattern.base': '{#label} must be a valid phone number',
                    'any.required': 'Emergency Contact Number is required',
                }),

            bloodGroup: Joi.string()
                .valid("A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-")
                .required()
                .messages({
                    'any.only': '{#label} is not a valid blood group',
                    'string.empty': 'Blood Group is required',
                    'any.required': 'Blood Group is required',
                }),

            presentAddress: Joi.string()
                .trim()
                .required()
                .messages({
                    'string.empty': 'Present Address is required',
                    'any.required': 'Present Address is required',
                }),

            permanentAddress: Joi.string()
                .trim()
                .required()
                .messages({
                    'string.empty': 'Permanent Address is required',
                    'any.required': 'Permanent Address is required',
                }),

            guardian: GuardianSchema.required().messages({
                'any.required': 'Guardian information is required',
            }),

            localGuardian: LocalGuardianSchema.required().messages({
                'any.required': 'Local Guardian information is required',
            }),

            profileImg: Joi.string()
                .trim()
                .uri()
                .pattern(/\.(jpg|jpeg|png|gif)$/)
                .messages({
                    'string.uri': 'Please provide a valid URL',
                    'string.pattern.base': 'Please provide a valid image URL',
                }),

            isActive: Joi.string()
                .valid("Active", "InActive")
                .required()
                .default("Active")
                .messages({
                    'any.only': "isActive must be either 'Active' or 'InActive'",
                    'string.empty': 'isActive status is required',
                    'any.required': 'isActive status is required',
                }),
        });

        const { student: studentData } = req.body;
        const {error,value}=StudentSchema.validate(studentData)
        if (error) {
            res.status(500).json(
                {
                    success: false,
                    message: "Something went wrong",
                    error: error
                }
            )
        }
        //send response
        console.log(studentData);
        const result = await StudentServices.createStudentIntoDB(studentData)
        res.status(200).json(
            {
                success: true,
                message: "Student is created successfully",
                data: result
            }
        )
    } catch (error) {
        console.error(error)
        res.status(500).json(
            {
                success: false,
                message: "Something went wrong",
                error: error
            }
        )
    }

}

const getAllStudentsFromDB = async (req: Request, res: Response) => {
    try {
        const result = await StudentServices.getAllStudentsFromDB()
        res.status(200).json(
            {
                success: true,
                message: "Students are retrieved successfully",
                data: result
            }
        )
    } catch (error) {
        console.log(error);
        res.status(500).json(
            {
                success: false,
                message: "Something went wrong",
                error: error
            }
        )
    }
}

const getSingleStudentFromDB = async (req: Request, res: Response) => {
    try {
        const id = req.params.studentId
        const result = await StudentServices.getSingleStudentFromDB(id)
        res.status(200).json(
            {
                success: true,
                message: "Student is retrieved successfully",
                data: result
            }
        )
    } catch (error) {
        console.log(error)
        res.status(500).json(
            {
                success: false,
                message: "Something went wrong",
                error: error
            }
        )
    }
}

export const studentController = {
    createStudent, getAllStudentsFromDB, getSingleStudentFromDB
}