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

## Adding a New AI Agent

We love new agents! To get yours into the gallery, follow these steps:

1. **Pick a slug.**  
   Decide on a unique, URL-friendly folder name for your agent (e.g. `my-cool-bot`).

2. **Create the folder structure.**  
   Under `src/agents/`, make a new directory named after your slug. Inside it, add:

3. **Author your metadata.json.**  
   In `metadata.json`, include at least:

```
{
  "creatorGitHubId": 12345678,            // your GitHub user id (use : (Invoke-RestMethod -Uri "https://api.github.com/users/ŷour-github-username").id)
  "creatorLogin": "your-github-username", // your GitHub handle
  "creatorAvatarUrl": "https://…",        // link to your avatar
  "imageUrl": "/agents/my-cool-bot/thumbnail.png"
}
```

4. **Add a thumbnail.**

   Drop a square PNG at thumbnail.png (around 700×320px), e.g. your bot’s logo.

   If you desire to use dalle-3 to generate a thumbnail, you may use a similar prompt:

   Create a minimalist [Illustration] in the style of a digital Da Vinci sketch.
   Use fine sepia-brown line art (#7B4F25) with subtle cross-hatching, on a soft parchment-beige background (#F5EBDD).
   Render it in flat, vector-like strokes—no drop shadows—and keep the overall look as if it were hand-drawn on aged paper but produced digitally.
   Output as a 700 × 320 px PNG with transparency.

5. **Write your React sections.**

   Demonstration.tsx
   Live examples, embeds, or usage demos.

   Documentation.tsx
   Markdown-style docs or JSX instructions for users.

   Visualization.tsx
   Charts, diagrams, or any visual overview.

   Use the existing agents in src/agents/demo-bot/… as a template .

6. **Run the sync script.**

   After saving your files, run:

```
npm run sync:agents

```

7. **Test locally.**

```
npm run dev
```

8. Commit & open a PR.

```
git checkout -b feature/add-my-cool-bot
git add src/agents/my-cool-bot
git commit -m "feat(agent): add my-cool-bot AI agent"
git push origin feature/add-my-cool-bot

```

Then open a PR against main.

## Development Workflow

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
