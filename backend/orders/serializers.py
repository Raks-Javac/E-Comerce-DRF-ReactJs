from rest_framework import serializers
from .models import Order, OrderItem
from products.serializers import ProductListSerializer

class OrderItemSerializer(serializers.ModelSerializer):
    product = ProductListSerializer(read_only=True)
    total_price = serializers.DecimalField(max_digits=10, decimal_places=2, read_only=True)
    
    class Meta:
        model = OrderItem
        fields = ['id', 'product', 'quantity', 'price', 'total_price']

class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True, read_only=True)
    user_name = serializers.CharField(source='user.get_full_name', read_only=True)
    
    class Meta:
        model = Order
        fields = ['id', 'order_number', 'user', 'user_name', 'total_amount', 'status', 
                 'shipping_address', 'phone', 'items', 'created_at', 'updated_at']
        read_only_fields = ['user', 'order_number']

class CreateOrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = ['shipping_address', 'phone']
    
    def create(self, validated_data):
        user = self.context['request'].user
        
        # Get user's cart
        try:
            cart = user.cart
            if not cart.items.exists():
                raise serializers.ValidationError("Cart is empty.")
        except:
            raise serializers.ValidationError("Cart not found.")
        
        # Calculate total amount
        total_amount = cart.total_price
        
        # Create order
        order = Order.objects.create(
            user=user,
            total_amount=total_amount,
            shipping_address=validated_data['shipping_address'],
            phone=validated_data['phone']
        )
        
        # Create order items from cart items
        for cart_item in cart.items.all():
            OrderItem.objects.create(
                order=order,
                product=cart_item.product,
                quantity=cart_item.quantity,
                price=cart_item.product.price
            )
        
        # Clear cart after order creation
        cart.items.all().delete()
        
        return order

class OrderListSerializer(serializers.ModelSerializer):
    item_count = serializers.SerializerMethodField()
    
    class Meta:
        model = Order
        fields = ['id', 'order_number', 'total_amount', 'status', 'item_count', 'created_at']
    
    def get_item_count(self, obj):
        return obj.items.count()
