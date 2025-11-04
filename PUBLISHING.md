# Publishing sonner-native-with-alerts to npm

This guide will help you publish your extended version of sonner-native with alert functionality to npm.

## Prerequisites

1. **npm account**: Create one at [npmjs.com](https://www.npmjs.com/) if you don't have one
2. **npm CLI**: Make sure you have npm installed and are logged in
3. **Unique package name**: Choose a name that's not already taken on npm

## Step 1: Customize Package Information

Before publishing, you should update these fields in `package.json` to match your preferences:

```json
{
  "name": "your-package-name-here", // Choose a unique name
  "version": "1.0.0",
  "description": "Your description here",
  "repository": {
    "type": "git",
    "url": "git+https://github.com/yourusername/your-repo.git"
  },
  "author": "Your Name <your.email@example.com> (https://github.com/yourusername)",
  "bugs": {
    "url": "https://github.com/yourusername/your-repo/issues"
  },
  "homepage": "https://github.com/yourusername/your-repo#readme"
}
```

## Step 2: Suggested Package Names

Since `sonner-native` is already taken, here are some suggestions:

- `sonner-native-alerts`
- `sonner-native-extended`
- `sonner-native-plus`
- `react-native-sonner-alerts`
- `@yourname/sonner-native` (scoped package)
- `sonner-native-dialogs`
- `toast-alert-native`

## Step 3: Login to npm

```bash
npm login
```

Follow the prompts to enter your npm credentials.

## Step 4: Check Package Name Availability

```bash
npm view your-chosen-package-name
```

If you get a 404 error, the name is available. If you get package info, it's taken.

## Step 5: Build and Test

```bash
# Run the preparation script
npm run prepare-publish

# Or manually:
npm run clean
npm run prepare
npm test
npm run typecheck
npm run lint
```

## Step 6: Test Publishing (Dry Run)

```bash
npm publish --dry-run
```

This shows you what would be published without actually publishing.

## Step 7: Publish to npm

### Option A: Standard publish

```bash
npm publish
```

### Option B: Using the convenience script

```bash
npm run publish-package
```

### Option C: Scoped package (if using @yourname/package-name)

```bash
npm publish --access public
```

## Step 8: Verify Publication

After publishing, check that your package is available:

```bash
npm view your-package-name
```

You can also visit `https://www.npmjs.com/package/your-package-name`

## Usage for Others

Once published, others can install your package:

```bash
npm install your-package-name
# or
yarn add your-package-name
```

And use it like this:

```typescript
import { Toaster, toast, alert } from 'your-package-name';

// Setup
<Toaster />

// Use toasts
toast.success('Success!');

// Use alerts
alert.confirm('Are you sure?', {
  onConfirm: () => console.log('Confirmed')
});
```

## Version Updates

When you make changes and want to publish updates:

```bash
npm version patch  # 1.0.0 -> 1.0.1 (bug fixes)
npm version minor  # 1.0.0 -> 1.1.0 (new features)
npm version major  # 1.0.0 -> 2.0.0 (breaking changes)
npm publish
```

## Tips

1. **Start with version 1.0.0** since this is a significant extension
2. **Use semantic versioning** (semver) for updates
3. **Test thoroughly** before publishing
4. **Keep good documentation** in your README
5. **Consider using a scoped package** (@yourname/package) to avoid name conflicts

## Troubleshooting

- **403 Forbidden**: You don't have permission or the package name is taken
- **Build errors**: Run `npm run clean && npm run prepare`
- **Test failures**: Fix tests before publishing
- **Package size too large**: Check `.npmignore` to exclude unnecessary files

## Files Included in Package

The package will include:

- `src/` - Source TypeScript files
- `lib/` - Compiled JavaScript files
- `package.json` - Package metadata
- `README.md` - Documentation
- TypeScript definitions

Files excluded (via `.npmignore` or `files` field):

- `example/` - Example app
- `docs/` - Documentation source
- Test files
- Build artifacts
