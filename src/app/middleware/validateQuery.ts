import { AnyZodObject } from "zod";
import { NextFunction, Request, Response } from "express";
import catchAsync from "../utilis/catchAsync";
import AppError from "../errors/AppError";
import { StatusCodes } from "http-status-codes";

const validateQuery = (schema: AnyZodObject) => {
    return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        try {
            // Validate req.query against the provided schema
            await schema.parseAsync({
                query: req.query,
            });
            next();
        } catch (error: any) {
            // Pass the error to the error-handling middleware using AppError
            next(new AppError(StatusCodes.BAD_REQUEST, "Validation Error", error.errors));
        }
    });
};

export default validateQuery;