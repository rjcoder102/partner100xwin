import bcrypt from "bcryptjs";
import { createHash, randomInt } from "crypto";
import jwt from "jsonwebtoken";
import { pool1, pool2 } from "../../config/db.js";
import { log } from "console";


// ✅ New cron-safe version (no authMiddleware needed)
export const updateAllUserLevels = async () => {
    try {
        // Get all users
        const [users] = await pool1.query(
            "SELECT id, email, code, leve FROM users"
        );

        let updatedUsers = [];

        for (const user of users) {
            const [downlines] = await pool2.query(
                "SELECT COUNT(*) as total FROM users WHERE refral_code = ?",
                [user.code]
            );

            const count = downlines[0].total;
            let newLevel = 0;

            if (count > 300) newLevel = 3;
            else if (count > 200) newLevel = 2;
            else if (count > 100) newLevel = 1;

            if (newLevel !== user.leve) {
                await pool1.query("UPDATE users SET leve = ? WHERE id = ?", [
                    newLevel,
                    user.id,
                ]);

                console.log(`✅ Updated user ${user.email} → level ${newLevel}`);

                updatedUsers.push({
                    id: user.id,
                    email: user.email,
                    oldLevel: user.leve,
                    newLevel: newLevel,
                });
            }
        }

        console.log("🎉 All user levels updated successfully");

        return {
            message: "Levels updated successfully",
            success: true,
            updatedUsers,
        };
    } catch (error) {
        console.error("Error in updateAllUserLevels:", error);
        return { message: "Error updating levels", success: false, error };
    }
};

