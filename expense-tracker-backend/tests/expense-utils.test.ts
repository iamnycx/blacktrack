import { describe, expect, it } from 'bun:test';

import {
	parseExpenseCreate,
	parseExpenseListFilters,
	parseExpenseUpdate,
} from '../src/utils/expenseValidation';

describe('expense validation', () => {
	it('parses create payload', () => {
		const payload = parseExpenseCreate({
			amount: '42.5',
			category: 'Food',
			date: '2025-01-01',
			note: 'Lunch',
		});

		expect(payload.amount).toBe('42.50');
		expect(payload.category).toBe('Food');
		expect(payload.note).toBe('Lunch');
		expect(payload.date).toBeInstanceOf(Date);
	});

	it('parses list filters', () => {
		const filters = parseExpenseListFilters({
			category: 'Bills',
			limit: '50',
			offset: '10',
		});

		expect(filters.category).toBe('Bills');
		expect(filters.limit).toBe(50);
		expect(filters.offset).toBe(10);
	});

	it('rejects empty update', () => {
		expect(() => parseExpenseUpdate({})).toThrow(
			'At least one field is required'
		);
	});
});
