import { PrismaClient } from '@prisma/client';

async function main() {
  const prisma = new PrismaClient();
  try {
    // 1) load every agent’s contributor + count
    const agents = await prisma.agent.findMany({
      select: { creatorId: true, visitCount: true },
    });

    // 2) tally per contributor
    const totals: Record<string, number> = {};
    for (const { creatorId, visitCount } of agents) {
      totals[creatorId] = (totals[creatorId] ?? 0) + (visitCount ?? 0);
    }

    // 3) persist the roll-up
    await Promise.all(
      Object.entries(totals).map(([creatorId, total]) =>
        prisma.contributor.update({
          where: { id: creatorId },
          data: { visitCount: total },
        }),
      ),
    );
  } finally {
    await prisma.$disconnect();
  }
}

// invoke & let any error bubble out
main().catch((err) => {
  console.error(err);
  // throw so ts-node exits non-zero
  throw err;
});
