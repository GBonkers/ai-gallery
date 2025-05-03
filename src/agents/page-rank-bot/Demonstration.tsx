'use client';

import { useState, useEffect, useRef } from 'react';
import { iteratePageRank, DAMPING, Corpus } from './logic/pagerank';
import { setRanks, subscribe, getRanks } from './logic/PageRankStore';
import { crawlLive } from './logic/crawler';

const PRESETS: Record<string, string> = {
  'Triangle Graph': JSON.stringify({ A: ['B'], B: ['C'], C: ['A'] }, null, 2),
  'Chain Graph': JSON.stringify({ A: ['B'], B: ['C'], C: [] }, null, 2),
  'Star Graph': JSON.stringify(
    { Center: ['A', 'B', 'C'], A: [], B: [], C: [] },
    null,
    2,
  ),
};

export default function Demonstration() {
  const [mode, setMode] = useState<'custom' | 'live'>('custom');
  const [rawCorpus, setRawCorpus] = useState<string>(PRESETS['Triangle Graph']);
  const [url, setUrl] = useState<string>('');
  const [depth, setDepth] = useState<number>(2);
  const [limit, setLimit] = useState<number>(50);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [ranks, setLocalRanks] = useState<Record<string, number>>(getRanks());
  const [currentCorpus, setCurrentCorpus] = useState<Corpus>({});
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => subscribe(setLocalRanks), []);
  useEffect(() => {
    const ta = textareaRef.current;
    if (ta) {
      ta.style.height = 'auto';
      ta.style.height = `${ta.scrollHeight}px`;
    }
  }, [rawCorpus]);

  async function compute() {
    setError('');
    let corpus: Corpus;

    if (mode === 'custom') {
      try {
        const parsed = JSON.parse(rawCorpus);
        corpus = Object.fromEntries(
          Object.entries(parsed).map(([p, outs]) => [
            p,
            new Set(outs as string[]),
          ]),
        );
      } catch {
        setError('Invalid JSON corpus.');
        return;
      }
    } else {
      if (!url) {
        setError('Please enter a URL.');
        return;
      }
      setLoading(true);
      try {
        corpus = await crawlLive(url, depth, limit);
      } catch {
        setError('Failed to crawl the site.');
        setLoading(false);
        return;
      }
      setLoading(false);
    }

    setCurrentCorpus(corpus);
    const result = iteratePageRank(corpus, DAMPING);
    setRanks(result);
  }

  return (
    <div className='space-y-6 rounded-xl bg-[var(--color-background)] p-6 text-[var(--color-text-primary)] shadow-inner'>
      <h1 className='text-brand text-3xl font-bold'>PageRank Explorer</h1>
      <p className='text-sm text-[var(--color-text-secondary)]'>
        PageRank measures a page’s importance based on how many and which pages
        link to it.
      </p>

      {/* Mode Toggle */}
      <div className='flex gap-4 text-sm font-medium'>
        {['custom', 'live'].map((opt) => (
          <button
            key={opt}
            onClick={() => setMode(opt as 'custom' | 'live')}
            className={`rounded-full px-3 py-1.5 transition ${
              mode === opt
                ? 'bg-[var(--color-brand)] text-white'
                : 'bg-[var(--color-background-light)] text-[var(--color-text-secondary)]'
            }`}
          >
            {opt === 'custom' ? 'Custom Corpus' : 'Live Website'}
          </button>
        ))}
      </div>

      {/* Inputs */}
      {mode === 'custom' ? (
        <div className='space-y-4'>
          <div className='flex items-center gap-3 text-sm'>
            <label>Presets:</label>
            <select
              value={
                Object.keys(PRESETS).find(
                  (key) => PRESETS[key] === rawCorpus,
                ) || ''
              }
              onChange={(e) => setRawCorpus(PRESETS[e.target.value])}
              className='rounded-xl bg-[var(--color-background-light)] px-3 py-1 text-[var(--color-text-primary)] shadow-md dark:text-[var(--color-text-primary)]'
            >
              {Object.keys(PRESETS).map((name) => (
                <option key={name} value={name}>
                  {name}
                </option>
              ))}
            </select>
          </div>
          <textarea
            ref={textareaRef}
            className='w-full resize-none overflow-hidden rounded-xl bg-[var(--color-background-light)] p-3 font-mono text-sm text-[var(--color-text-primary)] shadow-inner'
            value={rawCorpus}
            onChange={(e) => setRawCorpus(e.target.value)}
            rows={5}
          />
        </div>
      ) : (
        <div className='space-y-4'>
          <p className='text-sm text-[var(--color-text-secondary)]'>
            Try a sample site:&nbsp;
            <button
              onClick={() => setUrl('https://quotes.toscrape.com')}
              className='hover:text-brand underline'
            >
              quotes.toscrape.com
            </button>
            ,&nbsp;
            <button
              onClick={() => setUrl('http://books.toscrape.com')}
              className='hover:text-brand underline'
            >
              books.toscrape.com
            </button>
            , or enter your own URL below.
          </p>
          <input
            type='text'
            className='w-full rounded-xl bg-[var(--color-background-light)] px-3 py-2 text-[var(--color-text-primary)] shadow-inner'
            placeholder='https://example.com'
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <div className='flex flex-wrap gap-6 text-sm'>
            <label className='flex items-center gap-2'>
              Depth:
              <input
                type='number'
                min={1}
                max={5}
                value={depth}
                onChange={(e) => setDepth(Number(e.target.value))}
                className='w-20 rounded-xl bg-[var(--color-background-light)] px-2 py-1 shadow-inner'
              />
            </label>
            <label className='flex items-center gap-2'>
              Max Pages:
              <input
                type='number'
                min={10}
                max={200}
                value={limit}
                onChange={(e) => setLimit(Number(e.target.value))}
                className='w-24 rounded-xl bg-[var(--color-background-light)] px-2 py-1 shadow-inner'
              />
            </label>
          </div>
          <p className='text-xs text-[var(--color-text-secondary)] italic'>
            ⚠️ Live Crawl Limits: capped at {limit} pages and {depth} levels
            deep via a public CORS proxy.
          </p>
        </div>
      )}

      {/* Action Button */}
      <button
        onClick={compute}
        disabled={loading}
        className='rounded-xl bg-[var(--color-brand)] px-6 py-2 text-sm font-semibold text-white shadow-md transition hover:bg-[var(--color-brand-dark)]'
      >
        {loading ? 'Working…' : 'Compute PageRank'}
      </button>
      {error && <p className='mt-2 text-sm text-red-600'>{error}</p>}

      {/* Link Structure */}
      <div className='mt-6 max-h-64 overflow-y-auto rounded-xl bg-[var(--color-accent-light)] p-4 shadow-inner'>
        <h2 className='mb-2 text-xl font-semibold'>Link Structure</h2>
        <ul className='list-inside list-disc space-y-1 text-sm text-[var(--color-text-secondary)]'>
          {Object.entries(currentCorpus).map(([page, outs]) => (
            <li key={page}>
              <code>{page}</code> → {Array.from(outs).join(', ') || '—'}
            </li>
          ))}
        </ul>
      </div>

      {/* PageRank Results */}
      <div className='max-h-72 overflow-y-auto rounded-xl bg-[var(--color-background-light)] p-4 shadow-inner'>
        <h2 className='mb-2 text-xl font-semibold'>PageRank Scores</h2>
        <ol className='list-inside list-decimal space-y-1 text-sm text-[var(--color-text-secondary)]'>
          {Object.entries(ranks)
            .sort(([, a], [, b]) => b - a)
            .map(([page, rank]) => (
              <li key={page}>
                <code>{page}</code>: {rank.toFixed(4)}
              </li>
            ))}
        </ol>
      </div>
    </div>
  );
}
