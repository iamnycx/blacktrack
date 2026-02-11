import type { NextFunction, Request, Response } from 'express';
import { verifyJwt } from '../utils/jwt.js';

export const authMiddleware = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const authHeader = req.headers['authorization'];
	const token = authHeader?.startsWith('Bearer ')
		? authHeader.slice('Bearer '.length)
		: undefined;

	if (!token) {
		return res.status(401).json({ error: 'Unauthorized' });
	}

	try {
		res.locals.user = verifyJwt(token);
		next();
	} catch (error) {
		res.status(401).json({ error: 'Invalid token' });
	}
};
