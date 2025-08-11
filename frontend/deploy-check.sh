#!/bin/bash

echo "🚀 Frontend Deployment Pre-check"
echo "=================================="

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found. Run this from the frontend directory."
    exit 1
fi

echo "✅ Found package.json"

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm ci --prefer-offline
else
    echo "✅ node_modules exists"
fi

# Test build
echo "🔨 Testing build..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
    echo "📁 Build directory created: $(ls -la build/ | wc -l) files"
    echo ""
    echo "🎯 Ready for deployment!"
    echo ""
    echo "Next steps:"
    echo "1. Commit and push your changes"
    echo "2. Deploy on Render using the static site option"
    echo "3. Use build command: npm ci --prefer-offline && npm run build"
    echo "4. Use publish directory: build"
else
    echo "❌ Build failed! Check the error messages above."
    exit 1
fi
