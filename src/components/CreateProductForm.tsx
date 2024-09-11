'use client';

import { useProductApi } from '@/hooks/useProductApi';
import { departmentService } from '@/services/department.service';
import { IProduct, IProductForm } from '@/services/product.service';
import { shopService } from '@/services/shop.service';
import { getQueryClient } from '@/utils/get-query-client';
import { Department, Shop } from '@prisma/client';
import { Button, Form, Input, Typography } from 'antd';

const { Item, useForm } = Form;

interface CreateProductFormProps {
	product?: IProduct;
	onCancel?: () => void;
}

const CreateProductForm = ({ product, onCancel }: CreateProductFormProps) => {
	const [form] = useForm();
	const queryClient = getQueryClient();
	const { update, create } = useProductApi({
		onSuccess: () => {
			onCancel?.();
			form.resetFields();
		},
	});

	const onFinish = (data: IProductForm) => {
		product?.id ? update.mutate({ data, id: product.id }) : create.mutate(data);
	};
	const shops = queryClient.getQueryData<Shop[]>([shopService.KEY]);
	const departments = queryClient.getQueryData<Department[]>([
		departmentService.KEY,
	]);

	return (
		<Form<IProductForm>
			form={form}
			onFinish={onFinish}
			size='middle'
			initialValues={{
				...product,
				shops: product?.shops.map((el) => el.id),
				department: product?.department.id,
			}}
		>
			{!product?.name && (
				<Typography.Title level={3}>Create product</Typography.Title>
			)}
			<Item<IProductForm>
				label='Product name'
				name='name'
				rules={[{ required: true }]}
			>
				<Input />
			</Item>
			<Item<IProductForm>
				label='Shops'
				name='shops'
				rules={[{ required: true }]}
			>
				<select
					multiple
					onChange={(event) => {
						form.setFieldValue(
							'shops',
							Array.from(event.target.selectedOptions).map(
								(option) => option.value
							)
						);
					}}
				>
					{shops?.map((el) => (
						<option key={el.id} value={el.id}>
							{el.name}
						</option>
					))}
				</select>
			</Item>
			<Item<IProductForm>
				label='Department'
				name='department'
				rules={[{ required: true }]}
			>
				<select>
					{departments?.map((el) => (
						<option key={el.id} value={el.id}>
							{el.label} {el.name}
						</option>
					))}
				</select>
			</Item>
			<Item>
				<Button
					loading={create.isPending || update.isPending}
					type='primary'
					block
					htmlType='submit'
				>
					{product ? 'Update' : 'Create product'}
				</Button>
			</Item>
		</Form>
	);
};

export default CreateProductForm;
