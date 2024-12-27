import { Request, Response } from "express";
import { StationaryProductValidationSchema } from "./stationaryProduct.validation";
import { StationaryProductServices } from "./stationaryProduct.services";

const createProduct = async (req: Request, res: Response) => {
    try {
        const product = req.body
        const validateProduct = StationaryProductValidationSchema.safeParse(product)
        if (validateProduct.error) {
            res.status(500).json({
                success: false,
                message: "Product do not match with schema.",
                error: validateProduct.error
            })
        }
        const result = await StationaryProductServices.createStationaryProductIntoDB(product)
        res.status(200).json({
            message: "Product added successfully",
            success: true,
            data: result
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: error
        })
    }
}

const getAllProducts = async (req: Request, res: Response) => {
    try {
        const result = await StationaryProductServices.getAllProducts()
        res.status(200).json({
            message: "Products retrieved successfully",
            status:true,
            data: result
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: error
        })
    }
}

const getSingleProduct = async (req: Request, res: Response) => {
    try {
        const id = req.params.productId
        const result = await StationaryProductServices.getSingleProduct(id)
        res.status(200).json({
            message: "Product retrieved successfully",
            status:true,
            data: result
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: error
        })
    }
}

const updateProduct = async (req: Request, res: Response) => {
    try {
        const id = req.params.productId
        const doc = req.body
        const result = await StationaryProductServices.updateProducts(id, doc);
        res.status(200).json({
            message: "Product updated successfully",
            status:true,
            data: result
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: error
        })
    }
}

const deleteProduct=async(req:Request, res:Response)=>{
    try {
        const id=req.params.productId
        const result=await StationaryProductServices.deleteProduct(id)
        res.status(200).json({
            message: "Product deleted successfully",
            status:true,
            data: result
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: error
        })
    }
}
export const StationaryProductController = {
    createProduct, getAllProducts, getSingleProduct, updateProduct,deleteProduct
}