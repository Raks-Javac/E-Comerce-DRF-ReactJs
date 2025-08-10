import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';

const Header: React.FC = () => {
    const { user, isAuthenticated, logout } = useAuth();
    const { cart } = useCart();
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const cartItemCount = cart?.total_items || 0;

    return (
        <header className="bg-white shadow-md sticky top-0 z-50">
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <Link to="/" className="flex-shrink-0 flex items-center">
                            <span className="text-2xl font-bold text-primary-600">ECommerce</span>
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        <Link to="/" className="text-gray-700 hover:text-primary-600 transition-colors">
                            Home
                        </Link>
                        <Link to="/products" className="text-gray-700 hover:text-primary-600 transition-colors">
                            Products
                        </Link>
                        <Link to="/categories" className="text-gray-700 hover:text-primary-600 transition-colors">
                            Categories
                        </Link>

                        {isAuthenticated ? (
                            <div className="flex items-center space-x-4">
                                <Link to="/cart" className="relative p-2 text-gray-700 hover:text-primary-600 transition-colors">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 1.5M7 13l-1.5-1.5M20 13v6a2 2 0 01-2 2H6a2 2 0 01-2-2v-6" />
                                    </svg>
                                    {cartItemCount > 0 && (
                                        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                            {cartItemCount}
                                        </span>
                                    )}
                                </Link>
                                <Link to="/orders" className="text-gray-700 hover:text-primary-600 transition-colors">
                                    Orders
                                </Link>
                                <div className="relative">
                                    <button
                                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                                        className="flex items-center text-gray-700 hover:text-primary-600 transition-colors"
                                    >
                                        <span className="mr-2">Hello, {user?.first_name}</span>
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </button>
                                    {isMenuOpen && (
                                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                                            <Link
                                                to="/profile"
                                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                onClick={() => setIsMenuOpen(false)}
                                            >
                                                Profile
                                            </Link>
                                            <button
                                                onClick={handleLogout}
                                                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                            >
                                                Logout
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ) : (
                            <div className="flex items-center space-x-4">
                                <Link
                                    to="/login"
                                    className="text-gray-700 hover:text-primary-600 transition-colors"
                                >
                                    Login
                                </Link>
                                <Link
                                    to="/register"
                                    className="bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700 transition-colors"
                                >
                                    Sign Up
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="text-gray-700 hover:text-primary-600"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Mobile Navigation */}
                {isMenuOpen && (
                    <div className="md:hidden py-4 border-t border-gray-200">
                        <div className="flex flex-col space-y-4">
                            <Link to="/" className="text-gray-700 hover:text-primary-600 transition-colors">
                                Home
                            </Link>
                            <Link to="/products" className="text-gray-700 hover:text-primary-600 transition-colors">
                                Products
                            </Link>
                            <Link to="/categories" className="text-gray-700 hover:text-primary-600 transition-colors">
                                Categories
                            </Link>

                            {isAuthenticated ? (
                                <>
                                    <Link to="/cart" className="flex items-center text-gray-700 hover:text-primary-600 transition-colors">
                                        Cart
                                        {cartItemCount > 0 && (
                                            <span className="ml-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                                {cartItemCount}
                                            </span>
                                        )}
                                    </Link>
                                    <Link to="/orders" className="text-gray-700 hover:text-primary-600 transition-colors">
                                        Orders
                                    </Link>
                                    <Link to="/profile" className="text-gray-700 hover:text-primary-600 transition-colors">
                                        Profile
                                    </Link>
                                    <button
                                        onClick={handleLogout}
                                        className="text-left text-gray-700 hover:text-primary-600 transition-colors"
                                    >
                                        Logout
                                    </button>
                                </>
                            ) : (
                                <>
                                    <Link to="/login" className="text-gray-700 hover:text-primary-600 transition-colors">
                                        Login
                                    </Link>
                                    <Link to="/register" className="text-gray-700 hover:text-primary-600 transition-colors">
                                        Sign Up
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                )}
            </nav>
        </header>
    );
};

export default Header;
