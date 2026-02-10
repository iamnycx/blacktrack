import { randomBytes } from 'crypto';

export const createNonce = (bytes = 16): string => {
	return randomBytes(bytes).toString('hex');
};
