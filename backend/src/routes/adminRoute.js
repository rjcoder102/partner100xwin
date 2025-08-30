import express from 'express';
import { deleteUserById, getAllUsers, getAllWithdrawals, getUserDetailById, loginAdmin, setelMantsAmount, setelMantsAmountSingleUser, updateWithdrawalStatus } from '../controller/adminController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/admin-login', loginAdmin);
router.get('/get-all-users', authMiddleware, getAllUsers)
router.get('/get-user-by-id/:id', authMiddleware, getUserDetailById)
router.delete('/delete-user-by-id/:id', authMiddleware, deleteUserById)
router.get('/get-all-withdrawals', authMiddleware, getAllWithdrawals)
router.put('/update-withdrawal-status/:id', authMiddleware, updateWithdrawalStatus)
router.post('/user-setelments', setelMantsAmount)
router.post('/sigle-user-setelments/:userId', setelMantsAmountSingleUser)

export default router;