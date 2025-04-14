import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utilis/catchAsync";
import sendResponse from "../../utilis/sendResponse";
import { userServices } from "./user.services";
import AppError from "../../errors/AppError";

const createUser = catchAsync(async (req, res) => {
    const payload = req.body
    const result = await userServices.createUserIntoDB(payload)
    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: "User is created successfully",
        data: result
    })
})

const addToWishList = catchAsync(async (req, res) => {
    const { productId } = req.body
    if (!req.user) {
        throw new AppError(StatusCodes.UNAUTHORIZED, "User not authenticated");
    }
    const email = req.user.email
    const result = await userServices.addToWishList(productId, email)
    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: "Product added to wishlist successfully",
        data: result
    })
})

const addToCart = catchAsync(async (req, res) => {
    const productId = req.body.productId as string
    if (!req.user) {
        throw new AppError(StatusCodes.UNAUTHORIZED, "User not authenticated");
    }
    const email = req.user.email
    const result = await userServices.addToCart(productId, email)
    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: "Product added to cart successfully",
        data: result
    })
})

export const UserController = { createUser, addToWishList, addToCart }