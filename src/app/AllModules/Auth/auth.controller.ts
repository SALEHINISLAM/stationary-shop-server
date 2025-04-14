import { StatusCodes } from "http-status-codes";
import config from "../../config";
import catchAsync from "../../utilis/catchAsync";
import sendResponse from "../../utilis/sendResponse";
import { AuthServices } from "./auth.services";

const loginUser=catchAsync(async(req,res)=>{
    const result=await AuthServices.loginUser(req.body)
    const {refreshToken,accessToken,wishList,cart}=result
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
            accessToken,
            cart,
            wishList
        }
    })
})

const refreshToken=catchAsync(async(req,res)=>{
    const {refreshToken}=req.cookies
    const result=await AuthServices.refreshToken(refreshToken)
    sendResponse(res,{
        statusCode:StatusCodes.OK,
        success:true,
        message:"Access token is retrieved successfully!",
        data:result
    })
})

export const AuthControllers={loginUser,refreshToken}