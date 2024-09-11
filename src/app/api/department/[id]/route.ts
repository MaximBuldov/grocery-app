import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function PATCH(
	req: Request,
	{ params }: { params: { id: string } }
) {
	const data = await req.json();
	const res = await prisma.department.update({
		where: { id: Number(params.id) },
		data,
	});
	return Response.json(res);
}

export async function DELETE(
	_: Request,
	{ params }: { params: { id: string } }
) {
	const data = await prisma.department.delete({
		where: { id: Number(params.id) },
	});
	return Response.json(data);
}
