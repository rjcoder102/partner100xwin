import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./src/routes/userRoute.js";
import cookieParser from "cookie-parser";
dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true,               
    })
);
app.use(cookieParser())

// Routes
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`⚡ Server running on port ${PORT}`));
