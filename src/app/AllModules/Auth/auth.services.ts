import { StatusCodes } from "http-status-codes";
import AppError from "../../errors/AppError";
import { UserModel } from "../Users/user.model";
import { TLoginUser } from "./auth.interface";
import { createToken } from "./auth.utilis";
import config from "../../config";

const loginUser = async (payload: TLoginUser) => {
    const user = await UserModel.findOne({ email: payload.email })
    if (!user) {
        throw new AppError(StatusCodes.NOT_FOUND, 'This user not found')
    }
    if (user.isDeleted) {
        throw new AppError(StatusCodes.FORBIDDEN, "This user is deleted")
    }
    if (!(UserModel.isPasswordMatched(payload.password, user.password))) {
        throw new AppError(StatusCodes.UNAUTHORIZED, "Password not matched")
    }
    const jwtPayload = {
        email: user.email,
        role: user.role
    }

    const accessToken = createToken(jwtPayload, config.jwt_access_token as string, config.JWT_ACCESS_EXPIRES_IN as string)
    const refreshToken = createToken(jwtPayload,
        config.jwt_refresh_token as string,
        config.JWT_REFRESH_EXPIRES_IN as string,)

    return { accessToken, refreshToken }
}

export const AuthServices = { loginUser }