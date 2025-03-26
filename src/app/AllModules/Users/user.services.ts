import { StatusCodes } from "http-status-codes";
import AppError from "../../errors/AppError";
import { TUser } from "./user.interface";
import { UserModel } from "./user.model";
import mongoose from "mongoose";

const createUserIntoDB = async (payload: Partial<TUser>) => {
    if (!payload.name || !payload.email || !payload.password) {
        throw new AppError(StatusCodes.PARTIAL_CONTENT, "Please Enter all the required information.")
    }
    const isEmailExists = await UserModel.findOne({ email: payload.email })
    if (isEmailExists) {
        throw new AppError(StatusCodes.NOT_ACCEPTABLE, "This email already registered.")
    }
    const userData = { name: payload.name, email: payload.email, password: payload.password }
    const session = await mongoose.startSession()
    try {
        session.startTransaction()
        const newUser = await UserModel.create([userData], { session })
        if (!newUser.length) {
            throw new AppError(StatusCodes.BAD_REQUEST, "Failed to create user")

        }
        await session.commitTransaction()
        await session.endSession()
        return newUser
    } catch (error: any) {
        console.log(error);
        await session.abortTransaction()
        await session.endSession()
        throw new AppError(StatusCodes.INTERNAL_SERVER_ERROR, `${error?.message}`)
    }
}

export const userServices = { createUserIntoDB }