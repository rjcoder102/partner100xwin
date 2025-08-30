import express from 'express';
import { deleteUserById, getAllUsers, getAllWithdrawals, getUserDetailById, loginAdmin, updateUserStatus, updateWithdrawalStatus } from '../controller/adminController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/admin-login', loginAdmin);
router.get('/get-all-users',authMiddleware, getAllUsers)
router.put('/update-user-status/:id',authMiddleware, updateUserStatus)
router.get('/get-user-by-id/:id',authMiddleware, getUserDetailById)
router.delete('/delete-user-by-id/:id',authMiddleware, deleteUserById)
router.get('/get-all-withdrawals',authMiddleware, getAllWithdrawals)
router.put('/update-withdrawal-status/:id',authMiddleware, updateWithdrawalStatus)

export default router;