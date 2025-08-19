import express from 'express';
import { getDownlineUsers, getUserProfile, loginUser, registerUser } from '../controller/userController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';


const router = express.Router();

router.post('/register', registerUser)
router.post("/login", loginUser);
router.get("/get-user", authMiddleware, getUserProfile);
router.get("/get-downline-user", authMiddleware, getDownlineUsers);
// router.post("/logout", logoutUser);

export default router;