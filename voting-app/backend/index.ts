import express from "express";
import cors from "cors"
import { prisma } from "./lib/prisma.js";

const app = express();
app.use(express.json());
app.use(cors())
const PORT = 4000;
app.get("/api/votes", async (req, res) => {
  try {
    const response = await prisma.team.findMany({ orderBy: { voteCount: "desc" } });
    return res.status(200).json(response);
  } catch (error) {
    console.error("Error fetching team data");
    return res.status(500).json({ error: "Failed to fetch team data" })
  }
});

app.post("/api/vote", async (req, res) => {
  const { team } = req.body;

  if (!team || !["A", "B", "C"].includes(team)) return res.status(400).json({ message: "Invalid team. Must be 'A', 'B', or 'C'" });

  try {
    await prisma.team.update({
      where: { name: team },
      data: { voteCount: { increment: 1 } },
    });
    return res
      .status(200)
      .json({ message: `Added vote to ${team} successfully!` });
  } catch (error) {
    console.error(`Error voting for Team ${team}:`, error);
    return res.status(500).json({ error: `Failed to vote for team ${team}` })
  }
});

app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" })
})

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
