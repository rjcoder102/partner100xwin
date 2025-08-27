import express from 'express';
import {
    gameHistory,
    getDipositeData,
    getDownlineUsers,
    getSingleUserDetails,
    getUserProfile,
    getwithdrawlData,
    loginUser,
    logoutUser,
    registerUser,
    resendOtp,
    staticalData,
    updateDealyShare,
    updatePassword,
    updateUser,
    verifyOtp
} from '../controller/userController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { updateAllUserLevels } from '../controller/updateLevelController.js';
import { createWithdrawalRequest, getPendingWinthdrowal } from '../controller/userWithdrowalController.js';


const router = express.Router();

router.post('/register', registerUser)
router.post("/login", loginUser);
router.get("/get-user", authMiddleware, getUserProfile);
router.post("/profile-update", authMiddleware, updateUser);
router.post("/password-update", authMiddleware, updatePassword);
router.get("/get-downline-user", authMiddleware, getDownlineUsers);
router.get("/get-downline-deposite", authMiddleware, getDipositeData);
router.get("/get-downline-withdrowal", authMiddleware, getwithdrawlData);
router.put("/update-deley-shere", authMiddleware, updateDealyShare);
router.post("/otp-verify", authMiddleware, verifyOtp);
router.post("/resend-otp", authMiddleware, resendOtp);
router.post("/user-withdrowal", authMiddleware, createWithdrawalRequest);
router.get("/get-bet-history", gameHistory);
router.get("/statical", authMiddleware, staticalData);
router.get("/pendig-withdrowal", authMiddleware, getPendingWinthdrowal);
// router.post("/update-leve", updateAllUserLevels);
router.post("/logout", logoutUser);

router.get("/getsingleuserbyid/:id", getSingleUserDetails)

export default router;