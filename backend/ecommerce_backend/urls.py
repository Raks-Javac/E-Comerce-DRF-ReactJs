from django.contrib import admin
from django.urls import path, include, re_path
from django.conf import settings
from django.conf.urls.static import static
from django.http import FileResponse, Http404
from django.views.generic import TemplateView
import os

class ReactAppView(TemplateView):
    """Serve React app using Django's template system"""
    template_name = 'index.html'
    
    def get(self, request, *args, **kwargs):
        try:
            # Try to serve the actual React index.html from static files
            index_path = os.path.join(settings.STATIC_ROOT, 'index.html')
            if os.path.exists(index_path):
                return FileResponse(open(index_path, 'rb'), content_type='text/html')
            else:
                # Fallback to a basic HTML page that loads React
                from django.http import HttpResponse
                return HttpResponse(f'''
                <!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="utf-8" />
                    <link rel="icon" href="{settings.STATIC_URL}favicon.ico" />
                    <meta name="viewport" content="width=device-width,initial-scale=1" />
                    <meta name="theme-color" content="#000000" />
                    <meta name="description" content="E-Commerce Application" />
                    <title>E-Commerce App</title>
                    <link href="{settings.STATIC_URL}css/main.92aa7f4b.css" rel="stylesheet">
                </head>
                <body>
                    <noscript>You need to enable JavaScript to run this app.</noscript>
                    <div id="root"></div>
                    <script src="{settings.STATIC_URL}js/main.d79b7a57.js"></script>
                </body>
                </html>
                ''', content_type='text/html')
        except Exception as e:
            raise Http404(f"React app not found: {str(e)}")

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
    path('web/', ReactAppView.as_view(), name='react_app_root'),
    re_path(r'^web/(?P<path>.*)$', ReactAppView.as_view(), name='react_app'),
]
