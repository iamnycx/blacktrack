import express from 'express';
import {
	createExpense,
	deleteExpense,
	getExpenseById,
	getExpenses,
	updateExpense,
} from '../controllers/expense.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = express.Router();

router.post('/', authMiddleware, createExpense);
router.get('/', authMiddleware, getExpenses);
router.get('/:id', authMiddleware, getExpenseById);
router.put('/:id', authMiddleware, updateExpense);
router.delete('/:id', authMiddleware, deleteExpense);

export default router;
