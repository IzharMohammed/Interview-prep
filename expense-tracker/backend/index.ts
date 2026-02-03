import express, { type NextFunction, type Request, type Response } from "express";
import cors from "cors"
import jwt from "jsonwebtoken"
import { user, type ResponseType, type User } from "./types/zod.js";
import { prisma } from "./lib/prisma.js";
const JWT_PASSWORD = "sE3rEt";
const authRouter = express.Router();
const categoryRouter = express.Router();
const expenseRouter = express.Router()
import cookieParser from 'cookie-parser';
const app = express();
app.use(express.json());
app.use(cors())
app.use(cookieParser());
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
        // eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Iml6aGFyMUBnbWFpbC5jb20iLCJpZCI6ImNtbDZjczN3djAwMDB5Mnp2MHNueWp5cDMiLCJpYXQiOjE3NzAxMDgzMTQsImV4cCI6MTc3MDExMTkxNH0.5zR84C2_sYAvoO_uzpT3mkWkaWqqc8_Gb2B2MZpD4N0
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

function verifyToken(req: Request, res: Response, next: NextFunction) {
    const token = req.cookies.jwt as string;
    if (!token) return res.status(401).json({ message: 'Access denied' });
    jwt.verify(token, JWT_PASSWORD, (err, decoded) => {
        if (err) return res.status(403).json({ message: "Invalid token" });
        req.user = decoded;
        next()
    })
}

categoryRouter.get("/categories", verifyToken, (req: Request, res: Response) => { })
categoryRouter.post("/categories", verifyToken, (req: Request, res: Response) => { })

expenseRouter.get("/expenses", verifyToken, async (req: Request, res: Response) => {
    try {
        const expenses = await prisma.expense.findMany(
            {
                where: {
                    user:
                    {
                        id: "",
                        email: ""
                    }
                },
                select:
                    { amount, category, descrption, createdAt }
            });

        return res.status(200).json({
            success: true,
            result: expenses
        })
    } catch (error) {
        return res.json({
            error: "SystemError",
            message: "Internal Server Error",
            statusCode: 500
        } as ResponseType)
    }
})

expenseRouter.post("/expenses", verifyToken, (req: Request, res: Response) => {
    try {

    } catch (error) {
        return res.json({
            error: "SystemError",
            message: "Internal Server Error",
            statusCode: 500
        } as ResponseType)
    }
})

expenseRouter.put("/expenses/:id", verifyToken, (req: Request, res: Response) => {
    try {

    } catch (error) {
        return res.json({
            error: "SystemError",
            message: "Internal Server Error",
            statusCode: 500
        } as ResponseType)
    }
})

expenseRouter.delete("/expenses/:id", verifyToken, (req: Request, res: Response) => {
    try {

    } catch (error) {
        return res.json({
            error: "SystemError",
            message: "Internal Server Error",
            statusCode: 500
        } as ResponseType)
    }
})

app.get("/health", (req, res) => {
    res.status(200).json({ status: "ok" })
})

app.use("/api/v1", authRouter, categoryRouter, expenseRouter)

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
});