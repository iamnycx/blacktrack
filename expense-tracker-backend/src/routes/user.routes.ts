import express from 'express';
import {
	deleteUserAccount,
	getUserProfile,
	updateUserProfile,
} from '../controllers/user.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = express.Router();

router.get('/profile', authMiddleware, getUserProfile);
router.put('/profile', authMiddleware, updateUserProfile);
router.delete('/account', authMiddleware, deleteUserAccount);

export default router;
