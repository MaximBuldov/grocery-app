import { departmentService } from '@/services/department.service';
import { productService } from '@/services/product.service';
import { shopService } from '@/services/shop.service';
import { getQueryClient } from '@/utils/get-query-client';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { useSwipeable } from 'react-swipeable';

export default async function InitialData({
	children,
}: {
	children: JSX.Element;
}) {
	const queryClient = getQueryClient();
	await queryClient.prefetchQuery({
		queryKey: [productService.KEY],
		queryFn: () => productService.getAll(),
	});

	await queryClient.prefetchQuery({
		queryKey: [departmentService.KEY],
		queryFn: () => departmentService.getAll(),
		staleTime: Infinity,
	});

	await queryClient.prefetchQuery({
		queryKey: [shopService.KEY],
		queryFn: () => shopService.getAll(),
		staleTime: Infinity,
	});

	const handlers = useSwipeable({
		onSwipedDown: () => window.location.reload(),
		delta: 250,
	});

	return (
		<HydrationBoundary state={dehydrate(queryClient)}>
			<div {...handlers}>{children}</div>
		</HydrationBoundary>
	);
}
