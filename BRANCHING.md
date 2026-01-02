# Git Branching Strategy

## Branch Types
- `main` - Production ready code
- `develop` - Integration branch for features
- `feature/*` - New features (e.g., `feature/user-auth`)
- `fix/*` - Bug fixes (e.g., `fix/login-error`)
- `hotfix/*` - Critical production fixes

## Workflow
1. Create feature branch from `develop`
2. Work on feature with conventional commits
3. Create PR to `develop`
4. After review, merge to `develop`
5. Deploy `develop` to staging
6. Merge `develop` to `main` for production

## Commands
```bash
# Start new feature
git checkout develop
git pull origin develop
git checkout -b feature/your-feature-name

# Commit with conventional format
git commit -m "feat(component): add user profile component"

# Push and create PR
git push -u origin feature/your-feature-name
```