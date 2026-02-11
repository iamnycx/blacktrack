import { api } from './api';
import { connectWallet, signMessage } from './web3';

export const loginWithMetaMask = async () => {
	const address = await connectWallet();

	const { nonce } = await api('/api/auth/nonce', {
		method: 'POST',
		body: JSON.stringify({ walletAddress: address }),
	});

	const signature = await signMessage(nonce);

	const { token } = await api('/api/auth/verify', {
		method: 'POST',
		body: JSON.stringify({ walletAddress: address, signature }),
	});

	localStorage.setItem('token', token);
	localStorage.setItem('walletAddress', address);

	return true;
};

export const logout = () => {
	localStorage.removeItem('token');
	localStorage.removeItem('walletAddress');
};
