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

  // Count visit once per session
  useEffect(() => {
    if (didBump.current) return;
    const storageKey = `agent-visited-${id}`;
    if (sessionStorage.getItem(storageKey)) return;
    sessionStorage.setItem(storageKey, 'true');
    didBump.current = true;
    fetch(`/api/agents/${id}`, { method: 'POST' }).catch(console.error);
  }, [id]);

  // Restore tab from hash
  useEffect(() => {
    const h = window.location.hash.slice(1) as TabKey;
    if (TABS.some((t) => t.key === h)) setActive(h);
  }, []);

  // Sync URL hash
  useEffect(() => {
    window.history.replaceState(null, '', `#${active}`);
  }, [active]);

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

        {/* All tabs mounted; only one visible */}
        <div className='space-y-6'>
          <div style={{ display: active === 'demo' ? 'block' : 'none' }}>
            {Demonstration ? (
              <Demonstration />
            ) : (
              <p className='text-center'>
                {TABS.find((t) => t.key === 'demo')!.fallback}
              </p>
            )}
          </div>
          <div style={{ display: active === 'docs' ? 'block' : 'none' }}>
            {Documentation ? (
              <Documentation />
            ) : (
              <p className='text-center'>
                {TABS.find((t) => t.key === 'docs')!.fallback}
              </p>
            )}
          </div>
          <div style={{ display: active === 'viz' ? 'block' : 'none' }}>
            {Visualization ? (
              <Visualization />
            ) : (
              <p className='text-center'>
                {TABS.find((t) => t.key === 'viz')!.fallback}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentPage;
