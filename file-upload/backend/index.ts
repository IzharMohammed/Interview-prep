import express from "express";
import cors from "cors"

const app = express();
app.use(express.json());
app.use(cors())
const PORT = 4000;
app.post("/upload",(req,res)=>{
    return res.redirect("/")
})


app.get("/health", (req, res) => {
    res.status(200).json({ status: "ok" })
})

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
});
