// src/app/agents/[id]/page.tsx

import AgentPage from '@/components/AgentPage';
import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function Page({ params }: PageProps) {
  // await the promise so you get a real `{ id: string }`
  const { id } = await params;

  // Fetch the agent so we can 404 if it doesn't exist
  const agent = await prisma.agent.findUnique({
    where: { id },
    select: { id: true }, // add any fields you need later
  });

  if (!agent) {
    notFound();
  }

  // Pass the real id into your client component
  return <AgentPage id={agent.id} />;
}
