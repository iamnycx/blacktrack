import { describe, expect, it } from 'bun:test';

import { validateProfileUpdate } from '../src/utils/userProfile';

describe('user profile validation', () => {
	it('accepts a valid name', () => {
		const payload = validateProfileUpdate({ name: 'Ada Lovelace' });
		expect(payload.name).toBe('Ada Lovelace');
	});

	it('rejects missing name', () => {
		expect(() => validateProfileUpdate({})).toThrow('name is required');
	});

	it('rejects empty name', () => {
		expect(() => validateProfileUpdate({ name: '   ' })).toThrow(
			'name cannot be empty'
		);
	});

	it('trims whitespace', () => {
		const payload = validateProfileUpdate({ name: '  Ada  ' });
		expect(payload.name).toBe('Ada');
	});
});
