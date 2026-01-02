# Deployment Guide

Guide for deploying the Medical Equipment Supply Platform to production.

## Overview

The platform consists of two applications:
- **Web App** (Next.js) - Frontend website
- **Sanity Studio** - CMS interface

## Deployment Options

### Recommended: Vercel (Web) + Sanity Cloud (Studio)

**Pros**:
- Zero configuration for Next.js
- Automatic deployments
- Built-in CDN and edge functions
- Free tier available
- Excellent performance

**Cons**:
- Vendor lock-in
- Costs scale with usage

### Alternative: Self-Hosted

**Pros**:
- Full control
- Predictable costs
- Custom infrastructure

**Cons**:
- More setup required
- Maintenance overhead
- Need DevOps expertise

## Deploying to Vercel

### Prerequisites

- GitHub account
- Vercel account (free tier works)
- Sanity project (already set up)

### 1. Prepare Repository

Ensure your code is pushed to GitHub:
```bash
git checkout main
git pull origin main
# Code should be up to date
```

### 2. Deploy Web App

#### Via Vercel Dashboard

1. Go to [vercel.com](https://vercel.com)
2. Click "Add New Project"
3. Import your GitHub repository
4. Configure project:
   - **Framework Preset**: Next.js
   - **Root Directory**: `apps/web`
   - **Build Command**: `npm run build --workspace=apps/web`
   - **Output Directory**: `apps/web/.next`
   - **Install Command**: `npm install`

5. Add environment variables:
   ```env
   NEXT_PUBLIC_SANITY_PROJECT_ID=t1xfyfxz
   NEXT_PUBLIC_SANITY_DATASET=production
   NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
   NEXT_PUBLIC_SITE_URL=https://your-domain.com
   ```

6. Click "Deploy"

#### Via Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy from web directory
cd apps/web
vercel

# Follow prompts
# Set root directory to apps/web
# Add environment variables when prompted

# Deploy to production
vercel --prod
```

### 3. Deploy Sanity Studio

#### Option A: Sanity Cloud (Recommended)

```bash
# From studio directory
cd apps/studio

# Deploy to Sanity
npm run deploy

# Follow prompts
# Studio will be available at: https://your-project.sanity.studio
```

#### Option B: Vercel

1. Create new Vercel project
2. Configure:
   - **Root Directory**: `apps/studio`
   - **Build Command**: `npm run build --workspace=apps/studio`
   - **Output Directory**: `apps/studio/dist`

3. Add environment variables:
   ```env
   SANITY_STUDIO_PROJECT_ID=t1xfyfxz
   SANITY_STUDIO_DATASET=production
   ```

4. Deploy

### 4. Configure Custom Domain

#### In Vercel:

1. Go to project settings
2. Click "Domains"
3. Add your domain
4. Update DNS records as instructed
5. Wait for DNS propagation (can take 24-48 hours)

#### DNS Configuration:

```
Type: A
Name: @
Value: 76.76.21.21

Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

### 5. Set Up CORS in Sanity

1. Go to [sanity.io/manage](https://sanity.io/manage)
2. Select your project
3. Go to "API" settings
4. Add CORS origins:
   ```
   https://your-domain.com
   https://www.your-domain.com
   http://localhost:3000 (for development)
   ```

### 6. Configure Webhooks (Optional)

For automatic revalidation when content changes:

1. In Sanity dashboard, go to "API" → "Webhooks"
2. Create new webhook:
   - **Name**: Vercel Deploy Hook
   - **URL**: `https://api.vercel.com/v1/integrations/deploy/[YOUR_HOOK_ID]`
   - **Dataset**: production
   - **Trigger on**: Create, Update, Delete
   - **Filter**: `_type in ["product", "category", "brand", ...]`

3. Get deploy hook from Vercel:
   - Project Settings → Git → Deploy Hooks
   - Create hook for `main` branch

## Environment Variables

### Production Environment Variables

**Web App** (`apps/web`):
```env
# Sanity
NEXT_PUBLIC_SANITY_PROJECT_ID=t1xfyfxz
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01

# Site
NEXT_PUBLIC_SITE_URL=https://your-domain.com

# Analytics (optional)
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# Sanity Token (for ISR/webhooks)
SANITY_API_TOKEN=your_read_token
```

**Studio** (`apps/studio`):
```env
SANITY_STUDIO_PROJECT_ID=t1xfyfxz
SANITY_STUDIO_DATASET=production
```

### Getting Sanity API Token

1. Go to [sanity.io/manage](https://sanity.io/manage)
2. Select project
3. Go to "API" → "Tokens"
4. Create new token:
   - **Name**: Production Read Token
   - **Permissions**: Viewer
5. Copy token and add to Vercel environment variables

## Deployment Workflow

### Automatic Deployments

**Staging** (develop branch):
```
Push to develop → Auto-deploy to staging.your-domain.com
```

**Production** (main branch):
```
Merge to main → Auto-deploy to your-domain.com
```

### Manual Deployments

```bash
# Deploy specific branch
vercel --prod

# Rollback to previous deployment
vercel rollback
```

## Monitoring

### Vercel Analytics

1. Enable in Vercel dashboard
2. View metrics:
   - Page views
   - Performance
   - Web Vitals

### Error Tracking (Optional)

**Sentry Integration**:

1. Create Sentry account
2. Install Sentry:
   ```bash
   npm install @sentry/nextjs --workspace=apps/web
   ```

3. Configure:
   ```typescript
   // apps/web/sentry.config.ts
   import * as Sentry from '@sentry/nextjs';
   
   Sentry.init({
     dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
     environment: process.env.NODE_ENV,
   });
   ```

4. Add to environment variables:
   ```env
   NEXT_PUBLIC_SENTRY_DSN=your_sentry_dsn
   ```

## Performance Optimization

### Image Optimization

Next.js automatically optimizes images. Configure domains:

```typescript
// apps/web/next.config.ts
const config = {
  images: {
    domains: ['cdn.sanity.io'],
  },
};
```

### Caching Strategy

**Static Pages**: Generated at build time
```typescript
export const revalidate = false; // Never revalidate
```

**ISR (Incremental Static Regeneration)**:
```typescript
export const revalidate = 3600; // Revalidate every hour
```

**Dynamic**: Generated on each request
```typescript
export const dynamic = 'force-dynamic';
```

### CDN Configuration

Vercel automatically uses CDN. For custom CDN:

1. Configure in `next.config.ts`
2. Set up CDN to point to Vercel
3. Update asset URLs

## Security

### Environment Variables

- Never commit `.env` files
- Use Vercel's environment variable UI
- Rotate tokens regularly
- Use different tokens for staging/production

### HTTPS

- Vercel provides automatic HTTPS
- Custom domains get free SSL certificates
- Enforce HTTPS in production

### Content Security Policy

```typescript
// apps/web/next.config.ts
const config = {
  headers: async () => [
    {
      source: '/(.*)',
      headers: [
        {
          key: 'Content-Security-Policy',
          value: "default-src 'self'; img-src 'self' https://cdn.sanity.io;",
        },
      ],
    },
  ],
};
```

## Backup & Recovery

### Sanity Backups

Sanity automatically backs up your data. To export:

```bash
# Export dataset
sanity dataset export production backup.tar.gz

# Import dataset
sanity dataset import backup.tar.gz production
```

### Code Backups

- Code is in Git (GitHub)
- Vercel keeps deployment history
- Can rollback to any previous deployment

## Troubleshooting

### Build Fails

1. Check build logs in Vercel
2. Test build locally:
   ```bash
   npm run build
   ```
3. Check environment variables
4. Verify dependencies are installed

### 404 Errors

1. Check routing configuration
2. Verify pages exist
3. Check `next.config.ts` rewrites/redirects

### Slow Performance

1. Check Vercel Analytics
2. Optimize images
3. Implement caching
4. Use ISR for dynamic content

### CORS Errors

1. Add domain to Sanity CORS settings
2. Check API configuration
3. Verify environment variables

## Scaling

### Vercel Scaling

- Automatic scaling included
- Handles traffic spikes
- Global CDN distribution

### Database Scaling

- Sanity handles scaling automatically
- Upgrade plan if needed
- Monitor usage in dashboard

## Costs

### Vercel

**Free Tier**:
- 100GB bandwidth
- Unlimited deployments
- 100 serverless function executions/day

**Pro Tier** ($20/month):
- 1TB bandwidth
- Unlimited executions
- Advanced analytics

### Sanity

**Free Tier**:
- 3 users
- 10K documents
- 5GB assets

**Growth Tier** ($99/month):
- Unlimited users
- 500K documents
- 50GB assets

## Maintenance

### Regular Tasks

- Monitor error logs
- Check performance metrics
- Update dependencies monthly
- Review security advisories
- Backup data regularly

### Updates

```bash
# Check for updates
npm outdated

# Update dependencies
npm update

# Test thoroughly
npm run build
npm run dev

# Deploy
git push origin main
```

## Checklist

Before going live:

- [ ] Environment variables configured
- [ ] Custom domain set up
- [ ] HTTPS enabled
- [ ] CORS configured in Sanity
- [ ] Analytics set up
- [ ] Error tracking configured
- [ ] Performance optimized
- [ ] Security headers configured
- [ ] Backup strategy in place
- [ ] Monitoring enabled
- [ ] Documentation updated
- [ ] Team trained on CMS

## Support

- **Vercel**: [vercel.com/support](https://vercel.com/support)
- **Sanity**: [sanity.io/help](https://sanity.io/help)
- **Project Issues**: [GitHub Issues](https://github.com/ANYURU/medical-equipment/issues)
