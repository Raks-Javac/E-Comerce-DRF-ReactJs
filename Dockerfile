# Multi-stage Docker build
# Stage 1: Build React frontend
FROM node:18-alpine AS frontend-build

WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm ci --silent
COPY frontend/ ./
RUN npm run build

# Stage 2: Python backend
FROM python:3.9-slim

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# Set work directory
WORKDIR /app

# Install system dependencies
RUN apt-get update \
    && apt-get install -y --no-install-recommends \
    postgresql-client \
    gcc \
    python3-dev \
    musl-dev \
    libpq-dev \
    && rm -rf /var/lib/apt/lists/*

# Install Python dependencies
COPY backend/requirements.txt /app/
RUN pip install --no-cache-dir -r requirements.txt

# Copy backend code
COPY backend/ /app/

# Copy built frontend to Django static files
COPY --from=frontend-build /app/frontend/build /app/static/

# Create static and media directories
RUN mkdir -p /app/staticfiles /app/media

# Collect static files
RUN python manage.py collectstatic --noinput

# Expose port
EXPOSE 8000

# Create entrypoint script
RUN echo '#!/bin/bash\n\
    python manage.py migrate\n\
    python manage.py collectstatic --noinput\n\
    if [ "$DJANGO_SUPERUSER_EMAIL" ]; then\n\
    python manage.py shell -c "from django.contrib.auth import get_user_model; User = get_user_model(); User.objects.filter(email=\"$DJANGO_SUPERUSER_EMAIL\").exists() or User.objects.create_superuser(\"$DJANGO_SUPERUSER_USERNAME\", \"$DJANGO_SUPERUSER_EMAIL\", \"$DJANGO_SUPERUSER_PASSWORD\")"\n\
    fi\n\
    gunicorn ecommerce_backend.wsgi:application --bind 0.0.0.0:8000' > /app/entrypoint.sh

RUN chmod +x /app/entrypoint.sh

# Run the application
CMD ["/app/entrypoint.sh"]
