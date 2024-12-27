import { Request, Response } from "express";
import { OrderServices } from "./Order.Services";
import { OrderValidationSchema } from "./Order.Validation";

const createOrder = async (req: Request, res: Response) => {
    try {
        const order = req.body
        const validateOrder = OrderValidationSchema.safeParse(order)
        if (validateOrder.error) {
            res.status(500).json({
                success: false,
                message: "Product do not match with schema.",
                error: validateOrder.error
            })
        }
        const result = await OrderServices.createOrderIntoDB(order)
        res.status(200).json({
            message: "Order created successfully",
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

const calculateTotalRevenue = async (req: Request, res: Response) => {
    try {
        const result = await OrderServices.calculateTotalRevenue()
        res.status(200).json({
            message: "Revenue calculated successfully",
            status:true,
            data: {totalRevenue:result}
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: error
        })
    }
}
export const OrderController = {
    createOrder,calculateTotalRevenue
}