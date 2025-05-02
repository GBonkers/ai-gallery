// src/components/AgentPage.tsx
'use client';

import { useState, useEffect, useRef } from 'react';
import type { FC } from 'react';
import agents from '@/agents';

interface AgentPageProps {
  id: string;
}

const TABS = [
  { key: 'demo', label: 'Demo', fallback: 'No demo yet.' },
  { key: 'docs', label: 'Documentation', fallback: 'No documentation yet.' },
  { key: 'viz', label: 'Visualization', fallback: 'No visualization yet.' },
] as const;

type TabKey = (typeof TABS)[number]['key'];

const AgentPage: FC<AgentPageProps> = ({ id }) => {
  const { Documentation, Demonstration, Visualization } = agents[id] || {};
  const didBump = useRef(false);
  const [active, setActive] = useState<TabKey>('demo');

  // ——— Only bump once per session/tab ———
  useEffect(() => {
    if (didBump.current) return;

    const storageKey = `agent-visited-${id}`;
    // skip if we've already counted in this session
    if (sessionStorage.getItem(storageKey)) return;

    // mark as counted
    sessionStorage.setItem(storageKey, 'true');
    didBump.current = true;

    // fire the POST to increment visitCount
    fetch(`/api/agents/${id}`, { method: 'POST' }).catch((err) =>
      console.error('Visit-count error', err),
    );
  }, [id]);

  // ——— Hash-restore on mount ———
  useEffect(() => {
    const h = window.location.hash.slice(1) as TabKey;
    if (TABS.some((t) => t.key === h)) setActive(h);
  }, []);

  // ——— Keep the URL hash in sync ———
  useEffect(() => {
    window.history.replaceState(null, '', `#${active}`);
  }, [active]);

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
