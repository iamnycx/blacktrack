'use client';

import Link from 'next/link';
import { ModeToggle } from '../mode-toggle';
import { useEffect, useState } from 'react';

export default function Navbar() {
	const [token, setToken] = useState<string | null>(null);
	const [walletAddress, setWalletAddress] = useState<string | null>(null);
	const isAuthed = Boolean(token && walletAddress);

	useEffect(() => {
		setToken(localStorage.getItem('token'));
		setWalletAddress(localStorage.getItem('walletAddress'));
	}, []);

	return (
		<nav className='sticky bg-background/40 backdrop-blur-xl inset-x-0 bottom-0 border-t border-accent border-dotted max-sm:bg-background/95 max-sm:backdrop-blur-sm max-sm:pb-4'>
			<div className='container mx-auto flex items-center justify-between max-sm:flex-col max-sm:items-stretch max-sm:gap-0'>
				<div className='flex items-center justify-between max-sm:w-full max-sm:px-4 max-sm:border-b max-sm:border-accent max-sm:border-dotted'>
					<Link href={'/'} className='text-lg md:pl-4 font-bold'>
						BlackTrack
					</Link>
					<div className='hidden max-sm:block max-sm:-mr-2'>
						<ModeToggle />
					</div>
				</div>
				<div className='flex max-sm:w-full max-sm:justify-stretch max-sm:border-b max-sm:border-accent max-sm:border-dotted'>
					{isAuthed ? (
						<Link
							href='/dashboard'
							className='px-6 py-3 font-medium text-lg border-l border-dotted border-accent bg-linear-to-bl from-transparent hover:from-muted max-sm:flex-1 max-sm:text-center max-sm:py-2.5 max-sm:text-base'
						>
							Dashboard
						</Link>
					) : (
						<span
							className='px-6 py-3 font-medium text-lg border-l border-dotted border-accent text-muted-foreground/75 cursor-not-allowed select-none max-sm:flex-1 max-sm:text-center max-sm:py-2.5 max-sm:text-base'
							aria-disabled='true'
						>
							Dashboard
						</span>
					)}
					{isAuthed ? (
						<Link
							href='/profile'
							className='px-6 py-3 font-medium text-lg border-l border-dotted border-accent bg-linear-to-bl from-transparent hover:from-muted max-sm:flex-1 max-sm:text-center max-sm:py-2.5 max-sm:text-base'
						>
							Profile
						</Link>
					) : (
						<span
							className='px-6 py-3 font-medium text-lg border-l border-dotted border-accent text-muted-foreground/75 cursor-not-allowed select-none max-sm:flex-1 max-sm:text-center max-sm:py-2.5 max-sm:text-base'
							aria-disabled='true'
						>
							Profile
						</span>
					)}
					<Link
						href='/api-docs'
						className='px-6 py-3 font-medium text-lg border-l border-dotted border-accent bg-linear-to-bl from-transparent hover:from-muted max-sm:flex-1 max-sm:text-center max-sm:py-2.5 max-sm:text-base'
					>
						API
					</Link>
				</div>
				<div className='flex justify-center sm:block max-sm:hidden'>
					<ModeToggle />
				</div>
			</div>
		</nav>
	);
}
