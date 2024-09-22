'use client';

import { useProductApi } from '@/hooks/useProductApi';
import { IProduct } from '@/services/product.service';
import { DeleteTwoTone } from '@ant-design/icons';
import { Divider, Drawer, Input, Spin, Table, TableProps } from 'antd';
import { useMemo, useState } from 'react';
import { useDebounce } from 'use-debounce';
import CreateProductForm from './CreateProductForm';

export default function ProductList() {
	const [title, setTitle] = useState<string>();
	const [debounceTitle] = useDebounce(title, 1000);
	const [drawer, setDrawer] = useState<IProduct>();
	const { update, remove, list } = useProductApi({
		params: { name: debounceTitle },
	});
	const selectedRowKeys = useMemo(
		() => list.data?.filter((el) => el.selected).map((el) => el.id),
		[list.data]
	);

	const onRawSelect = ({ id }: IProduct, selected: boolean) => {
		update.mutate({ data: { selected }, id });
	};

	const columns: TableProps<IProduct>['columns'] = [
		{
			title: 'Product',
			dataIndex: 'name',
			key: 'name',
			render: (el: string, record) => (
				<span onClick={() => setDrawer(record)}>{el.toLowerCase()}</span>
			),
		},
		{
			dataIndex: 'department',
			key: 'department',
			render: (el) => <div style={{ textAlign: 'center' }}>{el.label}</div>,
		},
		{
			key: 'actions',
			render: (_, record) => (
				<div style={{ textAlign: 'center' }}>
					<DeleteTwoTone
						onClick={() => {
							const res = window.confirm(`Do u want to delete ${record.name}`);
							if (res) remove.mutate(record.id);
						}}
						twoToneColor='#d00e0e'
					/>
				</div>
			),
		},
	];

	return (
		<>
			<Input.Search
				loading={list.isPending}
				enterButton
				addonBefore='Name'
				placeholder='Enter product name'
				onSearch={(value) => setTitle(value)}
				onChange={(event) => setTitle(event.target.value)}
			/>
			<Divider />
			<Table<IProduct>
				loading={remove.isPending || list.isLoading}
				rowSelection={{
					selectedRowKeys,
					onSelect: onRawSelect,
					hideSelectAll: true,
					renderCell: (checked, record, index, node) =>
						update.isPending && update.variables.id === record.id ? (
							<Spin spinning size='small' />
						) : (
							node
						),
				}}
				size='small'
				columns={columns}
				dataSource={list.data}
				rowKey={(record) => record.id}
				pagination={false}
			/>
			<Drawer
				title='Update product'
				destroyOnClose
				open={!!drawer}
				onClose={() => setDrawer(undefined)}
			>
				<CreateProductForm
					product={drawer}
					onCancel={() => setDrawer(undefined)}
				/>
			</Drawer>
		</>
	);
}
