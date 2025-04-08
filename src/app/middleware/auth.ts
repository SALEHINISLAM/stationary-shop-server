import { NextFunction, Request, Response } from "express";
import { USER_ROLE_TYPE } from "../AllModules/Users/user.constant";
import catchAsync from "../utilis/catchAsync";
import AppError from "../errors/AppError";
import { StatusCodes } from "http-status-codes";
import jwt, { JwtPayload } from "jsonwebtoken"
import config from "../config";
import { UserModel } from "../AllModules/Users/user.model";

const auth = (...requiredRoles: USER_ROLE_TYPE[]) => {
    return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const token = req.headers.authorization;
        //console.log(token)
        //check if token is missing
        if (!token) {
            throw new AppError(StatusCodes.UNAUTHORIZED, "You are not authorized!");
        }
        let decoded;
        try {
            //checking if the token is valid
            decoded = jwt.verify(
                token,
                config.jwt_access_token as string,
            ) as JwtPayload;
        } catch (error) {
            console.log(error);
            throw new AppError(StatusCodes.UNAUTHORIZED, "UnAuthorizedError")
        }
        const { role, email, iat } = decoded;
        console.log(decoded)
        //checking if the user is exists
        const user = await UserModel.findOne({email:email})
        if (!user) {
            throw new AppError(StatusCodes.NOT_FOUND, "This user does not exist")
        }
        //checking if the user already banned
        const isBanned = user.isDeleted
        if (isBanned) {
            throw new AppError(StatusCodes.FORBIDDEN, "This user is deleted by our admin")
        }
        
        //check if the user has required roles
        if (user.passwordChangedAt) {
            const changedTimestamp = Math.floor(user.passwordChangedAt.getTime() / 1000);
            if (iat && iat < changedTimestamp) {
                throw new AppError(
                    StatusCodes.UNAUTHORIZED,
                    "User recently changed password! Please log in again."
                );
            }
        }
        if (requiredRoles && !requiredRoles.includes(role)) {
            throw new AppError(
                StatusCodes.UNAUTHORIZED,
                'You are not authorized!',
            );
        }
        req.user = decoded as JwtPayload & { role: string };
        next();
    })
}

export default auth;