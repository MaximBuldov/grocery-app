import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: Request) {
	const data = await req.json();

	const res = await prisma.department.create({ data });
	return Response.json(res);
}
