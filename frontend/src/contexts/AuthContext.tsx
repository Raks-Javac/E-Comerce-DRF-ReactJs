import React, { createContext, useContext, useEffect, useReducer } from 'react';
import { authService } from '../services/auth';
import { AuthResponse, User } from '../types';

interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    loading: boolean;
}

interface AuthContextType extends AuthState {
    login: (credentials: { email: string; password: string }) => Promise<void>;
    register: (userData: any) => Promise<void>;
    logout: () => void;
    updateUser: (userData: Partial<User>) => void;
}

type AuthAction =
    | { type: 'SET_LOADING'; payload: boolean }
    | { type: 'SET_USER'; payload: User }
    | { type: 'CLEAR_USER' }
    | { type: 'UPDATE_USER'; payload: Partial<User> };

const initialState: AuthState = {
    user: null,
    isAuthenticated: false,
    loading: true,
};

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
    switch (action.type) {
        case 'SET_LOADING':
            return { ...state, loading: action.payload };
        case 'SET_USER':
            return {
                ...state,
                user: action.payload,
                isAuthenticated: true,
                loading: false,
            };
        case 'CLEAR_USER':
            return {
                ...state,
                user: null,
                isAuthenticated: false,
                loading: false,
            };
        case 'UPDATE_USER':
            return {
                ...state,
                user: state.user ? { ...state.user, ...action.payload } : null,
            };
        default:
            return state;
    }
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

interface AuthProviderProps {
    children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, initialState);

    useEffect(() => {
        const initAuth = async () => {
            const token = localStorage.getItem('access_token');
            if (token) {
                try {
                    const user = await authService.getProfile();
                    dispatch({ type: 'SET_USER', payload: user });
                } catch (error) {
                    localStorage.removeItem('access_token');
                    localStorage.removeItem('refresh_token');
                    dispatch({ type: 'CLEAR_USER' });
                }
            } else {
                dispatch({ type: 'SET_LOADING', payload: false });
            }
        };

        initAuth();
    }, []);

    const login = async (credentials: { email: string; password: string }) => {
        try {
            const response: AuthResponse = await authService.login(credentials);
            localStorage.setItem('access_token', response.access);
            localStorage.setItem('refresh_token', response.refresh);
            dispatch({ type: 'SET_USER', payload: response.user });
        } catch (error) {
            throw error;
        }
    };

    const register = async (userData: any) => {
        try {
            const response: AuthResponse = await authService.register(userData);
            localStorage.setItem('access_token', response.access);
            localStorage.setItem('refresh_token', response.refresh);
            dispatch({ type: 'SET_USER', payload: response.user });
        } catch (error) {
            throw error;
        }
    };

    const logout = async () => {
        try {
            const refreshToken = localStorage.getItem('refresh_token');
            if (refreshToken) {
                await authService.logout(refreshToken);
            }
        } catch (error) {
            console.error('Logout error:', error);
        } finally {
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
            dispatch({ type: 'CLEAR_USER' });
        }
    };

    const updateUser = (userData: Partial<User>) => {
        dispatch({ type: 'UPDATE_USER', payload: userData });
    };

    const value: AuthContextType = {
        ...state,
        login,
        register,
        logout,
        updateUser,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
