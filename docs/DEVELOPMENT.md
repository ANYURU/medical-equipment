# Development Guide

This guide covers the development workflow, coding standards, and best practices for the Medical Equipment Supply Platform.

## Development Workflow

### 1. Starting New Work

```bash
# Ensure you're on develop and up to date
git checkout develop
git pull origin develop

# Create feature branch
git checkout -b feature/your-feature-name
```

### 2. Making Changes

- Write code following our standards (see below)
- Test locally
- Commit frequently with conventional commits

### 3. Committing Changes

We use [Conventional Commits](https://www.conventionalcommits.org/):

```bash
# Format: <type>(<scope>): <description>

git commit -m "feat(products): add product filtering"
git commit -m "fix(ui): resolve mobile menu bug"
git commit -m "docs(readme): update installation steps"
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation
- `style`: Code style (formatting, no logic change)
- `refactor`: Code refactoring
- `test`: Adding tests
- `chore`: Maintenance tasks

**Scopes:** `web`, `studio`, `products`, `ui`, `api`, etc.

### 4. Pre-commit Checks

Husky automatically runs:
- Lint-staged (formats staged files)
- Commitlint (validates commit message)

### 5. Pushing Changes

```bash
# Push feature branch
git push -u origin feature/your-feature-name
```

### 6. Creating Pull Request

On GitHub:
1. Create PR from `feature/your-feature-name` → `develop`
2. Fill in PR template
3. Request review (if team exists)
4. Address feedback
5. Merge when approved

### 7. After Merge

```bash
# Switch to develop
git checkout develop

# Pull latest
git pull origin develop

# Delete feature branch
git branch -d feature/your-feature-name
```

## Coding Standards

### TypeScript

```typescript
// ✅ Good: Explicit types
interface Product {
  id: string;
  name: string;
  price: number;
}

function getProduct(id: string): Promise<Product> {
  // ...
}

// ❌ Bad: Implicit any
function getProduct(id) {
  // ...
}
```

### React Components

```tsx
// ✅ Good: Server Component (default)
export default async function ProductPage({ params }: { params: { id: string } }) {
  const product = await getProduct(params.id);
  return <ProductDetails product={product} />;
}

// ✅ Good: Client Component (when needed)
'use client';

export function ProductFilter() {
  const [filter, setFilter] = useState('');
  // ...
}
```

### File Naming

```
components/
├── ProductCard.tsx          # PascalCase for components
├── product-list.tsx         # kebab-case for pages
└── use-products.ts          # kebab-case for hooks

lib/
├── sanity.ts                # kebab-case for utilities
└── utils.ts
```

### CSS/Tailwind

```tsx
// ✅ Good: Tailwind classes
<div className="flex items-center gap-4 rounded-lg bg-white p-4 shadow-sm">

// ✅ Good: Conditional classes
<div className={cn(
  "rounded-lg p-4",
  isActive && "bg-blue-500",
  isDisabled && "opacity-50"
)}>

// ❌ Bad: Inline styles (avoid unless necessary)
<div style={{ padding: '16px' }}>
```

## Project-Specific Patterns

### Data Fetching

```tsx
// ✅ Server Component - Direct Sanity query
import { client } from '@/lib/sanity';

export default async function ProductsPage() {
  const products = await client.fetch(`
    *[_type == "product"] {
      _id,
      name,
      slug,
      mainImage
    }
  `);
  
  return <ProductList products={products} />;
}
```

### Error Handling

```tsx
// ✅ Good: Error boundaries and try-catch
export default async function Page() {
  try {
    const data = await fetchData();
    return <Content data={data} />;
  } catch (error) {
    return <ErrorState error={error} />;
  }
}
```

### Environment Variables

```typescript
// ✅ Good: Validate env vars
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
if (!projectId) {
  throw new Error('Missing NEXT_PUBLIC_SANITY_PROJECT_ID');
}

// ❌ Bad: Direct access without validation
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
```

## Testing (Future)

### Unit Tests

```typescript
// product.test.ts
import { describe, it, expect } from 'vitest';
import { formatPrice } from './product';

describe('formatPrice', () => {
  it('formats price correctly', () => {
    expect(formatPrice(1000)).toBe('$10.00');
  });
});
```

### E2E Tests

```typescript
// product-page.spec.ts
import { test, expect } from '@playwright/test';

test('displays product details', async ({ page }) => {
  await page.goto('/products/test-product');
  await expect(page.locator('h1')).toContainText('Test Product');
});
```

## Code Review Guidelines

### As Author

- Keep PRs small and focused
- Write clear PR descriptions
- Add screenshots for UI changes
- Respond to feedback promptly
- Test thoroughly before requesting review

### As Reviewer

- Be constructive and respectful
- Focus on logic, not style (automated)
- Ask questions, don't demand
- Approve when satisfied
- Test locally if needed

## Common Tasks

### Adding a New Page

```bash
# 1. Create page file
touch apps/web/src/app/new-page/page.tsx

# 2. Implement page
# 3. Add to navigation (if needed)
# 4. Test locally
# 5. Commit and push
```

### Adding a New Sanity Schema

```bash
# 1. Create schema file
touch apps/studio/schemas/documents/newType.ts

# 2. Define schema
# 3. Register in schemaTypes/index.ts
# 4. Test in Studio
# 5. Commit and push
```

### Updating Dependencies

```bash
# Check outdated packages
npm outdated

# Update specific package
npm update package-name

# Update all (carefully)
npm update

# Test thoroughly after updates
npm run build
npm run dev
```

## Debugging

### Next.js Debugging

```typescript
// Add console logs (remove before commit)
console.log('Debug:', data);

// Use debugger
debugger;

// Check server logs
// Terminal running npm run dev
```

### Sanity Debugging

```typescript
// Test GROQ queries in Vision plugin
// http://localhost:3333/vision

// Check query results
const result = await client.fetch(query);
console.log('Sanity result:', result);
```

## Performance Best Practices

### Images

```tsx
// ✅ Good: Next.js Image component
import Image from 'next/image';

<Image
  src={imageUrl}
  alt="Product"
  width={500}
  height={300}
  priority={isAboveFold}
/>

// ❌ Bad: Regular img tag
<img src={imageUrl} alt="Product" />
```

### Data Fetching

```tsx
// ✅ Good: Parallel fetching
const [products, categories] = await Promise.all([
  getProducts(),
  getCategories(),
]);

// ❌ Bad: Sequential fetching
const products = await getProducts();
const categories = await getCategories();
```

## Git Best Practices

### Commit Messages

```bash
# ✅ Good
feat(products): add product search functionality
fix(ui): resolve mobile navigation overflow
docs(api): update API documentation

# ❌ Bad
update stuff
fix bug
changes
```

### Branch Names

```bash
# ✅ Good
feature/product-search
fix/mobile-nav-overflow
docs/api-documentation

# ❌ Bad
my-branch
updates
fix
```

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Sanity Documentation](https://www.sanity.io/docs)
- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS](https://tailwindcss.com/docs)

## Getting Help

- Check [Troubleshooting Guide](TROUBLESHOOTING.md)
- Search existing GitHub issues
- Ask in team chat (if applicable)
- Create new GitHub issue
