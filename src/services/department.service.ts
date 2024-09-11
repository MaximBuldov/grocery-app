import { Department, PrismaClient, Shop } from '@prisma/client';
import axios from 'axios';

const prisma = new PrismaClient();

class DepartmentService {
	private readonly URL = '/api/department';
	readonly KEY = 'departments';

	async create(data: Pick<Department, 'label' | 'name'>) {
		try {
			const res = await axios.post(this.URL, data);
			return res.data;
		} catch (error) {
			throw error;
		}
	}

	async update(data: Pick<Department, 'label' | 'name' | 'id'>) {
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
			const res = await prisma.department.findMany();
			return res;
		} catch (error) {
			throw error;
		}
	}
}

export const departmentService = new DepartmentService();
