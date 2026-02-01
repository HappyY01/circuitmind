# CircuitMinds - Quick Deployment Script
# Run this script to initialize git and prepare for GitHub upload

Write-Host "🚀 CircuitMinds Deployment Setup" -ForegroundColor Cyan
Write-Host "=================================" -ForegroundColor Cyan
Write-Host ""

# Check if git is installed
try {
    $gitVersion = git --version
    Write-Host "✅ Git is installed: $gitVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Git is not installed. Please install Git from https://git-scm.com/" -ForegroundColor Red
    exit 1
}

# Initialize git repository
Write-Host ""
Write-Host "📦 Initializing Git repository..." -ForegroundColor Yellow
git init

# Add all files
Write-Host "📝 Adding all files to Git..." -ForegroundColor Yellow
git add .

# Create initial commit
Write-Host "💾 Creating initial commit..." -ForegroundColor Yellow
git commit -m "Initial commit: CircuitMinds 2D simulator"

# Instructions for GitHub
Write-Host ""
Write-Host "✅ Git repository initialized successfully!" -ForegroundColor Green
Write-Host ""
Write-Host "📋 Next Steps:" -ForegroundColor Cyan
Write-Host "1. Create a new repository on GitHub (https://github.com/new)" -ForegroundColor White
Write-Host "2. DO NOT initialize with README (we already have one)" -ForegroundColor White
Write-Host "3. Copy your repository URL (e.g., https://github.com/username/repo.git)" -ForegroundColor White
Write-Host "4. Run these commands (replace YOUR_REPO_URL):" -ForegroundColor White
Write-Host ""
Write-Host "   git remote add origin YOUR_REPO_URL" -ForegroundColor Yellow
Write-Host "   git branch -M main" -ForegroundColor Yellow
Write-Host "   git push -u origin main" -ForegroundColor Yellow
Write-Host ""
Write-Host "5. Deploy to Vercel:" -ForegroundColor White
Write-Host "   - Go to https://vercel.com" -ForegroundColor White
Write-Host "   - Sign in with GitHub" -ForegroundColor White
Write-Host "   - Import your repository" -ForegroundColor White
Write-Host "   - Click Deploy!" -ForegroundColor White
Write-Host ""
Write-Host "🎉 Your app will be live in minutes!" -ForegroundColor Green
