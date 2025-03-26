import { Schema, model } from 'mongoose';
import { Order } from './Order.interface';

const OrderSchema = new Schema<Order>(
    {
        email: {
            type: String,
            required: true,
            trim: true,
            lowercase: true,
        },
        product: {
            type: String,
            required: true,
            trim: true
        },
        quantity: {
            type: Number,
            required: true,
            min: [1, 'Quantity must be at least 1']
        },
        totalPrice: {
            type: Number,
            required: true,
            min: [0, 'Total price cannot be negative']
        }
    }
);

export const OrderModel = model<Order>(
    "Order", OrderSchema
)
