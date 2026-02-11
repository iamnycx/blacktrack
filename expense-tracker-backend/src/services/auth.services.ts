import { ethers } from 'ethers';
import { eq } from 'drizzle-orm';
import { db } from '../db/index.js';
import { users } from '../db/schema.js';
import { signJwt } from '../utils/jwt.js';
import { createNonce } from '../utils/nonce.js';
import { buildLoginMessage } from '../utils/siweMessage.js';

const normalizeAddress = (walletAddress: string): string => {
	if (!walletAddress) {
		throw new Error('Wallet address is required');
	}
	return ethers.getAddress(walletAddress).toLowerCase();
};

export const nonceGenerator = async (
	walletAddress: string
): Promise<string> => {
	const address = normalizeAddress(walletAddress);
	const nonce = createNonce();
	const message = buildLoginMessage({ walletAddress: address, nonce });

	const existingUser = await db
		.select()
		.from(users)
		.where(eq(users.walletAddress, address))
		.limit(1);

	if (existingUser.length === 0) {
		await db.insert(users).values({
			walletAddress: address,
			name: address,
			nonce: message,
		});
	} else {
		await db
			.update(users)
			.set({ nonce: message })
			.where(eq(users.walletAddress, address));
	}

	return message;
};

export const signatureVerifier = async (
	walletAddress: string,
	signature: string
): Promise<string> => {
	const address = normalizeAddress(walletAddress);
	if (!signature) {
		throw new Error('Signature is required');
	}

	const user = await db
		.select()
		.from(users)
		.where(eq(users.walletAddress, address))
		.limit(1);

	const foundUser = user[0];
	if (!foundUser) {
		throw new Error('User not found');
	}

	const nonceMessage = foundUser.nonce;
	if (!nonceMessage) {
		throw new Error('Nonce not found');
	}

	const recoveredAddress = ethers.verifyMessage(nonceMessage, signature);

	if (recoveredAddress.toLowerCase() !== address) {
		throw new Error('Invalid signature');
	}

	const newNonce = createNonce();
	const newMessage = buildLoginMessage({
		walletAddress: address,
		nonce: newNonce,
	});

	await db
		.update(users)
		.set({ nonce: newMessage })
		.where(eq(users.walletAddress, address));

	const token = signJwt(
		{
			userId: foundUser.id,
			walletAddress: address,
		},
		{ expiresIn: '1h' }
	);

	return token;
};
