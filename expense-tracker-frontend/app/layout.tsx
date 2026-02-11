import './globals.css';

import type { Metadata } from 'next';

import { ThemeProvider } from '@/providers/theme-provider';
import { GeistPixelGrid } from 'geist/font/pixel';
import Navbar from '@/components/layout/navbar';
import Container from '@/components/layout/container';

export const metadata: Metadata = {
	title: 'BlackTrack',
	description:
		'BlackTrack is a web3 authenticated expense tracker that allows you to track your expenses and manage your budget with ease.',
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
				</ThemeProvider>
			</body>
		</html>
	);
}
