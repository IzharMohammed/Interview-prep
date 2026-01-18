import express from "express";
import cors from "cors"
import { prisma } from "./lib/prisma.js";
import type { Prisma } from "./generated/prisma/client.js";

const app = express();
app.use(express.json());
app.use(cors())
const PORT = 4000;

app.get("/api/todos", async (req, res) => {
    try {
        const result = await prisma.todo.findMany({ orderBy: { createdAt: "desc" } })
        return res.status(200).json({ todos: result })
    } catch (error) {
        console.error("Error getting todos");
        return res.status(500).json({ error: "Failed to get todos" })
    }
})

app.post("/api/todo", async (req, res) => {
    const { title, description } = req.body;
    if (!title) return res.status(400).json({ message: "Title is required" })
    try {
        const result = await prisma.todo.create({ data: { title, description } });
        return res.status(200).json({ message: `${title} added successfully` })
    } catch (error) {
        console.error("Error to add todo");
        return res.status(500).json({ error: "Failed to to add todo" })
    }
})

app.patch("/api/todo/:id", async (req, res) => {
    const { id } = req.params
    const { title, completed, description, priority } = req.body as Prisma.TodoCreateInput
    try {
        const todo = await prisma.todo.update({
            where: { id },
            data: {
                ...(title !== undefined ? { title: title.trim() } : {}),
                ...(completed !== undefined ? { completed } : {}),
                ...(description !== undefined ? { description: description?.trim() ?? null } : {}),
                ...(priority !== undefined ? { priority } : {})
            }
        })

        return res.status(200).json({ message: `Added ${todo.title} succesfully` })
    } catch (error) {
        console.error("Error to update todo");
        return res.status(500).json({ error: "Failed to to update todo" })
    }
})

app.delete("/api/todo/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const todo = await prisma.todo.delete({ where: { id } })
        return res.status(200).json({ message: `${todo.title} removed successfully` })
    } catch (error) {
        console.error("Error removing todo");
        return res.status(500).json({ error: "Failed to removing todo" })
    }
})

app.get("/health", (req, res) => {
    res.status(200).json({ status: "ok" })
})

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
});
