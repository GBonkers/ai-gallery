'use client';

import { useEffect, useMemo, useState } from 'react';
import {
  alphabetaCompare,
  availableMoves,
  evaluate,
  minimaxCompare,
  Result,
} from '@/agents/tic-tac-toe-bot/logic/tictactoe';
import { getBoard, setBoard, subscribe } from './logic/GameStore';

const EMPTY_BOARD = [
  ['', '', ''],
  ['', '', ''],
  ['', '', ''],
];

export default function Demonstration() {
  const [board, setLocalBoard] = useState(getBoard);
  const [mm, setMm] = useState<Result>({ move: null, value: 0, nodes: 0 });
  const [ab, setAb] = useState<Result>({ move: null, value: 0, nodes: 0 });
  const [times, setTimes] = useState({ mm: 0, ab: 0 });

  useEffect(() => {
    return subscribe(setLocalBoard);
  }, []);

  const nextPlayer = useMemo(() => {
    const flat = board.flat();
    const xCount = flat.filter((c) => c === 'X').length;
    const oCount = flat.filter((c) => c === 'O').length;
    return xCount <= oCount ? 'X' : 'O';
  }, [board]);

  useEffect(() => {
    const score = evaluate(board);
    const moves = availableMoves(board);
    if (score !== 0 || moves.length === 0) {
      setMm({ move: null, value: score, nodes: 0 });
      setAb({ move: null, value: score, nodes: 0 });
      setTimes({ mm: 0, ab: 0 });
      return;
    }

    const copy = board.map((r) => [...r]);

    const t0 = performance.now();
    const mmRes = minimaxCompare(copy, nextPlayer === 'X');
    const t1 = performance.now();

    const abRes = alphabetaCompare(copy, nextPlayer === 'X');
    const t2 = performance.now();

    setMm(mmRes);
    setAb(abRes);
    setTimes({ mm: t1 - t0, ab: t2 - t1 });
  }, [board, nextPlayer]);

  function handleClick(r: number, c: number) {
    if (nextPlayer !== 'X' || board[r][c] || evaluate(board) !== 0) return;

    const humanBoard = board.map((row) => [...row]);
    humanBoard[r][c] = 'X';
    setBoard(humanBoard);

    setTimeout(() => {
      const prev = getBoard();
      if (evaluate(prev) !== 0) return;
      const ai = alphabetaCompare(prev, false);
      if (!ai.move) return;
      const aiBoard = prev.map((row) => [...row]);
      aiBoard[ai.move.row][ai.move.col] = 'O';
      setBoard(aiBoard);
    }, 500);
  }

  function reset() {
    setBoard(EMPTY_BOARD);
  }

  return (
    <div
      className='space-y-6 p-6'
      style={{ backgroundColor: 'var(--color-background)' }}
    >
      <h1 className='text-3xl font-bold text-[var(--color-brand-dark)]'>
        Minimax vs Alpha‑Beta
      </h1>

      {/* Player Turn */}
      <div className='text-lg font-semibold text-[var(--color-text-primary)]'>
        {evaluate(board) === 0 && availableMoves(board).length > 0 && (
          <>
            It's <span className='text-[var(--color-brand)]'>{nextPlayer}</span>
            's turn
          </>
        )}
      </div>

      {/* Centered & styled Tic Tac Toe board */}
      <div className='flex min-h-[60vh] items-center justify-center'>
        <div className='grid grid-cols-3'>
          {board.map((row, rowIndex) =>
            row.map((cell, colIndex) => {
              const isRight = colIndex < 2;
              const isBottom = rowIndex < 2;
              return (
                <button
                  key={`${rowIndex}-${colIndex}`}
                  onClick={() => handleClick(rowIndex, colIndex)}
                  className={`h-[100px] w-[100px] bg-[var(--color-background)] text-3xl font-bold text-[var(--color-text-primary)] ${isRight ? 'border-r-[4px]' : ''} ${isBottom ? 'border-b-[4px]' : ''}`}
                  style={{
                    borderColor: 'var(--color-border)',
                  }}
                >
                  {cell}
                </button>
              );
            }),
          )}
        </div>
      </div>

      {/* Outcome */}
      {evaluate(board) === 1 && (
        <p className='font-medium text-green-600'>X wins!</p>
      )}
      {evaluate(board) === -1 && (
        <p className='font-medium text-red-600'>O wins!</p>
      )}
      {evaluate(board) === 0 && availableMoves(board).length === 0 && (
        <p className='font-medium text-gray-600'>Draw.</p>
      )}

      {/* Stats */}
      <div className='grid gap-6 md:grid-cols-2'>
        <div
          className='rounded p-4 shadow'
          style={{
            backgroundColor: 'var(--color-background-light)',
            borderColor: 'var(--color-border)',
          }}
        >
          <h2 className='mb-2 font-semibold text-[var(--color-brand-dark)]'>
            Plain Minimax
          </h2>
          <p>
            Best Move:{' '}
            {mm.move ? `Row ${mm.move.row + 1}, Col ${mm.move.col + 1}` : '—'}
          </p>
          <p>Value: {mm.value}</p>
          <p>Nodes: {mm.nodes.toLocaleString()}</p>
          <p>Time: {times.mm.toFixed(2)}ms</p>
        </div>

        <div
          className='rounded p-4 shadow'
          style={{
            backgroundColor: 'var(--color-background-light)',
            borderColor: 'var(--color-border)',
          }}
        >
          <h2 className='mb-2 font-semibold text-[var(--color-brand-dark)]'>
            Alpha‑Beta
          </h2>
          <p>
            Best Move:{' '}
            {ab.move ? `Row ${ab.move.row + 1}, Col ${ab.move.col + 1}` : '—'}
          </p>
          <p>Value: {ab.value}</p>
          <p>Nodes: {ab.nodes.toLocaleString()}</p>
          <p>Time: {times.ab.toFixed(2)}ms</p>
        </div>
      </div>

      <button
        onClick={reset}
        className='mt-4 rounded px-4 py-2 text-white transition hover:brightness-110'
        style={{ backgroundColor: 'var(--color-brand)' }}
      >
        Reset Board
      </button>
    </div>
  );
}
