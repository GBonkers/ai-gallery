// src/agents/minesweeper-bot/Visualization.tsx
'use client';

import React, { JSX, useEffect, useState } from 'react';
import {
  subscribe,
  GameState,
  reveal,
  toggleFlag,
} from './logic/MinesweeperStore';
import { MinesweeperAI } from './logic/MinesweeperAI';
import { Cell } from './logic/Minesweeper';

export default function Visualization() {
  const [game, setGame] = useState<GameState | null>(null);

  useEffect(() => subscribe((g) => setGame({ ...g })), []);
  if (!game) return null;

  // Reconstruct AI knowledge from revealed cells
  const ai = new MinesweeperAI(game.height, game.width);
  for (const [key, count] of game.nearby.entries()) {
    const cell = key.split(',').map(Number) as Cell;
    ai.addKnowledge(cell, count);
  }

  // Heatmap strength per cell
  const heatCount: Record<string, number> = {};
  ai.knowledge.forEach((sent) => {
    sent.cells.forEach((c) => {
      const k = c.join(',');
      heatCount[k] = (heatCount[k] || 0) + 1;
    });
  });
  const maxHeat = Math.max(...Object.values(heatCount), 1);

  // Known safes and mines (exclude already played moves)
  const knownSafes = Array.from(ai.safes).filter(
    (k) => !game.revealed.has(k) && !game.flags.has(k),
  );
  const knownMines = Array.from(ai.mines);

  // Color mapping
  const safeColor = 'rgba(38,140,75,0.4)';
  const unsureColor = 'rgba(255,252,127,0.4)';
  const bombColor = 'rgba(216,38,58,0.4)';

  // Build grid cells
  const cells: JSX.Element[] = [];
  for (let i = 0; i < game.height; i++) {
    for (let j = 0; j < game.width; j++) {
      const key = `${i},${j}`;
      const isRevealed = game.revealed.has(key);
      const isFlagged = game.flags.has(key);
      const isMine = isRevealed && game.lost && game.mines.has(key);
      const count = game.nearby.get(key);

      // Determine heatmap color
      let bgColor: string | undefined;
      if (ai.safes.has(key)) bgColor = safeColor;
      else if (ai.mines.has(key)) bgColor = bombColor;
      else if (heatCount[key]) bgColor = unsureColor;

      cells.push(
        <div
          key={key}
          onClick={() => reveal([i, j])}
          onContextMenu={(e) => {
            e.preventDefault();
            toggleFlag([i, j]);
          }}
          className={`flex aspect-square w-full cursor-pointer items-center justify-center rounded-lg text-lg font-semibold shadow-inner transition select-none ${
            isRevealed
              ? 'bg-[var(--color-background-light)]'
              : 'bg-[var(--color-background-dark)] hover:brightness-110'
          }`}
          style={{
            backgroundColor: bgColor || undefined,
            border: bgColor ? 'none' : undefined,
          }}
        >
          {isFlagged
            ? '🚩'
            : isMine
              ? '💣'
              : isRevealed && count !== undefined
                ? count
                : ''}
        </div>,
      );
    }
  }

  return (
    <div className='px-4 py-10'>
      <div className='mx-auto max-w-5xl space-y-6 rounded-2xl bg-[var(--color-background)] p-6 shadow-inner'>
        <h2 className='text-2xl font-semibold text-[var(--color-brand)]'>
          AI Knowledge Heatmap
        </h2>

        {/* Legend */}
        <div className='flex gap-6 text-sm'>
          <div className='flex items-center gap-2'>
            <span
              className='inline-block h-4 w-4 rounded'
              style={{ backgroundColor: safeColor }}
            />
            Safe
          </div>
          <div className='flex items-center gap-2'>
            <span
              className='inline-block h-4 w-4 rounded'
              style={{ backgroundColor: unsureColor }}
            />
            Unsure
          </div>
          <div className='flex items-center gap-2'>
            <span
              className='inline-block h-4 w-4 rounded'
              style={{ backgroundColor: bombColor }}
            />
            Bomb
          </div>
        </div>

        <div
          className='mx-auto mt-4 grid w-full gap-1'
          style={{
            gridTemplateColumns: `repeat(${game.width}, minmax(2rem, 1fr))`,
          }}
        >
          {cells}
        </div>

        {/* Details */}
        <div className='grid grid-cols-1 gap-6 pt-8 md:grid-cols-3'>
          {/* Sentences */}
          <section className='rounded-xl bg-[var(--color-background-light)] p-4 shadow-inner'>
            <h3 className='mb-3 text-lg font-semibold text-[var(--color-brand)]'>
              Sentences
            </h3>
            <ul className='list-inside list-disc space-y-1 text-sm text-[var(--color-text-secondary)]'>
              {ai.knowledge.map((s, idx) => {
                const coords = Array.from(s.cells)
                  .map((c) => `(${c[0]},${c[1]})`)
                  .join(', ');
                return (
                  <li key={idx}>
                    Neighbors at {coords} contain exactly {s.count} mine
                    {s.count !== 1 ? 's' : ''}.
                  </li>
                );
              })}
            </ul>
          </section>

          {/* Known Safe Moves */}
          <section className='rounded-xl bg-[var(--color-background-light)] p-4 shadow-inner'>
            <h3 className='mb-3 text-lg font-semibold text-[var(--color-brand)]'>
              Known Safe Moves
            </h3>
            <ul className='grid list-inside list-disc grid-cols-2 gap-y-1 text-sm text-[var(--color-text-secondary)]'>
              {knownSafes.map((k) => (
                <li key={k}>({k})</li>
              ))}
            </ul>
          </section>

          {/* Known Mines */}
          <section className='rounded-xl bg-[var(--color-background-light)] p-4 shadow-inner'>
            <h3 className='mb-3 text-lg font-semibold text-[var(--color-brand)]'>
              Known Mines
            </h3>
            <ul className='list-inside list-disc space-y-1 text-sm text-[var(--color-text-secondary)]'>
              {knownMines.map((k) => (
                <li key={k}>({k})</li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
