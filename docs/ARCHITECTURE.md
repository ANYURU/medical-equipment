# Architecture

This document describes the system architecture and design decisions for the Medical Equipment Supply Platform.

## Overview

The platform is built as a monorepo containing a Next.js frontend and Sanity CMS backend, designed for scalability and maintainability.

## System Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    User Browser                          │
└────────────────────┬────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────┐
│              Next.js Application (SSR/SSG)               │
│  ┌──────────────────────────────────────────────────┐   │
│  │  App Router (React Server Components)            │   │
│  │  - Pages & Layouts                               │   │
│  │  - API Routes                                    │   │
│  │  - Server Actions                                │   │
│  └──────────────────────────────────────────────────┘   │
└────────────────────┬────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────┐
│                  Sanity CMS (Headless)                   │
│  ┌──────────────────────────────────────────────────┐   │
│  │  Content Lake                                    │   │
│  │  - Products, Categories, Brands                  │   │
│  │  - Blog Posts, Pages, FAQs                       │   │
│  │  - Site Settings                                 │   │
│  └──────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
```

## Monorepo Structure

### Why Monorepo?

- **Code Sharing**: Share types, utilities, and components
- **Atomic Changes**: Update frontend and CMS schemas together
- **Simplified Dependencies**: Single `package-lock.json`
- **Consistent Tooling**: Shared linting, formatting, and testing

### Workspace Organization

```
medical-equipment/
├── apps/
│   ├── web/              # Next.js frontend
│   │   ├── src/
│   │   │   ├── app/      # App router pages
│   │   │   ├── components/
│   │   │   ├── lib/      # Utilities
│   │   │   └── hooks/    # React hooks
│   │   └── public/       # Static assets
│   │
│   └── studio/           # Sanity CMS
│       ├── schemas/
│       │   ├── documents/  # Content types
│       │   └── objects/    # Reusable schema objects
│       └── schemaTypes/    # Schema registry
│
├── packages/
│   └── shared/           # Shared code (future)
│       ├── types/        # TypeScript types
│       └── utils/        # Shared utilities
│
└── docs/                 # Documentation
```

## Technology Stack

### Frontend (apps/web)

**Framework**: Next.js 15
- App Router with React Server Components
- Server-side rendering (SSR)
- Static site generation (SSG)
- API routes for backend logic

**UI Layer**:
- React 19
- TypeScript for type safety
- Tailwind CSS for styling
- shadcn/ui component library

**State Management**:
- React Server Components (server state)
- React hooks (client state)
- URL state for filters/pagination

### Backend (apps/studio)

**CMS**: Sanity.io v5
- Headless CMS
- Real-time collaboration
- Structured content
- Image optimization (CDN)
- GROQ query language

**Content Types**:
- **Documents**: Products, Categories, Brands, Services, Blog Posts, Pages, FAQs
- **Singletons**: Site Settings, Homepage
- **Objects**: SEO, Hero, Portable Text

## Data Flow

### Content Management Flow

```
Content Editor → Sanity Studio → Sanity Content Lake
                                        ↓
                                  Webhook (optional)
                                        ↓
                              Next.js Revalidation
                                        ↓
                                  Updated Website
```

### Page Rendering Flow

```
User Request → Next.js Server
                    ↓
              Fetch from Sanity
                    ↓
              Render RSC/SSR
                    ↓
              Return HTML
                    ↓
              Hydrate Client
```

## Design Patterns

### Content Modeling

**Singleton Pattern**: Site Settings, Homepage
- Only one instance allowed
- Global configuration

**Reference Pattern**: Products → Categories, Brands
- Normalized data structure
- Reusable content

**Portable Text**: Rich text content
- Structured content
- Embeddable images, links
- Custom blocks

### Frontend Patterns

**Server Components**: Default for data fetching
- Better performance
- Reduced JavaScript bundle
- Direct database access

**Client Components**: Interactive UI only
- Forms, modals, carousels
- Client-side state
- Browser APIs

## Security

### Content Security

- Sanity authentication (OAuth)
- Role-based access control (RBAC)
- API tokens for production

### Application Security

- Environment variables for secrets
- CORS configuration
- Rate limiting (future)
- Input validation

## Performance

### Optimization Strategies

**Next.js**:
- Static generation for product pages
- Incremental static regeneration (ISR)
- Image optimization
- Code splitting

**Sanity**:
- CDN for images
- GROQ query optimization
- Projection (select only needed fields)
- Caching strategy

## Scalability

### Horizontal Scaling

- Stateless Next.js servers
- Sanity handles CMS scaling
- CDN for static assets

### Future Considerations

- Redis for caching
- Search service (Algolia/Meilisearch)
- Analytics integration
- E-commerce integration

## Development Workflow

### Local Development

```
Developer → Feature Branch → Local Testing → PR → Code Review
                                                      ↓
                                                   Merge
                                                      ↓
                                              develop branch
                                                      ↓
                                            Staging Deployment
                                                      ↓
                                                   Testing
                                                      ↓
                                              main branch
                                                      ↓
                                          Production Deployment
```

### CI/CD Pipeline (Future)

```
Git Push → GitHub Actions
              ↓
         Run Tests
              ↓
         Build App
              ↓
    Deploy to Vercel
              ↓
    Run E2E Tests
              ↓
         Success ✓
```

## Deployment Architecture

### Environments

**Development**: Local machines
- Hot reload
- Debug mode
- Local Sanity dataset

**Staging**: develop branch
- Production-like environment
- Testing dataset
- Preview deployments

**Production**: main branch
- Live website
- Production dataset
- Optimized builds

## Monitoring & Observability (Future)

- Error tracking (Sentry)
- Analytics (Google Analytics/Plausible)
- Performance monitoring (Vercel Analytics)
- Uptime monitoring

## Future Enhancements

- [ ] Shared package for types
- [ ] E2E testing setup
- [ ] CI/CD pipeline
- [ ] Search functionality
- [ ] Multi-language support
- [ ] E-commerce integration
- [ ] Customer portal
