import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./src/routes/userRoute.js";
import adminRoutes from "./src/routes/adminRoute.js";
import cookieParser from "cookie-parser";
dotenv.config();

const app = express();

app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true,
        methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
        allowedHeaders: ["Content-Type", "Authorization"],
    })
);

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.set("trust proxy", true);
// app.use(morgan("dev"));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api", adminRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`⚡ Server running on port ${PORT}`));
