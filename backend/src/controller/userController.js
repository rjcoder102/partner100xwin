
// import User from "../model/userModel.js";
import bcrypt from "bcryptjs";
import { createHash, randomInt } from "crypto";
import jwt from "jsonwebtoken";
import { pool1, pool2 } from "../../config/db.js";
import { log } from "console";
import nodemailer from "nodemailer";


const JWT_SECRET = process.env.JWT_SECRET || "suraj1234";

// ✅ Register User
export const registerUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log("Register request:", email, password);

        // Validate input
        if (!email || !password) {
            return res
                .status(400)
                .json({ message: "Email and password are required" });
        }

        // Check if user exists
        const [existing] = await pool1.query(
            "SELECT * FROM users WHERE email = ?",
            [email]
        );
        if (existing.length > 0) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Hash password (⚠️ bcrypt is better in production)
        const hashedPassword = createHash("md5").update(password).digest("hex");

        // Generate unique 10-digit code
        const code = randomInt(1000000000, 9999999999).toString();

        // Use balance from request or default to 0
        const initialBalance = 0;

        // Insert user with balance
        const [result] = await pool1.query(
            "INSERT INTO users (email, password, code, balance) VALUES (?, ?, ?, ?)",
            [email, hashedPassword, code, initialBalance]
        );

        const userId = result.insertId;

        // Generate JWT
        const token = jwt.sign({ id: userId, email }, process.env.JWT_SECRET, {
            expiresIn: "1h",
        });

        // Store token in cookie
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        });

        return res.status(201).json({
            message: "User registered successfully",
            user: { id: userId, email, balance: initialBalance },
            token, // optional
        });
    } catch (error) {
        console.error("Register error:", error);
        return res.status(500).json({ message: "Server error" });
    }
};

// send otp function
export const resendOtp = async (req, res) => {
    const { email } = req.user;

    try {
        // find user by email
        const [rows] = await pool1.query("SELECT * FROM users WHERE email = ?", [email]);
        if (rows.length === 0) {
            return res.status(400).json({ message: "User not found" });
        }

        const user = rows[0];

        // ✅ Generate new OTP
        const otp = Math.floor(100000 + Math.random() * 900000).toString();

        // ✅ Update OTP in DB
        await pool1.query("UPDATE users SET otp = ? WHERE id = ?", [otp, user.id]);

        // ✅ Setup nodemailer transporter
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        });

        // ✅ Send OTP email
        await transporter.sendMail({
            from: `"Your App" <${process.env.SMTP_USER}>`,
            to: user.email,
            subject: "Your Resent OTP",
            text: `Your new OTP code is: ${otp}`,
            html: `<h3>Your New OTP Code</h3><p><b>${otp}</b></p>`,
        });

        res.json({
            message: "A new OTP has been sent to your email.",
        });

    } catch (error) {
        console.error("Resend OTP error:", error);
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

        // ✅ Generate OTP (6-digit random)
        const otp = Math.floor(100000 + Math.random() * 900000).toString();

        console.log("otpppp", otp);


        // ✅ Save OTP in DB
        await pool1.query("UPDATE users SET otp = ? WHERE id = ?", [otp, user.id]);

        // ✅ Setup nodemailer transporter
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",   // or your mail server
            port: 587,
            secure: false,
            auth: {
                user: process.env.SMTP_USER, // your email
                pass: process.env.SMTP_PASS, // your app password
            },
        });

        // ✅ Send email with OTP
        await transporter.sendMail({
            from: `"Your App" <${process.env.SMTP_USER}>`,
            to: user.email,
            subject: "Your Login OTP",
            text: `Your OTP code is: ${otp}`,
            html: `<h3>Your OTP Code</h3><p><b>${otp}</b></p>`,
        });

        // generate JWT (still create token but wait for OTP verify later)
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
            message: "Login successful. OTP sent to your email.",
            user: { id: user.id, email: user.email },
            token, // optional
        });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: "Server error" });
    }
};

// otp verify

export const verifyOtp = async (req, res) => {
    const { id, email } = req.user;
    const { otp } = req.body;

    try {
        // find user by email
        const [rows] = await pool1.query("SELECT * FROM users WHERE email = ?", [email]);
        if (rows.length === 0) {
            return res.status(400).json({ message: "User not found" });
        }

        const user = rows[0];

        // check otp
        if (user.otp !== otp) {
            return res.status(400).json({ message: "Invalid OTP" });
        }

        // ✅ clear OTP after successful verification
        await pool1.query("UPDATE users SET otp = NULL WHERE id = ?", [user.id]);

        // ✅ generate JWT after successful OTP verification
        const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
            expiresIn: "1h",
        });

        // ✅ set token in cookies
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        });

        res.json({
            message: "OTP verified successfully. Login complete.",
            user: { id: user.id, email: user.email },
            token,
        });

    } catch (error) {
        console.error("OTP verification error:", error);
        res.status(500).json({ message: "Server error" });
    }
};

// ✅ Get User Profile
export const getUserProfile = async (req, res) => {
    const { id, email } = req.user;
    try {
        // fetch user by ID from decoded token (middleware sets req.user.id)
        const [rows] = await pool1.query(
            "SELECT * FROM users WHERE id = ?",
            [id]
        );
        // const [user] = await pool2.query(
        //     "SELECT * FROM 	users WHERE email = ?",
        //     [email]
        // );

        console.log("User profile fetched:");


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

export const getDownlineUsers = async (req, res) => {
    const { id } = req.user;
    const { filter, startDate, endDate } = req.query;

    try {
        const [rows] = await pool1.query(
            "SELECT id, email, code FROM users WHERE id = ?",
            [id]
        );

        if (rows.length === 0) {
            return res.status(404).json({ message: "No user found" });
        }

        let userInfo = rows[0];
        let query = "SELECT * FROM users WHERE refral_code = ?";
        let values = [userInfo.code];

        if (filter === "day") {
            query += " AND DATE(created_at) = CURDATE()";
        } else if (filter === "week") {
            query += " AND YEARWEEK(created_at, 1) = YEARWEEK(CURDATE(), 1)";
        } else if (filter === "month") {
            query += " AND YEAR(created_at) = YEAR(CURDATE()) AND MONTH(created_at) = MONTH(CURDATE())";
        } else if (startDate && endDate) {
            query += " AND DATE(created_at) BETWEEN ? AND ?";
            values.push(startDate, endDate);
        }

        const [downlineRows] = await pool2.query(query, values);

        res.json({ userInfo, downlineRows });
    } catch (error) {
        console.error("Error fetching downline users:", error);
        res.status(500).json({ message: "Server error" });
    }
};

export const getDipositeData = async (req, res) => {
    const { id } = req.user;
    const { filter, startDate, endDate } = req.query;

    try {
        const [userRows] = await pool1.query(
            "SELECT id, email, code FROM users WHERE id = ?",
            [id]
        );

        if (userRows.length === 0) {
            return res.status(404).json({ message: "No user found" });
        }

        let userInfo = userRows[0];
        let baseQuery = "FROM depositrequests WHERE refral_code = ? AND status = 1";
        let values = [userInfo.code];

        if (filter === "day") {
            baseQuery += " AND DATE(updated_at) = CURDATE()";
        } else if (filter === "week") {
            baseQuery += " AND YEARWEEK(updated_at, 1) = YEARWEEK(CURDATE(), 1)";
        } else if (filter === "month") {
            baseQuery += " AND YEAR(updated_at) = YEAR(CURDATE()) AND MONTH(updated_at) = MONTH(CURDATE())";
        } else if (startDate && endDate) {
            baseQuery += " AND DATE(updated_at) BETWEEN ? AND ?";
            values.push(startDate, endDate);
        }

        const [depositRows] = await pool2.query(`SELECT * ${baseQuery}`, values);
        const [totalRows] = await pool2.query(`SELECT SUM(amount) as totalAmount ${baseQuery}`, values);

        res.json({
            userInfo,
            downlineDeposites: depositRows,
            totalAmount: totalRows[0]?.totalAmount || 0
        });
    } catch (error) {
        console.error("Error fetching downline deposits:", error);
        res.status(500).json({ message: "Server error" });
    }
};

export const getwithdrawlData = async (req, res) => {
    const { id } = req.user;
    const { filter, startDate, endDate } = req.query;

    try {
        const [userRows] = await pool1.query(
            "SELECT id, email, code FROM users WHERE id = ?",
            [id]
        );

        if (userRows.length === 0) {
            return res.status(404).json({ message: "No user found" });
        }

        let userInfo = userRows[0];
        let baseQuery = "FROM withdrawrequests WHERE refral_code = ? AND status = 1";
        let values = [userInfo.code];

        if (filter === "day") {
            baseQuery += " AND DATE(updated_at) = CURDATE()";
        } else if (filter === "week") {
            baseQuery += " AND YEARWEEK(updated_at, 1) = YEARWEEK(CURDATE(), 1)";
        } else if (filter === "month") {
            baseQuery += " AND YEAR(updated_at) = YEAR(CURDATE()) AND MONTH(updated_at) = MONTH(CURDATE())";
        } else if (startDate && endDate) {
            baseQuery += " AND DATE(updated_at) BETWEEN ? AND ?";
            values.push(startDate, endDate);
        }

        const [withdrawalRows] = await pool2.query(`SELECT * ${baseQuery}`, values);
        const [totalRows] = await pool2.query(`SELECT SUM(amount) as totalAmount ${baseQuery}`, values);

        res.json({
            userInfo,
            downlineWithdrowal: withdrawalRows,
            totalAmount: totalRows[0]?.totalAmount || 0
        });
    } catch (error) {
        console.error("Error fetching downline withdrawals:", error);
        res.status(500).json({ message: "Server error" });
    }
};


export const updateDealyShare = async (req, res) => {
    const { id } = req.user;

    try {
        const [userRows] = await pool1.query(
            "SELECT * FROM users WHERE id = ?",
            [id]
        );

        if (userRows.length === 0) {
            return res.status(404).json({ message: "No user found" });
        }

        let userInfo = userRows[0];
        let startDate = userInfo.setelment_date;

        // ✅ Single base query with static startDate filter
        let depositeQuery = `
            FROM depositrequests 
            WHERE refral_code = ? 
            AND status = 1 
            AND DATE(updated_at) BETWEEN ? AND CURDATE()
        `;
        let depositeValues = [userInfo.code, startDate];

        // ✅ Get deposits + total in one line each
        const [depositeRows] = await pool2.query(
            `SELECT * ${depositeQuery} ORDER BY updated_at DESC`,
            depositeValues
        );

        console.log("depositeRows", depositeRows);


        const [totalDeposite] = await pool2.query(
            `SELECT SUM(amount) AS totalAmount ${depositeQuery}`,
            depositeValues
        );

        // ✅ Single base query with static startDate filter for withdrowal amount
        let withdrawalQuery = `
            FROM withdrawrequests 
            WHERE refral_code = ? 
            AND status = 1 
            AND DATE(updated_at) BETWEEN ? AND CURDATE()
        `;
        let withdrawalValues = [userInfo.code, startDate];

        // ✅ Get deposits + total in one line each
        const [withdrawalRows] = await pool2.query(
            `SELECT * ${withdrawalQuery} ORDER BY updated_at DESC`,
            withdrawalValues
        );

        const [totalwithdrawal] = await pool2.query(
            `SELECT SUM(amount) AS totalAmount ${withdrawalQuery}`,
            withdrawalValues
        );

        // ✅ Get total balance of all users with same refral_code
        const [currentBalanceRows] = await pool2.query(
            `SELECT SUM(balance) AS totalBalance FROM users WHERE refral_code = ?`,
            [userInfo.code]
        );


        let totalDepositeAmount = totalDeposite[0]?.totalAmount || 0;
        let totalWithdrowalAmount = totalwithdrawal[0]?.totalAmount || 0;
        let totalBalance = Number(currentBalanceRows[0]?.totalBalance) || 0;


        const profit = totalDepositeAmount - totalWithdrowalAmount - totalBalance;


        res.json({
            userInfo,
            totalDepositeAmount,
            totalWithdrowalAmount,
            totalBalance,
            profit

        });
    } catch (error) {
        console.error("Error fetching downline deposits:", error);
        res.status(500).json({ message: "Server error" });
    }
};


// // ✅ Logout User
export const logoutUser = async (req, res) => {
    try {
        // ✅ Clear cookie
        res.clearCookie("token", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
        });

        // (Optional) also clear token from DB if you are storing it
        // const { id } = req.user;
        // await pool1.query("UPDATE users SET token = NULL WHERE id = ?", [id]);

        res.json({ message: "Logout successful" });
    } catch (error) {
        console.error("Logout error:", error);
        res.status(500).json({ message: "Server error" });
    }
};





// register link http://localhost:4200/register?refercode=1234567890



