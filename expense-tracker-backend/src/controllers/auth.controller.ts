import type { Request, Response } from 'express';
import {
	nonceGenerator,
	signatureVerifier,
} from '../services/auth.services.js';

export const requestNonce = async (req: Request, res: Response) => {
	try {
		const { walletAddress } = req.body;
		if (!walletAddress) {
			return res.status(400).json({ error: 'walletAddress is required' });
		}
		const nonce = await nonceGenerator(walletAddress);
		return res.json({ nonce });
	} catch (error) {
		return res.status(400).json({
			error:
				error instanceof Error
					? error.message
					: 'Failed to generate nonce',
		});
	}
};

export const verifySignature = async (req: Request, res: Response) => {
	try {
		const { walletAddress, signature } = req.body;
		if (!walletAddress || !signature) {
			return res
				.status(400)
				.json({ error: 'walletAddress and signature are required' });
		}
		const token = await signatureVerifier(walletAddress, signature);
		return res.json({ token });
	} catch (error) {
		return res.status(401).json({
			error:
				error instanceof Error
					? error.message
					: 'Signature verification failed',
		});
	}
};

export const logoutUser = async (req: Request, res: Response) => {
	res.json({ message: 'Logged out' });
};
