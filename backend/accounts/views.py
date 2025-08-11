from rest_framework import status, generics, permissions
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import get_user_model
from drf_spectacular.utils import extend_schema, extend_schema_view, OpenApiResponse
from .serializers import (
    UserRegistrationSerializer, 
    UserSerializer, 
    UserLoginSerializer,
    ChangePasswordSerializer
)

User = get_user_model()

@extend_schema(
    summary="Register a new user",
    description="Create a new user account and return authentication tokens",
    tags=['Authentication'],
    request=UserRegistrationSerializer,
    responses={
        201: OpenApiResponse(
            description="User registered successfully",
            response={
                'type': 'object',
                'properties': {
                    'user': {'$ref': '#/components/schemas/User'},
                    'refresh': {'type': 'string'},
                    'access': {'type': 'string'},
                    'message': {'type': 'string'}
                }
            }
        ),
        400: OpenApiResponse(description="Bad request - validation errors")
    }
)
class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserRegistrationSerializer
    permission_classes = [permissions.AllowAny]
    
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        
        # Generate tokens
        refresh = RefreshToken.for_user(user)
        
        return Response({
            'user': UserSerializer(user).data,
            'refresh': str(refresh),
            'access': str(refresh.access_token),
            'message': 'User registered successfully'
        }, status=status.HTTP_201_CREATED)

@extend_schema(
    summary="User login",
    description="Authenticate user and return access tokens",
    tags=['Authentication'],
    request=UserLoginSerializer,
    responses={
        200: OpenApiResponse(
            description="Login successful",
            response={
                'type': 'object',
                'properties': {
                    'user': {'$ref': '#/components/schemas/User'},
                    'refresh': {'type': 'string'},
                    'access': {'type': 'string'},
                    'message': {'type': 'string'}
                }
            }
        ),
        400: OpenApiResponse(description="Invalid credentials")
    }
)
class LoginView(APIView):
    permission_classes = [permissions.AllowAny]
    
    def post(self, request):
        serializer = UserLoginSerializer(data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        
        # Generate tokens
        refresh = RefreshToken.for_user(user)
        
        return Response({
            'user': UserSerializer(user).data,
            'refresh': str(refresh),
            'access': str(refresh.access_token),
            'message': 'Login successful'
        })

class LogoutView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    
    def post(self, request):
        try:
            refresh_token = request.data["refresh_token"]
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response({'message': 'Logout successful'}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': 'Invalid token'}, status=status.HTTP_400_BAD_REQUEST)

class ProfileView(generics.RetrieveUpdateAPIView):
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_object(self):
        return self.request.user

class ChangePasswordView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    
    def put(self, request):
        serializer = ChangePasswordSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        user = request.user
        old_password = serializer.validated_data['old_password']
        new_password = serializer.validated_data['new_password']
        
        if not user.check_password(old_password):
            return Response({'error': 'Invalid old password'}, status=status.HTTP_400_BAD_REQUEST)
        
        user.set_password(new_password)
        user.save()
        
        return Response({'message': 'Password changed successfully'}, status=status.HTTP_200_OK)
