import { Model } from "mongoose"
import { USER_ROLE_TYPE } from "../Users/user.constant"

export type TUser={
    name:string,
    email:string,
    role: USER_ROLE_TYPE,
    password:string,
    isDeleted:boolean,
    passwordChangedAt:Date
}

export interface IUserModel extends Model<TUser>{
    isPasswordMatched(
        plainTextPassword:string,
        hashedPassword:string
    ):Promise<Boolean>
    isJWTIssuedBeforePasswordChanged(
        passwordChangedAt:Date,
        jwtIssuedAt:number
    ):boolean
}