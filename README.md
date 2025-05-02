# AI Gallery

A curated, open-source collection of intelligent agents—showcasing demos, docs, and visualizations for AI-powered bots, tools, and assistants.

---

## Table of Contents

1. [Features](#features)
2. [Tech Stack](#tech-stack)
3. [Prerequisites](#prerequisites)
4. [Getting Started](#getting-started)
   - [Environment Variables](#environment-variables)
   - [Install & Generate](#install--generate)
   - [Database Setup](#database-setup)
   - [Run Locally](#run-locally)
5. [Scripts](#scripts)
6. [Deployment](#deployment)
7. [Contributing](#contributing)
8. [License](#license)

---

## Features

- 📂 **Agent Catalog**  
  Browse all registered AI agents with thumbnail, metadata, and creator info.
- 🖥 **Live Demos**  
  Interactive `<Demonstration />` components for each agent.
- 📚 **Documentation**  
  Markdown-style `<Documentation />` pages with setup and usage details.
- 📊 **Visualizations**  
  Custom `<Visualization />` components (charts, diagrams).
- 🚦 **Visit Tracking**  
  Per-agent visit counts (bumped on each unique session) and daily‐rolled-up contributor totals.
- 🔄 **CLI Sync**  
  CLI scripts to seed/sync agents and roll up contributor stats.

---

## Tech Stack

- **Framework**: Next.js 13 (App Router)
- **Database**: PostgreSQL (Vercel Postgres in production)
- **ORM**: Prisma
- **Styling**: Tailwind CSS
- **Language**: TypeScript & React
- **Hosting**: Vercel
- **CI**: GitHub Actions

---

## Prerequisites

- [Node.js](https://nodejs.org/) ≥ 18
- [npm](https://npmjs.com) or [pnpm](https://pnpm.io)
- A PostgreSQL database (locally, Docker, or managed—exposed via `DATABASE_URL`)

---

## Getting Started

### Environment Variables

Create a `.env.local` in the project root with:

```env
DATABASE_URL="postgresql://USER:PASS@HOST:PORT/DBNAME?schema=public"
# (optional) only if you provision Vercel Postgres via OIDC in CI
# VERCEL_OIDC_TOKEN="<your-vercel-oidc-token>"
```

## Install & Generate

```
npm ci
npx prisma generate --no-engine
```

## Database Setup

```
npx prisma migrate deploy
npm run sync:agents
```

## Run Locally

```
npm run dev
```

Open http://localhost:3000 in your browser.

---

### Scripts

| Script                      | Description                                                 |
| --------------------------- | ----------------------------------------------------------- |
| `npm run dev`               | Start Next.js in development mode                           |
| `npm run build`             | Production build                                            |
| `npm run start`             | Serve built app                                             |
| `npm run sync:agents`       | Import all `src/agents/*` into the database                 |
| `npm run sync:contributors` | Daily roll-up of agent .visitCount → contributor.visitCount |
| `npm run lint`              | Run ESLint (JS/TS)                                          |
| `npm run lint:style`        | Run Stylelint (CSS/SCSS)                                    |
| `npm run format`            | Run Prettier                                                |

---

### Deployment

1. Push to GitHub.

2. Vercel picks up the repo and runs the CI pipeline:

   - Installs dependencies

   - prisma generate --no-engine

   - prisma migrate deploy

   - npm run sync:agents

   - npm run sync:contributors

   - Builds & deploys the Next.js app

Ensure your Vercel Project’s Environment Variables include DATABASE_URL (and VERCEL_OIDC_TOKEN if used).

---

### Contributing

We welcome new agents, bug reports, and improvements!
Please see CONTRIBUTING.md for full guidelines on adding your AI agent, running the sync scripts, and opening a pull request.

---

### License

The MIT License (MIT)

Copyright (c) <year> Adam Veldhousen

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
