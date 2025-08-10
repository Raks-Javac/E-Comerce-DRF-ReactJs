# Deployment Checklist

## Pre-Deployment Checklist

### ✅ Code Preparation
- [ ] All environment variables moved to `.env` files
- [ ] Debug mode set to `False` in production
- [ ] Static files configuration verified
- [ ] Database settings configured for production
- [ ] CORS settings updated for production domain
- [ ] Security settings reviewed

### ✅ Environment Files
- [ ] `backend/.env` created with all required variables
- [ ] `frontend/.env` created with API configuration
- [ ] `.env` files added to `.gitignore`
- [ ] Production secret keys generated (different from development)

### ✅ Docker Configuration
- [ ] `Dockerfile.render` tested locally
- [ ] Multi-stage build working correctly
- [ ] Static files copied to correct location
- [ ] Entrypoint script executable and functional

### ✅ Git Repository
- [ ] Repository initialized
- [ ] All files committed (except `.env`)
- [ ] Pushed to GitHub/GitLab
- [ ] Repository is public or accessible to Render

## Render Deployment Checklist

### ✅ Account Setup
- [ ] Render account created
- [ ] GitHub/GitLab connected to Render

### ✅ Service Configuration
- [ ] Web Service created
- [ ] Repository connected
- [ ] Docker environment selected
- [ ] Dockerfile path set to `./Dockerfile.render`

### ✅ Database Setup
- [ ] PostgreSQL database created on Render
- [ ] Database connection string obtained
- [ ] `DATABASE_URL` environment variable set

### ✅ Environment Variables
- [ ] `DEBUG=False`
- [ ] `DJANGO_SECRET_KEY` (generate new for production)
- [ ] `DJANGO_ALLOWED_HOSTS` (your-app.onrender.com)
- [ ] `CORS_ALLOWED_ORIGINS` (https://your-app.onrender.com)
- [ ] `JWT_SECRET_KEY` (generate new for production)
- [ ] `DATABASE_URL` (from Render PostgreSQL)
- [ ] Optional: Admin user variables
- [ ] Optional: Email configuration

### ✅ Deployment Process
- [ ] Initial deployment triggered
- [ ] Build logs reviewed for errors
- [ ] Application accessible via Render URL
- [ ] Database migrations completed
- [ ] Static files served correctly
- [ ] Admin panel accessible
- [ ] API endpoints responding

## Post-Deployment Verification

### ✅ Functionality Testing
- [ ] User registration working
- [ ] User login working
- [ ] Product listing functional
- [ ] Cart operations working
- [ ] Order placement successful
- [ ] Admin panel accessible
- [ ] API endpoints responding correctly

### ✅ Performance & Security
- [ ] HTTPS enabled (automatic on Render)
- [ ] Static files loading quickly
- [ ] Database queries optimized
- [ ] Error handling working
- [ ] Logs accessible and readable

### ✅ Monitoring Setup
- [ ] Error monitoring configured
- [ ] Performance monitoring setup
- [ ] Backup strategy in place
- [ ] Health check endpoints working

## Environment Variables Reference

### Required Variables
```bash
DEBUG=False
DJANGO_SECRET_KEY=your-production-secret
DJANGO_ALLOWED_HOSTS=your-app.onrender.com
CORS_ALLOWED_ORIGINS=https://your-app.onrender.com
JWT_SECRET_KEY=your-jwt-secret
DATABASE_URL=postgresql://...
```

### Optional Variables
```bash
# Admin User Auto-Creation
DJANGO_SUPERUSER_USERNAME=admin
DJANGO_SUPERUSER_EMAIL=admin@domain.com
DJANGO_SUPERUSER_PASSWORD=secure-password

# Email Configuration
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_HOST_USER=your-email@gmail.com
EMAIL_HOST_PASSWORD=your-app-password
EMAIL_USE_TLS=True
```

## Troubleshooting Guide

### Common Issues
1. **Build Failures**: Check Dockerfile.render syntax and dependencies
2. **Static Files Not Loading**: Verify STATIC_URL and STATIC_ROOT settings
3. **Database Connection**: Ensure DATABASE_URL is correctly formatted
4. **CORS Errors**: Check CORS_ALLOWED_ORIGINS matches your domain
5. **500 Server Errors**: Review application logs on Render dashboard

### Debug Commands
```bash
# Local Docker testing
docker build -f Dockerfile.render -t test-app .
docker run -p 8000:8000 --env-file backend/.env test-app

# Check logs
docker logs container-id

# Shell access
docker exec -it container-id /bin/bash
```

## Support Resources
- [Render Documentation](https://render.com/docs)
- [Django Deployment Checklist](https://docs.djangoproject.com/en/4.2/howto/deployment/checklist/)
- [Docker Best Practices](https://docs.docker.com/develop/dev-best-practices/)
