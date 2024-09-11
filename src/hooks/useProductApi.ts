'use client';

import {
	IParams,
	IProduct,
	IProductForm,
	productService,
} from '@/services/product.service';
import { getQueryClient } from '@/utils/get-query-client';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';

interface UseProductApiProps {
	onSuccess?: () => void;
	params?: IParams;
}

export const useProductApi = ({ onSuccess, params }: UseProductApiProps) => {
	const client = getQueryClient();

	const queryKey = useMemo(() => {
		const arr: any[] = [productService.KEY];
		if (params) arr.push(params);
		return arr;
	}, [params]);

	const list = useQuery({
		queryKey,
		queryFn: () => productService.getAll(params),
	});
	const create = useMutation({
		mutationFn: (data: IProductForm) => productService.create(data),
		onSuccess: (data) => {
			client.setQueryData(queryKey, (oldData: IProduct[] | undefined) => {
				return [data, ...(oldData || [])];
			});
			onSuccess?.();
		},
	});
	const remove = useMutation({
		mutationFn: (id: number) => productService.remove(id),
		onSuccess: (data) => {
			client.setQueryData(queryKey, (oldData: IProduct[] | undefined) => {
				return oldData?.filter((el) => el.id !== data.id);
			});
		},
	});

	const update = useMutation({
		mutationFn: ({ data, id }: { data: Partial<IProductForm>; id: number }) =>
			productService.update(data, id),
		onSuccess: (data) => {
			client.setQueryData(queryKey, (oldData: IProduct[] | undefined) =>
				oldData?.map((el) => (el.id === data.id ? data : el))
			);
			onSuccess?.();
		},
	});

	return { list, create, remove, update };
};
