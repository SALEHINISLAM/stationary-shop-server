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

const addToWishList = async (productId: string, email: string) => {
    // 1. Find the user (with proper type checking)
    const user = await UserModel.findOne({
        email: email.toLowerCase().trim(),
        isDeleted: false
    }).select('+wishList +_id'); // Explicitly include wishList

    if (!user) {
        throw new AppError(StatusCodes.NOT_FOUND, "User not found or account is disabled");
    }

    // 2. Validate productId format if needed
    if (!productId || typeof productId !== 'string') {
        throw new AppError(StatusCodes.BAD_REQUEST, "Invalid product ID");
    }

    const wishLists=user.wishList

    // 3. Check for duplicate (case-sensitive check)
    const isAlreadyInWishlist = wishLists.some(
        id => id === productId
    );

    if (isAlreadyInWishlist) {
        throw new AppError(StatusCodes.CONFLICT, "Product already exists in wishlist");
    }

    // 4. Add to wishlist and save
    const result=await UserModel.updateOne(
        {_id: user._id},
        {wishList: [...user.wishList, productId]},
        {new: true} // Return the updated document
    )

    // 5. Return the updated user (without sensitive fields)
    return result
};

const addToCart=async(productId:string,email:string)=>{
    const user=await UserModel.findOne({
        email:email.toLowerCase().trim(),
        isDeleted:false
    }).select('+cart +_id')

    if(!user){
        throw new AppError(StatusCodes.NOT_FOUND,"User not found or account is disabled")
    }

    if(!productId || typeof productId!=='string'){
        throw new AppError(StatusCodes.BAD_REQUEST,"Invalid product ID")
    }

    const cart=user.cart

    const isAlreadyInCart=cart.some(
        item=>item.productId===productId
    )

    if(isAlreadyInCart){
        throw new AppError(StatusCodes.CONFLICT,"Product already exists in cart")
    }

    const result=await UserModel.updateOne(
        {_id:user._id},
        {cart:[...user.cart,{productId:productId,quantity:1}]},
        {new:true}
    )

    return result
}

export const userServices = { createUserIntoDB,addToWishList,addToCart }