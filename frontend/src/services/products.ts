import { Category, Product, ProductDetail } from '../types';
import api from './api';

export const productService = {
    getProducts: async (params?: {
        category?: string;
        search?: string;
        min_price?: number;
        max_price?: number;
        ordering?: string;
        page?: number;
    }): Promise<{ results: Product[]; count: number; next?: string; previous?: string }> => {
        const response = await api.get('/products/', { params });
        return response.data;
    },

    getProduct: async (id: number): Promise<ProductDetail> => {
        const response = await api.get(`/products/${id}/`);
        return response.data;
    },

    getCategories: async (): Promise<Category[]> => {
        const response = await api.get('/categories/');
        return response.data;
    },

    getFeaturedProducts: async (): Promise<Product[]> => {
        const response = await api.get('/products/featured/');
        return response.data;
    },

    searchProducts: async (query: string): Promise<Product[]> => {
        const response = await api.get('/products/search/', { params: { q: query } });
        return response.data;
    },

    addReview: async (productId: number, reviewData: { rating: number; comment: string }) => {
        const response = await api.post(`/products/${productId}/reviews/`, reviewData);
        return response.data;
    },
};
