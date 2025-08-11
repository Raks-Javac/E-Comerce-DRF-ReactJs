# E-Commerce API Documentation 📚

## Swagger/OpenAPI Documentation

Your Django REST Framework API now includes comprehensive **Swagger documentation** with interactive API exploration!

## 🔗 Documentation URLs

### Local Development
- **Swagger UI**: http://localhost:8000/api/docs/
- **ReDoc**: http://localhost:8000/api/redoc/
- **OpenAPI Schema**: http://localhost:8000/api/schema/

### Production
- **Swagger UI**: https://e-comerce-drf-reactjs.onrender.com/api/docs/
- **ReDoc**: https://e-comerce-drf-reactjs.onrender.com/api/redoc/
- **OpenAPI Schema**: https://e-comerce-drf-reactjs.onrender.com/api/schema/

## 📋 API Documentation Features

### 🏷️ Organized by Tags
- **Authentication** - User registration, login, token management
- **Products** - Product catalog, search, filtering
- **Categories** - Product category management
- **Cart** - Shopping cart operations
- **Orders** - Order management and tracking
- **User Profile** - User account management

### 🔐 Authentication Support
- **JWT Bearer Token** authentication
- Interactive "Authorize" button in Swagger UI
- Automatic token inclusion in requests

### 📊 Complete API Coverage
- **Request/Response schemas** for all endpoints
- **Parameter documentation** (query, path, body)
- **Response codes** and error descriptions
- **Example requests and responses**

## 🛠️ How to Use the Documentation

### 1. **Swagger UI** (Recommended)
- Interactive API explorer
- Try out endpoints directly in browser
- Authentication support
- Real-time request/response examples

### 2. **ReDoc**
- Clean, readable documentation
- Perfect for API reference
- Easy navigation and search

### 3. **OpenAPI Schema**
- Raw JSON schema
- Import into Postman, Insomnia, etc.
- Generate client SDKs

## 🚀 Getting Started

### Step 1: Authentication
1. Go to `POST /api/auth/register/` to create an account
2. Or use `POST /api/auth/login/` with existing credentials
3. Copy the `access` token from the response
4. Click **"Authorize"** button in Swagger UI
5. Enter: `Bearer YOUR_ACCESS_TOKEN`

### Step 2: Explore APIs
- Browse all available endpoints
- Read detailed descriptions
- Try requests with sample data
- View response examples

## 📖 API Endpoints Overview

### Authentication (`/api/auth/`)
```
POST /api/auth/register/     - Register new user
POST /api/auth/login/        - User login
POST /api/auth/logout/       - User logout
POST /api/auth/refresh/      - Refresh access token
```

### Products (`/api/`)
```
GET    /api/products/          - List products (with filtering)
POST   /api/products/          - Create product
GET    /api/products/{id}/     - Get product details
PUT    /api/products/{id}/     - Update product
DELETE /api/products/{id}/     - Delete product
GET    /api/products/featured/ - Get featured products
GET    /api/products/search/   - Search products
```

### Categories (`/api/`)
```
GET    /api/categories/        - List categories
POST   /api/categories/        - Create category
GET    /api/categories/{id}/   - Get category details
PUT    /api/categories/{id}/   - Update category
DELETE /api/categories/{id}/   - Delete category
```

### Cart (`/api/cart/`)
```
GET    /api/cart/              - Get user cart
POST   /api/cart/add/          - Add item to cart
PUT    /api/cart/update/{id}/  - Update cart item
DELETE /api/cart/remove/{id}/  - Remove cart item
DELETE /api/cart/clear/        - Clear entire cart
```

### Orders (`/api/orders/`)
```
GET    /api/orders/            - List user orders
POST   /api/orders/            - Create new order
GET    /api/orders/{id}/       - Get order details
```

## 🔧 Advanced Features

### Filtering & Search
Products support advanced filtering:
- **Category**: `?category=1`
- **Price range**: `?min_price=10&max_price=100`
- **Search**: `?search=laptop`
- **Ordering**: `?ordering=-created_at`
- **In stock**: `?in_stock=true`

### Pagination
All list endpoints support pagination:
- **Page size**: 20 items per page
- **Navigation**: `?page=2`
- **Metadata**: `count`, `next`, `previous` in response

### Error Handling
Consistent error responses:
- **400**: Bad Request (validation errors)
- **401**: Unauthorized (authentication required)
- **403**: Forbidden (permission denied)
- **404**: Not Found
- **500**: Internal Server Error

## 🎯 Testing with Swagger UI

### Example: Create a Product
1. **Authenticate** first (get access token)
2. Go to `POST /api/products/`
3. Click **"Try it out"**
4. Fill in the request body:
```json
{
  "name": "Test Product",
  "description": "A test product",
  "price": "29.99",
  "category": 1,
  "stock_quantity": 100
}
```
5. Click **"Execute"**
6. View the response

### Example: Search Products
1. Go to `GET /api/products/`
2. Add parameters:
   - `search`: "laptop"
   - `min_price`: "500"
   - `ordering`: "-price"
3. Execute and see filtered results

## 🛡️ Security Features

- **JWT Authentication** with refresh tokens
- **Permission classes** for endpoint protection
- **Input validation** and sanitization
- **CORS** configuration for frontend integration
- **Content Security Policy** headers

## 📱 Integration Examples

### JavaScript/React
```javascript
// Get products
const response = await fetch('http://localhost:8000/api/products/', {
  headers: {
    'Authorization': `Bearer ${accessToken}`,
    'Content-Type': 'application/json'
  }
});
const products = await response.json();
```

### Python requests
```python
import requests

headers = {
    'Authorization': f'Bearer {access_token}',
    'Content-Type': 'application/json'
}

response = requests.get('http://localhost:8000/api/products/', headers=headers)
products = response.json()
```

## 🔄 Development Workflow

1. **Design API** - Plan endpoints and data models
2. **Implement views** - Add `@extend_schema` decorators
3. **Test locally** - Use Swagger UI at `/api/docs/`
4. **Document changes** - Update API descriptions
5. **Deploy** - Documentation auto-updates

## 🚀 Production Ready

Your API documentation is production-ready with:
- ✅ **Interactive Swagger UI**
- ✅ **Comprehensive endpoint coverage**
- ✅ **Authentication integration**
- ✅ **Request/response examples**
- ✅ **Error code documentation**
- ✅ **Mobile-friendly interface**

Visit your live documentation at: **https://e-comerce-drf-reactjs.onrender.com/api/docs/** 🎉
