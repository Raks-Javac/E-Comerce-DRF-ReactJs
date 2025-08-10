import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';
import { productService } from '../services/products';
import { ProductDetail as ProductDetailType } from '../types';

const ProductDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [product, setProduct] = useState<ProductDetailType | null>(null);
    const [loading, setLoading] = useState(true);
    const [quantity, setQuantity] = useState(1);
    const [selectedImage, setSelectedImage] = useState<string>('');

    const { addToCart } = useCart();
    const { isAuthenticated } = useAuth();

    useEffect(() => {
        if (id) {
            fetchProduct(parseInt(id));
        }
    }, [id]);

    const fetchProduct = async (productId: number) => {
        try {
            const data = await productService.getProduct(productId);
            setProduct(data);
            setSelectedImage(data.image || '');
        } catch (error) {
            console.error('Error fetching product:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleAddToCart = async () => {
        if (!product) return;

        if (!isAuthenticated) {
            alert('Please login to add items to cart');
            return;
        }

        try {
            await addToCart(product.id, quantity);
            alert('Product added to cart!');
        } catch (error) {
            console.error('Error adding to cart:', error);
            alert('Error adding product to cart');
        }
    };

    const renderStars = (rating: number) => {
        const stars = [];
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;

        for (let i = 0; i < 5; i++) {
            if (i < fullStars) {
                stars.push(
                    <svg key={i} className="w-5 h-5 fill-current text-yellow-500" viewBox="0 0 20 20">
                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                );
            } else if (i === fullStars && hasHalfStar) {
                stars.push(
                    <svg key={i} className="w-5 h-5 fill-current text-yellow-500" viewBox="0 0 20 20">
                        <defs>
                            <linearGradient id="half-fill">
                                <stop offset="50%" stopColor="currentColor" />
                                <stop offset="50%" stopColor="transparent" />
                            </linearGradient>
                        </defs>
                        <path fill="url(#half-fill)" d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                );
            } else {
                stars.push(
                    <svg key={i} className="w-5 h-5 fill-current text-gray-300" viewBox="0 0 20 20">
                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                );
            }
        }
        return stars;
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h2>
                    <p className="text-gray-600">The product you're looking for doesn't exist.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Product Images */}
                <div>
                    <div className="aspect-w-1 aspect-h-1 w-full mb-4">
                        <img
                            src={selectedImage || '/placeholder-image.jpg'}
                            alt={product.name}
                            className="w-full h-96 object-cover rounded-lg"
                        />
                    </div>

                    {product.images && product.images.length > 0 && (
                        <div className="grid grid-cols-4 gap-2">
                            {[product.image, ...product.images.map(img => img.image)].filter(Boolean).map((image, index) => (
                                <button
                                    key={index}
                                    onClick={() => setSelectedImage(image!)}
                                    className={`aspect-w-1 aspect-h-1 rounded-md overflow-hidden ${selectedImage === image ? 'ring-2 ring-primary-500' : ''
                                        }`}
                                >
                                    <img
                                        src={image}
                                        alt={`${product.name} ${index + 1}`}
                                        className="w-full h-20 object-cover"
                                    />
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Product Info */}
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>

                    <div className="flex items-center mb-4">
                        <div className="flex items-center">
                            {renderStars(product.average_rating)}
                        </div>
                        <span className="ml-2 text-sm text-gray-600">
                            ({product.review_count} reviews)
                        </span>
                    </div>

                    <p className="text-gray-600 mb-6">{product.description}</p>

                    <div className="mb-6">
                        <span className="text-3xl font-bold text-primary-600">${product.price}</span>
                    </div>

                    <div className="mb-6">
                        <span className="inline-block bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">
                            {product.category.name}
                        </span>
                    </div>

                    {product.is_in_stock ? (
                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Quantity
                            </label>
                            <div className="flex items-center space-x-3">
                                <button
                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                    className="bg-gray-200 text-gray-800 px-3 py-1 rounded-md hover:bg-gray-300"
                                >
                                    -
                                </button>
                                <span className="text-lg font-medium">{quantity}</span>
                                <button
                                    onClick={() => setQuantity(quantity + 1)}
                                    className="bg-gray-200 text-gray-800 px-3 py-1 rounded-md hover:bg-gray-300"
                                >
                                    +
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="mb-6">
                            <span className="bg-red-100 text-red-800 px-3 py-2 rounded-md text-sm">
                                Out of Stock
                            </span>
                        </div>
                    )}

                    {product.is_in_stock && (
                        <button
                            onClick={handleAddToCart}
                            className="w-full bg-primary-600 text-white px-6 py-3 rounded-md hover:bg-primary-700 transition-colors font-medium"
                        >
                            Add to Cart
                        </button>
                    )}
                </div>
            </div>

            {/* Reviews Section */}
            {product.reviews && product.reviews.length > 0 && (
                <div className="mt-16">
                    <h2 className="text-2xl font-bold text-gray-900 mb-8">Customer Reviews</h2>
                    <div className="space-y-6">
                        {product.reviews.map((review) => (
                            <div key={review.id} className="bg-gray-50 p-6 rounded-lg">
                                <div className="flex items-center justify-between mb-4">
                                    <div>
                                        <h4 className="font-medium text-gray-900">{review.user_name}</h4>
                                        <div className="flex items-center mt-1">
                                            {renderStars(review.rating)}
                                        </div>
                                    </div>
                                    <span className="text-sm text-gray-500">
                                        {new Date(review.created_at).toLocaleDateString()}
                                    </span>
                                </div>
                                <p className="text-gray-700">{review.comment}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductDetail;
