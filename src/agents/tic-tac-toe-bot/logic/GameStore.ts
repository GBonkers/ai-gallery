// src/agents/tic-tac-toe-bot/logic/GameStore.ts

export type Board = string[][];

// the empty 3×3 board
export const EMPTY_BOARD: Board = [
  ['', '', ''],
  ['', '', ''],
  ['', '', ''],
];

type Listener = (board: Board) => void;

let board: Board = EMPTY_BOARD.map((r) => [...r]);
const listeners: Listener[] = [];

// get the current board
export function getBoard(): Board {
  return board.map((r) => [...r]);
}

// set a new board and notify subscribers
export function setBoard(newBoard: Board) {
  board = newBoard.map((r) => [...r]);
  listeners.forEach((fn) => fn(getBoard()));
}

// subscribe to board changes; returns an unsubscribe fn
export function subscribe(fn: Listener): () => void {
  listeners.push(fn);
  return () => {
    const i = listeners.indexOf(fn);
    if (i >= 0) listeners.splice(i, 1);
  };
}
