from django.urls import path
from . import views

urlpatterns = [
    path('categories/', views.CategoryListView.as_view(), name='category-list'),
    path('categories/<int:pk>/', views.CategoryDetailView.as_view(), name='category-detail'),
    path('products/', views.ProductListView.as_view(), name='product-list'),
    path('products/<int:pk>/', views.ProductDetailView.as_view(), name='product-detail'),
    path('products/featured/', views.FeaturedProductsView.as_view(), name='featured-products'),
    path('products/search/', views.search_products, name='search-products'),
    path('products/<int:product_id>/reviews/', views.ProductReviewListCreateView.as_view(), name='product-reviews'),
    path('reviews/<int:pk>/', views.ProductReviewDetailView.as_view(), name='review-detail'),
]
