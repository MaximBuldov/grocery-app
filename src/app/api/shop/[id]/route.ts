import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function PATCH(
	req: Request,
	{ params }: { params: { id: string } }
) {
	const res = await req.json();
	const data = await prisma.shop.update({
		where: { id: Number(params.id) },
		data: { name: res.name },
	});
	return Response.json(data);
}

export async function DELETE(
	_: Request,
	{ params }: { params: { id: string } }
) {
	const data = await prisma.shop.delete({
		where: { id: Number(params.id) },
	});
	return Response.json(data);
}
