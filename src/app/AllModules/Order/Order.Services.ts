import { OrderModel } from "../orderModel";
import { stationaryProductModel } from "../stationaryProductModel";
import { Order } from "./Order.interface";

const createOrderIntoDB = async (order: Order) => {
    const productId = order.product;
    const product = await stationaryProductModel.findOne({ _id: productId })
    if ((product?.quantity as number) > order.quantity && (order.quantity) * (product?.price as number) === order.totalPrice) {
        const updateProduct = await stationaryProductModel.updateOne({ _id: productId }, { quantity: (product?.quantity as number - order.quantity) }, { upsert: false })
        const result = await OrderModel.create(order);
        return result
    }
    if ((product?.quantity as number) === order.quantity && (order.quantity) * (product?.price as number) === order.totalPrice) {
        const updateProduct = await stationaryProductModel.updateOne({ _id: productId }, { quantity: 0, inStock: false }, { upsert: false })
        const result = await OrderModel.create(order);
        return result
    }
    throw new Error("Something went wrong")
}

const calculateTotalRevenue = async (): Promise<number> => {
    const result = await OrderModel.aggregate([
        {
            $group: {
                _id: null,
                totalRevenue: { $sum: "$totalPrice" }
            }
        }
    ])
    const totalFinalRevenue = result[0]?.totalRevenue || 0
    return totalFinalRevenue
}

export const OrderServices = { createOrderIntoDB, calculateTotalRevenue }