import express from 'express';
import { getDipositeData, getDownlineUsers, getUserProfile, getwithdrawlData, loginUser, registerUser, updateDealyShare } from '../controller/userController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';


const router = express.Router();

router.post('/register', registerUser)
router.post("/login", loginUser);
router.get("/get-user", authMiddleware, getUserProfile);
router.get("/get-downline-user", authMiddleware, getDownlineUsers);
router.get("/get-downline-deposite", authMiddleware, getDipositeData);
router.get("/get-downline-withdrowal", authMiddleware, getwithdrawlData);
router.put("/update-deley-shere", authMiddleware, updateDealyShare);
router.post("/logout", logoutUser);

export default router;