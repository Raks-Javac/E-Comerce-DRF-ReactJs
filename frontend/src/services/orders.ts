import { Order } from '../types';
import api from './api';

export const orderService = {
    getOrders: async (): Promise<Order[]> => {
        const response = await api.get('/orders/');
        return response.data.results || response.data;
    },

    getOrder: async (id: number): Promise<Order> => {
        const response = await api.get(`/orders/${id}/`);
        return response.data;
    },

    createOrder: async (orderData: { shipping_address: string; phone: string }): Promise<{ message: string; order: Order }> => {
        const response = await api.post('/orders/create/', orderData);
        return response.data;
    },
};
