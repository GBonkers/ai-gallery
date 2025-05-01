// src/app/agents/[id]/page.tsx

import AgentPage from '@/components/AgentPage';

interface PageProps {
  params: { id: string }; // id is a string here
}

export default async function Page({ params }: PageProps) {
  // Next.js will have awaited `params` for you, so it's a real object
  const { id } = params;
  return <AgentPage id={id} />;
}
