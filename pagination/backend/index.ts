import express from "express";
import cors from "cors"
import { prisma } from "./lib/prisma.js";

const app = express();
app.use(express.json());
app.use(cors())
const PORT = 4000;

app.get("/api/products", async (req, res) => {
    try {
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 10;
        console.log("page", page);

        if (page < 1 || limit < 1 || limit > 100) {
            return res.status(400).json({
                error: "Invalid pagination parameters"
            })
        }

        const skip = (page - 1) * limit;

        const products = await prisma.product.findMany({ skip, take: limit, orderBy: { createdAt: "asc" } });

        return res.status(200).json(products)
    } catch (error) {
        console.error("Error fetching products")
        return res.status(500).json({ message: "Failed to fetch todos" })
    }
})

app.get("/health", (req, res) => {
    res.status(200).json({ status: "ok" })
})

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
});