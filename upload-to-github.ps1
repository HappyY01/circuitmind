# CircuitMinds - Quick GitHub Upload
# This script will help you upload your code to GitHub

Write-Host ""
Write-Host "🚀 CircuitMinds GitHub Upload Assistant" -ForegroundColor Cyan
Write-Host "=======================================" -ForegroundColor Cyan
Write-Host ""

# Check Git installation
Write-Host "✅ Git is installed: " -NoNewline -ForegroundColor Green
git --version
Write-Host ""

# Step 1: Configure Git
Write-Host "📝 Step 1: Configure Git" -ForegroundColor Yellow
Write-Host "Please enter your information:" -ForegroundColor White
Write-Host ""

$userName = Read-Host "Your Name (e.g., Avani)"
$userEmail = Read-Host "Your Email (e.g., avani@example.com)"

git config --global user.name "$userName"
git config --global user.email "$userEmail"

Write-Host ""
Write-Host "✅ Git configured successfully!" -ForegroundColor Green
Write-Host ""

# Step 2: Initialize Git
Write-Host "📦 Step 2: Initializing Git repository..." -ForegroundColor Yellow
git init
Write-Host "✅ Git repository initialized!" -ForegroundColor Green
Write-Host ""

# Step 3: Add files
Write-Host "📁 Step 3: Adding all files..." -ForegroundColor Yellow
git add .
Write-Host "✅ All files added!" -ForegroundColor Green
Write-Host ""

# Step 4: Create commit
Write-Host "💾 Step 4: Creating initial commit..." -ForegroundColor Yellow
git commit -m "Initial commit: CircuitMinds 2D simulator"
Write-Host "✅ Commit created!" -ForegroundColor Green
Write-Host ""

# Step 5: Connect to GitHub
Write-Host "🔗 Step 5: Connect to GitHub" -ForegroundColor Yellow
Write-Host ""
Write-Host "Before continuing, please:" -ForegroundColor White
Write-Host "1. Go to https://github.com/new" -ForegroundColor White
Write-Host "2. Create a new repository named 'circuitmind' (or any name)" -ForegroundColor White
Write-Host "3. Choose 'Public' visibility" -ForegroundColor White
Write-Host "4. DO NOT check any boxes (no README, no .gitignore)" -ForegroundColor White
Write-Host "5. Click 'Create repository'" -ForegroundColor White
Write-Host ""

$repoUrl = Read-Host "Enter your repository URL (e.g., https://github.com/username/circuitmind.git)"

git remote add origin $repoUrl
git branch -M main

Write-Host ""
Write-Host "✅ Connected to GitHub!" -ForegroundColor Green
Write-Host ""

# Step 6: Push to GitHub
Write-Host "⬆️  Step 6: Uploading to GitHub..." -ForegroundColor Yellow
Write-Host "A login window may appear - sign in with your GitHub account" -ForegroundColor White
Write-Host ""

git push -u origin main

Write-Host ""
Write-Host "🎉 SUCCESS! Your code is now on GitHub!" -ForegroundColor Green
Write-Host ""
Write-Host "📍 Your repository: $repoUrl" -ForegroundColor Cyan
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Yellow
Write-Host "1. Visit your repository on GitHub to see your code" -ForegroundColor White
Write-Host "2. Deploy to Vercel (https://vercel.com) to make it live" -ForegroundColor White
Write-Host ""
