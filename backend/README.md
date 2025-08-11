# 🔧 Backend API - Django REST Framework

The backend API for the E-Commerce platform built with Django REST Framework.

## 🛠️ **Tech Stack**

- **Framework**: Django 4.2.23
- **API**: Django REST Framework 3.16.1
- **Database**: PostgreSQL (Production) / SQLite (Development)
- **Authentication**: JWT (djangorestframework-simplejwt)
- **Documentation**: drf-spectacular (OpenAPI 3.0)
- **CORS**: django-cors-headers
- **Image Handling**: Pillow

## 📁 **Project Structure**

```
backend/
├── ecommerce_backend/      # Main Django project
│   ├── settings.py        # Django settings
│   ├── urls.py           # Main URL configuration
│   └── wsgi.py           # WSGI application
├── accounts/             # User authentication app
│   ├── models.py         # User model
│   ├── views.py          # Authentication views
│   ├── serializers.py    # User serializers
│   └── urls.py           # Auth endpoints
├── products/             # Product management app
│   ├── models.py         # Product and Category models
│   ├── views.py          # Product views
│   ├── serializers.py    # Product serializers
│   └── urls.py           # Product endpoints
├── cart/                 # Shopping cart app
│   ├── models.py         # Cart and CartItem models
│   ├── views.py          # Cart views
│   └── urls.py           # Cart endpoints
├── orders/               # Order management app
│   ├── models.py         # Order and OrderItem models
│   ├── views.py          # Order views
│   └── urls.py           # Order endpoints
├── media/                # User uploaded files
├── requirements.txt      # Python dependencies
└── manage.py            # Django management script
```

## 🔌 **API Endpoints**

### **Authentication Endpoints**
```
POST   /api/auth/register/     # User registration
POST   /api/auth/login/        # User login
POST   /api/auth/refresh/      # Token refresh
POST   /api/auth/logout/       # User logout
GET    /api/auth/user/         # Get current user
PUT    /api/auth/user/         # Update user profile
POST   /api/auth/change-password/  # Change password
```

### **Product Endpoints**
```
GET    /api/products/          # List all products (paginated)
POST   /api/products/          # Create product (admin only)
GET    /api/products/{id}/     # Get product details
PUT    /api/products/{id}/     # Update product (admin only)
DELETE /api/products/{id}/     # Delete product (admin only)
GET    /api/products/search/?q={query}  # Search products
```

### **Category Endpoints**
```
GET    /api/categories/        # List all categories
POST   /api/categories/        # Create category (admin only)
GET    /api/categories/{id}/   # Get category details
PUT    /api/categories/{id}/   # Update category (admin only)
DELETE /api/categories/{id}/   # Delete category (admin only)
```

### **Cart Endpoints**
```
GET    /api/cart/             # Get user's cart
POST   /api/cart/add/         # Add item to cart
PUT    /api/cart/update/{id}/ # Update cart item quantity
DELETE /api/cart/remove/{id}/ # Remove item from cart
DELETE /api/cart/clear/       # Clear entire cart
```

### **Order Endpoints**
```
GET    /api/orders/           # List user's orders
POST   /api/orders/           # Create new order
GET    /api/orders/{id}/      # Get order details
PUT    /api/orders/{id}/status/  # Update order status (admin only)
```

### **Documentation**
```
GET    /api/docs/             # Swagger UI
GET    /api/redoc/            # ReDoc UI
GET    /api/schema/           # OpenAPI schema
```

## 🗃️ **Database Models**

### **User Model (accounts/models.py)**
```python
class User(AbstractUser):
    email = EmailField(unique=True)
    first_name = CharField(max_length=30)
    last_name = CharField(max_length=30)
    phone_number = CharField(max_length=15, blank=True)
    address = TextField(blank=True)
    created_at = DateTimeField(auto_now_add=True)
```

### **Product Model (products/models.py)**
```python
class Category(Model):
    name = CharField(max_length=100, unique=True)
    description = TextField(blank=True)
    created_at = DateTimeField(auto_now_add=True)

class Product(Model):
    name = CharField(max_length=200)
    description = TextField()
    price = DecimalField(max_digits=10, decimal_places=2)
    category = ForeignKey(Category)
    stock_quantity = PositiveIntegerField()
    image = ImageField(upload_to='products/')
    created_at = DateTimeField(auto_now_add=True)
```

### **Cart Model (cart/models.py)**
```python
class Cart(Model):
    user = OneToOneField(User)
    created_at = DateTimeField(auto_now_add=True)

class CartItem(Model):
    cart = ForeignKey(Cart)
    product = ForeignKey(Product)
    quantity = PositiveIntegerField(default=1)
```

### **Order Model (orders/models.py)**
```python
class Order(Model):
    user = ForeignKey(User)
    total_amount = DecimalField(max_digits=10, decimal_places=2)
    status = CharField(max_length=20, choices=STATUS_CHOICES)
    shipping_address = TextField()
    created_at = DateTimeField(auto_now_add=True)

class OrderItem(Model):
    order = ForeignKey(Order)
    product = ForeignKey(Product)
    quantity = PositiveIntegerField()
    price = DecimalField(max_digits=10, decimal_places=2)
```

## 🔐 **Authentication**

The API uses JWT (JSON Web Tokens) for authentication:

1. **Login**: POST to `/api/auth/login/` with credentials
2. **Response**: Receive `access` and `refresh` tokens
3. **Usage**: Include `Authorization: Bearer <access_token>` in headers
4. **Refresh**: Use refresh token to get new access token when expired

## ⚙️ **Setup Instructions**

### **1. Environment Setup**
```bash
# Create virtual environment
python -m venv .venv
source .venv/bin/activate  # On Windows: .venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt
```

### **2. Environment Variables**
Create a `.env` file in the backend directory:
```env
SECRET_KEY=your-secret-key-here
DEBUG=True
DATABASE_URL=sqlite:///db.sqlite3
CORS_ALLOWED_ORIGINS=http://localhost:3000
```

### **3. Database Setup**
```bash
# Run migrations
python manage.py migrate

# Create superuser
python manage.py createsuperuser

# Load sample data (optional)
python manage.py loaddata fixtures/sample_data.json
```

### **4. Run Development Server**
```bash
python manage.py runserver
```

The API will be available at `http://localhost:8000`

## 🧪 **Testing**

### **Run Tests**
```bash
# Run all tests
python manage.py test

# Run specific app tests
python manage.py test accounts
python manage.py test products
python manage.py test cart
python manage.py test orders

# Run with coverage
pip install coverage
coverage run --source='.' manage.py test
coverage report
```

### **API Testing**
- **Swagger UI**: `http://localhost:8000/api/docs/`
- **ReDoc**: `http://localhost:8000/api/redoc/`
- **Admin Panel**: `http://localhost:8000/admin/`

## 📦 **Dependencies**

### **Core Dependencies**
```
Django==4.2.23
djangorestframework==3.16.1
djangorestframework-simplejwt==5.3.0
django-cors-headers==4.4.0
drf-spectacular==0.27.2
Pillow==10.0.1
python-decouple==3.8
```

### **Production Dependencies**
```
gunicorn==21.2.0
psycopg2-binary==2.9.7
whitenoise==6.6.0
```

## 🚀 **Deployment**

### **Production Settings**
- Database: PostgreSQL
- Static files: WhiteNoise
- CORS: Configured for frontend domain
- Debug: False
- Allowed hosts: Production domain

### **Environment Variables (Production)**
```env
SECRET_KEY=production-secret-key
DEBUG=False
DATABASE_URL=postgresql://user:password@host:port/database
CORS_ALLOWED_ORIGINS=https://your-frontend-domain.com
ALLOWED_HOSTS=your-backend-domain.com
```

## 🔧 **Development Guidelines**

### **Code Style**
- Follow PEP 8
- Use meaningful variable names
- Add docstrings to functions and classes
- Keep functions small and focused

### **API Design**
- RESTful endpoints
- Consistent response format
- Proper HTTP status codes
- Comprehensive error handling

### **Security**
- Input validation on all endpoints
- Proper authentication checks
- CSRF protection
- SQL injection prevention

## 📚 **Additional Resources**

- **Django Documentation**: https://docs.djangoproject.com/
- **DRF Documentation**: https://www.django-rest-framework.org/
- **JWT Documentation**: https://django-rest-framework-simplejwt.readthedocs.io/
- **drf-spectacular**: https://drf-spectacular.readthedocs.io/
