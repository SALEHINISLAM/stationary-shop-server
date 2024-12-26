import { model, Schema } from "mongoose";
import { Guardian, LocalGuardian, Student, UserName } from "./student/student.interface";
import validator from 'validator';

// UserName Schema
const UserNameSchema = new Schema<UserName>({
    firstName: { 
        type: String, 
        required: [true, 'First Name is required'] ,
        trim:true,
        validate:{
            validator:(value:string)=>validator.isAlpha(value),
            message:"{VALUE} is not valid"
        }
    },
    middleName: { 
        type: String, 
        required: [true, 'Middle Name is required'] ,
        trim:true
    },
    lastName: { 
        type: String, 
        required: [true, 'Last Name is required'] ,
        trim:true,
        validate:{
            validator:(value:string)=>validator.isAlpha(value),
            message:"{VALUE} is not valid"
        }
    },
});

// Guardian Schema
const guardianSchema = new Schema<Guardian>({
    fatherName: { 
        type: String, 
        required: [true, 'Father\'s Name is required'] 
    },
    fatherOccupation: { 
        type: String, 
        required: [true, 'Father\'s Occupation is required'] 
    },
    fatherContactNo: { 
        type: String, 
        required: [true, 'Father\'s Contact Number is required'] 
    },
    motherName: { 
        type: String, 
        required: [true, 'Mother\'s Name is required'] 
    },
    motherOccupation: { 
        type: String, 
        required: [true, 'Mother\'s Occupation is required'] 
    },
    motherContactNo: { 
        type: String, 
        required: [true, 'Mother\'s Contact Number is required'] 
    },
});

// LocalGuardian Schema
const LocalGuardianSchema = new Schema<LocalGuardian>({
    name: { 
        type: String, 
        required: [true, 'Local Guardian\'s Name is required'] 
    },
    occupation: { 
        type: String, 
        required: [true, 'Local Guardian\'s Occupation is required'] 
    },
    contactNo: { 
        type: String, 
        required: [true, 'Local Guardian\'s Contact Number is required'] 
    },
    address: { 
        type: String, 
        required: [true, 'Local Guardian\'s Address is required'] 
    },
});

// Student Schema
const StudentSchema = new Schema<Student>({
    id: { 
        type: String, 
        required: [true, 'Student ID is required'], 
        unique: true 
    },
    name: { 
        type: UserNameSchema, 
        required: [true, 'Student Name is required'] 
    },
    gender: { 
        type: String, 
        enum: { 
            values: ['female', "male", "others"], 
            message: "Gender must be one of the following: female, male, others" 
        }, 
        required: [true, 'Gender is required'] 
    },
    DateOfBirth: { 
        type: String, 
        required: [true, 'Date of Birth is required'] 
    },
    email: { 
        type: String, 
        required: [true, 'Email is required'],
        match: [/.+\@.+\..+/, 'Please fill a valid email address'], 
        validate:{
            validator:(value:string)=>validator.isEmail(value),
            message:"{VALUE} is not valid"
        }
    },
    contactNumber: { 
        type: String, 
        required: [true, 'Contact Number is required'] 
    },
    emergencyContactNumber: { 
        type: String, 
        required: [true, 'Emergency Contact Number is required'] 
    },
    bloodGroup: { 
        type: String, 
        enum: { 
            values: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"], 
            message: '{VALUE} is not a valid blood group' 
        }, 
        required: [true, 'Blood Group is required'] 
    },
    presentAddress: { 
        type: String, 
        required: [true, 'Present Address is required'] 
    },
    permanentAddress: { 
        type: String, 
        required: [true, 'Permanent Address is required'] 
    },
    guardian: { 
        type: guardianSchema, 
        required: [true, 'Guardian information is required'] 
    },
    localGuardian: { 
        type: LocalGuardianSchema, 
        required: [true, 'Local Guardian information is required'] 
    },
    profileImg: { 
        type: String, 
        match: [/^https?:\/\/.*\.(jpg|jpeg|png|gif)$/, 'Please provide a valid image URL']
    },
    isActive: { 
        type: String, 
        enum: { 
            values: ["Active", "InActive"], 
            message: "isActive must be either 'Active' or 'InActive'" 
        }, 
        required: [true, 'isActive status is required'], 
        default: "Active" 
    }
});

export const StudentModel = model<Student>('Student', StudentSchema);
