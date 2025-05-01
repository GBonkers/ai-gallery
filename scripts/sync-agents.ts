/// <reference types="node" />

import * as fs from 'fs';
import * as path from 'path';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// __dirname works now that we have node types and are in a CommonJS context
const agentsDir = path.join(__dirname, '..', 'src', 'agents');

async function main() {
  for (const slug of fs.readdirSync(agentsDir)) {
    const metaPath = path.join(agentsDir, slug, 'metadata.json');
    if (!fs.existsSync(metaPath)) continue;
    const meta = JSON.parse(fs.readFileSync(metaPath, 'utf8'));
    // Upsert contributor
    const contributor = await prisma.contributor.upsert({
      where: { githubId: meta.creatorGitHubId },
      update: {
        login: meta.creatorLogin,
        avatarUrl: meta.creatorAvatarUrl,
      },
      create: {
        githubId: meta.creatorGitHubId,
        login: meta.creatorLogin,
        avatarUrl: meta.creatorAvatarUrl,
      },
    });
    // Upsert agent
    await prisma.agent.upsert({
      where: { id: slug },
      update: {
        imageUrl: meta.imageUrl,
        creatorId: contributor.id,
      },
      create: {
        id: slug,
        imageUrl: meta.imageUrl,
        creatorId: contributor.id,
      },
    });
  }
  await prisma.$disconnect();
}

main().catch(console.error);
