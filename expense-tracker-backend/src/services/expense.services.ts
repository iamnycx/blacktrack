import { and, desc, eq, gte, lte } from 'drizzle-orm';
import { db } from '../db';
import { categoriesEnum, expenses } from '../db/schema';

export type ExpenseRecord = {
	id: number;
	userId: number;
	amount: string;
	category: (typeof categoriesEnum.enumValues)[number];
	note: string | null;
	date: Date;
	created_at: Date;
	updated_at: Date;
};

export type ExpenseListFilters = {
	category?: (typeof categoriesEnum.enumValues)[number];
	from?: Date;
	to?: Date;
	limit?: number;
	offset?: number;
};

export const createExpenseForUser = async (
	userId: number,
	data: {
		amount: string;
		category: (typeof categoriesEnum.enumValues)[number];
		note?: string | null;
		date: Date;
	}
): Promise<ExpenseRecord> => {
	const result = await db
		.insert(expenses)
		.values({
			userId,
			amount: data.amount,
			category: data.category,
			note: data.note ?? null,
			date: data.date,
		})
		.returning();

	return result[0] as ExpenseRecord;
};

export const getExpensesForUser = async (
	userId: number,
	filters: ExpenseListFilters
): Promise<ExpenseRecord[]> => {
	const conditions = [eq(expenses.userId, userId)];

	if (filters.category) {
		conditions.push(eq(expenses.category, filters.category));
	}
	if (filters.from) {
		conditions.push(gte(expenses.date, filters.from));
	}
	if (filters.to) {
		conditions.push(lte(expenses.date, filters.to));
	}

	let query = db
		.select()
		.from(expenses)
		.where(and(...conditions))
		.orderBy(desc(expenses.date))
		.$dynamic();

	if (typeof filters.limit === 'number') {
		query = query.limit(filters.limit);
	}
	if (typeof filters.offset === 'number') {
		query = query.offset(filters.offset);
	}

	const result = await query;
	return result as ExpenseRecord[];
};

export const getExpenseByIdForUser = async (
	userId: number,
	expenseId: number
): Promise<ExpenseRecord | null> => {
	const result = await db
		.select()
		.from(expenses)
		.where(and(eq(expenses.id, expenseId), eq(expenses.userId, userId)))
		.limit(1);

	if (result.length === 0) {
		return null;
	}

	return result[0] as ExpenseRecord;
};

export const updateExpenseById = async (
	userId: number,
	expenseId: number,
	update: {
		amount?: string;
		category?: (typeof categoriesEnum.enumValues)[number];
		note?: string | null;
		date?: Date;
	}
): Promise<ExpenseRecord | null> => {
	const existing = await getExpenseByIdForUser(userId, expenseId);
	if (!existing) {
		return null;
	}

	await db
		.update(expenses)
		.set({
			amount: update.amount ?? existing.amount,
			category: update.category ?? existing.category,
			note:
				update.note === undefined ? existing.note : update.note ?? null,
			date: update.date ?? existing.date,
		})
		.where(and(eq(expenses.id, expenseId), eq(expenses.userId, userId)));

	return getExpenseByIdForUser(userId, expenseId);
};

export const deleteExpenseById = async (
	userId: number,
	expenseId: number
): Promise<boolean> => {
	const existing = await getExpenseByIdForUser(userId, expenseId);
	if (!existing) {
		return false;
	}

	await db
		.delete(expenses)
		.where(and(eq(expenses.id, expenseId), eq(expenses.userId, userId)));
	return true;
};
