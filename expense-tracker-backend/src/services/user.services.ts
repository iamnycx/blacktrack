import { eq } from 'drizzle-orm';
import { db } from '../db/index.js';
import { expenses, users } from '../db/schema.js';

export type UserProfile = {
	id: number;
	name: string;
	walletAddress: string;
	createdAt: Date;
	updatedAt: Date;
};

type UserRow = {
	id: number;
	name: string;
	walletAddress: string;
	created_at: Date;
	updated_at: Date;
};

const toUserProfile = (user: UserRow): UserProfile => ({
	id: user.id,
	name: user.name,
	walletAddress: user.walletAddress,
	createdAt: user.created_at,
	updatedAt: user.updated_at,
});

export const getUserProfileById = async (
	userId: number
): Promise<UserProfile | null> => {
	const result = await db
		.select()
		.from(users)
		.where(eq(users.id, userId))
		.limit(1);

	if (result.length === 0) {
		return null;
	}

	return toUserProfile(result[0] as UserRow);
};

export const updateUserProfileById = async (
	userId: number,
	update: { name: string }
): Promise<UserProfile | null> => {
	const existing = await db
		.select()
		.from(users)
		.where(eq(users.id, userId))
		.limit(1);

	if (existing.length === 0) {
		return null;
	}

	await db
		.update(users)
		.set({ name: update.name })
		.where(eq(users.id, userId));

	const refreshed = await db
		.select()
		.from(users)
		.where(eq(users.id, userId))
		.limit(1);

	if (refreshed.length === 0) {
		return null;
	}

	return toUserProfile(refreshed[0] as UserRow);
};

export const deleteUserAccountById = async (
	userId: number
): Promise<boolean> => {
	const existing = await db
		.select({ id: users.id })
		.from(users)
		.where(eq(users.id, userId))
		.limit(1);

	if (existing.length === 0) {
		return false;
	}

	await db.delete(expenses).where(eq(expenses.userId, userId));
	await db.delete(users).where(eq(users.id, userId));

	return true;
};
