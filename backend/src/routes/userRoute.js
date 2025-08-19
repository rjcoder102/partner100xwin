import express from 'express';
import { getUserProfile, loginUser, registerUser } from '../controller/userController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';


const router = express.Router();

router.post('/register', registerUser)
router.post("/login", loginUser);
router.get("/get-user", authMiddleware, getUserProfile);
// router.post("/logout", logoutUser);

export default router;