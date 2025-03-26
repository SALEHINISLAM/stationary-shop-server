import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utilis/catchAsync";
import sendResponse from "../../utilis/sendResponse";
import { userServices } from "./user.services";

const createUser=catchAsync(async (req,res)=>{
    const payload=req.body
    const result=await userServices.createUserIntoDB(payload)
    sendResponse(res,{
        statusCode:StatusCodes.OK,
        success:true,
        message:"User is created successfully",
        data:result
    })
})

export const UserController={createUser}