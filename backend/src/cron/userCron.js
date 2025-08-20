import cron from "node-cron";
import { updateAllUserLevels } from "../controller/updateLevelController.js";

// Run at 23:59 on last day of month
cron.schedule("59 23 28-31 * *", async () => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    // check if today is last day of month
    if (tomorrow.getDate() === 1) {
        console.log("⏳ Running monthly level update...");
        await updateAllUserLevels();
    }
});
