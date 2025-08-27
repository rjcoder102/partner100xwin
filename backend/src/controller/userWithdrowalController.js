import { pool1, pool2 } from "../../config/db.js";




export const createWithdrawalRequest = async (req, res) => {
    const { id, email } = req.user
    const { amount, usdt_address } = req.body;
    console.log("amount, usdt_address", amount, usdt_address);

    try {

        // Validate input
        if (!amount || amount <= 0) {
            return res.status(400).json({ success: false, message: "Invalid amount" });
        }
        if (!usdt_address) {
            return res.status(400).json({ success: false, message: "USDT address is required" });
        }

        // Fetch user info (from users table)
        const [userRows] = await pool1.query(
            "SELECT id, email, balance FROM users WHERE id = ?",
            [id]
        );

        if (userRows.length === 0) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        const userInfo = userRows[0];

        // ✅ Check balance
        if (userInfo.balance < amount) {
            return res.status(400).json({ success: false, message: "Insufficient balance" });
        }

        // ✅ Insert withdrawal request
        await pool1.query(
            `INSERT INTO user_withdrowal (userId, email, amount, usdt_address, status) 
             VALUES (?, ?, ?, ?, ?)`,
            [userInfo.id, userInfo.email, amount, usdt_address, 0] // status 0 = pending
        );

        // ✅ Deduct balance immediately (optional, safer to deduct after admin approval)
        await pool1.query(
            "UPDATE users SET balance = balance - ? WHERE id = ?",
            [amount, userInfo.id]
        );

        res.json({
            success: true,
            message: "Withdrawal request submitted successfully",
            data: {
                userId: userInfo.id,
                email: userInfo.email,
                amount,
                usdt_address,
                status: 0, // pending
            },
        });
    } catch (error) {
        console.error("Error in createWithdrawalRequest:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};


export const getPendingWinthdrowal = async (req, res) => {
    const { id, email } = req.user
    try {

        // Fetch user info (from users table)
        const [userRows] = await pool1.query(
            "SELECT id, email, balance FROM users WHERE id = ?",
            [id]
        );

        if (userRows.length === 0) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        const userInfo = userRows[0];
        // ✅ Insert withdrawal request
        // Get all pending withdrawals for a user
        const [pendingRows] = await pool1.query(
            "SELECT * FROM user_withdrowal WHERE userId = ? AND status = 0",
            [userInfo.id]
        );

        // Get total sum of pending withdrawals
        const [sumResult] = await pool1.query(
            "SELECT COALESCE(SUM(amount), 0) as totalPending FROM user_withdrowal WHERE userId = ? AND status = 0",
            [userInfo.id]
        );



        return res.json({
            success: true,
            message: "Fetched pending withdrawals successfully",
            data: pendingRows,
            totalPending: sumResult[0].totalPending,
            success: true
        });
    } catch (error) {
        console.error("Error in createWithdrawalRequest:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};