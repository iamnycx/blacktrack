import jwt, { type JwtPayload, type SignOptions } from 'jsonwebtoken';

const getJwtSecret = (): string => {
	const secret = process.env.JWT_SECRET;
	if (!secret) {
		throw new Error('JWT secret is not configured');
	}
	return secret;
};

export const signJwt = (
	payload: Record<string, unknown>,
	options?: SignOptions
): string => {
	return jwt.sign(payload, getJwtSecret(), {
		expiresIn: '1h',
		...options,
	});
};

export const verifyJwt = <T = JwtPayload>(token: string): T => {
	return jwt.verify(token, getJwtSecret()) as T;
};
