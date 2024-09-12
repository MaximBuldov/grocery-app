import { Department, Product, Shop } from '@prisma/client';
import axios from 'axios';

export interface IProduct extends Product {
	department: Department;
	shops: Shop[];
}

export interface IProductForm {
	name: string;
	department: string;
	shops: string[];
	selected: boolean;
}

export interface IParams {
	name?: string;
	selected?: boolean;
}

class ProductService {
	private readonly URL = '/api/product';
	readonly KEY = 'products';

	async create(data: IProductForm) {
		try {
			const res = await axios.post<Product>(this.URL, data);
			return res.data;
		} catch (error) {
			throw error;
		}
	}

	async update(data: Partial<IProductForm>, id: number) {
		try {
			const res = await axios.patch<Product>(`${this.URL}/${id}`, data);
			return res.data;
		} catch (error) {
			throw error;
		}
	}

	async remove(id: number) {
		try {
			const res = await axios.delete<Product>(`${this.URL}/${id}`);
			return res.data;
		} catch (error) {
			throw error;
		}
	}

	async getAll(params?: IParams) {
		try {
			const res = await axios.get<IProduct[]>(this.URL, { params });
			return res.data;
		} catch (error) {
			throw error;
		}
	}
}

export const productService = new ProductService();
