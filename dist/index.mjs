import express from "express";
import { PORT } from "./env.mjs";
import rootRoutes from "./routes/index.mjs";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
const app = express();
app.use(express.json());
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true
}));
app.use("/api", rootRoutes);
app.get("/", (req, res) => {
    res.json({ message: "Hello World" });
});
app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
});
