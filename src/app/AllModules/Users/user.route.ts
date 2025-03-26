import express from "express"
import validateRequest from "../../middleware/validateRequest"
import { UserValidation } from "./user.validation"
import { UserController } from "./user.controller"

const router=express.Router()

router.post('/create-user',validateRequest(UserValidation.createUserValidation),UserController.createUser)

export const UserRoutes=router;