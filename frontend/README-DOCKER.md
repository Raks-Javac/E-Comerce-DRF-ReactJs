# Frontend Docker Setup 🐳

## Production Dockerfile Features

### 🚀 Optimized for Production
- **Multi-stage build** - Smaller final image size
- **Nginx Alpine** - Lightweight production server
- **Asset caching** - 1-year cache for static files
- **Gzip compression** - Better performance
- **Security headers** - CSP, X-Frame-Options, etc.
- **Health checks** - Container monitoring

### 📁 Files Overview
```
frontend/
├── Dockerfile              # Production-optimized Docker build
├── Dockerfile.render       # Render.com specific (simpler)
├── docker-compose.prod.yml # Local production testing
├── .dockerignore           # Optimize build context
└── DEPLOY.md               # Deployment guide
```

## 🔧 Build Commands

### Local Development Testing
```bash
# Build the image
docker build -t ecommerce-frontend .

# Run locally (will be available at http://localhost:3000)
docker run -p 3000:80 ecommerce-frontend

# Or use docker-compose for production-like testing
docker-compose -f docker-compose.prod.yml up
```

### Production Deployment

#### Option 1: Render.com (Recommended)
1. Use `Dockerfile.render` (simpler, no health checks)
2. Set **Root Directory** to `frontend`
3. Choose **Docker** environment

#### Option 2: AWS/GCP/Azure
1. Use main `Dockerfile` (includes health checks)
2. Push to container registry
3. Deploy to container service

## 🔒 Security Features
- Content Security Policy (CSP)
- XSS Protection
- Frame Options (prevent clickjacking)
- Content type sniffing prevention
- Referrer policy
- Server tokens hidden

## ⚡ Performance Features
- Gzip compression (text files reduced by ~70%)
- Static asset caching (1 year)
- Optimized nginx configuration
- React Router support (SPA routing)

## 🏥 Health Monitoring
- HTTP health check on `/`
- 30-second intervals
- Automatic container restart if unhealthy
- Perfect for production orchestration

## 📊 Resource Usage
- **Image size**: ~25MB (nginx:alpine + React build)
- **Memory**: ~50MB runtime
- **CPU**: Minimal (nginx is very efficient)

## 🔄 Build Process
1. **Stage 1**: Node.js build environment
   - Install dependencies with `npm ci`
   - Build React app with `npm run build`
   
2. **Stage 2**: Production nginx server
   - Copy built files from stage 1
   - Configure nginx for React Router
   - Add security and performance optimizations

## 🌐 Environment Variables
The app will automatically use:
- `REACT_APP_API_URL` from `.env` file
- Connects to your Django backend API

## 🚀 Quick Deploy
```bash
# For Render.com
git push origin main

# For other platforms
docker build -t your-registry/ecommerce-frontend .
docker push your-registry/ecommerce-frontend
```

Your React app will be blazing fast and secure! ⚡🔒
