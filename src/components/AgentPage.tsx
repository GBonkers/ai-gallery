'use client';

import agents from '@/agents';
import type { FC } from 'react';

interface AgentPageProps {
  id: string;
}

const AgentPage: FC<AgentPageProps> = ({ id }) => {
  const { Documentation, Demonstration, Visualization } = agents[id] || {};

  return (
    <div className='mx-auto max-w-3xl space-y-12 p-6'>
      {Documentation ? (
        <Documentation />
      ) : (
        <p className='text-center'>No documentation yet.</p>
      )}
      {Demonstration ? (
        <Demonstration />
      ) : (
        <p className='text-center'>No demo yet.</p>
      )}
      {Visualization ? (
        <Visualization />
      ) : (
        <p className='text-center'>No visualization yet.</p>
      )}
    </div>
  );
};

export default AgentPage;
