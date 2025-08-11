# ⚛️ Frontend - React TypeScript E-Commerce

The frontend application for the E-Commerce platform built with React and TypeScript.

## 🛠️ **Tech Stack**

- **Framework**: React 18.2.0
- **Language**: TypeScript 4.9.5
- **Styling**: Tailwind CSS 3.3.0
- **Routing**: React Router DOM 6.8.1
- **HTTP Client**: Axios 1.3.4
- **Icons**: Lucide React 0.321.0
- **Build Tool**: Create React App

## 📁 **Project Structure**

```
frontend/
├── public/                 # Static assets
│   ├── index.html         # HTML template
│   └── manifest.json      # PWA manifest
├── src/
│   ├── components/        # Reusable UI components
│   │   ├── common/        # Shared components
│   │   ├── layout/        # Layout components
│   │   └── ui/            # Basic UI elements
│   ├── pages/             # Page components
│   │   ├── auth/          # Authentication pages
│   │   ├── products/      # Product pages
│   │   ├── cart/          # Cart page
│   │   └── orders/        # Order pages
│   ├── hooks/             # Custom React hooks
│   ├── services/          # API service functions
│   ├── context/           # React Context providers
│   ├── types/             # TypeScript type definitions
│   ├── utils/             # Utility functions
│   ├── styles/            # Global styles
│   ├── App.tsx            # Main App component
│   └── index.tsx          # Entry point
├── tailwind.config.js     # Tailwind configuration
├── tsconfig.json          # TypeScript configuration
└── package.json           # Dependencies and scripts
```

## 🎨 **Component Architecture**

### **Layout Components**
```typescript
// src/components/layout/
Header.tsx              # Main navigation header
Footer.tsx              # Site footer
Sidebar.tsx             # Product filter sidebar
Layout.tsx              # Main layout wrapper
```

### **Common Components**
```typescript
// src/components/common/
ProductCard.tsx         # Product display card
LoadingSpinner.tsx      # Loading indicator
ErrorMessage.tsx        # Error display
Pagination.tsx          # Pagination controls
SearchBar.tsx           # Product search
CartIcon.tsx            # Cart indicator
```

### **UI Components**
```typescript
// src/components/ui/
Button.tsx              # Custom button component
Input.tsx               # Form input component
Modal.tsx               # Modal dialog
Toast.tsx               # Notification toast
Badge.tsx               # Status badges
```

## 📄 **Page Components**

### **Authentication Pages**
```typescript
// src/pages/auth/
LoginPage.tsx           # User login
RegisterPage.tsx        # User registration
ProfilePage.tsx         # User profile management
```

### **Product Pages**
```typescript
// src/pages/products/
ProductListPage.tsx     # Product catalog
ProductDetailPage.tsx   # Individual product view
CategoryPage.tsx        # Products by category
SearchResultsPage.tsx   # Search results
```

### **Shopping Pages**
```typescript
// src/pages/cart/
CartPage.tsx            # Shopping cart view
CheckoutPage.tsx        # Order checkout

// src/pages/orders/
OrdersPage.tsx          # Order history
OrderDetailPage.tsx     # Individual order view
```

## 🔗 **API Integration**

### **Service Layer**
```typescript
// src/services/
api.ts                  # Axios configuration
authService.ts          # Authentication API calls
productService.ts       # Product API calls
cartService.ts          # Cart API calls
orderService.ts         # Order API calls
```

### **API Service Example**
```typescript
// src/services/productService.ts
export const productService = {
  getProducts: (params?: ProductParams) => 
    api.get<ProductResponse>('/products/', { params }),
  
  getProduct: (id: number) => 
    api.get<Product>(`/products/${id}/`),
  
  searchProducts: (query: string) => 
    api.get<ProductResponse>(`/products/search/?q=${query}`),
};
```

## 🎯 **State Management**

### **Context Providers**
```typescript
// src/context/
AuthContext.tsx         # User authentication state
CartContext.tsx         # Shopping cart state
ProductContext.tsx      # Product data state
```

### **Custom Hooks**
```typescript
// src/hooks/
useAuth.ts              # Authentication hook
useCart.ts              # Cart management hook
useProducts.ts          # Product data hook
useLocalStorage.ts      # Local storage hook
useDebounce.ts          # Debounced input hook
```

### **Context Example**
```typescript
// src/context/AuthContext.tsx
interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (credentials: LoginData) => Promise<void>;
  logout: () => void;
  register: (userData: RegisterData) => Promise<void>;
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
```

## 🎨 **Styling with Tailwind CSS**

### **Design System**
```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
        },
        secondary: {
          500: '#6b7280',
          600: '#4b5563',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
};
```

### **Component Styling Example**
```typescript
// src/components/ui/Button.tsx
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ 
  variant = 'primary', 
  size = 'md', 
  children,
  ...props 
}) => {
  const baseClasses = 'font-medium rounded-lg transition-colors';
  const variants = {
    primary: 'bg-primary-600 text-white hover:bg-primary-700',
    secondary: 'bg-secondary-600 text-white hover:bg-secondary-700',
    outline: 'border border-primary-600 text-primary-600 hover:bg-primary-50'
  };
  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg'
  };

  return (
    <button 
      className={`${baseClasses} ${variants[variant]} ${sizes[size]}`}
      {...props}
    >
      {children}
    </button>
  );
};
```

## 🔒 **Authentication Flow**

### **Protected Routes**
```typescript
// src/components/ProtectedRoute.tsx
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
};
```

### **Token Management**
```typescript
// src/services/api.ts
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // Handle token refresh or logout
      await refreshToken();
    }
    return Promise.reject(error);
  }
);
```

## 🧩 **TypeScript Types**

### **Core Types**
```typescript
// src/types/index.ts
export interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  phone_number?: string;
  address?: string;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: Category;
  stock_quantity: number;
  image: string;
  created_at: string;
}

export interface CartItem {
  id: number;
  product: Product;
  quantity: number;
}

export interface Order {
  id: number;
  user: number;
  total_amount: number;
  status: OrderStatus;
  shipping_address: string;
  created_at: string;
  items: OrderItem[];
}
```

## ⚙️ **Setup Instructions**

### **1. Prerequisites**
- Node.js 16+ 
- npm or yarn package manager

### **2. Installation**
```bash
# Install dependencies
npm install

# Install Tailwind CSS peer dependencies
npm install -D tailwindcss postcss autoprefixer
```

### **3. Environment Variables**
Create a `.env` file in the frontend directory:
```env
REACT_APP_API_URL=http://localhost:8000/api
REACT_APP_MEDIA_URL=http://localhost:8000/media
```

### **4. Development Server**
```bash
# Start development server
npm start
```

The application will be available at `http://localhost:3000`

### **5. Build for Production**
```bash
# Create production build
npm run build

# Preview production build
npx serve -s build
```

## 🧪 **Testing**

### **Test Scripts**
```bash
# Run all tests
npm test

# Run tests with coverage
npm test -- --coverage

# Run tests in watch mode
npm test -- --watch
```

### **Test Structure**
```
src/
├── __tests__/          # Global tests
├── components/
│   └── __tests__/      # Component tests
├── pages/
│   └── __tests__/      # Page tests
└── utils/
    └── __tests__/      # Utility tests
```

## 📦 **Key Dependencies**

### **Core Dependencies**
```json
{
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "typescript": "^4.9.5",
  "react-router-dom": "^6.8.1",
  "axios": "^1.3.4"
}
```

### **UI Dependencies**
```json
{
  "tailwindcss": "^3.3.0",
  "lucide-react": "^0.321.0",
  "@headlessui/react": "^1.7.13"
}
```

### **Development Dependencies**
```json
{
  "@types/react": "^18.0.28",
  "@types/react-dom": "^18.0.11",
  "@typescript-eslint/eslint-plugin": "^5.54.0",
  "prettier": "^2.8.4"
}
```

## 🚀 **Deployment**

### **Static Site Deployment**
The frontend is deployed as a static site using the `build` directory:

```bash
# Build for production
npm run build

# Deploy build directory to hosting service
```

### **Environment Configuration**
```env
# Production Environment Variables
REACT_APP_API_URL=https://your-backend-api.com/api
REACT_APP_MEDIA_URL=https://your-backend-api.com/media
```

## 🎯 **Performance Optimization**

### **Code Splitting**
```typescript
// Lazy load pages
const ProductListPage = lazy(() => import('./pages/products/ProductListPage'));
const CartPage = lazy(() => import('./pages/cart/CartPage'));

// Wrap in Suspense
<Suspense fallback={<LoadingSpinner />}>
  <Routes>
    <Route path="/products" element={<ProductListPage />} />
    <Route path="/cart" element={<CartPage />} />
  </Routes>
</Suspense>
```

### **Image Optimization**
```typescript
// Lazy loading images
const LazyImage: React.FC<{ src: string; alt: string }> = ({ src, alt }) => (
  <img 
    src={src} 
    alt={alt}
    loading="lazy"
    className="w-full h-auto transition-opacity duration-200"
  />
);
```

## 🔧 **Development Guidelines**

### **Component Best Practices**
- Use functional components with hooks
- Implement proper TypeScript typing
- Follow single responsibility principle
- Use custom hooks for complex logic

### **State Management**
- Use Context for global state
- Keep local state in components when possible
- Implement proper error boundaries
- Handle loading states consistently

### **Styling Guidelines**
- Use Tailwind utility classes
- Follow mobile-first responsive design
- Implement consistent spacing scale
- Use semantic color naming

## 📚 **Additional Resources**

- **React Documentation**: https://react.dev/
- **TypeScript Documentation**: https://www.typescriptlang.org/docs/
- **Tailwind CSS Documentation**: https://tailwindcss.com/docs
- **React Router Documentation**: https://reactrouter.com/
- **Axios Documentation**: https://axios-http.com/docs/
