import { IProductForm } from '@/services/product.service';
import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function PATCH(
	req: Request,
	{ params }: { params: { id: string } }
) {
	try {
		const data: Partial<IProductForm> = await req.json();
		const res = await prisma.product.update({
			where: { id: Number(params.id) },
			data: {
				name: data.name?.toLowerCase(),
				departmentId: data.department ? Number(data.department) : undefined,
				shops: {
					set: data.shops?.map((id) => ({ id: Number(id) })),
				},
				selected: data.selected,
			},
			include: {
				department: true,
				shops: true,
			},
		});
		return NextResponse.json(res);
	} catch (error) {
		console.log(error);
		return NextResponse.json(
			{ error: 'Internal Server Error' },
			{ status: 500 }
		);
	}
}

export async function DELETE(
	_: Request,
	{ params }: { params: { id: string } }
) {
	const data = await prisma.product.delete({
		where: { id: Number(params.id) },
	});
	return Response.json(data);
}
