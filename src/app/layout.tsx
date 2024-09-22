import InitialData from '@/components/InitialData';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import type { Metadata } from 'next';
import React from 'react';
import BottomMenu from '../components/BottomMenu';
import Provider from '../components/Provider';
import './globals.css';

export const metadata: Metadata = {
	title: 'Grocery',
	description: 'Buldov family grocery app',
	manifest: '/manifest.json',
	viewport:
		'minimum-scale=1, maximum-scale=1, initial-scale=1, width=device-width, user-scalable=no',
	icons: [
		{ rel: 'apple-touch-icon', url: 'images/icon-128x128.png' },
		{ rel: 'icon', url: 'images/icon-128x128.png' },
	],
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en'>
			<body className='container'>
				<Provider>
					<InitialData>
						<AntdRegistry>
							{children}
							<BottomMenu />
						</AntdRegistry>
					</InitialData>
				</Provider>
			</body>
		</html>
	);
}
