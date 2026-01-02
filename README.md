# Medical Equipment Supply Platform

> Modern medical equipment supplier website built with Next.js and Sanity CMS

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Run development servers (web + studio)
npm run dev

# Access applications
# Web: http://localhost:3000
# Sanity Studio: http://localhost:3333
```

## 📋 Prerequisites

- Node.js 20.x or higher (see `.nvmrc`)
- npm 10.x or higher
- Git

## 🏗️ Project Structure

This is a monorepo managed with npm workspaces:

```
medical-equipment/
├── apps/
│   ├── web/          # Next.js frontend application
│   └── studio/       # Sanity CMS studio
├── packages/
│   └── shared/       # Shared utilities (future)
├── docs/             # Documentation
└── scripts/          # Build and utility scripts
```

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript, Tailwind CSS
- **CMS**: Sanity.io v5
- **UI Components**: shadcn/ui
- **Code Quality**: Biome, ESLint, Prettier
- **Git Hooks**: Husky, lint-staged, commitlint

## 📚 Documentation

- [Getting Started](docs/GETTING_STARTED.md) - Detailed setup guide
- [Architecture](docs/ARCHITECTURE.md) - System design & structure
- [Development](docs/DEVELOPMENT.md) - Development workflow
- [Deployment](docs/DEPLOYMENT.md) - Deployment guide
- [Sanity Guide](docs/SANITY_GUIDE.md) - Content management
- [Troubleshooting](docs/TROUBLESHOOTING.md) - Common issues

## 🤝 Contributing

We follow a structured Git workflow:

1. Create feature branch from `develop`
2. Make changes with conventional commits
3. Create PR to `develop`
4. After review, merge to `develop`

See [CONTRIBUTING.md](CONTRIBUTING.md) for detailed guidelines.

## 📝 Commit Convention

We use [Conventional Commits](https://www.conventionalcommits.org/):

```
feat(scope): add new feature
fix(scope): fix bug
docs(scope): update documentation
chore(scope): maintenance tasks
```

## 🌿 Branch Strategy

- `main` - Production (protected)
- `develop` - Staging/Integration (protected)
- `feature/*` - New features
- `fix/*` - Bug fixes
- `hotfix/*` - Critical production fixes

## 📦 Available Scripts

```bash
# Development
npm run dev              # Run all workspaces
npm run dev:web          # Run web app only
npm run dev:studio       # Run Sanity Studio only

# Build
npm run build            # Build all workspaces
npm run build:web        # Build web app
npm run build:studio     # Build Sanity Studio

# Linting & Formatting
npm run lint             # Lint all workspaces
npm run format           # Format code with Prettier
```

## 🔐 Environment Variables

Copy `.env.example` to `.env.local` in each workspace and configure:

**apps/web/.env.local:**
```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
```

**apps/studio/.env.local:**
```env
SANITY_STUDIO_PROJECT_ID=your_project_id
SANITY_STUDIO_DATASET=production
```

## 📄 License

[MIT](LICENSE)

## 👥 Team

- [Your Name](https://github.com/ANYURU)

## 🔗 Links

- [Live Site](https://your-site.com) (Coming soon)
- [Staging](https://staging.your-site.com) (Coming soon)
- [Sanity Studio](https://your-project.sanity.studio)
