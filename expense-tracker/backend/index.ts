import express, { type Request, type Response } from "express";
import cors from "cors"
const authRouter = express.Router();
const categoryRouter = express.Router();
const expenseRouter = express.Router()

const app = express();
app.use(express.json());
app.use(cors())
const PORT = 4000;

authRouter.post("/auth/register", (req: Request, res: Response) => { })
authRouter.post("/auth/login", (req: Request, res: Response) => { })


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