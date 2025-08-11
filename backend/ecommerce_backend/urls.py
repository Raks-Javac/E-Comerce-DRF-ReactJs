from django.contrib import admin
from django.urls import path, include, re_path
from django.conf import settings
from django.conf.urls.static import static
from django.http import FileResponse, Http404
import os

def serve_react_app(request, path=''):
    """Serve React app for /web/ routes"""
    try:
        if path == '' or path == 'index.html':
            # Serve index.html for root web requests
            return FileResponse(open(os.path.join(settings.STATIC_ROOT, 'index.html'), 'rb'))
        else:
            # Try to serve the requested static file
            file_path = os.path.join(settings.STATIC_ROOT, path)
            if os.path.exists(file_path):
                return FileResponse(open(file_path, 'rb'))
            else:
                # If file doesn't exist, serve index.html (for React routing)
                return FileResponse(open(os.path.join(settings.STATIC_ROOT, 'index.html'), 'rb'))
    except:
        raise Http404("File not found")

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/auth/', include('accounts.urls')),
    path('api/', include('products.urls')),
    path('api/cart/', include('cart.urls')),
    path('api/orders/', include('orders.urls')),
]

# Serve static and media files normally
urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

# Serve React app under /web/ path
urlpatterns += [
    path('web/', serve_react_app, name='react_app_root'),
    re_path(r'^web/(?P<path>.*)$', serve_react_app, name='react_app'),
]
