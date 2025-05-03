'use client';

import { useEffect, useState } from 'react';
import { Bar, BarChart, Tooltip, XAxis, YAxis } from 'recharts';
import { getRanks, subscribe } from './logic/PageRankStore';

export default function Visualization() {
  const [history, setHistory] = useState<Record<string, number>[]>([]);
  const [iteration, setIteration] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);

  useEffect(() => {
    return subscribe((ranks) => {
      setHistory((prev) => {
        setIteration(0);
        return [...prev, ranks];
      });
    });
  }, []);

  useEffect(() => {
    let timer: number;
    if (playing && history.length > 1) {
      const interval = 1000 / speed;
      timer = window.setInterval(() => {
        setIteration((i) => {
          if (i < history.length - 1) {
            return i + 1;
          } else {
            setPlaying(false);
            return i;
          }
        });
      }, interval);
    }
    return () => clearInterval(timer);
  }, [playing, speed, history]);

  const hasData = history.length > 0;
  const currentRanks = hasData ? history[iteration] : getRanks();

  const barData = Object.entries(currentRanks)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 10)
    .map(([page, rank]) => ({ page, rank }));

  return (
    <div className='bg-[var(--color-background)] px-4 py-10 text-[var(--color-text-primary)]'>
      <section className='mx-auto max-w-3xl rounded-2xl bg-[var(--color-background-light)] p-8 shadow-inner'>
        <h2 className='mb-6 text-center text-3xl font-bold'>
          PageRank Over Iterations
        </h2>

        {hasData ? (
          <>
            <div className='mb-10 flex flex-wrap items-center justify-center gap-6 text-base'>
              <button
                onClick={() => setPlaying((p) => !p)}
                className='rounded-xl bg-[var(--color-brand)] px-6 py-2 font-medium text-white shadow-md transition hover:bg-[var(--color-brand-dark)]'
              >
                {playing ? 'Pause' : 'Play'}
              </button>

              <div className='flex items-center gap-2'>
                <label className='text-[var(--color-text-secondary)]'>
                  Iteration:
                </label>
                <input
                  type='range'
                  min={0}
                  max={history.length - 1}
                  value={iteration}
                  onChange={(e) => {
                    const val = Number(e.target.value);
                    setIteration(val);
                    setPlaying(false);
                  }}
                  className='h-2 w-52 rounded-lg accent-[var(--color-brand)]'
                />
                <span className='text-sm text-[var(--color-text-secondary)]'>
                  {iteration} / {history.length - 1}
                </span>
              </div>

              <div className='flex items-center gap-2'>
                <label className='text-[var(--color-text-secondary)]'>
                  Speed:
                </label>
                <select
                  value={speed}
                  onChange={(e) => setSpeed(Number(e.target.value))}
                  className='rounded-xl bg-[var(--color-background)] px-4 py-1.5 text-[var(--color-text-primary)] shadow-md'
                >
                  <option value={0.5}>0.5×</option>
                  <option value={1}>1×</option>
                  <option value={2}>2×</option>
                </select>
              </div>
            </div>

            <div className='overflow-x-auto'>
              <BarChart
                width={700}
                height={450}
                data={barData}
                layout='vertical'
                margin={{ top: 20, right: 30, left: 120, bottom: 20 }}
              >
                <XAxis
                  type='number'
                  tick={{
                    fontSize: 14,
                    fill: 'var(--color-text-secondary)',
                    fontFamily: 'inherit',
                  }}
                  axisLine={{ stroke: 'var(--color-border)' }}
                  tickLine={false}
                />
                <YAxis
                  dataKey='page'
                  type='category'
                  tick={{
                    fontSize: 14,
                    fill: 'var(--color-text-secondary)',
                    fontFamily: 'inherit',
                  }}
                  axisLine={{ stroke: 'var(--color-border)' }}
                  tickLine={false}
                  width={100}
                />
                <Tooltip
                  wrapperStyle={{ fontFamily: 'inherit', fontSize: '0.875rem' }}
                  contentStyle={{
                    borderRadius: '0.5rem',
                    borderColor: 'var(--color-border)',
                    backgroundColor: 'var(--color-background-light)',
                    color: 'var(--color-text-primary)',
                  }}
                />
                <Bar
                  dataKey='rank'
                  fill='var(--color-brand)'
                  radius={[0, 4, 4, 0]}
                />
              </BarChart>
            </div>
          </>
        ) : (
          <p className='text-center text-[var(--color-text-secondary)] italic'>
            Waiting for PageRank data…
          </p>
        )}
      </section>
    </div>
  );
}
