import { z } from "zod";

const createUserValidation=z.object({
    body:z.object({
        email:z.string({message:"Email is required."}).email({message:"Please enter a valid email."}),
        name:z.string({message:"Name is required"}).min(2).max(2),
        password:z.string({message:"Password is required"}).min(6,{message:"Password can not less than 6 character"}).max(32,{message:"Password must be less than 32 character."})
    })
})

const addToWishListValidation=z.object({
    body:z.object({
        productId:z.string({message:"Product Id is required"}).min(4).max(40)
    })
})

const addToCartValidation=z.object({
    body:z.object({
        productId:z.string({message:"Product Id is required"}).min(4).max(40)
    })
})

export const UserValidation={createUserValidation,addToWishListValidation,addToCartValidation}