import { AuthResponse, LoginRequest, RegisterRequest, User } from '../types';
import api from './api';

export const authService = {
    login: async (credentials: LoginRequest): Promise<AuthResponse> => {
        const response = await api.post('/auth/login/', credentials);
        return response.data;
    },

    register: async (userData: RegisterRequest): Promise<AuthResponse> => {
        const response = await api.post('/auth/register/', userData);
        return response.data;
    },

    logout: async (refreshToken: string): Promise<void> => {
        await api.post('/auth/logout/', { refresh_token: refreshToken });
    },

    getProfile: async (): Promise<User> => {
        const response = await api.get('/auth/profile/');
        return response.data;
    },

    updateProfile: async (userData: Partial<User>): Promise<User> => {
        const response = await api.patch('/auth/profile/', userData);
        return response.data;
    },

    changePassword: async (passwordData: {
        old_password: string;
        new_password: string;
        new_password_confirm: string;
    }): Promise<void> => {
        await api.put('/auth/change-password/', passwordData);
    },
};
