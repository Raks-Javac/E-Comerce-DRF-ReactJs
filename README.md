# 🛒 **E-Commerce Platform - Django REST + React TypeScript**

A full-stack e-commerce application with Django REST Framework backend and React TypeScript frontend.

## 🚀 **Live Demo**

- **Frontend**: [https://your-project-name.onrender.com](https://your-project-name.onrender.com)
- **Backend API**: [https://your-project-name.onrender.com](https://your-project-name.onrender.com)
- **API Documentation**: [https://your-project-name.onrender.com/api/docs/](https://your-project-name.onrender.com/api/docs/)

## ✨ **Features**

- 🔐 **User Authentication** - JWT-based login/register with profile management
- 🛍️ **Product Catalog** - Browse products with categories, search, and pagination
- 🛒 **Shopping Cart** - Add/remove items with quantity management
- 📦 **Order Management** - Place orders and track order history
- 👨‍💼 **Admin Panel** - Product and category management
- 📱 **Responsive Design** - Mobile-first design with Tailwind CSS
- 🔍 **Search & Filter** - Product search and category filtering
- 📄 **API Documentation** - Auto-generated Swagger/ReDoc documentation

## 🛠️ **Tech Stack**

### **Backend (Django REST Framework)**
```
🔧 Django 4.2.23               # Web framework
🌐 Django REST Framework 3.16.1 # API framework
🔐 JWT Authentication          # Token-based auth
🗃️ PostgreSQL / SQLite        # Database
📚 drf-spectacular             # API documentation
🖼️ Pillow                     # Image handling
```

### **Frontend (React TypeScript)**
```
⚛️ React 18.2.0               # UI framework
📘 TypeScript 4.9.5           # Type safety
🎨 Tailwind CSS 3.3.0         # Styling
🚦 React Router 6.8.1         # Client-side routing
📡 Axios 1.3.4                # HTTP client
🎯 Lucide React               # Icons
```

## 📁 **Project Structure**

```
e_commerce/
├── backend/                    # Django REST API
│   ├── ecommerce_backend/     # Main Django project
│   ├── accounts/              # User authentication
│   ├── products/              # Product management
│   ├── cart/                  # Shopping cart
│   ├── orders/                # Order management
│   ├── media/                 # Uploaded files
│   └── requirements.txt       # Python dependencies
├── frontend/                   # React TypeScript app
│   ├── src/
│   │   ├── components/        # UI components
│   │   ├── pages/             # Page components
│   │   ├── services/          # API services
│   │   ├── context/           # React Context
│   │   ├── hooks/             # Custom hooks
│   │   └── types/             # TypeScript types
│   ├── public/                # Static assets
│   └── package.json           # Node dependencies
└── render.yaml                # Deployment config
```

---

## 🔧 **Backend Documentation**

### **API Endpoints Overview**

#### **Authentication**
```bash
POST /api/auth/register/        # User registration
POST /api/auth/login/           # User login
POST /api/auth/refresh/         # Token refresh
GET  /api/auth/user/            # Get current user
PUT  /api/auth/user/            # Update profile
```

#### **Products & Categories**
```bash
GET    /api/products/           # List products (paginated)
GET    /api/products/{id}/      # Product details
GET    /api/products/search/    # Search products
GET    /api/categories/         # List categories
POST   /api/products/           # Create product (admin)
```

#### **Shopping Cart**
```bash
GET    /api/cart/               # Get user's cart
POST   /api/cart/add/           # Add item to cart
PUT    /api/cart/update/{id}/   # Update quantity
DELETE /api/cart/remove/{id}/   # Remove item
DELETE /api/cart/clear/         # Clear cart
```

#### **Orders**
```bash
GET  /api/orders/               # List user orders
POST /api/orders/               # Create new order
GET  /api/orders/{id}/          # Order details
PUT  /api/orders/{id}/status/   # Update status (admin)
```

### **Database Models**

#### **Core Models**
```python
# User Model (Extended AbstractUser)
User: email, first_name, last_name, phone_number, address

# Product Model
Product: name, description, price, category, stock_quantity, image

# Cart Model
Cart: user, created_at
CartItem: cart, product, quantity

# Order Model
Order: user, total_amount, status, shipping_address
OrderItem: order, product, quantity, price
```

### **Backend Setup**

```bash
# 1. Create virtual environment
python -m venv .venv
source .venv/bin/activate

# 2. Install dependencies
cd backend
pip install -r requirements.txt

# 3. Environment variables (.env)
SECRET_KEY=your-secret-key
DEBUG=True
DATABASE_URL=sqlite:///db.sqlite3
CORS_ALLOWED_ORIGINS=http://localhost:3000

# 4. Database setup
python manage.py migrate
python manage.py createsuperuser

# 5. Run development server
python manage.py runserver
```

**Backend runs on**: `http://localhost:8000`

---

## ⚛️ **Frontend Documentation**

### **Component Architecture**

#### **Layout Components**
```typescript
Header.tsx              # Navigation with cart icon
Footer.tsx              # Site footer
Sidebar.tsx             # Product filters
Layout.tsx              # Main wrapper
```

#### **Page Components**
```typescript
# Authentication
LoginPage.tsx           # User login
RegisterPage.tsx        # User registration
ProfilePage.tsx         # User profile

# Products
ProductListPage.tsx     # Product catalog
ProductDetailPage.tsx   # Product details
CategoryPage.tsx        # Category products

# Shopping
CartPage.tsx            # Shopping cart
CheckoutPage.tsx        # Order checkout
OrdersPage.tsx          # Order history
```

### **State Management**

#### **Context Providers**
```typescript
AuthContext.tsx         # User authentication state
CartContext.tsx         # Shopping cart state
ProductContext.tsx      # Product data state
```

#### **Custom Hooks**
```typescript
useAuth()              # Authentication management
useCart()              # Cart operations
useProducts()          # Product data fetching
useLocalStorage()      # Local storage utilities
```

### **API Integration**

#### **Service Layer**
```typescript
// src/services/
authService.ts         # Authentication API calls
productService.ts      # Product API calls
cartService.ts         # Cart API calls
orderService.ts        # Order API calls
```

#### **TypeScript Types**
```typescript
interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
}

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: Category;
  stock_quantity: number;
  image: string;
}

interface CartItem {
  id: number;
  product: Product;
  quantity: number;
}
```

### **Frontend Setup**

```bash
# 1. Install dependencies
cd frontend
npm install

# 2. Environment variables (.env)
REACT_APP_API_URL=http://localhost:8000/api
REACT_APP_MEDIA_URL=http://localhost:8000/media

# 3. Start development server
npm start

# 4. Build for production
npm run build
```

**Frontend runs on**: `http://localhost:3000`

---

## 🚀 **Quick Start Guide**

### **1. Clone Repository**
```bash
git clone https://github.com/Raks-Javac/E-Comerce-DRF-ReactJs.git
cd E-Comerce-DRF-ReactJs
```

### **2. Backend Setup**
```bash
# Setup virtual environment
python -m venv .venv
source .venv/bin/activate  # Linux/Mac
# .venv\Scripts\activate     # Windows

# Install and run backend
cd backend
pip install -r requirements.txt
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver
```

### **3. Frontend Setup** (In new terminal)
```bash
# Install and run frontend
cd frontend
npm install
npm start
```

### **4. Access Application**
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000
- **Admin Panel**: http://localhost:8000/admin
- **API Docs**: http://localhost:8000/api/docs/

---

## 🌐 **Deployment**

### **Backend Deployment (Render Web Service)**
- **Service Type**: Web Service
- **Build Command**: `pip install -r requirements.txt`
- **Start Command**: `gunicorn ecommerce_backend.wsgi:application`
- **Environment**: Python 3.11

### **Frontend Deployment (Render Static Site)**
- **Service Type**: Static Site
- **Build Command**: `npm install && npm run build`
- **Publish Directory**: `build`
- **Node Version**: 18+

### **Environment Variables (Production)**
```bash
# Backend
SECRET_KEY=production-secret-key
DEBUG=False
DATABASE_URL=postgresql://...
CORS_ALLOWED_ORIGINS=https://your-frontend-domain.com

# Frontend
REACT_APP_API_URL=https://your-backend-api.com/api
REACT_APP_MEDIA_URL=https://your-backend-api.com/media
```

---

## 📊 **API Documentation**

The API provides comprehensive documentation through:

- **Swagger UI**: Interactive API documentation at `/api/docs/`
- **ReDoc**: Alternative documentation at `/api/redoc/`
- **OpenAPI Schema**: JSON schema at `/api/schema/`

### **Authentication Flow**
1. **Register/Login** → Receive JWT tokens
2. **Include Token** → `Authorization: Bearer <token>` in headers
3. **Auto-Refresh** → Frontend handles token refresh automatically

---

## 🧪 **Testing**

### **Backend Tests**
```bash
cd backend
python manage.py test                    # Run all tests
python manage.py test accounts          # Test specific app
coverage run --source='.' manage.py test # With coverage
```

### **Frontend Tests**
```bash
cd frontend
npm test                    # Run all tests
npm test -- --coverage     # With coverage
npm test -- --watch        # Watch mode
```

---

## 🤝 **Contributing**

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

---

## 📄 **License**

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 📞 **Contact**

- **GitHub**: [@Raks-Javac](https://github.com/Raks-Javac)
- **Repository**: [E-Comerce-DRF-ReactJs](https://github.com/Raks-Javac/E-Comerce-DRF-ReactJs)

---

## 🎯 **Detailed Documentation**

For comprehensive documentation, check out:
- **Backend Documentation**: [`/backend/README.md`](./backend/README.md)
- **Frontend Documentation**: [`/frontend/README.md`](./frontend/README.md)
