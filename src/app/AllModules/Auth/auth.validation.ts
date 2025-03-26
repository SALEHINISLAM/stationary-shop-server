import { z } from "zod";

const loginValidationSchema = z.object({
    body: z.object({
        email: z.string({ message: "Email is required" }).email({ message: "Please enter a valid email" })
        ,
        password: z.string({ message: "Password is required" })
    })
})

export const authValidation={loginValidationSchema}