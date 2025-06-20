#!/bin/bash

# CyberCards - Azure Deployment Script
# Einfaches Script für schnelles Deployment

echo "🚀 Starting CyberCards Azure Deployment..."

# Prüfen ob wir im richtigen Verzeichnis sind
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found. Please run this script from the karteikarten-webapp directory."
    exit 1
fi

# Build erstellen
echo "📦 Building application..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Build failed!"
    exit 1
fi

# Deployment ZIP erstellen
echo "📋 Creating deployment package..."
zip -r deployment.zip app components hooks lib types package.json next.config.js tsconfig.json tailwind.config.ts postcss.config.js public -x "node_modules/*" ".git/*" ".next/*"

if [ $? -ne 0 ]; then
    echo "❌ Failed to create deployment package!"
    exit 1
fi

# Zu Azure deployen
echo "☁️  Deploying to Azure..."
az webapp deployment source config-zip \
  --resource-group IndexCardApp \
  --name karteikarten-webapp-1750450317 \
  --src deployment.zip

if [ $? -eq 0 ]; then
    echo "✅ Deployment successful!"
    echo "🌐 App is available at: https://karteikarten-webapp-1750450317.azurewebsites.net"
    
    # Deployment ZIP aufräumen
    rm deployment.zip
    echo "🧹 Cleaned up deployment package"
else
    echo "❌ Deployment failed!"
    exit 1
fi
