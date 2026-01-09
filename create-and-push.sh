#!/bin/bash

# Script to create GitHub repository and push code

REPO_NAME="sss-subscription-management"
REPO_DESCRIPTION="Subscription Management System for Sanathana Sarathi Hindi Magazine"

echo "🚀 Creating GitHub repository and pushing code..."

# Check if GitHub CLI is authenticated
if ! gh auth status &>/dev/null; then
    echo "⚠️  GitHub CLI not authenticated. Please run: gh auth login"
    echo "   This will open a browser for authentication."
    exit 1
fi

# Create repository
echo "📦 Creating repository: $REPO_NAME"
gh repo create "$REPO_NAME" \
    --public \
    --description "$REPO_DESCRIPTION" \
    --source=. \
    --remote=origin \
    --push

if [ $? -eq 0 ]; then
    echo "✅ Successfully created repository and pushed code!"
    echo "🔗 Repository URL: https://github.com/$(gh api user | jq -r .login)/$REPO_NAME"
else
    echo "❌ Failed to create repository. Please check your GitHub authentication."
    exit 1
fi

