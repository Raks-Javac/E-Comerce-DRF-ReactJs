# E-Commerce Application

A full-stack e-commerce web application built with Django REST Framework backend and React TypeScript frontend, featuring JWT authentication, shopping cart functionality, order management, and modern UI design.

## 🚀 Features

### Backend (Django REST Framework)
- **Authentication**: JWT-based user registration and login
- **User Management**: Custom user model with profile management
- **Product Management**: CRUD operations for products with categories
- **Shopping Cart**: Add/remove items, quantity management
- **Order Management**: Complete order processing and history
- **Admin Interface**: Django admin for content management
- **API Documentation**: RESTful API endpoints
- **Database**: PostgreSQL for production, SQLite for development

### Frontend (React TypeScript)
- **Modern UI**: Responsive design with Tailwind CSS
- **Authentication**: Login/register with JWT token management
- **Product Catalog**: Browse products with filtering and search
- **Shopping Cart**: Real-time cart management
- **Order Tracking**: View order history and status
- **User Profile**: Manage account information
- **Private Routes**: Protected pages for authenticated users

## 🛠️ Tech Stack

### Backend
- **Framework**: Django 4.2.23
- **API**: Django REST Framework 3.14.0
- **Authentication**: JWT (djangorestframework-simplejwt)
- **Database**: PostgreSQL (Production), SQLite (Development)
- **CORS**: django-cors-headers
- **Static Files**: whitenoise
- **Server**: Gunicorn (Production)

### Frontend
- **Framework**: React 18.2.0 with TypeScript
- **Styling**: Tailwind CSS 3.4.1
- **Routing**: React Router 6.22.3
- **HTTP Client**: Axios 1.6.8
- **Build Tool**: React Scripts 5.0.1

### DevOps
- **Containerization**: Docker & Docker Compose
- **Deployment**: Render (Production)
- **Version Control**: Git

## 📁 Project Structure

```
e_commerce/
├── backend/                    # Django backend
│   ├── ecommerce_backend/     # Main Django project
│   ├── accounts/              # User authentication app
│   ├── products/              # Product management app
│   ├── cart/                  # Shopping cart app
│   ├── orders/                # Order management app
│   ├── requirements.txt       # Python dependencies
│   ├── manage.py             # Django management script
│   └── .env                  # Backend environment variables
├── frontend/                  # React frontend
│   ├── src/
│   │   ├── components/       # Reusable React components
│   │   ├── pages/           # Page components
│   │   ├── contexts/        # React context providers
│   │   ├── services/        # API service functions
│   │   ├── types/           # TypeScript type definitions
│   │   └── App.tsx          # Main App component
│   ├── public/              # Static assets
│   ├── package.json         # Node.js dependencies
│   └── .env                 # Frontend environment variables
├── docker-compose.yml       # Development setup
├── Dockerfile              # Production Docker image
├── Dockerfile.render       # Render deployment config
└── README.md              # This file
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- Python 3.9+
- Docker and Docker Compose (optional)
- PostgreSQL (for production)

### 1. Clone the Repository
```bash
git clone <your-repo-url>
cd e_commerce
```

### 2. Environment Setup

#### Backend Environment Variables
Create `backend/.env`:
```env
# Django Settings
SECRET_KEY=your-secret-key-here
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1

# Database (Development - SQLite)
DATABASE_URL=sqlite:///db.sqlite3

# Database (Production - PostgreSQL)
# DATABASE_URL=postgresql://user:password@localhost:5432/ecommerce_db

# JWT Settings
JWT_SECRET_KEY=your-jwt-secret-key
JWT_ACCESS_TOKEN_LIFETIME=60
JWT_REFRESH_TOKEN_LIFETIME=1440

# Email Settings (Optional)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USE_TLS=True
EMAIL_HOST_USER=your-email@gmail.com
EMAIL_HOST_PASSWORD=your-app-password
```

#### Frontend Environment Variables
Create `frontend/.env`:
```env
# API Configuration
REACT_APP_API_URL=http://localhost:8000/api
REACT_APP_BASE_URL=http://localhost:8000

# Environment
REACT_APP_ENVIRONMENT=development
```

### 3. Development Setup

#### Option A: Docker (Recommended)
```bash
# Start all services
docker-compose up --build

# The application will be available at:
# Frontend: http://localhost:3000
# Backend API: http://localhost:8000
# Admin: http://localhost:8000/admin
```

#### Option B: Manual Setup

**Backend Setup:**
```bash
cd backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Run migrations
python manage.py migrate

# Create superuser (optional)
python manage.py createsuperuser

# Load sample data (optional)
python manage.py shell < create_sample_data.py

# Start development server
python manage.py runserver
```

**Frontend Setup:**
```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm start
```

## 🐳 Docker Deployment

### Development
```bash
docker-compose up --build
```

### Production Build
```bash
# Build production image
docker build -f Dockerfile.render -t ecommerce-app .

# Run production container
docker run -p 8000:8000 ecommerce-app
```

## 🌐 Deployment to Render

### 1. Prepare Repository
```bash
# Initialize git repository (if not already done)
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/yourusername/your-repo-name.git
git push -u origin main
```

### 2. Render Setup
1. **Connect Repository**: Connect your GitHub repository to Render
2. **Auto-Deploy**: Render will automatically detect the `render.yaml` file and create:
   - Web Service for the application
   - PostgreSQL database
3. **Manual Setup** (if render.yaml not detected):
   - Create new Web Service
   - Environment: Docker
   - Dockerfile Path: `./Dockerfile.render`

### 3. Environment Variables on Render
Set these environment variables in Render dashboard:
```bash
# Core Django Settings
DEBUG=False
DJANGO_SECRET_KEY=your-production-secret-key-generate-new-one
DJANGO_ALLOWED_HOSTS=your-app-name.onrender.com
CORS_ALLOWED_ORIGINS=https://your-app-name.onrender.com

# JWT Configuration
JWT_SECRET_KEY=your-jwt-secret-key-generate-new-one

# Database (Auto-configured if using Render PostgreSQL)
DATABASE_URL=postgresql://user:password@host:port/database

# Admin User (Optional - for auto-creation)
DJANGO_SUPERUSER_USERNAME=admin
DJANGO_SUPERUSER_EMAIL=admin@yourdomain.com
DJANGO_SUPERUSER_PASSWORD=your-secure-admin-password

# Email Settings (Optional)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_HOST_USER=your-email@gmail.com
EMAIL_HOST_PASSWORD=your-app-password
```

### 4. Post-Deployment
After successful deployment:
1. Your app will be available at: `https://your-app-name.onrender.com`
2. Admin panel: `https://your-app-name.onrender.com/admin/`
3. API endpoints: `https://your-app-name.onrender.com/api/`

### 5. Troubleshooting Render Deployment
- Check Render logs for any build or runtime errors
- Ensure all environment variables are set correctly
- Verify PostgreSQL database connection
- Check static files are being served correctly

## 📚 API Documentation

### Authentication Endpoints
- `POST /api/auth/register/` - User registration
- `POST /api/auth/login/` - User login
- `POST /api/auth/refresh/` - Refresh JWT token
- `POST /api/auth/logout/` - User logout

### Product Endpoints
- `GET /api/products/` - List all products
- `GET /api/products/{id}/` - Get product details
- `GET /api/products/featured/` - Get featured products
- `GET /api/categories/` - List all categories

### Cart Endpoints
- `GET /api/cart/` - Get user's cart
- `POST /api/cart/add/` - Add item to cart
- `PUT /api/cart/update/{id}/` - Update cart item
- `DELETE /api/cart/remove/{id}/` - Remove item from cart

### Order Endpoints
- `GET /api/orders/` - List user's orders
- `POST /api/orders/create/` - Create new order
- `GET /api/orders/{id}/` - Get order details

## 🧪 Testing

### Backend Tests
```bash
cd backend
python manage.py test
```

### Frontend Tests
```bash
cd frontend
npm test
```

## 📈 Performance & Security

### Security Features
- JWT authentication with refresh tokens
- CORS configuration
- Environment-based settings
- SQL injection protection (Django ORM)
- XSS protection (React)

### Performance
- Docker multi-stage builds for optimized images
- Static file serving with whitenoise
- Database indexing for queries
- React code splitting and optimization

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Troubleshooting

### Common Issues

**Docker Build Fails:**
- Ensure Docker is running
- Check for port conflicts (3000, 8000, 5432)
- Clear Docker cache: `docker system prune`

**Frontend API Connection Issues:**
- Verify `REACT_APP_API_URL` in frontend/.env
- Check backend server is running
- Verify CORS settings in Django

**Database Connection Issues:**
- Check PostgreSQL is running (production)
- Verify DATABASE_URL format
- Run migrations: `python manage.py migrate`

### Support
For support, email your-email@example.com or create an issue in the repository.

---

**Happy coding! 🚀**
- Shopping cart
- Order management
- User profile management
- Beautiful, modern UI

## Technology Stack

### Backend
- Django 4.2
- Django REST Framework
- JWT Authentication
- PostgreSQL/SQLite
- Pillow (image handling)
- Gunicorn (production server)

### Frontend
- React.js 18
- TypeScript
- Tailwind CSS
- React Router
- Axios
- Context API for state management

## Quick Start

### Prerequisites
- Python 3.9+
- Node.js 18+
- npm or yarn

### Development Setup

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd e_commerce
   ```

2. **Backend Setup**
   ```bash
   cd backend
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   pip install -r requirements.txt
   python manage.py migrate
   python create_sample_data.py
   python manage.py runserver
   ```

3. **Frontend Setup**
   ```bash
   cd frontend
   npm install
   npm start
   ```

4. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8000
   - Admin Panel: http://localhost:8000/admin

### Default Admin User
- Email: admin@example.com
- Password: admin123

## API Endpoints

### Authentication
- `POST /api/auth/register/` - User registration
- `POST /api/auth/login/` - User login
- `POST /api/auth/logout/` - User logout
- `GET /api/auth/profile/` - Get user profile
- `PATCH /api/auth/profile/` - Update user profile

### Products
- `GET /api/products/` - List products
- `GET /api/products/{id}/` - Product detail
- `GET /api/categories/` - List categories
- `GET /api/products/featured/` - Featured products
- `GET /api/products/search/?q=query` - Search products

### Cart
- `GET /api/cart/` - Get cart
- `POST /api/cart/add/` - Add to cart
- `PUT /api/cart/update/{item_id}/` - Update cart item
- `DELETE /api/cart/remove/{item_id}/` - Remove from cart

### Orders
- `GET /api/orders/` - List user orders
- `POST /api/orders/create/` - Create order
- `GET /api/orders/{id}/` - Order detail

## Docker Deployment

### Using Docker Compose (Development)
```bash
docker-compose up --build
```

### Using Docker (Production)
```bash
docker build -t ecommerce-app .
docker run -p 8000:8000 ecommerce-app
```

## Deployment on Render

1. **Create a new Web Service on Render**
2. **Connect your GitHub repository**
3. **Configure the service:**
   - Build Command: `docker build -f Dockerfile.render -t ecommerce .`
   - Start Command: `docker run -p 8000:8000 ecommerce`
   - Or use the provided `Dockerfile.render`

4. **Environment Variables:**
   ```
   SECRET_KEY=your-secret-key-here
   DEBUG=False
   ```

## Project Structure

```
e_commerce/
├── backend/                 # Django backend
│   ├── accounts/           # User management
│   ├── products/           # Product management
│   ├── cart/              # Shopping cart
│   ├── orders/            # Order management
│   ├── ecommerce_backend/ # Main Django project
│   ├── manage.py
│   └── requirements.txt
├── frontend/               # React frontend
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── pages/         # Page components
│   │   ├── contexts/      # React contexts
│   │   ├── services/      # API services
│   │   └── types/         # TypeScript types
│   ├── public/
│   └── package.json
├── Dockerfile             # Docker configuration
├── docker-compose.yml     # Docker Compose
└── README.md
```

## Features Implemented

✅ User Registration & Authentication  
✅ Product Catalog with Categories  
✅ Product Search & Filtering  
✅ Shopping Cart Management  
✅ Order Processing  
✅ User Profile Management  
✅ Product Reviews & Ratings  
✅ Responsive Design  
✅ Admin Panel  
✅ API Documentation  
✅ Docker Support  
✅ Production Ready  

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support or questions, please open an issue in the GitHub repository.
