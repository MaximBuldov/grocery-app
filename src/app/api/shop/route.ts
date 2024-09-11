import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: Request) {
	const { name } = await req.json();

	const data = await prisma.shop.create({
		data: { name },
	});
	return Response.json(data);
}
