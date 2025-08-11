# E-Commerce Frontend Dockerfile
# Multi-stage build for React application

# Stage 1: Build the React application
FROM node:18-alpine AS build

# Set working directory
WORKDIR /app

# Copy package files for dependency installation
COPY package*.json ./

# Install dependencies
RUN npm ci --silent

# Copy all source code
COPY . .

# Build the React application for production
RUN npm run build

# Stage 2: Serve the built application with nginx
FROM nginx:alpine

# Install curl for health checks
RUN apk add --no-cache curl

# Copy built React app to nginx html directory
COPY --from=build /app/build /usr/share/nginx/html

# Create nginx configuration optimized for production
RUN echo 'server {\n\
    listen 80;\n\
    server_name _;\n\
    root /usr/share/nginx/html;\n\
    index index.html;\n\
    \n\
    # Handle React Router - serve index.html for all routes\n\
    location / {\n\
        try_files $uri $uri/ /index.html;\n\
    }\n\
    \n\
    # Cache static assets aggressively\n\
    location /static/ {\n\
        expires 1y;\n\
        add_header Cache-Control "public, immutable";\n\
    }\n\
    \n\
    # Cache other assets\n\
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {\n\
        expires 1y;\n\
        add_header Cache-Control "public, immutable";\n\
    }\n\
    \n\
    # Security headers for production\n\
    add_header X-Frame-Options "SAMEORIGIN" always;\n\
    add_header X-Content-Type-Options "nosniff" always;\n\
    add_header X-XSS-Protection "1; mode=block" always;\n\
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;\n\
    add_header Content-Security-Policy "default-src '\''self'\''; script-src '\''self'\'' '\''unsafe-inline'\''; style-src '\''self'\'' '\''unsafe-inline'\'' fonts.googleapis.com; font-src '\''self'\'' fonts.gstatic.com; img-src '\''self'\'' data: https:; connect-src '\''self'\'' https://e-comerce-drf-reactjs.onrender.com;" always;\n\
    \n\
    # Gzip compression for better performance\n\
    gzip on;\n\
    gzip_vary on;\n\
    gzip_min_length 1024;\n\
    gzip_proxied any;\n\
    gzip_comp_level 6;\n\
    gzip_types\n\
        text/plain\n\
        text/css\n\
        text/xml\n\
        text/javascript\n\
        application/javascript\n\
        application/xml+rss\n\
        application/json\n\
        application/xml\n\
        image/svg+xml;\n\
    \n\
    # Hide nginx version\n\
    server_tokens off;\n\
    \n\
    # Prevent access to dotfiles\n\
    location ~ /\. {\n\
        deny all;\n\
    }\n\
}' > /etc/nginx/conf.d/default.conf

# Remove default nginx config (if exists)
RUN rm -f /etc/nginx/conf.d/default.conf.backup

# Expose port 80
EXPOSE 80

# Health check for production monitoring
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD curl -f http://localhost/ || exit 1

# Start nginx in foreground
CMD ["nginx", "-g", "daemon off;"]
