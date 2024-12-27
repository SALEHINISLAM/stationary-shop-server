import express from "express"
import { StationaryProductController } from "./stationaryProduct.controller"

const router = express.Router()
router.post("/products", StationaryProductController.createProduct);
router.get("/products", StationaryProductController.getAllProducts)
router.get("/products/:productId", StationaryProductController.getSingleProduct)
router.put("/products/:productId", StationaryProductController.updateProduct)
router.delete("/products/:productId", StationaryProductController.deleteProduct)

export const stationaryRoutes = router