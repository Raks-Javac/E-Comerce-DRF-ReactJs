import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'ecommerce_backend.settings')
django.setup()

from django.contrib.auth import get_user_model
from products.models import Category, Product
from decimal import Decimal

User = get_user_model()

# Create superuser
if not User.objects.filter(email='admin@example.com').exists():
    User.objects.create_superuser(
        username='admin',
        email='admin@example.com',
        password='admin123',
        first_name='Admin',
        last_name='User'
    )
    print("Superuser created: admin@example.com / admin123")

# Create sample categories
categories_data = [
    {'name': 'Electronics', 'description': 'Electronic devices and gadgets'},
    {'name': 'Clothing', 'description': 'Fashion and apparel'},
    {'name': 'Books', 'description': 'Books and educational materials'},
    {'name': 'Home & Garden', 'description': 'Home improvement and garden supplies'},
    {'name': 'Sports', 'description': 'Sports equipment and accessories'},
]

for cat_data in categories_data:
    category, created = Category.objects.get_or_create(
        name=cat_data['name'],
        defaults={'description': cat_data['description']}
    )
    if created:
        print(f"Category created: {category.name}")

# Create sample products
electronics = Category.objects.get(name='Electronics')
clothing = Category.objects.get(name='Clothing')
books = Category.objects.get(name='Books')

products_data = [
    {
        'name': 'Smartphone',
        'description': 'Latest smartphone with advanced features',
        'price': Decimal('599.99'),
        'category': electronics,
        'stock_quantity': 50,
    },
    {
        'name': 'Laptop',
        'description': 'High-performance laptop for work and gaming',
        'price': Decimal('1299.99'),
        'category': electronics,
        'stock_quantity': 25,
    },
    {
        'name': 'Wireless Headphones',
        'description': 'Premium wireless headphones with noise cancellation',
        'price': Decimal('199.99'),
        'category': electronics,
        'stock_quantity': 100,
    },
    {
        'name': 'T-Shirt',
        'description': 'Comfortable cotton t-shirt',
        'price': Decimal('19.99'),
        'category': clothing,
        'stock_quantity': 200,
    },
    {
        'name': 'Jeans',
        'description': 'Classic blue jeans',
        'price': Decimal('49.99'),
        'category': clothing,
        'stock_quantity': 150,
    },
    {
        'name': 'Programming Book',
        'description': 'Learn programming with this comprehensive guide',
        'price': Decimal('39.99'),
        'category': books,
        'stock_quantity': 75,
    },
]

for product_data in products_data:
    product, created = Product.objects.get_or_create(
        name=product_data['name'],
        defaults=product_data
    )
    if created:
        print(f"Product created: {product.name}")

print("Sample data created successfully!")
