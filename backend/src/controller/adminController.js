import { pool1, pool2 } from "../../config/db.js";
import jwt from "jsonwebtoken";
import { createHash, randomInt } from "crypto";
import { log } from "console";

export const loginAdmin = async (req, res) => {
    const { email, password } = req.body;
    console.log(email, password);
    try {
        const [rows] = await pool1.query('SELECT * FROM users WHERE email = ?', [email]);
        console.log(rows)
        if (rows.length === 0) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const user = rows[0];
        const hashedPassword = createHash("md5").update(password).digest("hex");

        // check password
        if (hashedPassword !== user.password) {
            return res.status(400).json({ message: "Wrong Password" });
        }

        if (user.role !== 'admin') {
            return res.status(403).json({ message: 'Access denied' });
        }

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
            message: "Login successful.",
            user,
            token,
            success: true,
        });

    } catch (error) {
        console.error('Error during admin login:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

export const getAllUsers = async (req, res) => {
    try {
        const [rows] = await pool1.query('SELECT * FROM users');
        res.status(200).json({ message: 'Users retrieved successfully', data: rows });
    }
    catch (error) {
        console.error('Error retrieving users:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

export const updateUserStatus = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    try {
        const [result] = await pool1.query('UPDATE users SET status = ? WHERE id = ?', [status, id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User status updated successfully', success: true });
    } catch (error) {
        console.error('Error updating user status:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

export const getAllWithdrawals = async (req, res) => {
    try {
        const [rows] = await pool1.query('SELECT * FROM user_withdrowal');
        res.status(200).json({ message: 'Withdrawals retrieved successfully', data: rows });
    } catch (error) {
        console.error('Error retrieving withdrawals:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

export const updateWithdrawalStatus = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    try {
        const [result] = await pool1.query('UPDATE user_withdrowal SET status = ? WHERE id = ?', [status, id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Withdrawal not found' });
        }
        res.status(200).json({ message: 'Withdrawal status updated successfully', success: true });
    } catch (error) {
        console.error('Error updating withdrawal status:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}


export const getUserDetailById = async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await pool1.query('SELECT * FROM users WHERE code = ?', [id]);
        if (rows.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User retrieved successfully', data: rows[0] });
    } catch (error) {
        console.error('Error retrieving user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

export const deleteUserById = async (req, res) => {
    const { id } = req.params;
    try {
        const [result] = await pool1.query('DELETE FROM users WHERE id = ?', [id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User deleted successfully', success: true });
    }
    catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

export const getDownUsers = async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await pool2.query('SELECT * FROM users WHERE refral_code = ?', [id]);
        res.status(200).json({ message: 'Downline users retrieved successfully', data: rows });
    } catch (error) {
        console.error('Error retrieving downline users:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

// Settlement function
export const setelMantsAmount = async (req, res) => {
    try {
        // ✅ Step 1: Get all users
        const [users] = await pool1.query("SELECT * FROM users");

        if (users.length === 0) {
            return res.status(404).json({ success: false, message: "No users found" });
        }

        // ✅ Step 2: Insert into settlement table & update users
        const now = new Date();
        let settledCount = 0;

        for (const user of users) {
            // Only process users with shere_wallet > 0
            if (user.shere_wallet > 0) {
                // Insert into settlement table
                await pool1.query(
                    `INSERT INTO setelment (userId, email, oldAmount, newAmount, setelment_date) 
                     VALUES (?, ?, ?, ?, ?)`,
                    [
                        user.id,
                        user.email,
                        user.balance,
                        user.balance + user.shere_wallet,
                        now
                    ]
                );

                // Update user balance and reset shere_wallet
                await pool1.query(
                    `UPDATE users SET balance = balance + ?, shere_wallet = 0, setelment_date = ? WHERE id = ?`,
                    [user.shere_wallet, now, user.id]
                );

                settledCount++;
            }
        }

        res.json({
            success: true,
            message: "Settlement completed",
            totalUsers: users.length,
            settledUsers: settledCount,
            skippedUsers: users.length - settledCount
        });

    } catch (error) {
        console.error("Settlement Error:", error);
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};


export const setelMantsAmountSingleUser = async (req, res) => {
    try {
        const { userId } = req.params; // ✅ get userId from params

        // ✅ Step 1: Get single user
        const [users] = await pool1.query("SELECT * FROM users WHERE id = ?", [userId]);

        if (users.length === 0) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        const user = users[0];

        // ✅ Step 2: Check shere_wallet
        if (user.shere_wallet <= 0) {
            return res.status(400).json({
                success: false,
                message: "No settlement required. shere_wallet is 0.",
                userId: user.id,
                email: user.email
            });
        }

        // ✅ Step 3: Insert into settlement table
        const now = new Date();
        await pool1.query(
            `INSERT INTO setelment (userId, email, oldAmount, newAmount, setelment_date) 
             VALUES (?, ?, ?, ?, ?)`,
            [
                user.id,
                user.email,
                user.balance,
                user.balance + user.shere_wallet,
                now
            ]
        );

        // ✅ Step 4: Update user balance and reset shere_wallet
        await pool1.query(
            `UPDATE users SET balance = balance + ?, shere_wallet = 0, setelment_date = ? WHERE id = ?`,
            [user.shere_wallet, now, user.id]
        );

        // ✅ Response
        res.json({
            success: true,
            message: "Settlement completed for user",
            userId: user.id,
            email: user.email,
            settledAmount: user.shere_wallet,
            newBalance: user.balance + user.shere_wallet
        });

    } catch (error) {
        console.error("Settlement Error:", error);
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};


