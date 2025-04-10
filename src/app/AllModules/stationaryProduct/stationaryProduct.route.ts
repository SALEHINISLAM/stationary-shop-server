import express from "express"
import { StationaryProductController } from "./stationaryProduct.controller"
import validateRequest from "../../middleware/validateRequest";
import { StationaryProductValidation } from "./stationaryProduct.validation";
import auth from "../../middleware/auth";
import { USER_ROLE, USER_ROLE_TYPE } from "../Users/user.constant";
import validateQuery from "../../middleware/validateQuery";
import validateParams from "../../middleware/validateParams";

const router = express.Router()

// add product
router.post("/product", auth(USER_ROLE.admin as USER_ROLE_TYPE, USER_ROLE.superAdmin as USER_ROLE_TYPE), validateRequest(StationaryProductValidation.createStationaryProductValidationSchema), StationaryProductController.createProduct);
// get all products
router.get("/products", validateQuery(StationaryProductValidation.getStationaryProductsQuerySchema), StationaryProductController.getAllProducts)
// get single product
router.get("/products/:productId", validateParams(StationaryProductValidation.getSingleProductQuerySchema), StationaryProductController.getSingleProduct)
// update product
router.put("/products/:productId", auth(USER_ROLE.admin as USER_ROLE_TYPE, USER_ROLE.superAdmin as USER_ROLE_TYPE), validateRequest(StationaryProductValidation.updateProductValidationSchema), StationaryProductController.updateProduct)
// delete product
router.delete("/products/:productId", auth(USER_ROLE.admin as USER_ROLE_TYPE, USER_ROLE.superAdmin as USER_ROLE_TYPE), validateParams(StationaryProductValidation.deleteProductValidationSchema), StationaryProductController.deleteProduct)

export const stationaryRoutes = router