import { describe, expect, it } from 'bun:test';

import { createNonce } from '../src/utils/nonce';
import { buildLoginMessage } from '../src/utils/siweMessage';
import { signJwt, verifyJwt } from '../src/utils/jwt';

describe('auth utils', () => {
	it('creates a secure nonce', () => {
		const nonce = createNonce();
		expect(nonce).toBeTypeOf('string');
		expect(nonce.length).toBe(32);
		expect(/^[a-f0-9]+$/.test(nonce)).toBe(true);
	});

	it('builds a login message containing address and nonce', () => {
		process.env.AUTH_DOMAIN = 'example.test';
		process.env.AUTH_URI = 'http://localhost:9999';

		const message = buildLoginMessage({
			walletAddress: '0x000000000000000000000000000000000000dEaD',
			nonce: 'abc123',
		});

		expect(message).toContain('example.test wants you to sign in');
		expect(message).toContain('0x000000000000000000000000000000000000dEaD');
		expect(message).toContain('Nonce: abc123');
		expect(message).toContain('URI: http://localhost:9999');
	});

	it('signs and verifies JWTs', () => {
		process.env.JWT_SECRET = 'test-secret';

		const token = signJwt({ userId: 123 });
		const payload = verifyJwt<{ userId: number }>(token);

		expect(payload.userId).toBe(123);
	});
});
