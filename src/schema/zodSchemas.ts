import * as z from 'zod';

// Schema de validação da página de registro
export const RegisterSchema = z.object({
    name: z.string().min(5, {
        message: "Please enter your name"
    }),
    email: z.string().email({
        message: "Please enter a valid email address"
    }),
    phoneNumber: z.string().min(8, {
        message: "Please enter a valid email address"
    }),
    password: z.string().min(6, {
        message: "Password must be at least 6 characters long"
    }),
    confirmPassword: z.string().min(6, {
        message: "Password must be at least 6 characters long"
    })
})