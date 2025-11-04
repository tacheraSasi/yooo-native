#!/bin/bash

# Script to prepare and publish yooo-native to npm

echo "🚀 Preparing to publish yooo-native..."

# Check if you're logged in to npm
echo "📝 Checking npm login status..."
if ! npm whoami > /dev/null 2>&1; then
    echo "❌ You're not logged in to npm. Please run: npm login"
    exit 1
fi

echo "✅ You're logged in to npm as: $(npm whoami)"

# Check if package name is available
echo "🔍 Checking if package name is available..."
if npm view yooo-native > /dev/null 2>&1; then
    echo "❌ Package name 'yooo-native' is already taken!"
    echo "Please choose a different name in package.json"
    exit 1
fi

echo "✅ Package name 'yooo-native' is available!"

# Build the package
echo "🔨 Building the package..."
npm run clean
npm run prepare

if [ $? -ne 0 ]; then
    echo "❌ Build failed!"
    exit 1
fi

echo "✅ Build successful!"

# Run tests
echo "🧪 Running tests..."
npm test

if [ $? -ne 0 ]; then
    echo "❌ Tests failed!"
    exit 1
fi

echo "✅ Tests passed!"

# Check package contents
echo "📦 Checking package contents..."
npm pack --dry-run

echo ""
echo "🎉 Package is ready to publish!"
echo ""
echo "To publish, run one of these commands:"
echo "  npm publish                    # Publish to npm registry"
echo "  npm publish --dry-run          # Test publish without actually publishing"
echo "  npm publish --access public    # If this is a scoped package"
echo ""
echo "Or to publish with a different version:"
echo "  npm version patch && npm publish"
echo "  npm version minor && npm publish"
echo "  npm version major && npm publish"
