import { PrismaClient, Product } from '@prisma/client';

const prisma = new PrismaClient();

interface IProduct extends Product {
	shops: number[];
	department: number;
}

export async function GET(req: Request) {
	try {
		const url = new URL(req.url);
		const searchParams = url.searchParams;
		const name = searchParams.get('name') || undefined;
		const selected = searchParams.get('selected');
		const isSelected =
			selected === 'true' ? true : selected === 'false' ? false : undefined;

		const res = await prisma.product.findMany({
			orderBy: {
				department: { name: 'desc' },
			},
			where: {
				name: name?.toLocaleLowerCase(),
				selected: isSelected,
			},
			include: {
				department: true,
				shops: true,
			},
		});
		return Response.json(res);
	} catch (error) {
		return Response.json(error);
	}
}

export async function POST(req: Request) {
	const { shops, department, name }: IProduct = await req.json();

	const res = await prisma.product.create({
		data: {
			name: name.toLowerCase(),
			shops: {
				connect: shops.map((id) => ({ id })),
			},
			departmentId: department,
			selected: false,
		},
	});
	return Response.json(res);
}
