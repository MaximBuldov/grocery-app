'use client';

import { useDepartmentApi } from '@/hooks/useDepartmentApi';
import { DeleteTwoTone } from '@ant-design/icons';
import { Department } from '@prisma/client';
import { Button, List } from 'antd';

export default function DepartmentList() {
	const { list, create, remove, update } = useDepartmentApi();

	const handleCreate = () => {
		const name = window.prompt('Enter department name');
		const label = window.prompt('Enter department label');
		if (name && label) create.mutate({ name, label });
	};
	const handleDelete = (item: Department) => {
		const res = window.confirm(`Delete ${item.name}`);
		if (res) remove.mutate(item.id);
	};

	const handleUpdate = (item: Department) => {
		const name = window.prompt('Update department name:', item.name);
		const label = window.prompt('Update department label:', item.label);
		if (name && label) update.mutate({ id: item.id, name, label });
	};

	return (
		<>
			<Button
				loading={create.isPending}
				block
				type='primary'
				size='large'
				onClick={handleCreate}
			>
				Add department
			</Button>
			<List
				rowKey={(el) => el.id}
				size='small'
				dataSource={list.data}
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
						<div onClick={() => handleUpdate(item)}>
							{item.label} {item.name}
						</div>
					</List.Item>
				)}
			/>
		</>
	);
}
