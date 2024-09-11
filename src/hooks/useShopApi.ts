'use client';

import { shopService } from '@/services/shop.service';
import { getQueryClient } from '@/utils/get-query-client';
import { Shop } from '@prisma/client';
import { useMutation, useQuery } from '@tanstack/react-query';

export const useShopApi = () => {
	const client = getQueryClient();
	const shops = useQuery({
		queryKey: [shopService.KEY],
		queryFn: shopService.getAll,
	});
	const createShop = useMutation({
		mutationFn: (name: string) => shopService.create(name),
		onSuccess: (data) => {
			client.setQueryData([shopService.KEY], (oldData: Shop[] | undefined) => {
				return [data, ...(oldData || [])];
			});
		},
	});
	const deleteShop = useMutation({
		mutationFn: (id: number) => shopService.remove(id),
		onSuccess: (data) => {
			client.setQueryData([shopService.KEY], (oldData: Shop[] | undefined) => {
				return oldData?.filter((el) => el.id !== data.id);
			});
		},
	});

	const updateShop = useMutation({
		mutationFn: (data: Omit<Shop, 'createdAt'>) => shopService.update(data),
		onSuccess: (data) => {
			client.setQueryData([shopService.KEY], (oldData: Shop[] | undefined) => {
				return oldData?.map((el) => (el.id === data.id ? data : el));
			});
		},
	});

	return { shops, createShop, deleteShop, updateShop };
};
