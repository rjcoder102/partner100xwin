


// import User from "../model/userModel.js";
import bcrypt from "bcryptjs";
import { createHash, randomInt } from "crypto";
import jwt from "jsonwebtoken";
import { pool1, pool2 } from "../../config/db.js";

const JWT_SECRET = process.env.JWT_SECRET || "suraj1234";

// ✅ Register User
export const registerUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        // check if user exists
        const [existing] = await pool1.query("SELECT * FROM users WHERE email = ?", [email]);
        if (existing.length > 0) {
            return res.status(400).json({ message: "User already exists" });
        }

        // hash password with MD5
        const hashedPassword = createHash("md5").update(password).digest("hex");

        // generate unique 10-digit code
        const code = randomInt(1000000000, 9999999999).toString();


        // insert user
        const [result] = await pool1.query(
            "INSERT INTO users (email, password, code) VALUES (?, ?, ?)",
            [email, hashedPassword, code]
        );

        const userId = result.insertId;

        // generate JWT
        const token = jwt.sign({ id: userId, email }, process.env.JWT_SECRET, {
            expiresIn: "1h",
        });

        // store token in cookie
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        res.status(201).json({
            message: "User registered successfully",
            user: { id: userId, email },
            token, // optional
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

// ✅ Login User
export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        // find user by email
        const [rows] = await pool1.query("SELECT * FROM users WHERE email = ?", [email]);
        if (rows.length === 0) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const user = rows[0];

        // hash the provided password using MD5
        const hashedPassword = createHash("md5").update(password).digest("hex");

        // check password
        if (hashedPassword !== user.password) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // generate JWT
        const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
            expiresIn: "1h",
        });

        // set token in cookies
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        });

        res.json({
            message: "Login successful",
            user: { id: user.id, email: user.email },
            token, // optional
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

// ✅ Get User Profile
export const getUserProfile = async (req, res) => {
    const { id, email } = req.user; // user ID from auth middleware
    try {
        // fetch user by ID from decoded token (middleware sets req.user.id)
        const [rows] = await pool1.query(
            "SELECT id, email FROM users WHERE id = ?",
            [id]
        );
        // const [user] = await pool2.query(
        //     "SELECT * FROM 	users WHERE email = ?",
        //     [email]
        // );

        // console.log("User profile fetched:", user[0]);


        if (rows.length === 0) {
            return res.status(404).json({ message: "User not found" });
        }

        // ✅ user found
        res.json(rows[0]);
    } catch (error) {
        console.error("Error fetching user profile:", error);
        res.status(500).json({ message: "Server error" });
    }
};

// // ✅ Logout User
// export const logoutUser = (req, res) => {
//     res.clearCookie("token");
//     res.json({ message: "Logged out successfully" });
// };
