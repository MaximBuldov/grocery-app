'use client';

import { QueryClientProvider } from '@tanstack/react-query';
import { useSwipeable } from 'react-swipeable';
import { getQueryClient } from '../utils/get-query-client';

export default function Providers({ children }: { children: JSX.Element }) {
	const queryClient = getQueryClient();

	const handlers = useSwipeable({
		onSwipedDown: () => window.location.reload(),
		delta: 250,
	});

	return (
		<QueryClientProvider client={queryClient}>
			<div {...handlers}>{children}</div>
		</QueryClientProvider>
	);
}
