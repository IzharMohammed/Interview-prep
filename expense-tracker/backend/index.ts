import express, { type Request, type Response } from "express";
import cors from "cors"
import jwt from "jsonwebtoken"
import { user, type ResponseType, type User } from "./types/zod.js";
import { prisma } from "./lib/prisma.js";
const JWT_PASSWORD = "sE3rEt";
const authRouter = express.Router();
const categoryRouter = express.Router();
const expenseRouter = express.Router()

const app = express();
app.use(express.json());
app.use(cors())
const PORT = 4000;

authRouter.post("/auth/register", async (req: Request, res: Response) => {
    const { email, password } = req.body as User
    const result = user.safeParse({ email, password });
    console.log("result", result);

    if (!result.success) {
        return res.status(401).json(result.error);   // ZodError instance
    }
    try {
        const verifyUser = await prisma.user.findUnique({ where: { email } });

        if (verifyUser) {
            return res.status(409).json({
                message: "User already exist",
                // result: user,
                statusCode: 409
            })
        }
        const user = await prisma.user.create({ data: { email, password } })

        return res.status(201).json({
            message: "User created successfully",
            result: user.email,
            statusCode: 201
        })

    } catch (error) {
        return res.json({
            error: "SystemError",
            message: "Internal Server Error",
            statusCode: 500
        })
    }
})
authRouter.post("/auth/login", async (req: Request, res: Response) => {
    const { email, password } = req.body as User
    const result = user.safeParse({ email, password });
    console.log("result", result);

    if (!result.success) {
        return res.status(401).json(result.error);   // ZodError instance
    }
    try {

        const user = await prisma.user.findUnique({ where: { email } })

        if (user?.password !== password) {
            return res.status(401).json({
                error: "Incorrect Password",
                message: "Incorrect Password",
                statusCode: 401,
            } as ResponseType)
        }

        const token = jwt.sign({ email: user.email, id: user.id }, JWT_PASSWORD, { expiresIn: 60 * 60 });
        return res.status(200).json({
            success: true,
            result: token
        })
    } catch (error) {
        return res.json({
            error: "SystemError",
            message: "Internal Server Error",
            statusCode: 500
        })
    }
})


categoryRouter.get("/categories", (req: Request, res: Response) => { })
categoryRouter.post("/categories", (req: Request, res: Response) => { })

expenseRouter.get("/expenses", (req: Request, res: Response) => { })
expenseRouter.post("/expenses", (req: Request, res: Response) => { })
expenseRouter.put("/expenses/:id", (req: Request, res: Response) => { })
expenseRouter.delete("/expenses/:id", (req: Request, res: Response) => { })

app.get("/health", (req, res) => {
    res.status(200).json({ status: "ok" })
})

app.use("/api/v1", authRouter, categoryRouter, expenseRouter)

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
});