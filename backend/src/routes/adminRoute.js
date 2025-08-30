import express from 'express';
import { deleteUserById, getAllUsers, getAllWithdrawals, getUserDetailById, setelMantsAmount, updateWithdrawalStatus } from '../controller/adminController.js';

const router = express.Router();

router.get('/get-all-users', getAllUsers)
router.get('/get-user-by-id/:id', getUserDetailById)
router.delete('/delete-user-by-id/:id', deleteUserById)
router.get('/get-all-withdrawals', getAllWithdrawals)
router.put('/update-withdrawal-status/:id', updateWithdrawalStatus)
router.put('/user-setelments', setelMantsAmount)

export default router;