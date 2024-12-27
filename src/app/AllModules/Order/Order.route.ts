import express from "express"
import { OrderController } from "./Order.controller"

const router=express.Router()

router.post('/orders',OrderController.createOrder)
router.get('/orders/revenue',OrderController.calculateTotalRevenue)

export const OrderRoute=router