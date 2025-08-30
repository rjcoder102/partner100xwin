import { pool1, pool2 } from "../../config/db.js";


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
        const [result] = await pool2.query('UPDATE users SET status = ? WHERE id = ?', [status, id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User status updated successfully' });
    } catch (error) {
        console.error('Error updating user status:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

export const getAllWithdrawals = async (req, res) => {
    try {
        const [rows] = await pool1.query('SELECT * FROM user_withdrowals');
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
        const [result] = await pool2.query('UPDATE user_withdrowals SET status = ? WHERE id = ?', [status, id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Withdrawal not found' });
        }
        res.status(200).json({ message: 'Withdrawal status updated successfully' });
    } catch (error) {
        console.error('Error updating withdrawal status:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}


export const getUserDetailById = async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await pool1.query('SELECT * FROM users WHERE id = ?', [id]);
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
        res.status(200).json({ message: 'User deleted successfully' });
    }
    catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

export const getDownUsers = async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await pool1.query('SELECT * FROM users WHERE referrer_id = ?', [id]);
        res.status(200).json({ message: 'Downline users retrieved successfully', data: rows });
    } catch (error) {
        console.error('Error retrieving downline users:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

// Settlement function
export const setelMantsAmount = async (req, res) => {
    // const connection = await pool.getConnection();
    try {
        // ✅ Step 1: Get all users
        const [users] = await pool1.query("SELECT * FROM users");

        if (users.length === 0) {
            return res.status(404).json({ success: false, message: "No users found" });
        }

        // ✅ Step 2: Insert into settlement table
        const now = new Date();
        for (const user of users) {
            await connection.query(
                `INSERT INTO setelment (userId, email, oldAmount, newAmount, setelment_date) 
                 VALUES (?, ?, ?, ?, ?)`,
                [
                    user.id,
                    user.email,
                    user.balance,
                    0, // ✅ reset newAmount to 0
                    now
                ]
            );

            // ✅ Step 3 (optional): Reset user balance
            await connection.query(
                `UPDATE users SET balance = ? WHERE id = ?`,
                [0, user.id]
            );
        }

        res.json({
            success: true,
            message: "Settlement completed for all users",
            totalUsers: users.length
        });

    } catch (error) {
        console.error("Settlement Error:", error);
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    } finally {
        connection.release();
    }
};
