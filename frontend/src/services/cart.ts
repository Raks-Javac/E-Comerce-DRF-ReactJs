import { Cart } from '../types';
import api from './api';

export const cartService = {
    getCart: async (): Promise<Cart> => {
        const response = await api.get('/cart/');
        return response.data;
    },

    addToCart: async (productId: number, quantity: number = 1): Promise<{ message: string; cart: Cart }> => {
        const response = await api.post('/cart/add/', { product_id: productId, quantity });
        return response.data;
    },

    updateCartItem: async (itemId: number, quantity: number): Promise<{ message: string; cart: Cart }> => {
        const response = await api.put(`/cart/update/${itemId}/`, { quantity });
        return response.data;
    },

    removeFromCart: async (itemId: number): Promise<{ message: string; cart: Cart }> => {
        const response = await api.delete(`/cart/remove/${itemId}/`);
        return response.data;
    },

    clearCart: async (): Promise<{ message: string; cart: Cart }> => {
        const response = await api.delete('/cart/clear/');
        return response.data;
    },
};
