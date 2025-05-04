// src/agents/minesweeper-bot/logic/Sentence.ts

import { Cell } from './Minesweeper';

export class Sentence {
  cells: Set<Cell>;
  count: number;

  constructor(cells: Cell[], count: number) {
    this.cells = new Set(cells);
    this.count = count;
  }

  knownMines(): Set<Cell> {
    if (this.cells.size === this.count && this.count > 0) {
      return new Set(this.cells);
    }
    return new Set();
  }

  knownSafes(): Set<Cell> {
    if (this.count === 0) {
      return new Set(this.cells);
    }
    return new Set();
  }

  markMine(cell: Cell) {
    const key = cell.join(',');
    for (const c of this.cells) {
      if (c.join(',') === key) {
        this.cells.delete(c);
        this.count--;
        break;
      }
    }
  }

  markSafe(cell: Cell) {
    const key = cell.join(',');
    for (const c of this.cells) {
      if (c.join(',') === key) {
        this.cells.delete(c);
        break;
      }
    }
  }

  static equals(a: Sentence, b: Sentence): boolean {
    if (a.count !== b.count || a.cells.size !== b.cells.size) return false;
    return Array.from(a.cells).every((c1) =>
      Array.from(b.cells).some((c2) => c1.join(',') === c2.join(',')),
    );
  }
}
