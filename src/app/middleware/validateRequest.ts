import { AnyZodObject } from "zod";
import { NextFunction, Request, Response } from "express";
import catchAsync from "../utilis/catchAsync";
import AppError from "../errors/AppError";
import { StatusCodes } from "http-status-codes";

const validateRequest = (schema: AnyZodObject) => {
    return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        try {
            //console.log("from validator",req.body)
            await schema.parseAsync({
                body: req.body,
                cookies: req.cookies,
            });
            //console.log("Validation Successful! Moving to next()...");
            next();
        } catch (error: any) {
            //console.error("Validation Error:", error.errors);
            next(new AppError(StatusCodes.BAD_REQUEST, "Validation Error", error.errors));
        }
    });
}

export default validateRequest;