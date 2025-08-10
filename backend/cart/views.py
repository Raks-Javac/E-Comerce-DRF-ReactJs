from rest_framework import generics, permissions, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.views import APIView
from django.shortcuts import get_object_or_404
from .models import Cart, CartItem
from products.models import Product
from .serializers import CartSerializer, AddToCartSerializer, UpdateCartItemSerializer

class CartView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    
    def get(self, request):
        cart, created = Cart.objects.get_or_create(user=request.user)
        serializer = CartSerializer(cart)
        return Response(serializer.data)

class AddToCartView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    
    def post(self, request):
        serializer = AddToCartSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        product_id = serializer.validated_data['product_id']
        quantity = serializer.validated_data['quantity']
        
        cart, created = Cart.objects.get_or_create(user=request.user)
        product = get_object_or_404(Product, id=product_id, is_active=True)
        
        # Check if item already exists in cart
        cart_item, created = CartItem.objects.get_or_create(
            cart=cart,
            product=product,
            defaults={'quantity': quantity}
        )
        
        if not created:
            # Update quantity if item already exists
            cart_item.quantity += quantity
            cart_item.save()
        
        return Response({
            'message': 'Product added to cart successfully',
            'cart': CartSerializer(cart).data
        }, status=status.HTTP_201_CREATED)

class UpdateCartItemView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    
    def put(self, request, item_id):
        serializer = UpdateCartItemSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        cart = get_object_or_404(Cart, user=request.user)
        cart_item = get_object_or_404(CartItem, id=item_id, cart=cart)
        
        quantity = serializer.validated_data['quantity']
        
        if quantity == 0:
            cart_item.delete()
            message = 'Item removed from cart'
        else:
            cart_item.quantity = quantity
            cart_item.save()
            message = 'Cart item updated successfully'
        
        return Response({
            'message': message,
            'cart': CartSerializer(cart).data
        })

class RemoveFromCartView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    
    def delete(self, request, item_id):
        cart = get_object_or_404(Cart, user=request.user)
        cart_item = get_object_or_404(CartItem, id=item_id, cart=cart)
        cart_item.delete()
        
        return Response({
            'message': 'Item removed from cart successfully',
            'cart': CartSerializer(cart).data
        })

class ClearCartView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    
    def delete(self, request):
        cart = get_object_or_404(Cart, user=request.user)
        cart.items.all().delete()
        
        return Response({
            'message': 'Cart cleared successfully',
            'cart': CartSerializer(cart).data
        })
