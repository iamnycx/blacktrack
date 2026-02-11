'use client';

import { useTheme } from 'next-themes';
import { ModeIcon } from './icons/pixel-icons';

export function ModeToggle() {
	const { theme, setTheme } = useTheme();

	return (
		<div>
			<div>
				<div
					className='p-4 cursor-pointer bg-linear-to-bl from-transparent hover:from-muted border-l border-dotted border-accent'
					onClick={() => {
						theme === 'light'
							? setTheme('dark')
							: setTheme('light');
					}}
				>
					<ModeIcon />
					<span className='sr-only'>Toggle theme</span>
				</div>
			</div>
		</div>
	);
}
