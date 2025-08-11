#!/bin/bash
echo "🔍 Deployment Debug Information"
echo "================================"
echo "Build Date: $(date)"
echo "Git Commit: $(git rev-parse --short HEAD 2>/dev/null || echo 'N/A')"
echo ""

if [ -f "build/index.html" ]; then
    echo "✅ index.html exists"
    echo "📋 JavaScript files referenced in index.html:"
    grep -o 'src="[^"]*\.js"' build/index.html || echo "No JS files found"
    echo ""
    echo "📋 CSS files referenced in index.html:"
    grep -o 'href="[^"]*\.css"' build/index.html || echo "No CSS files found"
    echo ""
    echo "📁 Actual files in build/static/js/:"
    ls -la build/static/js/*.js 2>/dev/null || echo "No JS files found"
    echo ""
    echo "📁 Actual files in build/static/css/:"
    ls -la build/static/css/*.css 2>/dev/null || echo "No CSS files found"
else
    echo "❌ build/index.html not found!"
fi
