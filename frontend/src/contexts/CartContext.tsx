import React, { createContext, useCallback, useContext, useEffect, useReducer } from 'react';
import { cartService } from '../services/cart';
import { Cart } from '../types';
import { useAuth } from './AuthContext';

interface CartState {
    cart: Cart | null;
    loading: boolean;
}

interface CartContextType extends CartState {
    addToCart: (productId: number, quantity?: number) => Promise<void>;
    updateCartItem: (itemId: number, quantity: number) => Promise<void>;
    removeFromCart: (itemId: number) => Promise<void>;
    clearCart: () => Promise<void>;
    refreshCart: () => Promise<void>;
}

type CartAction =
    | { type: 'SET_LOADING'; payload: boolean }
    | { type: 'SET_CART'; payload: Cart }
    | { type: 'CLEAR_CART' };

const initialState: CartState = {
    cart: null,
    loading: false,
};

const cartReducer = (state: CartState, action: CartAction): CartState => {
    switch (action.type) {
        case 'SET_LOADING':
            return { ...state, loading: action.payload };
        case 'SET_CART':
            return { ...state, cart: action.payload, loading: false };
        case 'CLEAR_CART':
            return { ...state, cart: null, loading: false };
        default:
            return state;
    }
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};

interface CartProviderProps {
    children: React.ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
    const [state, dispatch] = useReducer(cartReducer, initialState);
    const { isAuthenticated } = useAuth();

    const refreshCart = useCallback(async () => {
        if (isAuthenticated) {
            try {
                dispatch({ type: 'SET_LOADING', payload: true });
                const cart = await cartService.getCart();
                dispatch({ type: 'SET_CART', payload: cart });
            } catch (error) {
                console.error('Error fetching cart:', error);
                dispatch({ type: 'CLEAR_CART' });
            }
        } else {
            dispatch({ type: 'CLEAR_CART' });
        }
    }, [isAuthenticated]);

    useEffect(() => {
        refreshCart();
    }, [isAuthenticated, refreshCart]);

    const addToCart = async (productId: number, quantity: number = 1) => {
        try {
            const response = await cartService.addToCart(productId, quantity);
            dispatch({ type: 'SET_CART', payload: response.cart });
        } catch (error) {
            throw error;
        }
    };

    const updateCartItem = async (itemId: number, quantity: number) => {
        try {
            const response = await cartService.updateCartItem(itemId, quantity);
            dispatch({ type: 'SET_CART', payload: response.cart });
        } catch (error) {
            throw error;
        }
    };

    const removeFromCart = async (itemId: number) => {
        try {
            const response = await cartService.removeFromCart(itemId);
            dispatch({ type: 'SET_CART', payload: response.cart });
        } catch (error) {
            throw error;
        }
    };

    const clearCart = async () => {
        try {
            const response = await cartService.clearCart();
            dispatch({ type: 'SET_CART', payload: response.cart });
        } catch (error) {
            throw error;
        }
    };

    const value: CartContextType = {
        ...state,
        addToCart,
        updateCartItem,
        removeFromCart,
        clearCart,
        refreshCart,
    };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
