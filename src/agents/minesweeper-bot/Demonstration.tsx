'use client';

import { JSX, useEffect, useState } from 'react';
import {
  resetGame,
  aiMove,
  reveal,
  toggleFlag,
  subscribe,
  GameState,
} from './logic/MinesweeperStore';

export default function Demonstration() {
  const [game, setGame] = useState<GameState | null>(null);

  useEffect(() => subscribe((g) => setGame({ ...g })), []);

  if (!game) return null;

  const cells: JSX.Element[] = [];
  for (let i = 0; i < game.height; i++) {
    for (let j = 0; j < game.width; j++) {
      const key = `${i},${j}`;
      const isRevealed = game.revealed.has(key);
      const isFlagged = game.flags.has(key);
      const isMine = isRevealed && game.lost && game.mines.has(key);
      const count = game.nearby.get(key);

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
        <h1 className='text-3xl font-bold text-[var(--color-brand)]'>
          Minesweeper
        </h1>
        <p className='text-sm text-[var(--color-text-secondary)]'>
          {game.message}
        </p>

        <div className='flex flex-wrap gap-4'>
          <button
            onClick={() => aiMove()}
            disabled={game.lost}
            className='rounded-xl bg-[var(--color-brand)] px-5 py-2 text-sm font-medium text-white shadow-md hover:bg-[var(--color-brand-dark)]'
          >
            AI Move
          </button>
          <button
            onClick={() => resetGame(game.height, game.width)}
            className='rounded-xl bg-[var(--color-accent)] px-5 py-2 text-sm font-medium text-[var(--color-text-primary)] shadow-md hover:bg-[var(--color-accent-dark)]'
          >
            Reset
          </button>
        </div>

        <div
          className='mx-auto mt-6 grid w-full max-w-5xl gap-1'
          style={{
            gridTemplateColumns: `repeat(${game.width}, minmax(2rem, 1fr))`,
          }}
        >
          {cells}
        </div>
      </div>
    </div>
  );
}
