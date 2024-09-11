import {
	AppleOutlined,
	AppstoreAddOutlined,
	OrderedListOutlined,
	PlusCircleOutlined,
	ShopOutlined,
} from '@ant-design/icons';
import { Button, Flex } from 'antd';
import { BaseButtonProps } from 'antd/es/button/button';
import Link from 'next/link';

const buttonOption: BaseButtonProps = {
	size: 'large',
	block: true,
	type: 'primary',
};

const BottomMenu = () => {
	return (
		<Flex justify='space-between' className='bottom-menu'>
			<Link href='/'>
				<Button {...buttonOption} icon={<OrderedListOutlined />} />
			</Link>
			<Link href='/products'>
				<Button {...buttonOption} icon={<AppleOutlined />} />
			</Link>
			<Link href='/create-product'>
				<Button {...buttonOption} icon={<PlusCircleOutlined />} />
			</Link>
			<Link href='/departments'>
				<Button {...buttonOption} icon={<AppstoreAddOutlined />} />
			</Link>
			<Link href='/shops'>
				<Button {...buttonOption} icon={<ShopOutlined />} />
			</Link>
		</Flex>
	);
};

export default BottomMenu;
