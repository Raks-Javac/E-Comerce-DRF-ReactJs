from rest_framework import generics, filters, permissions, status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from django_filters.rest_framework import DjangoFilterBackend
from django.db.models import Q
from drf_spectacular.utils import extend_schema, extend_schema_view, OpenApiParameter, OpenApiResponse
from drf_spectacular.types import OpenApiTypes
from .models import Category, Product, Review
from .serializers import (
    CategorySerializer, 
    ProductListSerializer, 
    ProductDetailSerializer,
    ProductCreateSerializer,
    ReviewSerializer
)

@extend_schema_view(
    list=extend_schema(
        summary="List all categories",
        description="Retrieve a list of all product categories",
        tags=['Categories'],
        responses={200: CategorySerializer(many=True)}
    ),
    create=extend_schema(
        summary="Create a new category",
        description="Create a new product category (requires authentication)",
        tags=['Categories'],
        responses={
            201: CategorySerializer,
            400: OpenApiResponse(description="Bad request"),
            401: OpenApiResponse(description="Authentication required")
        }
    )
)
class CategoryListView(generics.ListCreateAPIView):
    queryset = Category.objects.all().order_by('name')
    serializer_class = CategorySerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

@extend_schema_view(
    retrieve=extend_schema(
        summary="Get category details",
        description="Retrieve details of a specific category",
        tags=['Categories'],
        responses={
            200: CategorySerializer,
            404: OpenApiResponse(description="Category not found")
        }
    ),
    update=extend_schema(
        summary="Update category",
        description="Update a category (requires authentication)",
        tags=['Categories'],
        responses={
            200: CategorySerializer,
            400: OpenApiResponse(description="Bad request"),
            401: OpenApiResponse(description="Authentication required"),
            404: OpenApiResponse(description="Category not found")
        }
    ),
    destroy=extend_schema(
        summary="Delete category",
        description="Delete a category (requires authentication)",
        tags=['Categories'],
        responses={
            204: OpenApiResponse(description="Category deleted successfully"),
            401: OpenApiResponse(description="Authentication required"),
            404: OpenApiResponse(description="Category not found")
        }
    )
)
class CategoryDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

@extend_schema_view(
    list=extend_schema(
        summary="List products",
        description="Retrieve a paginated list of active products with filtering and search capabilities",
        tags=['Products'],
        parameters=[
            OpenApiParameter(
                name='category',
                description='Filter by category ID',
                required=False,
                type=OpenApiTypes.INT
            ),
            OpenApiParameter(
                name='category__name',
                description='Filter by category name',
                required=False,
                type=OpenApiTypes.STR
            ),
            OpenApiParameter(
                name='search',
                description='Search in product name and description',
                required=False,
                type=OpenApiTypes.STR
            ),
            OpenApiParameter(
                name='min_price',
                description='Minimum price filter',
                required=False,
                type=OpenApiTypes.DECIMAL
            ),
            OpenApiParameter(
                name='max_price',
                description='Maximum price filter',
                required=False,
                type=OpenApiTypes.DECIMAL
            ),
            OpenApiParameter(
                name='ordering',
                description='Order by: price, -price, created_at, -created_at, name, -name',
                required=False,
                type=OpenApiTypes.STR
            ),
        ],
        responses={200: ProductListSerializer(many=True)}
    ),
    create=extend_schema(
        summary="Create a new product",
        description="Create a new product (requires authentication)",
        tags=['Products'],
        request=ProductCreateSerializer,
        responses={
            201: ProductDetailSerializer,
            400: OpenApiResponse(description="Bad request"),
            401: OpenApiResponse(description="Authentication required")
        }
    )
)
class ProductListView(generics.ListCreateAPIView):
    queryset = Product.objects.filter(is_active=True).order_by('-created_at')
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['category', 'category__name']
    search_fields = ['name', 'description']
    ordering_fields = ['price', 'created_at', 'name']
    ordering = ['-created_at']
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    
    def get_serializer_class(self):
        if self.request.method == 'POST':
            return ProductCreateSerializer
        return ProductListSerializer
    
    def get_queryset(self):
        queryset = super().get_queryset()
        
        # Filter by price range
        min_price = self.request.query_params.get('min_price')
        max_price = self.request.query_params.get('max_price')
        
        if min_price:
            queryset = queryset.filter(price__gte=min_price)
        if max_price:
            queryset = queryset.filter(price__lte=max_price)
        
        # Filter by stock availability
        in_stock = self.request.query_params.get('in_stock')
        if in_stock and in_stock.lower() == 'true':
            queryset = queryset.filter(stock_quantity__gt=0)
        
        return queryset

@extend_schema_view(
    retrieve=extend_schema(
        summary="Get product details",
        description="Retrieve detailed information about a specific product",
        tags=['Products'],
        responses={
            200: ProductDetailSerializer,
            404: OpenApiResponse(description="Product not found")
        }
    ),
    update=extend_schema(
        summary="Update product",
        description="Update a product (requires authentication)",
        tags=['Products'],
        request=ProductCreateSerializer,
        responses={
            200: ProductDetailSerializer,
            400: OpenApiResponse(description="Bad request"),
            401: OpenApiResponse(description="Authentication required"),
            404: OpenApiResponse(description="Product not found")
        }
    ),
    destroy=extend_schema(
        summary="Delete product",
        description="Delete a product (requires authentication)",
        tags=['Products'],
        responses={
            204: OpenApiResponse(description="Product deleted successfully"),
            401: OpenApiResponse(description="Authentication required"),
            404: OpenApiResponse(description="Product not found")
        }
    )
)
class ProductDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Product.objects.filter(is_active=True)
    serializer_class = ProductDetailSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

@extend_schema(
    summary="List featured products",
    description="Get a list of featured products (top 8 in-stock products)",
    tags=['Products'],
    responses={200: ProductListSerializer(many=True)}
)
class FeaturedProductsView(generics.ListAPIView):
    serializer_class = ProductListSerializer
    permission_classes = [permissions.AllowAny]
    
    def get_queryset(self):
        # Return products with highest ratings or most recent
        return Product.objects.filter(is_active=True, stock_quantity__gt=0)[:8]

@extend_schema(
    summary="Search products",
    description="Search for products by name and description",
    tags=['Products'],
    parameters=[
        OpenApiParameter(
            name='q',
            description='Search query',
            required=True,
            type=OpenApiTypes.STR
        )
    ],
    responses={
        200: ProductListSerializer(many=True),
        400: OpenApiResponse(description="Search query required")
    }
)
@api_view(['GET'])
@permission_classes([permissions.AllowAny])
def search_products(request):
    query = request.GET.get('q', '')
    if query:
        products = Product.objects.filter(
            Q(name__icontains=query) | 
            Q(description__icontains=query) |
            Q(category__name__icontains=query),
            is_active=True
        )
        serializer = ProductListSerializer(products, many=True)
        return Response(serializer.data)
    return Response([])

class ProductReviewListCreateView(generics.ListCreateAPIView):
    serializer_class = ReviewSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    
    def get_queryset(self):
        product_id = self.kwargs['product_id']
        return Review.objects.filter(product_id=product_id)
    
    def perform_create(self, serializer):
        product_id = self.kwargs['product_id']
        serializer.save(product_id=product_id)

class ProductReviewDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = ReviewSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    
    def get_queryset(self):
        return Review.objects.filter(user=self.request.user)
