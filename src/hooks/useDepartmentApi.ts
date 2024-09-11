'use client';

import { departmentService } from '@/services/department.service';
import { Department, Shop } from '@prisma/client';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export const useDepartmentApi = () => {
	const client = useQueryClient();
	const list = useQuery({
		queryKey: [departmentService.KEY],
		queryFn: departmentService.getAll,
	});
	const create = useMutation({
		mutationFn: (data: Pick<Department, 'name' | 'label'>) =>
			departmentService.create(data),
		onSuccess: (data) => {
			client.setQueryData(
				[departmentService.KEY],
				(oldData: Shop[] | undefined) => {
					return [data, ...(oldData || [])];
				}
			);
		},
	});
	const remove = useMutation({
		mutationFn: (id: number) => departmentService.remove(id),
		onSuccess: (data) => {
			client.setQueryData(
				[departmentService.KEY],
				(oldData: Shop[] | undefined) => {
					return oldData?.filter((el) => el.id !== data.id);
				}
			);
		},
	});

	const update = useMutation({
		mutationFn: (data: Omit<Department, 'createdAt'>) =>
			departmentService.update(data),
		onSuccess: (data) => {
			client.setQueryData(
				[departmentService.KEY],
				(oldData: Shop[] | undefined) => {
					return oldData?.map((el) => (el.id === data.id ? data : el));
				}
			);
		},
	});

	return { list, create, remove, update };
};
