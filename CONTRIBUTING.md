# Contributing to AI Agents Gallery

Thank you for your interest in improving this project.

## Setup

### 1. Install dependencies
```bash
npm ci
```

### 2. Run the development server
```bash
npm run dev
```

### 3. Lint and format your code
```bash
npm run lint
npm run format
```

## How to Contribute

1. Open an issue before tackling any major work (feature or bug).
2. Create a branch off of `main`:
   ```bash
   git checkout -b feature/brief-descriptive-name
   ```
3. Implement your changes, adhering to the existing code style and updating documentation if needed.
4. Commit using Conventional Commits:
   ```
   feat(demo): add new input control for XYZ
   fix(docs): correct typo in README
   ```
5. Push your branch and open a Pull Request against `main`, referencing the related issue.

## Development Workflow

- Branch naming:
  - `feature/...` for new features
  - `fix/...` for bug fixes
  - `chore/...` for maintenance, docs, or tooling
- Pre-commit checks via Husky + lint-staged
- Continuous Integration: GitHub Actions runs lint, style checks, formatting, and build on every push and PR

## Coding Standards

- JavaScript / TypeScript: ESLint & Prettier
- CSS: Tailwind CSS & Stylelint
- Markdown / MDX: Prettier

## Pull Request Checklist

- [ ] All CI checks are passing
- [ ] Related issues are linked (e.g. `Fixes #123`)
- [ ] Pull Request template is completed
- [ ] Changes are clearly described in the PR
- [ ] Review feedback has been addressed

Thank you for helping make AI Agents Gallery better!
