import { AnyZodObject } from "zod";
import { NextFunction, Request, Response } from "express";
import catchAsync from "../utilis/catchAsync";
import AppError from "../errors/AppError";
import { StatusCodes } from "http-status-codes";

const validateParams = (schema: AnyZodObject) => {
    return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        try {
            // Validate req.params against the provided schema
            await schema.parseAsync({
                params: req.params,
            });
            next();
        } catch (error: any) {
            next(new AppError(StatusCodes.BAD_REQUEST, "Validation Error", error.errors));
        }
    });
};

export default validateParams;