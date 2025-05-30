# Release Script Documentation

The `release.mjs` script automates the complete release process for the `@totallyinformation/web-components` package.

## Prerequisites

Before using the release script, ensure you have:

1. **GitHub CLI (gh)** installed and authenticated:
   ```bash
   # Install GitHub CLI (if not already installed)
   winget install GitHub.cli
   
   # Authenticate with GitHub
   gh auth login
   ```

2. **npm** authenticated for publishing:
   ```bash
   npm login
   ```

3. **Clean working directory** with all changes committed:
   ```bash
   git status  # Should show no uncommitted changes
   ```

## Usage

### Basic Release (Recommended)

```bash
# Full release process: checks, tag, GitHub release, npm publish
npm run release
```

### Available Scripts

```bash
# Preview what would happen without making changes
npm run release:dry-run

# Only create Git tag and GitHub release (no npm publish)
npm run release:tag-only

# Only publish to npm (requires existing tag)
npm run release:publish-only

# Direct script usage with options
node ./libs/release.mjs [options]
```

### Command Line Options

- `--dry-run` - Show what would be done without executing
- `--skip-checks` - Skip pre-release checks (linting, tests, build)
- `--tag-only` - Only create Git tag and GitHub release
- `--publish-only` - Only publish to npm (requires existing tag)
- `--verbose` - Enable verbose logging (default)
- `--quiet` - Disable verbose logging
- `--help`, `-h` - Show help message

## Release Process

The script performs the following steps in order:

### 1. Prerequisites Validation
- Checks for required tools: `git`, `gh`, `npm`
- Verifies GitHub CLI authentication
- Verifies npm authentication

### 2. Working Directory Check
- Ensures no uncommitted changes exist
- Prevents releases with dirty working directory

### 3. Pre-release Checks (unless `--skip-checks`)
- Runs ESLint: `npm run lint`
- Builds the project: `npm run build`
- Generates documentation: `npm run analyse`

### 4. Git Tagging (unless `--publish-only`)
- Creates annotated Git tag based on `package.json` version
- Pushes tag to origin repository
- Validates tag doesn't already exist

### 5. GitHub Release (unless `--publish-only`)
- Generates changelog from Git commits since last tag
- Creates GitHub release with auto-generated release notes
- Attaches changelog to the release

### 6. npm Publishing (unless `--tag-only`)
- Validates version doesn't already exist on npm
- Publishes package with public access
- Confirms successful publication

## Examples

### Standard Release Workflow

```bash
# 1. Update version in package.json
npm version patch  # or minor, major

# 2. Commit the version change
git add package.json
git commit -m "chore: bump version to 1.1.1"

# 3. Run the release script
npm run release
```

### Test Release Process

```bash
# Preview what would happen
npm run release:dry-run
```

### Split Release Process

```bash
# First, create tag and GitHub release
npm run release:tag-only

# Later, publish to npm
npm run release:publish-only
```

### Emergency npm Publish

```bash
# Skip checks and only publish (use with caution)
node ./libs/release.mjs --publish-only --skip-checks
```

## Error Handling

The script includes comprehensive error handling for common issues:

- **Missing prerequisites** - Clear instructions for setup
- **Dirty working directory** - Prompts to commit changes
- **Existing tags/versions** - Prevents duplicate releases
- **Authentication failures** - Guidance for re-authentication
- **Build/test failures** - Stops release process early

## Security Considerations

- Script follows Shift-Left security practices
- Validates all inputs and commands
- Uses secure authentication methods
- Prevents execution with uncommitted changes
- Logs all actions for audit trail

## Troubleshooting

### Common Issues

1. **"GitHub CLI not authenticated"**
   ```bash
   gh auth login
   ```

2. **"npm not authenticated"**
   ```bash
   npm login
   ```

3. **"Working directory not clean"**
   ```bash
   git status
   git add .
   git commit -m "commit message"
   ```

4. **"Tag already exists"**
   - Update version in `package.json`
   - Or delete existing tag: `git tag -d v1.1.0 && git push origin :refs/tags/v1.1.0`

5. **"Version already exists on npm"**
   - Update version in `package.json`
   - Or use `--tag-only` to skip npm publishing

### Logs and Debugging

The script provides detailed logging with timestamps and color coding:
- 🔵 **INFO** - General information
- 🟢 **SUCCESS** - Successful operations
- 🟡 **WARNING** - Non-critical issues
- 🔴 **ERROR** - Critical failures

Use `--verbose` for detailed command output or `--quiet` for minimal logging.

## Contributing

When modifying the release script:

1. Follow the existing code style (ESLint configuration)
2. Add JSDoc comments for new functions
3. Include error handling for new operations
4. Test with `--dry-run` before committing
5. Update this documentation for new features
