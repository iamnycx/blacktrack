'use client';

import { motion } from 'motion/react';

export function ModeIcon({ className = '', size = 18 }) {
	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 32 32'
			id='Interface-Essential-Light-Bulb--Streamline-Pixel'
			height={size}
			width={size}
			className={className}
		>
			<title>{'interface-essential-light-bulb'}</title>
			<g>
				<path
					d='M27.43 6.1h1.52v12.19h-1.52Z'
					fill='currentColor'
					strokeWidth={1}
				/>
				<path
					d='M25.9 18.29h1.53v1.52H25.9Z'
					fill='currentColor'
					strokeWidth={1}
				/>
				<path
					d='M25.9 4.57h1.53V6.1H25.9Z'
					fill='currentColor'
					strokeWidth={1}
				/>
				<path
					d='M24.38 19.81h1.52v1.52h-1.52Z'
					fill='currentColor'
					strokeWidth={1}
				/>
				<path
					d='M24.38 3.05h1.52v1.52h-1.52Z'
					fill='currentColor'
					strokeWidth={1}
				/>
				<path
					d='M22.85 21.33h1.53v1.53h-1.53Z'
					fill='currentColor'
					strokeWidth={1}
				/>
				<path
					d='M22.85 1.52h1.53v1.53h-1.53Z'
					fill='currentColor'
					strokeWidth={1}
				/>
				<path
					d='M18.28 22.86v-6.1h-1.52v6.1h-1.52v-6.1h-1.53v6.1H9.14v1.52h1.52v6.1h1.53v-1.53h7.62v1.53h1.52v-6.1h1.52v-1.52Zm1.53 3.04h-7.62v-1.52h7.62Z'
					fill='currentColor'
					strokeWidth={1}
				/>
				<path
					d='M19.81 10.67h1.52v3.04h-1.52Z'
					fill='currentColor'
					strokeWidth={1}
				/>
				<path
					d='M18.28 13.71h1.53v3.05h-1.53Z'
					fill='currentColor'
					strokeWidth={1}
				/>
				<path
					d='M12.19 30.48h7.62V32h-7.62Z'
					fill='currentColor'
					strokeWidth={1}
				/>
				<path
					d='M12.19 13.71h1.52v3.05h-1.52Z'
					fill='currentColor'
					strokeWidth={1}
				/>
				<path
					d='M10.66 10.67h1.53v3.04h-1.53Z'
					fill='currentColor'
					strokeWidth={1}
				/>
				<path
					d='M9.14 0h13.71v1.52H9.14Z'
					fill='currentColor'
					strokeWidth={1}
				/>
				<path
					d='M7.62 21.33h1.52v1.53H7.62Z'
					fill='currentColor'
					strokeWidth={1}
				/>
				<path
					d='M7.62 1.52h1.52v1.53H7.62Z'
					fill='currentColor'
					strokeWidth={1}
				/>
				<path
					d='M6.09 19.81h1.53v1.52H6.09Z'
					fill='currentColor'
					strokeWidth={1}
				/>
				<path
					d='M6.09 3.05h1.53v1.52H6.09Z'
					fill='currentColor'
					strokeWidth={1}
				/>
				<path
					d='M4.57 18.29h1.52v1.52H4.57Z'
					fill='currentColor'
					strokeWidth={1}
				/>
				<path
					d='M4.57 4.57h1.52V6.1H4.57Z'
					fill='currentColor'
					strokeWidth={1}
				/>
				<path
					d='M3.05 6.1h1.52v12.19H3.05Z'
					fill='currentColor'
					strokeWidth={1}
				/>
			</g>
		</svg>
	);
}

export function ClockIcon({ className = '', size = 50 }) {
	return (
		<motion.svg
			initial={{ opacity: 0, filter: 'blur(4px)' }}
			animate={{ opacity: 1, filter: 'blur(0px)' }}
			exit={{ opacity: 0, filter: 'blur(4px)' }}
			transition={{ duration: 1, ease: 'easeInOut', delay: 0.4 }}
			className={className}
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 32 32'
			id='Interface-Essential-Clock--Streamline-Pixel'
			height={size}
			width={size}
		>
			<desc>
				{
					'\n    Interface Essential Clock Streamline Icon: https://streamlinehq.com\n  '
				}
			</desc>
			<title>{'interface-essential-clock'}</title>
			<g>
				<path
					d='M30.47 12.19H32v7.62h-1.53Z'
					fill='currentColor'
					strokeWidth={1}
				/>
				<path
					d='M28.95 19.81h1.52v3.05h-1.52Z'
					fill='currentColor'
					strokeWidth={1}
				/>
				<path
					d='M28.95 9.14h1.52v3.05h-1.52Z'
					fill='currentColor'
					strokeWidth={1}
				/>
				<path
					d='M27.43 22.86h1.52v3.04h-1.52Z'
					fill='currentColor'
					strokeWidth={1}
				/>
				<path
					d='M27.43 6.1h1.52v3.04h-1.52Z'
					fill='currentColor'
					strokeWidth={1}
				/>
				<path
					d='M25.9 25.9h1.53v1.53H25.9Z'
					fill='currentColor'
					strokeWidth={1}
				/>
				<path
					d='M25.9 4.57h1.53V6.1H25.9Z'
					fill='currentColor'
					strokeWidth={1}
				/>
				<path
					d='M22.85 27.43h3.05v1.52h-3.05Z'
					fill='currentColor'
					strokeWidth={1}
				/>
				<path
					d='M22.85 3.05h3.05v1.52h-3.05Z'
					fill='currentColor'
					strokeWidth={1}
				/>
				<path
					d='m13.71 18.29 1.53 0 0 1.52 1.52 0 0 -1.52 1.52 0 0 -1.53 6.1 0 0 -1.52 -6.1 0 0 -1.53 -1.52 0 0 -9.14 -1.52 0 0 9.14 -1.53 0 0 1.53 -1.52 0 0 1.52 1.52 0 0 1.53z'
					fill='currentColor'
					strokeWidth={1}
				/>
				<path
					d='M19.81 28.95h3.04v1.53h-3.04Z'
					fill='currentColor'
					strokeWidth={1}
				/>
				<path
					d='M19.81 1.52h3.04v1.53h-3.04Z'
					fill='currentColor'
					strokeWidth={1}
				/>
				<path
					d='M12.19 30.48h7.62V32h-7.62Z'
					fill='currentColor'
					strokeWidth={1}
				/>
				<path
					d='M12.19 0h7.62v1.52h-7.62Z'
					fill='currentColor'
					strokeWidth={1}
				/>
				<path
					d='M9.14 28.95h3.05v1.53H9.14Z'
					fill='currentColor'
					strokeWidth={1}
				/>
				<path
					d='M9.14 1.52h3.05v1.53H9.14Z'
					fill='currentColor'
					strokeWidth={1}
				/>
				<path
					d='M6.09 27.43h3.05v1.52H6.09Z'
					fill='currentColor'
					strokeWidth={1}
				/>
				<path
					d='M6.09 3.05h3.05v1.52H6.09Z'
					fill='currentColor'
					strokeWidth={1}
				/>
				<path
					d='M4.57 25.9h1.52v1.53H4.57Z'
					fill='currentColor'
					strokeWidth={1}
				/>
				<path
					d='M4.57 4.57h1.52V6.1H4.57Z'
					fill='currentColor'
					strokeWidth={1}
				/>
				<path
					d='M3.05 22.86h1.52v3.04H3.05Z'
					fill='currentColor'
					strokeWidth={1}
				/>
				<path
					d='M3.05 6.1h1.52v3.04H3.05Z'
					fill='currentColor'
					strokeWidth={1}
				/>
				<path
					d='M1.52 19.81h1.53v3.05H1.52Z'
					fill='currentColor'
					strokeWidth={1}
				/>
				<path
					d='M1.52 9.14h1.53v3.05H1.52Z'
					fill='currentColor'
					strokeWidth={1}
				/>
				<path
					d='M0 12.19h1.52v7.62H0Z'
					fill='currentColor'
					strokeWidth={1}
				/>
			</g>
		</motion.svg>
	);
}

export function HomeIcon({ className = '', size = 50 }) {
	return (
		<motion.svg
			initial={{ opacity: 0, filter: 'blur(4px)' }}
			animate={{ opacity: 1, filter: 'blur(0px)' }}
			exit={{ opacity: 0, filter: 'blur(4px)' }}
			transition={{ duration: 1, ease: 'easeInOut', delay: 0.6 }}
			className={className}
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 32 32'
			id='Interface-Essential-Home-1--Streamline-Pixel'
			height={size}
			width={size}
		>
			<desc>
				{
					'\n    Interface Essential Home 1 Streamline Icon: https://streamlinehq.com\n  '
				}
			</desc>
			<title>{'interface-essential-home-1'}</title>
			<g>
				<path
					d='m6.855 13.71 0 -1.52 1.53 0 0 -1.52 1.52 0 0 -1.53 1.52 0 0 -1.52 1.53 0 0 -1.52 1.52 0 0 -1.53 3.05 0 0 1.53 1.52 0 0 1.52 1.53 0 0 1.52 1.52 0 0 1.53 1.52 0 0 1.52 1.53 0 0 1.52 1.52 0 0 16.77 1.53 0 0 -13.72 1.52 0 0 -1.52 1.52 0 0 -1.53 -1.52 0 0 -1.52 -1.52 0 0 -1.52 -1.53 0 0 -1.53 -1.52 0 0 -1.52 -1.53 0 0 -1.52 -1.52 0 0 -1.53 -1.52 0 0 -1.52 -1.53 0 0 -1.53 -1.52 0 0 -1.52 -3.05 0 0 1.52 -1.52 0 0 1.53 -1.53 0 0 1.52 -1.52 0 0 1.53 -1.52 0 0 1.52 -1.53 0 0 1.52 -1.52 0 0 1.53 -1.52 0 0 1.52 -1.53 0 0 1.52 -1.52 0 0 1.53 1.52 0 0 1.52 1.53 0 0 13.72 1.52 0 0 -16.77 1.52 0z'
					fill='currentColor'
					strokeWidth={1}
				/>
				<path
					d='m26.665 32 0 -1.52 -6.09 0 0 -12.19 -1.53 0 0 12.19 -6.09 0 0 -12.19 -1.53 0 0 12.19 -6.09 0 0 1.52 21.33 0z'
					fill='currentColor'
					strokeWidth={1}
				/>
				<path
					d='M22.095 19.81h3.05v3.05h-3.05Z'
					fill='currentColor'
					strokeWidth={1}
				/>
				<path
					d='M17.525 9.14h1.52v3.05h-1.52Z'
					fill='currentColor'
					strokeWidth={1}
				/>
				<path
					d='M14.475 7.62h3.05v1.52h-3.05Z'
					fill='currentColor'
					strokeWidth={1}
				/>
				<path
					d='M14.475 22.86h1.53v1.52h-1.53Z'
					fill='currentColor'
					strokeWidth={1}
				/>
				<path
					d='M12.955 16.76h6.09v1.53h-6.09Z'
					fill='currentColor'
					strokeWidth={1}
				/>
				<path
					d='M14.475 12.19h3.05v1.52h-3.05Z'
					fill='currentColor'
					strokeWidth={1}
				/>
				<path
					d='M12.955 9.14h1.52v3.05h-1.52Z'
					fill='currentColor'
					strokeWidth={1}
				/>
				<path
					d='M6.855 19.81h3.05v3.05h-3.05Z'
					fill='currentColor'
					strokeWidth={1}
				/>
			</g>
		</motion.svg>
	);
}

export function HalfIcon({ className = '', size = 50 }) {
	return (
		<motion.svg
			initial={{ opacity: 0, filter: 'blur(4px)' }}
			animate={{ opacity: 1, filter: 'blur(0px)' }}
			exit={{ opacity: 0, filter: 'blur(4px)' }}
			transition={{ duration: 1, ease: 'easeInOut', delay: 0.2 }}
			className={className}
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 32 32'
			id='Interface-Essential-Loading-50-Percent-1--Streamline-Pixel'
			height={size}
			width={size}
		>
			<desc>
				{
					'\n    Interface Essential Loading 50 Percent 1 Streamline Icon: https://streamlinehq.com\n  '
				}
			</desc>
			<title>{'interface-essential-loading-50-percent-1'}</title>
			<g>
				<path
					d='M0.765 12.19h1.52v7.62H0.765Z'
					fill='currentColor'
					strokeWidth={1}
				/>
				<path
					d='M2.285 19.81h1.53v3.05h-1.53Z'
					fill='currentColor'
					strokeWidth={1}
				/>
				<path
					d='M2.285 9.14h1.53v3.05h-1.53Z'
					fill='currentColor'
					strokeWidth={1}
				/>
				<path
					d='M3.815 22.86h1.52v3.04h-1.52Z'
					fill='currentColor'
					strokeWidth={1}
				/>
				<path
					d='M3.815 6.09h1.52v3.05h-1.52Z'
					fill='currentColor'
					strokeWidth={1}
				/>
				<path
					d='M5.335 25.9h3.05v1.53h-3.05Z'
					fill='currentColor'
					strokeWidth={1}
				/>
				<path
					d='M5.335 4.57h3.05v1.52h-3.05Z'
					fill='currentColor'
					strokeWidth={1}
				/>
				<path
					d='M8.385 27.43h3.04v1.52h-3.04Z'
					fill='currentColor'
					strokeWidth={1}
				/>
				<path
					d='M8.385 3.05h3.04v1.52h-3.04Z'
					fill='currentColor'
					strokeWidth={1}
				/>
				<path
					d='M11.425 22.86h1.53v1.52h-1.53Z'
					fill='currentColor'
					strokeWidth={1}
				/>
				<path
					d='M11.425 18.29h1.53v1.52h-1.53Z'
					fill='currentColor'
					strokeWidth={1}
				/>
				<path
					d='m14.475 16.76 0 -4.57 -3.05 0 0 -1.52 3.05 0 0 -1.53 -4.57 0 0 4.57 3.05 0 0 1.53 -3.05 0 0 1.52 4.57 0z'
					fill='currentColor'
					strokeWidth={1}
				/>
				<path
					d='M12.955 21.33h1.52v1.53h-1.52Z'
					fill='currentColor'
					strokeWidth={1}
				/>
				<path
					d='M14.475 19.81h1.53v1.52h-1.53Z'
					fill='currentColor'
					strokeWidth={1}
				/>
				<path
					d='M16.005 22.86h1.52v1.52h-1.52Z'
					fill='currentColor'
					strokeWidth={1}
				/>
				<path
					d='M16.005 18.29h1.52v1.52h-1.52Z'
					fill='currentColor'
					strokeWidth={1}
				/>
				<path
					d='M20.575 16.76V9.14h-4.57v7.62Zm-3.05 -6.09h1.52v4.57h-1.52Z'
					fill='currentColor'
					strokeWidth={1}
				/>
				<path
					d='m14.475 30.48 0 1.52 4.57 0 0 -1.52 3.05 0 0 -1.53 3.05 0 0 -1.52 1.52 0 0 -1.53 1.53 0 0 -3.04 1.52 0 0 -3.05 1.52 0 0 -7.62 -1.52 0 0 -3.05 -1.52 0 0 -3.05 -1.53 0 0 -1.52 -1.52 0 0 -1.52 -3.05 0 0 -1.53 -3.05 0 0 -1.52 -4.57 0 0 1.52 -3.05 0 0 1.53 3.05 0 0 1.52 3.05 0 0 1.52 3.05 0 0 1.53 3.05 0 0 3.05 1.52 0 0 3.04 1.52 0 0 4.58 -1.52 0 0 3.04 -1.52 0 0 3.05 -3.05 0 0 1.52 -3.05 0 0 1.53 -3.05 0 0 1.52 -3.05 0 0 1.53 3.05 0z'
					fill='currentColor'
					strokeWidth={1}
				/>
			</g>
		</motion.svg>
	);
}

export function ChartIcon({ className = '', size = 50 }) {
	return (
		<motion.svg
			initial={{ opacity: 0, filter: 'blur(4px)' }}
			animate={{ opacity: 1, filter: 'blur(0px)' }}
			exit={{ opacity: 0, filter: 'blur(4px)' }}
			transition={{ duration: 1, ease: 'easeInOut', delay: 0 }}
			className={className}
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 32 32'
			id='Interface-Essential-Pie-Chart-Poll-Report-1--Streamline-Pixel'
			height={size}
			width={size}
		>
			<desc>
				{
					'\n    Interface Essential Pie Chart Poll Report 1 Streamline Icon: https://streamlinehq.com\n  '
				}
			</desc>
			<title>{'interface-essential-pie-chart-poll-report-1'}</title>
			<g>
				<path
					d='m30.47 15.24 -13.71 0 0 -13.72 3.05 0 0 -1.52 -7.62 0 0 1.52 3.05 0 0 15.24 -1.53 0 0 1.53 3.05 0 0 1.52 1.52 0 0 1.52 1.53 0 0 1.53 1.52 0 0 1.52 1.52 0 0 1.52 1.53 0 0 1.53 -1.53 0 0 1.52 3.05 0 0 -1.52 1.53 0 0 -1.53 1.52 0 0 -3.04 1.52 0 0 -3.05 1.53 0 0 -7.62 -1.53 0 0 3.05z'
					fill='currentColor'
					strokeWidth={1}
				/>
				<path
					d='M28.95 9.14h1.52v3.05h-1.52Z'
					fill='currentColor'
					strokeWidth={1}
				/>
				<path
					d='M27.43 6.1h1.52v3.04h-1.52Z'
					fill='currentColor'
					strokeWidth={1}
				/>
				<path
					d='M25.9 12.19h1.53v1.52H25.9Z'
					fill='currentColor'
					strokeWidth={1}
				/>
				<path
					d='M25.9 4.57h1.53V6.1H25.9Z'
					fill='currentColor'
					strokeWidth={1}
				/>
				<path
					d='M24.38 9.14h1.52v1.53h-1.52Z'
					fill='currentColor'
					strokeWidth={1}
				/>
				<path
					d='M22.85 3.05h3.05v1.52h-3.05Z'
					fill='currentColor'
					strokeWidth={1}
				/>
				<path
					d='M21.33 12.19h1.52v1.52h-1.52Z'
					fill='currentColor'
					strokeWidth={1}
				/>
				<path
					d='M21.33 6.1h1.52v1.52h-1.52Z'
					fill='currentColor'
					strokeWidth={1}
				/>
				<path
					d='m21.33 27.43 -1.52 0 0 3.05 3.04 0 0 -1.53 -1.52 0 0 -1.52z'
					fill='currentColor'
					strokeWidth={1}
				/>
				<path
					d='M19.81 1.52h3.04v1.53h-3.04Z'
					fill='currentColor'
					strokeWidth={1}
				/>
				<path
					d='M18.28 25.9h1.53v1.53h-1.53Z'
					fill='currentColor'
					strokeWidth={1}
				/>
				<path
					d='M18.28 9.14h1.53v1.53h-1.53Z'
					fill='currentColor'
					strokeWidth={1}
				/>
				<path
					d='M18.28 4.57h1.53V6.1h-1.53Z'
					fill='currentColor'
					strokeWidth={1}
				/>
				<path
					d='m16.76 28.95 -1.52 0 0 1.53 -3.05 0 0 1.52 7.62 0 0 -1.52 -3.05 0 0 -1.53z'
					fill='currentColor'
					strokeWidth={1}
				/>
				<path
					d='M16.76 24.38h1.52v1.52h-1.52Z'
					fill='currentColor'
					strokeWidth={1}
				/>
				<path
					d='M15.24 22.86h1.52v1.52h-1.52Z'
					fill='currentColor'
					strokeWidth={1}
				/>
				<path
					d='M13.71 27.43h1.53v1.52h-1.53Z'
					fill='currentColor'
					strokeWidth={1}
				/>
				<path
					d='M13.71 21.33h1.53v1.53h-1.53Z'
					fill='currentColor'
					strokeWidth={1}
				/>
				<path
					d='M12.19 25.9h1.52v1.53h-1.52Z'
					fill='currentColor'
					strokeWidth={1}
				/>
				<path
					d='m12.19 19.81 -1.53 0 0 1.52 3.05 0 0 -3.04 -1.52 0 0 1.52z'
					fill='currentColor'
					strokeWidth={1}
				/>
				<path
					d='M9.14 28.95h3.05v1.53H9.14Z'
					fill='currentColor'
					strokeWidth={1}
				/>
				<path
					d='M10.66 24.38h1.53v1.52h-1.53Z'
					fill='currentColor'
					strokeWidth={1}
				/>
				<path
					d='M9.14 1.52h3.05v1.53H9.14Z'
					fill='currentColor'
					strokeWidth={1}
				/>
				<path
					d='m9.14 22.86 -1.52 0 0 1.52 3.04 0 0 -3.05 -1.52 0 0 1.53z'
					fill='currentColor'
					strokeWidth={1}
				/>
				<path
					d='M6.09 27.43h3.05v1.52H6.09Z'
					fill='currentColor'
					strokeWidth={1}
				/>
				<path
					d='M6.09 3.05h3.05v1.52H6.09Z'
					fill='currentColor'
					strokeWidth={1}
				/>
				<path
					d='M6.09 24.38h1.53v1.52H6.09Z'
					fill='currentColor'
					strokeWidth={1}
				/>
				<path
					d='M4.57 25.9h1.52v1.53H4.57Z'
					fill='currentColor'
					strokeWidth={1}
				/>
				<path
					d='M4.57 4.57h1.52V6.1H4.57Z'
					fill='currentColor'
					strokeWidth={1}
				/>
				<path
					d='M3.05 22.86h1.52v3.04H3.05Z'
					fill='currentColor'
					strokeWidth={1}
				/>
				<path
					d='M3.05 6.1h1.52v3.04H3.05Z'
					fill='currentColor'
					strokeWidth={1}
				/>
				<path
					d='M1.52 19.81h1.53v3.05H1.52Z'
					fill='currentColor'
					strokeWidth={1}
				/>
				<path
					d='M1.52 9.14h1.53v3.05H1.52Z'
					fill='currentColor'
					strokeWidth={1}
				/>
				<path
					d='M0 12.19h1.52v7.62H0Z'
					fill='currentColor'
					strokeWidth={1}
				/>
			</g>
		</motion.svg>
	);
}

export function BarIcon({ className = '', size = 50 }) {
	return (
		<motion.svg
			initial={{ opacity: 0, filter: 'blur(4px)' }}
			animate={{ opacity: 1, filter: 'blur(0px)' }}
			exit={{ opacity: 0, filter: 'blur(4px)' }}
			transition={{ duration: 1, ease: 'easeInOut', delay: 0.8 }}
			className={className}
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 32 32'
			id='Interface-Essential-Poll--Streamline-Pixel'
			height={size}
			width={size}
		>
			<desc>
				{
					'\n    Interface Essential Poll Streamline Icon: https://streamlinehq.com\n  '
				}
			</desc>
			<title>{'interface-essential-poll'}</title>
			<g>
				<path
					d='M0 28.955h32v1.52H0Z'
					fill='currentColor'
					strokeWidth={1}
				/>
				<path
					d='m24.38 1.525 0 1.52 -1.53 0 0 22.86 1.53 0 0 1.52 4.57 0 0 -1.52 1.52 0 0 -22.86 -1.52 0 0 -1.52 -4.57 0z'
					fill='currentColor'
					strokeWidth={1}
				/>
				<path
					d='M15.24 22.855h1.52v1.52h-1.52Z'
					fill='currentColor'
					strokeWidth={1}
				/>
				<path
					d='M15.24 18.285h1.52v1.52h-1.52Z'
					fill='currentColor'
					strokeWidth={1}
				/>
				<path
					d='M15.24 13.715h1.52v1.52h-1.52Z'
					fill='currentColor'
					strokeWidth={1}
				/>
				<path
					d='M15.24 9.145h1.52v1.52h-1.52Z'
					fill='currentColor'
					strokeWidth={1}
				/>
				<path
					d='m16.76 9.145 1.52 0 0 3.04 -1.52 0 0 1.53 1.52 0 0 3.05 -1.52 0 0 1.52 1.52 0 0 3.05 -1.52 0 0 1.52 1.52 0 0 3.05 1.53 0 0 -18.29 -1.53 0 0 -1.52 -4.57 0 0 1.52 3.05 0 0 1.53z'
					fill='currentColor'
					strokeWidth={1}
				/>
				<path
					d='m18.28 27.425 0 -1.52 -3.04 0 0 -1.53 -1.53 0 0 -3.04 1.53 0 0 -1.53 -1.53 0 0 -3.04 1.53 0 0 -1.53 -1.53 0 0 -3.05 1.53 0 0 -1.52 -1.53 0 0 -3.05 -1.52 0 0 18.29 1.52 0 0 1.52 4.57 0z'
					fill='currentColor'
					strokeWidth={1}
				/>
				<path
					d='M7.62 16.765h1.52v9.14H7.62Z'
					fill='currentColor'
					strokeWidth={1}
				/>
				<path
					d='M3.05 25.905h4.57v1.52H3.05Z'
					fill='currentColor'
					strokeWidth={1}
				/>
				<path
					d='M3.05 15.235h4.57v1.53H3.05Z'
					fill='currentColor'
					strokeWidth={1}
				/>
				<path
					d='M1.52 16.765h1.53v9.14H1.52Z'
					fill='currentColor'
					strokeWidth={1}
				/>
			</g>
		</motion.svg>
	);
}
