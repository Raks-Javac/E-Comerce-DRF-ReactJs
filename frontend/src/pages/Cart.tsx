import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';

const Cart: React.FC = () => {
    const { cart, updateCartItem, removeFromCart, clearCart, loading } = useCart();

    const handleQuantityChange = async (itemId: number, newQuantity: number) => {
        try {
            await updateCartItem(itemId, newQuantity);
        } catch (error) {
            console.error('Error updating cart item:', error);
            alert('Error updating cart item');
        }
    };

    const handleRemoveItem = async (itemId: number) => {
        try {
            await removeFromCart(itemId);
        } catch (error) {
            console.error('Error removing cart item:', error);
            alert('Error removing cart item');
        }
    };

    const handleClearCart = async () => {
        if (window.confirm('Are you sure you want to clear your cart?')) {
            try {
                await clearCart();
            } catch (error) {
                console.error('Error clearing cart:', error);
                alert('Error clearing cart');
            }
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
            </div>
        );
    }

    if (!cart || cart.items.length === 0) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <svg className="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 1.5M7 13l-1.5-1.5M20 13v6a2 2 0 01-2 2H6a2 2 0 01-2-2v-6" />
                    </svg>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
                    <p className="text-gray-600 mb-8">Start shopping to add items to your cart.</p>
                    <Link
                        to="/products"
                        className="bg-primary-600 text-white px-6 py-3 rounded-md hover:bg-primary-700 transition-colors"
                    >
                        Continue Shopping
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>
                <button
                    onClick={handleClearCart}
                    className="text-red-600 hover:text-red-800 transition-colors"
                >
                    Clear Cart
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Cart Items */}
                <div className="lg:col-span-2">
                    <div className="bg-white rounded-lg shadow-md">
                        {cart.items.map((item) => (
                            <div key={item.id} className="flex items-center p-6 border-b border-gray-200 last:border-b-0">
                                <div className="flex-shrink-0 w-20 h-20 bg-gray-200 rounded-md overflow-hidden">
                                    {item.product.image ? (
                                        <img
                                            src={item.product.image}
                                            alt={item.product.name}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <div className="flex items-center justify-center h-full">
                                            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                        </div>
                                    )}
                                </div>

                                <div className="ml-4 flex-1">
                                    <h3 className="text-lg font-medium text-gray-900">
                                        <Link to={`/products/${item.product.id}`} className="hover:text-primary-600">
                                            {item.product.name}
                                        </Link>
                                    </h3>
                                    <p className="text-sm text-gray-600">{item.product.category_name}</p>
                                    <p className="text-lg font-medium text-primary-600">${item.product.price}</p>
                                </div>

                                <div className="flex items-center space-x-4">
                                    <div className="flex items-center space-x-2">
                                        <button
                                            onClick={() => handleQuantityChange(item.id, Math.max(1, item.quantity - 1))}
                                            className="bg-gray-200 text-gray-800 px-2 py-1 rounded-md hover:bg-gray-300 text-sm"
                                        >
                                            -
                                        </button>
                                        <span className="text-lg font-medium min-w-[2rem] text-center">{item.quantity}</span>
                                        <button
                                            onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                                            className="bg-gray-200 text-gray-800 px-2 py-1 rounded-md hover:bg-gray-300 text-sm"
                                        >
                                            +
                                        </button>
                                    </div>

                                    <div className="text-lg font-medium text-gray-900 min-w-[4rem] text-right">
                                        ${item.total_price}
                                    </div>

                                    <button
                                        onClick={() => handleRemoveItem(item.id)}
                                        className="text-red-600 hover:text-red-800 transition-colors p-1"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Order Summary */}
                <div className="lg:col-span-1">
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h2 className="text-xl font-bold text-gray-900 mb-4">Order Summary</h2>

                        <div className="space-y-2 mb-4">
                            <div className="flex justify-between">
                                <span className="text-gray-600">Subtotal ({cart.total_items} items)</span>
                                <span className="font-medium">${cart.total_price}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Shipping</span>
                                <span className="font-medium">Free</span>
                            </div>
                            <div className="border-t border-gray-200 pt-2">
                                <div className="flex justify-between">
                                    <span className="text-lg font-bold">Total</span>
                                    <span className="text-lg font-bold text-primary-600">${cart.total_price}</span>
                                </div>
                            </div>
                        </div>

                        <Link
                            to="/checkout"
                            className="w-full bg-primary-600 text-white px-6 py-3 rounded-md hover:bg-primary-700 transition-colors font-medium text-center block"
                        >
                            Proceed to Checkout
                        </Link>

                        <Link
                            to="/products"
                            className="w-full bg-gray-100 text-gray-900 px-6 py-3 rounded-md hover:bg-gray-200 transition-colors font-medium text-center block mt-3"
                        >
                            Continue Shopping
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
