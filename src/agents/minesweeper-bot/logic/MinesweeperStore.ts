// src/agents/minesweeper-bot/logic/MinesweeperStore.ts
import { Minesweeper, Cell } from './Minesweeper';
import { MinesweeperAI } from './MinesweeperAI';

export interface GameState {
  height: number;
  width: number;
  revealed: Set<string>;
  flags: Set<string>;
  lost: boolean;
  message: string;
  nearby: Map<string, number>;
  mines: Set<string>;
}

type Subscriber = (state: GameState) => void;

let game: Minesweeper;
let ai: MinesweeperAI;
let state: GameState;
const subs = new Set<Subscriber>();

function notify() {
  subs.forEach((fn) => fn({ ...state }));
}

export function resetGame(h = 8, w = 8, mines = 8) {
  game = new Minesweeper(h, w, mines);
  ai = new MinesweeperAI(h, w);
  state = {
    height: h,
    width: w,
    revealed: new Set(),
    flags: new Set(),
    lost: false,
    message: 'Game reset. Left-click to reveal, right-click to flag.',
    nearby: new Map(),
    mines: new Set(game.getMines().map(([i, j]) => `${i},${j}`)),
  };
  notify();
}

export function reveal(cell: Cell) {
  if (state.lost) return;
  const key = cell.join(',');
  if (state.flags.has(key) || state.revealed.has(key)) return;

  state.revealed.add(key);

  if (game.isMine(cell)) {
    state.lost = true;
    state.message = `💥 Boom! You hit a mine at (${key}). Revealing all cells.`;

    // Reveal everything on loss
    for (let i = 0; i < state.height; i++) {
      for (let j = 0; j < state.width; j++) {
        const cellKey = `${i},${j}`;
        if (!state.revealed.has(cellKey)) {
          state.revealed.add(cellKey);
          const count = game.nearbyMines([i, j]);
          state.nearby.set(cellKey, count);
        }
      }
    }
    notify();
    return;
  }

  const count = game.nearbyMines(cell);
  state.nearby.set(key, count);

  // Win condition: all safe cells revealed
  const totalCells = state.height * state.width;
  const mineCount = state.mines.size;
  const safeCells = totalCells - mineCount;
  if (state.revealed.size === safeCells) {
    state.message = '🎉 Congratulations! You have won the game!';
    notify();
    return;
  }

  state.message = `Revealed (${key}), ${count} adjacent mine(s).`;
  notify();
}

export function toggleFlag(cell: Cell) {
  const key = cell.join(',');
  if (state.revealed.has(key) || state.lost) return;

  if (state.flags.has(key)) {
    state.flags.delete(key);
    state.message = `Removed flag from (${key}).`;
  } else {
    state.flags.add(key);
    state.message = `Placed flag on (${key}).`;
  }

  notify();
}

export function aiMove() {
  // AI integration logic remains unchanged
  if (state.lost) return;

  // Feed knowledge
  for (const [key, count] of state.nearby.entries()) {
    const [i, j] = key.split(',').map(Number) as Cell;
    ai.addKnowledge([i, j], count);
  }

  // Flag deduced mines
  for (const mineKey of ai.mines) {
    if (!state.flags.has(mineKey)) {
      const [i, j] = mineKey.split(',').map(Number) as Cell;
      toggleFlag([i, j]);
      ai.markMine([i, j]);
      return;
    }
  }

  // Reveal safe moves
  const safe = ai.makeSafeMove();
  if (safe) {
    reveal(safe);
    ai.markSafe(safe);
    return;
  }

  // Random guess
  const guess = ai.makeRandomMove();
  if (guess) {
    reveal(guess);
    ai.markSafe(guess);
    return;
  }

  state.message = 'AI has no moves left.';
  notify();
}

export function subscribe(fn: Subscriber): () => void {
  subs.add(fn);
  fn({ ...state });
  return () => subs.delete(fn);
}

// initialize game
resetGame();
