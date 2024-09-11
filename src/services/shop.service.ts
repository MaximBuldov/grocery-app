import { PrismaClient, Shop } from '@prisma/client';
import axios from 'axios';

const prisma = new PrismaClient();

class ShopService {
	private readonly URL = '/api/shop';
	readonly KEY = 'shops';

	async create(name: string) {
		try {
			const res = await axios.post(this.URL, { name });
			return res.data;
		} catch (error) {
			throw error;
		}
	}

	async update(data: { id: number; name: string }) {
		try {
			const res = await axios.patch<Shop>(`${this.URL}/${data.id}`, data);
			return res.data;
		} catch (error) {
			throw error;
		}
	}

	async remove(id: number) {
		try {
			const res = await axios.delete<Shop>(`${this.URL}/${id}`);
			return res.data;
		} catch (error) {
			throw error;
		}
	}

	async getAll() {
		try {
			const res = await prisma.shop.findMany();
			return res;
		} catch (error) {
			throw error;
		}
	}
}

export const shopService = new ShopService();
