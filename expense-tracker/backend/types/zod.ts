import * as z from "zod";

export const user = z.object({
    email: z.email().nonempty(),
    password: z.string().min(5, "Minimum 5 required").max(8, "max 8 is allowed")
})

export const response = z.object({
    statusCode: z.number(),
    error: z.string(),
    message: z.string()
})

export type ResponseType = z.infer<typeof response>;
export type User = z.infer<typeof user>;