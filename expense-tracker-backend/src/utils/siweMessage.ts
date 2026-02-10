type LoginMessageOptions = {
	walletAddress: string;
	nonce: string;
	domain?: string;
	uri?: string;
	statement?: string;
	issuedAt?: Date;
};

export const buildLoginMessage = ({
	walletAddress,
	nonce,
	domain = process.env.AUTH_DOMAIN ?? 'Web3 Expense Tracker',
	uri = process.env.AUTH_URI ?? 'http://localhost:8000',
	statement = 'Sign in to the Web3 Expense Tracker.',
	issuedAt = new Date(),
}: LoginMessageOptions): string => {
	return `${domain} wants you to sign in with your Ethereum account:\n${walletAddress}\n\n${statement}\n\nURI: ${uri}\nNonce: ${nonce}\nIssued At: ${issuedAt.toISOString()}`;
};
