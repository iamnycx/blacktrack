import { ethers } from 'ethers';

export const getProvider = () => {
	if (!(window as any).ethereum) {
		throw new Error('MetaMask not installed');
	}
	return new ethers.BrowserProvider((window as any).ethereum);
};

export const connectWallet = async (): Promise<string> => {
	const provider = getProvider();
	const accounts = await provider.send('eth_requestAccounts', []);
	return accounts[0];
};

export const signMessage = async (message: string): Promise<string> => {
	const provider = getProvider();
	const signer = await provider.getSigner();
	return signer.signMessage(message);
};
