# Troubleshooting Guide

Common issues and solutions for the Medical Equipment Supply Platform.

## Installation Issues

### Node Version Mismatch

**Problem**: Error about Node version when running commands

**Solution**:
```bash
# Check current version
node --version

# Install correct version (20.x)
nvm install 20
nvm use 20

# Verify
node --version  # Should show v20.x.x
```

### npm install Fails

**Problem**: Errors during `npm install`

**Solutions**:

1. **Clear cache and retry**:
```bash
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

2. **Check Node/npm versions**:
```bash
node --version  # Should be 20.x
npm --version   # Should be 10.x
```

3. **Permission issues (Mac/Linux)**:
```bash
sudo chown -R $(whoami) ~/.npm
```

### Module Not Found

**Problem**: `Cannot find module 'xyz'`

**Solution**:
```bash
# Reinstall dependencies
npm install

# If specific to one workspace
npm install --workspace=apps/web
npm install --workspace=apps/studio
```

## Development Server Issues

### Port Already in Use

**Problem**: `Port 3000 is already in use`

**Solution**:

**Mac/Linux**:
```bash
# Find process using port
lsof -i :3000

# Kill process
kill -9 <PID>

# Or kill all Node processes
killall node
```

**Windows**:
```cmd
# Find process
netstat -ano | findstr :3000

# Kill process
taskkill /PID <PID> /F
```

### Server Won't Start

**Problem**: Development server crashes or won't start

**Solutions**:

1. **Check for errors in terminal**
2. **Clear Next.js cache**:
```bash
rm -rf apps/web/.next
npm run dev
```

3. **Check environment variables**:
```bash
# Ensure .env.local exists
ls apps/web/.env.local
ls apps/studio/.env.local
```

4. **Restart from scratch**:
```bash
# Kill all processes
killall node

# Clean and reinstall
rm -rf node_modules apps/web/.next
npm install
npm run dev
```

### Hot Reload Not Working

**Problem**: Changes don't reflect automatically

**Solutions**:

1. **Hard refresh browser**: Ctrl+Shift+R (Cmd+Shift+R on Mac)
2. **Check file watchers limit (Linux)**:
```bash
echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf
sudo sysctl -p
```
3. **Restart dev server**

## Sanity Studio Issues

### Can't Login to Studio

**Problem**: Authentication fails

**Solutions**:

1. **Check project ID**:
```bash
# In apps/studio/.env.local
SANITY_STUDIO_PROJECT_ID=t1xfyfxz
```

2. **Clear browser cache and cookies**
3. **Try different browser**
4. **Check Sanity status**: https://status.sanity.io

### Schemas Not Showing

**Problem**: Content types missing in Studio

**Solutions**:

1. **Check schema registration**:
```typescript
// apps/studio/schemaTypes/index.ts
export const schemaTypes = [
  // All schemas must be listed here
  seo,
  hero,
  // ...
];
```

2. **Restart Studio**:
```bash
# Stop server (Ctrl+C)
npm run dev:studio
```

3. **Check for TypeScript errors**:
```bash
cd apps/studio
npx tsc --noEmit
```

### Can't Upload Images

**Problem**: Image upload fails

**Solutions**:

1. **Check file size**: Max 10MB recommended
2. **Check file format**: JPG, PNG, GIF, WebP supported
3. **Check internet connection**
4. **Try different browser**
5. **Check Sanity project settings**

## Build Issues

### Build Fails

**Problem**: `npm run build` fails

**Solutions**:

1. **Check for TypeScript errors**:
```bash
# Web app
cd apps/web
npx tsc --noEmit

# Studio
cd apps/studio
npx tsc --noEmit
```

2. **Check for linting errors**:
```bash
npm run lint
```

3. **Clear cache and rebuild**:
```bash
rm -rf apps/web/.next
npm run build
```

4. **Check environment variables**:
```bash
# Ensure all required vars are set
cat apps/web/.env.local
```

### Out of Memory

**Problem**: `JavaScript heap out of memory`

**Solution**:
```bash
# Increase Node memory limit
export NODE_OPTIONS="--max-old-space-size=4096"
npm run build
```

## Git Issues

### Commit Rejected

**Problem**: Commit fails with lint/format errors

**Solutions**:

1. **Fix linting errors**:
```bash
npm run lint
npm run format
```

2. **Check commit message format**:
```bash
# Must follow conventional commits
feat(scope): description
fix(scope): description
```

3. **Skip hooks (emergency only)**:
```bash
git commit --no-verify -m "message"
```

### Merge Conflicts

**Problem**: Conflicts when merging branches

**Solution**:
```bash
# 1. Update your branch
git checkout develop
git pull origin develop

# 2. Rebase your feature branch
git checkout feature/your-branch
git rebase develop

# 3. Resolve conflicts in editor
# 4. Continue rebase
git add .
git rebase --continue

# 5. Force push (if already pushed)
git push --force-with-lease
```

### Can't Push to Protected Branch

**Problem**: `protected branch hook declined`

**Solution**: This is intentional! Create a PR instead:
```bash
# Push to feature branch
git push origin feature/your-branch

# Then create PR on GitHub
```

## Performance Issues

### Slow Page Load

**Solutions**:

1. **Check network tab** in browser DevTools
2. **Optimize images**: Use Next.js Image component
3. **Check Sanity queries**: Use projections to fetch only needed fields
4. **Enable caching**: Implement ISR or caching strategy

### Slow Build Times

**Solutions**:

1. **Use incremental builds**:
```bash
# Next.js automatically does this
npm run build
```

2. **Reduce dependencies**: Remove unused packages
3. **Optimize imports**: Use tree-shaking friendly imports

## Database/CMS Issues

### Sanity Query Errors

**Problem**: GROQ query fails

**Solutions**:

1. **Test in Vision plugin**: http://localhost:3333/vision
2. **Check syntax**:
```groq
*[_type == "product"] {
  _id,
  name,
  slug
}
```
3. **Check for typos** in field names
4. **Verify content exists** in Studio

### Data Not Updating

**Problem**: Changes in Sanity not showing on website

**Solutions**:

1. **Wait for revalidation** (if using ISR)
2. **Hard refresh browser**: Ctrl+Shift+R
3. **Check if published** (not draft)
4. **Clear Next.js cache**:
```bash
rm -rf apps/web/.next
npm run dev
```

## Environment Variable Issues

### Variables Not Loading

**Problem**: `undefined` when accessing env vars

**Solutions**:

1. **Check file name**: Must be `.env.local`
2. **Check location**: Must be in workspace root
3. **Restart server**: Required after changing env vars
4. **Check prefix**: Client vars need `NEXT_PUBLIC_` prefix

```env
# ✅ Accessible in browser
NEXT_PUBLIC_API_URL=https://api.example.com

# ✅ Server-only
DATABASE_URL=secret

# ❌ Won't work in browser
API_URL=https://api.example.com
```

## TypeScript Issues

### Type Errors

**Problem**: TypeScript compilation errors

**Solutions**:

1. **Check types**:
```bash
npx tsc --noEmit
```

2. **Install type definitions**:
```bash
npm install --save-dev @types/package-name
```

3. **Restart TypeScript server** in VS Code:
   - Cmd/Ctrl + Shift + P
   - "TypeScript: Restart TS Server"

## Browser Issues

### Styles Not Loading

**Problem**: CSS not applying

**Solutions**:

1. **Hard refresh**: Ctrl+Shift+R
2. **Clear browser cache**
3. **Check Tailwind config**
4. **Restart dev server**

### JavaScript Errors

**Problem**: Console errors in browser

**Solutions**:

1. **Check browser console** for error details
2. **Check for hydration errors** (server/client mismatch)
3. **Verify client components** have `'use client'` directive
4. **Check for missing dependencies**

## Common Error Messages

### "Cannot read property 'X' of undefined"

**Cause**: Accessing property on undefined/null object

**Solution**: Add optional chaining or null checks
```typescript
// ❌ Bad
const name = product.name;

// ✅ Good
const name = product?.name;
const name = product ? product.name : 'Default';
```

### "Hydration failed"

**Cause**: Server and client HTML don't match

**Solutions**:
1. Don't use browser-only APIs in server components
2. Use `useEffect` for client-only code
3. Check for random values (use stable keys)

### "Module not found: Can't resolve 'X'"

**Cause**: Missing dependency or wrong import path

**Solutions**:
```bash
# Install missing package
npm install package-name

# Check import path
# ❌ Wrong
import { X } from 'wrong/path';

# ✅ Correct
import { X } from '@/lib/utils';
```

## Getting More Help

### Check Logs

**Development**:
- Terminal output
- Browser console (F12)
- Network tab in DevTools

**Production**:
- Vercel logs (if deployed)
- Error tracking service (if configured)

### Search Resources

1. **Project docs**: Check other docs in `/docs`
2. **GitHub issues**: Search existing issues
3. **Stack Overflow**: Search for error messages
4. **Official docs**:
   - [Next.js](https://nextjs.org/docs)
   - [Sanity](https://www.sanity.io/docs)
   - [React](https://react.dev)

### Ask for Help

1. **Check this guide first**
2. **Search existing issues** on GitHub
3. **Create new issue** with:
   - Clear description
   - Steps to reproduce
   - Error messages
   - Environment info (OS, Node version, etc.)
   - Screenshots if applicable

### Provide Debug Info

When asking for help, include:

```bash
# System info
node --version
npm --version
git --version

# OS
uname -a  # Mac/Linux
systeminfo  # Windows

# Package versions
npm list --depth=0
```

## Prevention Tips

1. **Keep dependencies updated**: `npm outdated`
2. **Use version control**: Commit frequently
3. **Test before pushing**: Run build locally
4. **Read error messages**: They usually tell you what's wrong
5. **Use TypeScript**: Catch errors early
6. **Follow conventions**: Use established patterns
7. **Document changes**: Update docs when changing code
