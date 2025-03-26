import { StatusCodes } from "http-status-codes";
import config from "../../config";
import catchAsync from "../../utilis/catchAsync";
import sendResponse from "../../utilis/sendResponse";
import { AuthServices } from "./auth.services";

const loginUser=catchAsync(async(req,res)=>{
    const result=await AuthServices.loginUser(req.body)
    const {refreshToken,accessToken}=result
    res.cookie("refreshToken",refreshToken,{
        secure:config.MODE==="PRODUCTION",
        httpOnly:true,
        sameSite:'none',
        maxAge:1000*60*60*24*30
    })
    sendResponse(res,{
        statusCode:StatusCodes.OK,
        success:true,
        message:"User logged in successfully",
        data:{
            accessToken
        }
    })
})

export const AuthControllers={loginUser}