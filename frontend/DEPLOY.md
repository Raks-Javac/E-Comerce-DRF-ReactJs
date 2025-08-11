# Frontend Deployment Guide 🚀

## Quick Deploy to Render

### Option 1: Using Dockerfile (Recommended)
1. Create a new Render service
2. Connect your GitHub repo
3. Set **Root Directory** to: `frontend`
4. Use **Docker** as build environment
5. Deploy!

### Option 2: Using Static Site
1. Create a new **Static Site** on Render
2. Connect your GitHub repo  
3. Set **Root Directory** to: `frontend`
4. **Build Command**: `npm ci && npm run build`
5. **Publish Directory**: `build`
6. Deploy!

## Environment Variables
Your frontend will automatically connect to your existing backend at:
- API: `https://e-comerce-drf-reactjs.onrender.com/api`

## What's Changed
- ✅ Removed `/web` basename from React Router
- ✅ Created simple Dockerfile for frontend-only deployment  
- ✅ Created render.yaml for static site deployment
- ✅ Frontend will run as standalone app on its own domain

## Test URLs (after deployment)
- Frontend: `https://your-frontend-app.onrender.com`
- Backend: `https://e-comerce-drf-reactjs.onrender.com` (existing)

The frontend will make API calls to your existing backend! 🎉
