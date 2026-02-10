import { categoriesEnum } from '../db/schema';

const categories = new Set<string>(categoriesEnum.enumValues);

const parseAmount = (value: unknown): string => {
	if (typeof value === 'number' && Number.isFinite(value)) {
		return value.toFixed(2);
	}
	if (typeof value === 'string') {
		const normalized = value.trim();
		if (!normalized) {
			throw new Error('amount is required');
		}
		const parsed = Number(normalized);
		if (!Number.isFinite(parsed)) {
			throw new Error('amount must be a number');
		}
		return parsed.toFixed(2);
	}
	throw new Error('amount is required');
};

const parseCategory = (
	value: unknown
): (typeof categoriesEnum.enumValues)[number] => {
	if (typeof value !== 'string' || !categories.has(value)) {
		throw new Error('category is invalid');
	}
	return value as (typeof categoriesEnum.enumValues)[number];
};

const parseDate = (value: unknown): Date => {
	const date = value instanceof Date ? value : new Date(String(value));
	if (Number.isNaN(date.getTime())) {
		throw new Error('date is invalid');
	}
	return date;
};

const parseNote = (value: unknown): string | null => {
	if (value === undefined || value === null) {
		return null;
	}
	if (typeof value !== 'string') {
		throw new Error('note must be a string');
	}
	const trimmed = value.trim();
	if (trimmed.length > 255) {
		throw new Error('note is too long');
	}
	return trimmed || null;
};

export const parseExpenseCreate = (input: Record<string, unknown>) => {
	if (!input || typeof input !== 'object') {
		throw new Error('Invalid expense payload');
	}
	return {
		amount: parseAmount(input.amount),
		category: parseCategory(input.category),
		note: parseNote(input.note),
		date: parseDate(input.date),
	};
};

export const parseExpenseUpdate = (input: Record<string, unknown>) => {
	if (!input || typeof input !== 'object') {
		throw new Error('Invalid expense payload');
	}
	const update: {
		amount?: string;
		category?: (typeof categoriesEnum.enumValues)[number];
		note?: string | null;
		date?: Date;
	} = {};

	if ('amount' in input) {
		update.amount = parseAmount(input.amount);
	}
	if ('category' in input) {
		update.category = parseCategory(input.category);
	}
	if ('note' in input) {
		update.note = parseNote(input.note);
	}
	if ('date' in input) {
		update.date = parseDate(input.date);
	}

	if (Object.keys(update).length === 0) {
		throw new Error('At least one field is required');
	}

	return update;
};

export const parseExpenseListFilters = (input: Record<string, unknown>) => {
	const filters: {
		category?: (typeof categoriesEnum.enumValues)[number];
		from?: Date;
		to?: Date;
		limit?: number;
		offset?: number;
	} = {};

	if (input.category) {
		filters.category = parseCategory(input.category);
	}
	if (input.from) {
		filters.from = parseDate(input.from);
	}
	if (input.to) {
		filters.to = parseDate(input.to);
	}
	if (input.limit !== undefined) {
		const limit = Number(input.limit);
		if (!Number.isInteger(limit) || limit <= 0 || limit > 200) {
			throw new Error('limit must be between 1 and 200');
		}
		filters.limit = limit;
	}
	if (input.offset !== undefined) {
		const offset = Number(input.offset);
		if (!Number.isInteger(offset) || offset < 0) {
			throw new Error('offset must be 0 or greater');
		}
		filters.offset = offset;
	}

	return filters;
};
