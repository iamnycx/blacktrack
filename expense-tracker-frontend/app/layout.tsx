import './globals.css';

import type { Metadata } from 'next';

import { ThemeProvider } from '@/providers/theme-provider';
import { GeistPixelGrid } from 'geist/font/pixel';
import Navbar from '@/components/layout/navbar';
import Container from '@/components/layout/container';
import { Toaster } from '@/components/ui/sonner';

export const metadata: Metadata = {
	title: 'BlackTrack',
	description:
		'BlackTrack is a web3 authenticated expense tracker that allows you to track your expenses and manage your budget with ease.',
	metadataBase: new URL('https://blacktrack-eta.vercel.app/'),
	keywords: [
		'nycx',
		'nycx@dev',
		'expense tracker',
		'web3',
		'authenticated',
		'budget management',
		'nextjs',
		'react',
		'typescript',
		'nodejs',
		'express',
		'postgresql',
		'drizzle-orm',
		'tailwindcss',
		'vercel',
		'metamask',
		'ethers.js',
	],
	authors: [
		{
			name: 'nycx',
			url: 'https://nycx.is-a.dev',
		},
	],
	creator: 'nycx',
	openGraph: {
		title: 'blacktrack',
		description:
			'BlackTrack is a web3 authenticated expense tracker that allows you to track your expenses and manage your budget with ease.',
		url: 'https://blacktrack-eta.vercel.app/',
		siteName: 'blacktrack',
		images: [
			{
				url: 'https://blacktrack-eta.vercel.app/opengraph-image.png',
				width: 1200,
				height: 630,
				alt: 'blacktrack',
			},
		],
		type: 'website',
	},

	twitter: {
		card: 'summary_large_image',
		title: 'blacktrack',
		description:
			'BlackTrack is a web3 authenticated expense tracker that allows you to track your expenses and manage your budget with ease.',
		images: ['https://blacktrack-eta.vercel.app/opengraph-image.png'],
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en' suppressHydrationWarning>
			<body className={`${GeistPixelGrid.className} antialiased`}>
				<ThemeProvider
					attribute='class'
					defaultTheme='dark'
					enableSystem
				>
					<Container>
						{children}
						<Navbar />
					</Container>
					<Toaster />
				</ThemeProvider>
			</body>
		</html>
	);
}
