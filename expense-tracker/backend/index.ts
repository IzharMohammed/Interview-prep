import express, { type Request, type Response } from "express";
import cors from "cors"


const app = express();
app.use(express.json());
app.use(cors())
const PORT = 4000;


app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
});