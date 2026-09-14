#!/bin/bash

# Doha InfoTech - One-Click Deployment Script
# This script deploys your website to Cloudflare Workers automatically

set -e

echo "🚀 Doha InfoTech - Cloudflare Workers Deployment"
echo "=================================================="
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 16+ from https://nodejs.org/"
    exit 1
fi

echo "✅ Node.js found: $(node --version)"
echo ""

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed."
    exit 1
fi

echo "✅ npm found: $(npm --version)"
echo ""

# Install dependencies
echo "📦 Installing dependencies..."
npm install
echo "✅ Dependencies installed"
echo ""

# Check if wrangler is installed globally or locally
if ! command -v wrangler &> /dev/null && ! npx wrangler --version &> /dev/null; then
    echo "❌ Wrangler is not installed."
    exit 1
fi

echo "✅ Wrangler is ready"
echo ""

# Prompt for Cloudflare credentials if not set
if [ -z "$CLOUDFLARE_API_TOKEN" ]; then
    echo "⚠️  CLOUDFLARE_API_TOKEN not found in environment"
    echo ""
    echo "To get your API token:"
    echo "1. Go to https://dash.cloudflare.com/profile/api-tokens"
    echo "2. Click 'Create Token'"
    echo "3. Use 'Edit Cloudflare Workers' template"
    echo "4. Copy the token"
    echo ""
    read -p "Enter your Cloudflare API Token: " CLOUDFLARE_API_TOKEN
fi

if [ -z "$CLOUDFLARE_ACCOUNT_ID" ]; then
    echo ""
    echo "⚠️  CLOUDFLARE_ACCOUNT_ID not found in environment"
    echo ""
    echo "To get your Account ID:"
    echo "1. Go to https://dash.cloudflare.com/"
    echo "2. Go to Account Settings"
    echo "3. Copy your Account ID"
    echo ""
    read -p "Enter your Cloudflare Account ID: " CLOUDFLARE_ACCOUNT_ID
fi

echo ""
echo "🔐 Credentials configured"
echo ""

# Deploy
echo "🚀 Deploying to Cloudflare Workers..."
echo ""

export CLOUDFLARE_API_TOKEN=$CLOUDFLARE_API_TOKEN
export CLOUDFLARE_ACCOUNT_ID=$CLOUDFLARE_ACCOUNT_ID

npm run deploy

echo ""
echo "✅ Deployment successful!"
echo ""
echo "🌐 Your website is now live at:"
echo "   https://dohainfotech.com"
echo ""
echo "📝 To edit content, visit:"
echo "   https://dohainfotech.com/admin"
echo ""
echo "Happy coding! 🎉"
