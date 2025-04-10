import express from "express"
import validateRequest from "../../middleware/validateRequest"
import { authValidation } from "./auth.validation"
import { AuthControllers } from "./auth.controller"

const router = express.Router()

router.post("/login", validateRequest(authValidation.loginValidationSchema),AuthControllers.loginUser)
router.post("/refresh-token",validateRequest(authValidation.refreshTokenValidationSchema) ,AuthControllers.refreshToken)

export const authRoutes=router;