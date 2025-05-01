// src/app/agents/[id]/page.tsx
import AgentPage from '@/components/AgentPage';

export default async function Page({
  params, // params: Promise<{ id: string }>
}: {
  params: Promise<{ id: string }>;
}) {
  // await the promise so you get a real `{ id: string }`
  const { id } = await params;
  return <AgentPage id={id} />;
}
