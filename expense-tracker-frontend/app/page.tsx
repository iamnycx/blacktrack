'use client';

import {
	ClockIcon,
	BarIcon,
	ChartIcon,
	HalfIcon,
	HomeIcon,
} from '@/components/icons/pixel-icons';
import { Button } from '@/components/ui/button';
import { loginWithMetaMask } from '@/lib/auth';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { toast } from 'sonner';

export default function Home() {
	const router = useRouter();
	const [loading, setLoading] = useState(false);
	const [token, setToken] = useState<string | null>(null);
	const [walletAddress, setWalletAddress] = useState<string | null>(null);

	useEffect(() => {
		setToken(localStorage.getItem('token'));
		setWalletAddress(localStorage.getItem('walletAddress'));
	}, []);

	const handleLogin = async () => {
		if (token && walletAddress) {
			router.push('/dashboard');
			return;
		}
		try {
			setLoading(true);
			await loginWithMetaMask();
			router.push('/dashboard');
		} catch (err) {
			toast('Metamask wallet not detected');
		} finally {
			setLoading(false);
		}
	};

	return (
		<main className='flex h-screen flex-col items-center justify-center gap-10 max-sm:gap-8 max-sm:px-4 max-sm:py-6 max-sm:pt-12 max-sm:items-start max-sm:text-left max-sm:justify-start'>
			<div className='flex gap-6 mb-12 max-sm:gap-4 max-sm:my-8'>
				<ChartIcon />
				<HalfIcon />
				<ClockIcon />
				<HomeIcon />
				<BarIcon />
			</div>
			<motion.h1
				initial={{ opacity: 0, y: -20, filter: 'blur(4px)' }}
				animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
				transition={{ duration: 0.5 }}
				className='text-5xl font-bold max-sm:text-5xl max-sm:max-w-4xl'
			>
				Track Your Expenses Effortlessly
			</motion.h1>
			<motion.p
				initial={{ opacity: 0, filter: 'blur(4px)' }}
				animate={{ opacity: 1, filter: 'blur(0px)' }}
				transition={{ duration: 0.5, delay: 0.5 }}
				className='text-2xl max-sm:text-xl max-sm:text-muted-foreground max-sm:max-w-2xl'
			>
				Manage your daily expenses with a secure, wallet-first
				experience.
			</motion.p>

			<div className='flex flex-col items-center gap-6 sm:gap-8 max-sm:items-center max-sm:text-center max-sm:w-full sm:mt-12'>
				<motion.div
					initial={{ opacity: 0, filter: 'blur(4px)' }}
					animate={{ opacity: 1, filter: 'blur(0px)' }}
					transition={{ duration: 0.5, delay: 0.8 }}
				>
					<Button
						onClick={handleLogin}
						disabled={loading}
						size={'lg'}
						className='w-fit'
					>
						{token && walletAddress
							? 'Go to Dashboard'
							: loading
								? 'Waiting for signature'
								: 'Login with Metamask'}
					</Button>
				</motion.div>
				<motion.p
					initial={{ opacity: 0, filter: 'blur(4px)' }}
					animate={{ opacity: 1, filter: 'blur(0px)' }}
					transition={{ duration: 0.5, delay: 1 }}
					className='text-lg text-muted-foreground max-sm:text-base'
				>
					password-less authentication using wallet signature
					verification
				</motion.p>
			</div>
		</main>
	);
}
