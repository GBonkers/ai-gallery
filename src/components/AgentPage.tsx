'use client';
import { useState, useEffect } from 'react';
import type { FC } from 'react';
import agents from '@/agents';

interface AgentPageProps {
  id: string;
}

// Define our tab metadata
const TABS = [
  { key: 'demo', label: 'Demo', fallback: 'No demo yet.' },
  { key: 'docs', label: 'Documentation', fallback: 'No documentation yet.' },
  { key: 'viz', label: 'Visualization', fallback: 'No visualization yet.' },
] as const;

type TabKey = (typeof TABS)[number]['key'];

const AgentPage: FC<AgentPageProps> = ({ id }) => {
  const { Documentation, Demonstration, Visualization } = agents[id] || {};

  const [active, setActive] = useState<TabKey>('demo');

  // on mount, restore from hash
  useEffect(() => {
    const h = window.location.hash.slice(1) as TabKey;
    if (TABS.some((t) => t.key === h)) setActive(h);
  }, []);

  // sync hash when active changes
  useEffect(() => {
    window.history.replaceState(null, '', `#${active}`);
  }, [active]);

  // pick the right component for the active tab
  const Comp =
    active === 'demo'
      ? Demonstration
      : active === 'docs'
        ? Documentation
        : Visualization;

  return (
    <div className='min-h-screen bg-[var(--color-background-light)] text-[var(--color-text-primary)]'>
      <div className='mx-auto min-h-screen max-w-5xl rounded-3xl bg-[var(--color-background)] p-6 shadow-inner'>
        {/* Tab bar */}
        <div className='mb-6 flex space-x-4 border-b'>
          {TABS.map((t) => (
            <button
              key={t.key}
              onClick={() => setActive(t.key)}
              className={`border-b-2 pb-2 transition-all duration-300 ${
                active === t.key
                  ? 'border-[var(--color-brand)] font-semibold text-[var(--color-text-primary)]'
                  : 'border-transparent text-[var(--color-text-secondary)] hover:text-[var(--color-accent)]'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Active pane */}
        <div className='space-y-6'>
          {Comp ? (
            // Render the React component via JSX, not by calling it
            <Comp />
          ) : (
            <p className='text-center'>
              {TABS.find((t) => t.key === active)!.fallback}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AgentPage;
