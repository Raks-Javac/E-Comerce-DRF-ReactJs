export interface User {
    id: number;
    username: string;
    email: string;
    first_name: string;
    last_name: string;
    phone?: string;
    address?: string;
    date_joined: string;
}

export interface Category {
    id: number;
    name: string;
    description: string;
    created_at: string;
    product_count: number;
}

export interface Product {
    id: number;
    name: string;
    description: string;
    price: string;
    category_name: string;
    image?: string;
    is_in_stock: boolean;
    average_rating: number;
    review_count: number;
    stock_quantity?: number;
    created_at?: string;
}

export interface ProductDetail extends Product {
    category: Category;
    images: ProductImage[];
    reviews: Review[];
}

export interface ProductImage {
    id: number;
    image: string;
    alt_text: string;
}

export interface Review {
    id: number;
    user: number;
    user_name: string;
    rating: number;
    comment: string;
    created_at: string;
}

export interface CartItem {
    id: number;
    product: Product;
    quantity: number;
    total_price: string;
    created_at: string;
}

export interface Cart {
    id: number;
    items: CartItem[];
    total_price: string;
    total_items: number;
    created_at: string;
    updated_at: string;
}

export interface OrderItem {
    id: number;
    product: Product;
    quantity: number;
    price: string;
    total_price: string;
}

export interface Order {
    id: number;
    order_number: string;
    user: number;
    user_name: string;
    total_amount: string;
    status: string;
    shipping_address: string;
    phone: string;
    items: OrderItem[];
    created_at: string;
    updated_at: string;
}

export interface LoginRequest {
    email: string;
    password: string;
}

export interface RegisterRequest {
    username: string;
    email: string;
    first_name: string;
    last_name: string;
    phone?: string;
    address?: string;
    password: string;
    password_confirm: string;
}

export interface AuthResponse {
    user: User;
    access: string;
    refresh: string;
    message: string;
}
