import type { Request, Response } from 'express';
import {
	deleteUserAccountById,
	getUserProfileById,
	updateUserProfileById,
} from '../services/user.services.js';
import { validateProfileUpdate } from '../utils/userProfile.js';

const resolveUserId = (res: Response): number | null => {
	const rawUserId = res.locals?.user?.userId as unknown;
	const userId =
		typeof rawUserId === 'string' ? Number(rawUserId) : rawUserId;
	if (typeof userId !== 'number' || !Number.isInteger(userId)) {
		return null;
	}
	return userId;
};

export const getUserProfile = async (req: Request, res: Response) => {
	try {
		const userId = resolveUserId(res);
		if (!userId) {
			return res.status(401).json({ error: 'Unauthorized' });
		}

		const profile = await getUserProfileById(userId);
		if (!profile) {
			return res.status(404).json({ error: 'User not found' });
		}

		return res.json({ profile });
	} catch (error) {
		return res.status(500).json({
			error:
				error instanceof Error
					? error.message
					: 'Failed to load profile',
		});
	}
};

export const updateUserProfile = async (req: Request, res: Response) => {
	try {
		const userId = resolveUserId(res);
		if (!userId) {
			return res.status(401).json({ error: 'Unauthorized' });
		}

		const update = validateProfileUpdate(req.body);
		const profile = await updateUserProfileById(userId, update);
		if (!profile) {
			return res.status(404).json({ error: 'User not found' });
		}

		return res.json({ profile });
	} catch (error) {
		return res.status(400).json({
			error:
				error instanceof Error
					? error.message
					: 'Failed to update profile',
		});
	}
};

export const deleteUserAccount = async (req: Request, res: Response) => {
	try {
		const userId = resolveUserId(res);
		if (!userId) {
			return res.status(401).json({ error: 'Unauthorized' });
		}

		const deleted = await deleteUserAccountById(userId);
		if (!deleted) {
			return res.status(404).json({ error: 'User not found' });
		}

		return res.json({ message: 'Account deleted' });
	} catch (error) {
		return res.status(500).json({
			error:
				error instanceof Error
					? error.message
					: 'Failed to delete account',
		});
	}
};
