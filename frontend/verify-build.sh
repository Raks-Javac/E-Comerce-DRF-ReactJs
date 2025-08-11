#!/bin/bash

echo "🧪 React Build Verification & Debug"
echo "===================================="

# Check if build directory exists
if [ ! -d "build" ]; then
    echo "❌ Build directory not found!"
    echo "🔨 Creating build..."
    npm run build
fi

echo "📁 Build directory contents:"
ls -la build/

echo ""
echo "📋 Index.html content (first 10 lines):"
head -10 build/index.html

echo ""
echo "🎯 Static files:"
find build/static -type f -name "*.js" -o -name "*.css" | head -5

echo ""
echo "📏 File sizes:"
du -h build/static/js/*.js build/static/css/*.css 2>/dev/null

echo ""
echo "🔍 Checking for potential issues:"

# Check if index.html contains actual content
if grep -q "<!doctype html>" build/index.html; then
    echo "✅ index.html has proper DOCTYPE"
else
    echo "❌ index.html missing DOCTYPE"
fi

# Check if React app div exists
if grep -q 'id="root"' build/index.html; then
    echo "✅ Root div found in index.html"
else
    echo "❌ Root div missing from index.html"
fi

# Check if JS files exist
if ls build/static/js/*.js 1> /dev/null 2>&1; then
    echo "✅ JavaScript files found"
else
    echo "❌ No JavaScript files found"
fi

# Check if CSS files exist
if ls build/static/css/*.css 1> /dev/null 2>&1; then
    echo "✅ CSS files found"
else
    echo "❌ No CSS files found"
fi

echo ""
echo "🚀 Build verification complete!"

# Test with local server if available
if command -v npx &> /dev/null; then
    echo ""
    echo "💡 To test locally, run:"
    echo "   npx serve -s build -l 3000"
fi
