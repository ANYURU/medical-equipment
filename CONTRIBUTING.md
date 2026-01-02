# Contributing to Medical Equipment Supply Platform

Thank you for your interest in contributing! This document provides guidelines for contributing to the project.

## Code of Conduct

Be respectful, inclusive, and professional. We're all here to build something great together.

## How Can I Contribute?

### Reporting Bugs

Before creating a bug report:
- Check existing issues to avoid duplicates
- Collect relevant information (error messages, screenshots, etc.)

**Bug Report Template**:
```markdown
**Describe the bug**
A clear description of what the bug is.

**To Reproduce**
Steps to reproduce:
1. Go to '...'
2. Click on '...'
3. See error

**Expected behavior**
What you expected to happen.

**Screenshots**
If applicable, add screenshots.

**Environment**:
- OS: [e.g., macOS 14.0]
- Node: [e.g., 20.10.0]
- Browser: [e.g., Chrome 120]

**Additional context**
Any other relevant information.
```

### Suggesting Features

Feature requests are welcome! Please:
- Check if the feature already exists or is planned
- Explain the use case and benefits
- Provide examples if possible

**Feature Request Template**:
```markdown
**Is your feature request related to a problem?**
A clear description of the problem.

**Describe the solution you'd like**
What you want to happen.

**Describe alternatives you've considered**
Other solutions you've thought about.

**Additional context**
Mockups, examples, or other relevant information.
```

### Contributing Code

1. **Fork the repository**
2. **Clone your fork**:
   ```bash
   git clone https://github.com/YOUR_USERNAME/medical-equipment.git
   cd medical-equipment
   ```

3. **Set up development environment**:
   ```bash
   npm install
   npm run dev
   ```

4. **Create a feature branch**:
   ```bash
   git checkout develop
   git checkout -b feature/your-feature-name
   ```

5. **Make your changes**:
   - Follow coding standards (see below)
   - Write tests if applicable
   - Update documentation

6. **Test your changes**:
   ```bash
   npm run build
   npm run lint
   ```

7. **Commit your changes**:
   ```bash
   git add .
   git commit -m "feat(scope): description"
   ```

8. **Push to your fork**:
   ```bash
   git push origin feature/your-feature-name
   ```

9. **Create a Pull Request**:
   - Go to the original repository
   - Click "New Pull Request"
   - Select your branch
   - Fill in the PR template

## Coding Standards

### TypeScript

- Use explicit types
- Avoid `any` type
- Use interfaces for object shapes
- Use type aliases for unions/intersections

```typescript
// ✅ Good
interface Product {
  id: string;
  name: string;
  price: number;
}

// ❌ Bad
const product: any = { ... };
```

### React Components

- Use functional components
- Use TypeScript for props
- Server Components by default
- Client Components only when needed

```tsx
// ✅ Good: Server Component
export default async function ProductPage({ params }: Props) {
  const product = await getProduct(params.id);
  return <ProductDetails product={product} />;
}

// ✅ Good: Client Component
'use client';
export function ProductFilter({ onFilter }: Props) {
  const [value, setValue] = useState('');
  // ...
}
```

### File Naming

- Components: `PascalCase.tsx`
- Utilities: `kebab-case.ts`
- Pages: `kebab-case.tsx` or `page.tsx`
- Hooks: `use-hook-name.ts`

### Code Style

We use automated formatting:
- **Prettier** for code formatting
- **Biome** for linting (web app)
- **ESLint** for linting (studio)

Run before committing:
```bash
npm run format
npm run lint
```

### Commit Messages

We use [Conventional Commits](https://www.conventionalcommits.org/):

**Format**: `<type>(<scope>): <description>`

**Types**:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks
- `perf`: Performance improvements
- `ci`: CI/CD changes

**Examples**:
```bash
feat(products): add product filtering
fix(ui): resolve mobile menu overflow
docs(readme): update installation steps
refactor(api): simplify data fetching logic
test(products): add unit tests for product utils
chore(deps): update dependencies
```

**Scope**: Component or area affected (products, ui, api, docs, etc.)

### Branch Naming

- `feature/description` - New features
- `fix/description` - Bug fixes
- `docs/description` - Documentation
- `refactor/description` - Code refactoring
- `test/description` - Tests

Examples:
```bash
feature/product-search
fix/mobile-nav-overflow
docs/api-documentation
refactor/sanity-queries
test/product-utils
```

## Pull Request Process

### Before Submitting

- [ ] Code follows project standards
- [ ] Tests pass (if applicable)
- [ ] Build succeeds (`npm run build`)
- [ ] Linting passes (`npm run lint`)
- [ ] Documentation updated (if needed)
- [ ] Commit messages follow convention
- [ ] Branch is up to date with `develop`

### PR Template

```markdown
## Description
Brief description of changes.

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Changes Made
- Change 1
- Change 2
- Change 3

## Testing
How to test these changes:
1. Step 1
2. Step 2
3. Step 3

## Screenshots (if applicable)
Add screenshots for UI changes.

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Comments added for complex code
- [ ] Documentation updated
- [ ] No new warnings
- [ ] Tests added/updated
- [ ] All tests pass
- [ ] Build succeeds
```

### Review Process

1. **Automated checks** run (linting, build)
2. **Code review** by maintainers
3. **Feedback** addressed by contributor
4. **Approval** from maintainer(s)
5. **Merge** to `develop` branch

### After Merge

- Your branch will be deleted
- Changes will be in `develop` branch
- Eventually promoted to `main` (production)

## Development Workflow

### Git Flow

```
main (production)
  ↑
develop (staging)
  ↑
feature/your-feature
```

1. **Create feature branch** from `develop`
2. **Make changes** and commit
3. **Push** to your fork
4. **Create PR** to `develop`
5. **Address feedback**
6. **Merge** after approval

### Testing Locally

```bash
# Run development servers
npm run dev

# Build for production
npm run build

# Run linting
npm run lint

# Format code
npm run format
```

## Project Structure

```
medical-equipment/
├── apps/
│   ├── web/              # Next.js app
│   │   ├── src/
│   │   │   ├── app/      # Pages (App Router)
│   │   │   ├── components/
│   │   │   ├── lib/      # Utilities
│   │   │   └── hooks/
│   │   └── public/
│   │
│   └── studio/           # Sanity CMS
│       ├── schemas/
│       │   ├── documents/
│       │   └── objects/
│       └── schemaTypes/
│
├── docs/                 # Documentation
└── scripts/              # Build scripts
```

## Documentation

When contributing, update relevant documentation:

- **README.md**: Project overview
- **docs/GETTING_STARTED.md**: Setup instructions
- **docs/DEVELOPMENT.md**: Development workflow
- **docs/ARCHITECTURE.md**: System design
- **Code comments**: Complex logic

## Questions?

- Check [Documentation](docs/)
- Search [existing issues](https://github.com/ANYURU/medical-equipment/issues)
- Create [new issue](https://github.com/ANYURU/medical-equipment/issues/new)

## Recognition

Contributors will be recognized in:
- GitHub contributors page
- Release notes (for significant contributions)
- Project README (for major contributions)

## License

By contributing, you agree that your contributions will be licensed under the project's MIT License.

## Thank You!

Your contributions make this project better. We appreciate your time and effort! 🙏
