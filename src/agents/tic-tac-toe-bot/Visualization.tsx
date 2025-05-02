'use client';

import React, { useState, useMemo, useEffect } from 'react';
import {
  availableMoves,
  evaluate,
  Move,
  alphabetaCompare,
} from '@/agents/tic-tac-toe-bot/logic/tictactoe';
import { getBoard, subscribe } from '@/agents/tic-tac-toe-bot/logic/GameStore';

interface GameNode {
  move?: Move;
  children: GameNode[];
  pruned?: boolean;
}

function buildFullTree(
  board: string[][],
  player: 'X' | 'O',
  depth: number,
  maxDepth: number,
): GameNode {
  const node: GameNode = { children: [] };
  if (
    evaluate(board) !== 0 ||
    availableMoves(board).length === 0 ||
    depth >= maxDepth
  ) {
    return node;
  }
  for (const mv of availableMoves(board)) {
    const copy = board.map((r) => [...r]);
    copy[mv.row][mv.col] = player;
    const child = buildFullTree(
      copy,
      player === 'X' ? 'O' : 'X',
      depth + 1,
      maxDepth,
    );
    child.move = mv;
    node.children.push(child);
  }
  return node;
}

function annotatePruned(
  node: GameNode,
  board: string[][],
  player: 'X' | 'O',
  depth: number,
  maxDepth: number,
  alpha: number,
  beta: number,
): number {
  const score = evaluate(board);
  const moves = availableMoves(board);
  if (score !== 0 || moves.length === 0 || depth >= maxDepth) {
    return score;
  }
  let value = player === 'O' ? -Infinity : Infinity;
  for (let i = 0; i < node.children.length; i++) {
    const mv = node.children[i].move!;
    const copy = board.map((r) => [...r]);
    copy[mv.row][mv.col] = player;
    const childScore = annotatePruned(
      node.children[i],
      copy,
      player === 'X' ? 'O' : 'X',
      depth + 1,
      maxDepth,
      alpha,
      beta,
    );
    if (player === 'O') {
      value = Math.max(value, childScore);
      alpha = Math.max(alpha, value);
    } else {
      value = Math.min(value, childScore);
      beta = Math.min(beta, value);
    }
    if (beta <= alpha) {
      const markAll = (n: GameNode) => {
        n.pruned = true;
        n.children.forEach(markAll);
      };
      for (let j = i + 1; j < node.children.length; j++) {
        markAll(node.children[j]);
      }
      break;
    }
  }
  return value;
}

const TreeNode: React.FC<{ node: GameNode; level: number }> = ({
  node,
  level,
}) => {
  const [open, setOpen] = useState(false);
  const label = node.move
    ? `${node.pruned ? 'Losing ' : ''}Move (${node.move.row},${node.move.col})`
    : 'Start';

  return (
    <div className='border-l border-[var(--color-border-light)] pl-4'>
      <div
        className={`flex cursor-pointer items-center gap-1 font-mono text-sm ${
          node.pruned
            ? 'text-[var(--color-text-secondary)] italic'
            : 'text-[var(--color-text-primary)]'
        }`}
        onClick={() => setOpen(!open)}
      >
        {node.children.length > 0 && (
          <span className='text-[var(--color-brand)]'>{open ? '−' : '+'}</span>
        )}
        <span>{label}</span>
      </div>
      {open && (
        <div className='mt-1 space-y-1'>
          {node.children.map((c, i) => (
            <TreeNode key={i} node={c} level={level + 1} />
          ))}
        </div>
      )}
    </div>
  );
};

const Visualization: React.FC = () => {
  const [maxDepth, setMaxDepth] = useState(3);
  const [board, setBoard] = useState<string[][]>(() => getBoard());

  useEffect(() => subscribe(setBoard), []);

  const root = useMemo(
    () => buildFullTree(board, 'X', 0, maxDepth),
    [board, maxDepth],
  );
  useMemo(
    () => annotatePruned(root, board, 'X', 0, maxDepth, -Infinity, Infinity),
    [root, board, maxDepth],
  );

  const nextPlayerAuto = useMemo(() => {
    const flat = board.flat();
    const xCount = flat.filter((c) => c === 'X').length;
    const oCount = flat.filter((c) => c === 'O').length;
    return xCount <= oCount ? 'X' : 'O';
  }, [board]);

  const [perspective, setPerspective] = useState<'X' | 'O'>(nextPlayerAuto);
  useEffect(() => {
    setPerspective(nextPlayerAuto);
  }, [nextPlayerAuto]);

  const heatmapScores = useMemo(() => {
    const raw: Record<string, number> = {};
    const moves = availableMoves(board);

    if (evaluate(board) !== 0 || moves.length === 0) {
      return raw;
    }

    for (const mv of moves) {
      const copy = board.map((r) => [...r]);
      copy[mv.row][mv.col] = 'X';
      const { value } = alphabetaCompare(copy, false);
      raw[`${mv.row}-${mv.col}`] = value;
    }

    if (perspective === 'O') {
      for (const k in raw) {
        raw[k] = -raw[k];
      }
    }

    return raw;
  }, [board, perspective]);

  return (
    <div
      className='mx-auto min-h-screen w-full max-w-4xl space-y-8 p-6'
      style={{
        backgroundColor: 'var(--color-background)',
        color: 'var(--color-text-primary)',
      }}
    >
      {/* Game Tree Section */}
      <div
        className='space-y-4 rounded-2xl p-6 shadow-inner'
        style={{
          backgroundColor: 'var(--color-background)',
        }}
      >
        <h2 className='text-center text-lg font-semibold text-[var(--color-brand)]'>
          Game Tree
        </h2>

        <div className='flex w-full flex-col items-center gap-4 md:flex-row'>
          <label
            htmlFor='depth'
            className='text-sm text-[var(--color-text-secondary)]'
          >
            Max Depth:
          </label>
          <input
            id='depth'
            type='range'
            min={1}
            max={6}
            value={maxDepth}
            onChange={(e) => setMaxDepth(Number(e.target.value))}
            className='w-full accent-[var(--color-accent)]'
          />
          <span className='font-mono text-[var(--color-text-primary)]'>
            {maxDepth}
          </span>
        </div>

        <div
          className='shdow-inner max-h-[400px] overflow-auto rounded border bg-[var(--color-background-light)] p-4 text-sm'
          style={{ borderColor: 'var(--color-border-light)' }}
        >
          <TreeNode node={root} level={0} />
        </div>

        <p className='text-center text-xs text-[var(--color-text-secondary)] italic'>
          Losing Branches are ignored by Alpha-Beta.
        </p>
      </div>

      {/* Heatmap Section */}
      <div
        className='w-full space-y-6 rounded-2xl p-8 shadow-inner'
        style={{
          backgroundColor: 'var(--color-background-light)',
        }}
      >
        <h2 className='text-center text-2xl font-bold text-[var(--color-brand)]'>
          Move Heatmap
        </h2>

        {/* Perspective Toggle */}
        <div className='flex items-center justify-center gap-4'>
          <span className='text-base font-medium text-[var(--color-text-primary)]'>
            Perspective:
          </span>
          {(['X', 'O'] as const).map((p) => (
            <button
              key={p}
              onClick={() => setPerspective(p)}
              className={`rounded px-3 py-2 text-base font-semibold transition ${
                perspective === p
                  ? 'bg-[var(--color-brand)] text-white'
                  : 'border border-[var(--color-border-light)] text-[var(--color-text-secondary)]'
              }`}
            >
              {p}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className='mx-auto grid aspect-square w-full max-w-[80%] grid-cols-3 grid-rows-3 gap-1'>
          {board.flatMap((row, r) =>
            row.map((cell, c) => {
              const key = `${r}-${c}`;
              const score = heatmapScores[key];
              let tint: string | undefined;
              if (cell === '' && score != null) {
                if (score === 1) tint = 'rgba(38,140,75,0.4)';
                else if (score === 0) tint = 'rgba(255,252,127,0.4)';
                else tint = 'rgba(216,38,58,0.4)';
              }
              return (
                <div
                  key={key}
                  className='relative flex items-center justify-center border-2 border-[var(--color-border-light)] text-center'
                >
                  {tint && (
                    <div
                      className='pointer-events-none absolute inset-0 rounded-sm'
                      style={{ backgroundColor: tint }}
                    />
                  )}
                  {cell ? (
                    <span className='relative z-10 text-4xl font-bold text-[var(--color-text-primary)]'>
                      {cell}
                    </span>
                  ) : score != null ? (
                    <span className='relative z-10 font-mono text-lg font-semibold text-white'>
                      {score.toFixed(2)}
                    </span>
                  ) : null}
                </div>
              );
            }),
          )}
        </div>

        {/* Legend */}
        <div className='flex flex-wrap justify-center gap-6 text-sm text-[var(--color-text-secondary)]'>
          <div className='flex items-center gap-2'>
            <span
              className='block h-4 w-4 rounded-sm'
              style={{ backgroundColor: 'rgba(38,140,75,0.6)' }}
            />
            Win (=1)
          </div>
          <div className='flex items-center gap-2'>
            <span
              className='block h-4 w-4 rounded-sm'
              style={{ backgroundColor: 'rgba(255,252,127,0.6)' }}
            />
            Draw (=0)
          </div>
          <div className='flex items-center gap-2'>
            <span
              className='block h-4 w-4 rounded-sm'
              style={{ backgroundColor: 'rgba(216,38,58,0.6)' }}
            />
            Loss (&lt;0)
          </div>
        </div>

        {/* Caption */}
        <p className='mt-2 text-center text-base text-[var(--color-text-secondary)]'>
          The map demonstrates what O or X sees depending on X's move
        </p>
      </div>
    </div>
  );
};

export default Visualization;
