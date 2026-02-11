'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '../ui/button';

const shortenAddress = (value: string) => {
	if (value.length <= 10) return value;
	return `${value.slice(0, 6)}...${value.slice(-4)}`;
};

const resolveNetworkName = (chainId: string | null) => {
	const map: Record<string, string> = {
		'0x1': 'Ethereum',
		'0x5': 'Goerli',
		'0xaa36a7': 'Sepolia',
		'0x89': 'Polygon',
		'0x13881': 'Mumbai',
		'0xa': 'Optimism',
		'0xa4b1': 'Arbitrum',
		'0x38': 'BNB Chain',
		'0x2105': 'Base',
	};
	if (!chainId) return 'Unknown';
	return map[chainId] ?? chainId;
};

export default function DashboardHeader() {
	const router = useRouter();
	const [walletAddress, setWalletAddress] = useState<string>('');
	const [networkName, setNetworkName] = useState<string>('');

	useEffect(() => {
		const stored = localStorage.getItem('walletAddress') ?? '';
		setWalletAddress(stored);

		const loadNetwork = async () => {
			try {
				const ethereum = (window as any)?.ethereum;
				if (!ethereum?.request) return;
				const chainId = (await ethereum.request({
					method: 'eth_chainId',
				})) as string;
				setNetworkName(resolveNetworkName(chainId));
			} catch {
				setNetworkName('');
			}
		};

		loadNetwork();
	}, []);

	const displayAddress = useMemo(() => {
		if (!walletAddress) return 'Not connected';
		return shortenAddress(walletAddress);
	}, [walletAddress]);

	const handleLogout = () => {
		localStorage.removeItem('token');
		localStorage.removeItem('walletAddress');
		router.push('/');
	};

	return (
		<div className='sticky inset-x-0 p-4 top-0 z-10 flex flex-wrap gap-4 items-center justify-between border-b border-dotted border-muted bg-background/80 backdrop-blur'>
			<div className='space-y-1'>
				<p className='text-lg font-semibold'>{displayAddress}</p>
				{networkName ? (
					<p className='text-xs text-muted-foreground'>
						Network: {networkName}
					</p>
				) : null}
			</div>
			<div className='flex items-center gap-3'>
				<Button onClick={handleLogout}>Logout</Button>
			</div>
		</div>
	);
}
