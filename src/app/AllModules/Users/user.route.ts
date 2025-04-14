import express from "express"
import validateRequest from "../../middleware/validateRequest"
import { UserValidation } from "./user.validation"
import { UserController } from "./user.controller"
import auth from "../../middleware/auth"
import { USER_ROLE, USER_ROLE_TYPE } from "./user.constant"

const router=express.Router()

router.post('/create-user',validateRequest(UserValidation.createUserValidation),UserController.createUser)
router.post('/add-to-wish-list',auth(USER_ROLE.user as USER_ROLE_TYPE,USER_ROLE.admin as USER_ROLE_TYPE,USER_ROLE.superAdmin as USER_ROLE_TYPE),validateRequest(UserValidation.addToWishListValidation),UserController.addToWishList)
router.post('/add-to-cart',auth(USER_ROLE.user as USER_ROLE_TYPE,USER_ROLE.admin as USER_ROLE_TYPE,USER_ROLE.superAdmin as USER_ROLE_TYPE),validateRequest(UserValidation.addToCartValidation),UserController.addToCart)

export const UserRoutes=router;