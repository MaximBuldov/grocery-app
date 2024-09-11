'use client';

import { useShopApi } from '@/hooks/useShopApi';
import { DeleteTwoTone } from '@ant-design/icons';
import { Shop } from '@prisma/client';
import { Button, List } from 'antd';

export default function ShopList() {
	const { createShop, shops, deleteShop, updateShop } = useShopApi();

	const handleCreate = () => {
		const res = window.prompt('Enter store name');
		if (res) createShop.mutate(res);
	};
	const handleDelete = (item: Shop) => {
		const res = window.confirm(`Delete ${item.name}`);
		if (res) deleteShop.mutate(item.id);
	};

	const handleUpdate = (item: Shop) => {
		const res = window.prompt('Update store name', item.name);
		if (res) updateShop.mutate({ id: item.id, name: res });
	};

	return (
		<>
			<Button
				loading={createShop.isPending}
				block
				type='primary'
				size='large'
				onClick={handleCreate}
			>
				Add store
			</Button>
			<List
				rowKey={(el) => el.id}
				size='small'
				dataSource={shops.data}
				renderItem={(item) => (
					<List.Item
						actions={[
							<DeleteTwoTone
								key='delete'
								twoToneColor='#FF0000'
								onClick={() => handleDelete(item)}
							/>,
						]}
					>
						<div onClick={() => handleUpdate(item)}>{item.name}</div>
					</List.Item>
				)}
			/>
		</>
	);
}
