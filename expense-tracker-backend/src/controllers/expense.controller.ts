import type { Request, Response } from 'express';
import {
	createExpenseForUser,
	deleteExpenseById,
	getExpenseByIdForUser,
	getExpensesForUser,
	updateExpenseById,
} from '../services/expense.services';
import {
	parseExpenseCreate,
	parseExpenseListFilters,
	parseExpenseUpdate,
} from '../utils/expenseValidation';

const resolveUserId = (res: Response): number | null => {
	const rawUserId = res.locals?.user?.userId as unknown;
	const userId =
		typeof rawUserId === 'string' ? Number(rawUserId) : rawUserId;
	if (typeof userId !== 'number' || !Number.isInteger(userId)) {
		return null;
	}
	return userId;
};

export const createExpense = async (req: Request, res: Response) => {
	try {
		const userId = resolveUserId(res);
		if (!userId) {
			return res.status(401).json({ error: 'Unauthorized' });
		}
		const payload = parseExpenseCreate(req.body);
		const expense = await createExpenseForUser(userId, payload);
		return res.status(201).json({ expense });
	} catch (error) {
		return res.status(400).json({
			error:
				error instanceof Error
					? error.message
					: 'Failed to create expense',
		});
	}
};

export const getExpenses = async (req: Request, res: Response) => {
	try {
		const userId = resolveUserId(res);
		if (!userId) {
			return res.status(401).json({ error: 'Unauthorized' });
		}
		const filters = parseExpenseListFilters(req.query);
		const expenses = await getExpensesForUser(userId, filters);
		return res.json({ expenses });
	} catch (error) {
		return res.status(400).json({
			error:
				error instanceof Error
					? error.message
					: 'Failed to fetch expenses',
		});
	}
};

export const getExpenseById = async (req: Request, res: Response) => {
	try {
		const userId = resolveUserId(res);
		if (!userId) {
			return res.status(401).json({ error: 'Unauthorized' });
		}
		const expenseId = Number(req.params.id);
		if (!Number.isInteger(expenseId)) {
			return res.status(400).json({ error: 'Invalid expense id' });
		}

		const expense = await getExpenseByIdForUser(userId, expenseId);
		if (!expense) {
			return res.status(404).json({ error: 'Expense not found' });
		}
		return res.json({ expense });
	} catch (error) {
		return res.status(500).json({
			error:
				error instanceof Error
					? error.message
					: 'Failed to fetch expense',
		});
	}
};

export const updateExpense = async (req: Request, res: Response) => {
	try {
		const userId = resolveUserId(res);
		if (!userId) {
			return res.status(401).json({ error: 'Unauthorized' });
		}
		const expenseId = Number(req.params.id);
		if (!Number.isInteger(expenseId)) {
			return res.status(400).json({ error: 'Invalid expense id' });
		}
		const update = parseExpenseUpdate(req.body);
		const expense = await updateExpenseById(userId, expenseId, update);
		if (!expense) {
			return res.status(404).json({ error: 'Expense not found' });
		}
		return res.json({ expense });
	} catch (error) {
		return res.status(400).json({
			error:
				error instanceof Error
					? error.message
					: 'Failed to update expense',
		});
	}
};

export const deleteExpense = async (req: Request, res: Response) => {
	try {
		const userId = resolveUserId(res);
		if (!userId) {
			return res.status(401).json({ error: 'Unauthorized' });
		}
		const expenseId = Number(req.params.id);
		if (!Number.isInteger(expenseId)) {
			return res.status(400).json({ error: 'Invalid expense id' });
		}
		const deleted = await deleteExpenseById(userId, expenseId);
		if (!deleted) {
			return res.status(404).json({ error: 'Expense not found' });
		}
		return res.json({ message: 'Expense deleted' });
	} catch (error) {
		return res.status(500).json({
			error:
				error instanceof Error
					? error.message
					: 'Failed to delete expense',
		});
	}
};
