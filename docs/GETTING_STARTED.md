# Getting Started

This guide will help you set up the Medical Equipment Supply Platform for local development.

## Prerequisites

### Required Software

- **Node.js**: v20.x or higher
  ```bash
  node --version  # Should be 20.x or higher
  ```
- **npm**: v10.x or higher
  ```bash
  npm --version
  ```
- **Git**: Latest version
  ```bash
  git --version
  ```

### Recommended Tools

- **VS Code** with extensions:
  - ESLint
  - Prettier
  - Tailwind CSS IntelliSense
  - Sanity.io

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/ANYURU/medical-equipment.git
cd medical-equipment
```

### 2. Use Correct Node Version

We use `.nvmrc` to specify the Node version:

```bash
# If using nvm
nvm use

# If not installed
nvm install
```

### 3. Install Dependencies

```bash
npm install
```

This installs dependencies for all workspaces (web + studio).

### 4. Set Up Environment Variables

#### Web App (apps/web)

Create `apps/web/.env.local`:

```env
# Sanity Configuration
NEXT_PUBLIC_SANITY_PROJECT_ID=t1xfyfxz
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01

# Site Configuration
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

#### Sanity Studio (apps/studio)

Create `apps/studio/.env.local`:

```env
# Sanity Configuration
SANITY_STUDIO_PROJECT_ID=t1xfyfxz
SANITY_STUDIO_DATASET=production
```

### 5. Start Development Servers

#### Option 1: Run All (Recommended)

```bash
npm run dev
```

This starts:
- Web app: http://localhost:3000
- Sanity Studio: http://localhost:3333

#### Option 2: Run Individually

```bash
# Terminal 1 - Web app
npm run dev --workspace=apps/web

# Terminal 2 - Sanity Studio
npm run dev --workspace=apps/studio
```

## First-Time Setup Checklist

- [ ] Node.js 20.x installed
- [ ] Repository cloned
- [ ] Dependencies installed (`npm install`)
- [ ] Environment variables configured
- [ ] Development servers running
- [ ] Can access web app at http://localhost:3000
- [ ] Can access Sanity Studio at http://localhost:3333
- [ ] Logged into Sanity Studio (use Google/GitHub)

## Sanity Studio Setup

### 1. Access Studio

Navigate to http://localhost:3333

### 2. Login

Use your Google or GitHub account to authenticate.

### 3. Verify Schemas

You should see these content types:
- Site Settings (singleton)
- Homepage (singleton)
- Categories
- Brands
- Products
- Services
- Blog Posts
- Pages
- FAQs

## Verify Installation

### Check Web App

```bash
curl http://localhost:3000
# Should return HTML
```

### Check Sanity Studio

```bash
curl http://localhost:3333
# Should return HTML
```

### Run Build Test

```bash
npm run build
# Should build successfully
```

## Common Issues

### Port Already in Use

If ports 3000 or 3333 are in use:

```bash
# Find process using port
lsof -i :3000
lsof -i :3333

# Kill process
kill -9 <PID>
```

### Node Version Mismatch

```bash
# Check current version
node --version

# Switch to correct version
nvm use 20
```

### Module Not Found

```bash
# Clean install
rm -rf node_modules package-lock.json
npm install
```

## Next Steps

- Read [Development Guide](DEVELOPMENT.md) for workflow
- Read [Architecture](ARCHITECTURE.md) to understand structure
- Start building features!

## Need Help?

- Check [Troubleshooting Guide](TROUBLESHOOTING.md)
- Open an issue on GitHub
- Contact the team
