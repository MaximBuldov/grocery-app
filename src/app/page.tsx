'use client';

import { useProductApi } from '@/hooks/useProductApi';
import { IProduct } from '@/services/product.service';
import { CaretRightOutlined } from '@ant-design/icons';
import { Checkbox, Collapse, Empty, Tag } from 'antd';
import { useMemo } from 'react';

type IShopsProducts = {
	[key: string]: IProduct[];
};

export default function Home() {
	const { update, list } = useProductApi({ params: { selected: true } });

	const groupByShop = useMemo(() => {
		const combine = list.data?.reduce((acc: IShopsProducts, obj) => {
			obj.shops.forEach((el) => {
				acc[el.name] = acc[el.name] || [];
				acc[el.name].push(obj);
			});
			return acc;
		}, {});
		return Object.entries(combine || {}).map(([key, value]) => ({
			shop: key,
			products: value,
		}));
	}, [list.data]);

	const onCheckBox = (id: number) => {
		update.mutate({ id, data: { selected: false } });
	};

	return groupByShop.length ? (
		<Collapse
			expandIcon={({ isActive }) => (
				<CaretRightOutlined rotate={isActive ? 90 : 0} />
			)}
			items={groupByShop.map((group) => ({
				key: group.shop,
				label: group.shop,
				extra: <Tag color='blue'>{group.products.length}</Tag>,
				children: group.products.map((el) => (
					<div key={el.id}>
						<Checkbox onChange={() => onCheckBox(el.id)} key={el.id}>
							{el.name}
						</Checkbox>
					</div>
				)),
			}))}
		/>
	) : (
		<Empty />
	);
}
