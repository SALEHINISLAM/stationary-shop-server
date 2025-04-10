import { z } from "zod";

const loginValidationSchema = z.object({
    body: z.object({
        email: z.string({ message: "Email is required" }).email({ message: "Please enter a valid email" })
        ,
        password: z.string({ message: "Password is required" })
    })
})

const refreshTokenValidationSchema = z.object({
    cookies: z.object({
        refreshToken: z.string({ message: "Refresh token is required" })
    })
})

export const authValidation={loginValidationSchema,refreshTokenValidationSchema}