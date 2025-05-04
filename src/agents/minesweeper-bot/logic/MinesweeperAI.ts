// src/agents/minesweeper-bot/logic/MinesweeperAI.ts

import { Cell } from './Minesweeper';
import { Sentence } from './Sentence';

export class MinesweeperAI {
  height: number;
  width: number;
  movesMade: Set<string>;
  mines: Set<string>;
  safes: Set<string>;
  knowledge: Sentence[];

  constructor(height = 8, width = 8) {
    this.height = height;
    this.width = width;
    this.movesMade = new Set();
    this.mines = new Set();
    this.safes = new Set();
    this.knowledge = [];
  }

  markMine(cell: Cell) {
    const key = cell.join(',');
    this.mines.add(key);
    this.knowledge.forEach((s) => s.markMine(cell));
  }

  markSafe(cell: Cell) {
    const key = cell.join(',');
    this.safes.add(key);
    this.knowledge.forEach((s) => s.markSafe(cell));
  }

  addKnowledge(cell: Cell, count: number) {
    const key = cell.join(',');
    this.movesMade.add(key);
    this.markSafe(cell);

    // build new sentence
    const neighbors = new Set<Cell>();
    let c = count;
    for (let i = cell[0] - 1; i <= cell[0] + 1; i++) {
      for (let j = cell[1] - 1; j <= cell[1] + 1; j++) {
        if (i === cell[0] && j === cell[1]) continue;
        if (i >= 0 && i < this.height && j >= 0 && j < this.width) {
          const k = `${i},${j}`;
          if (this.mines.has(k)) {
            c--;
          } else if (!this.safes.has(k)) {
            neighbors.add([i, j]);
          }
        }
      }
    }

    const sentence = new Sentence(Array.from(neighbors), c);
    this.knowledge.push(sentence);

    // inference loop
    let updated = true;
    while (updated) {
      updated = false;

      // collect safes/mines
      const safesSet = new Set<string>();
      const minesSet = new Set<string>();
      this.knowledge.forEach((s) => {
        s.knownSafes().forEach((k) => safesSet.add(k.join(',')));
        s.knownMines().forEach((k) => minesSet.add(k.join(',')));
      });

      safesSet.forEach((str) => {
        if (!this.safes.has(str)) {
          const [i, j] = str.split(',').map(Number) as Cell;
          this.markSafe([i, j]);
          updated = true;
        }
      });
      minesSet.forEach((str) => {
        if (!this.mines.has(str)) {
          const [i, j] = str.split(',').map(Number) as Cell;
          this.markMine([i, j]);
          updated = true;
        }
      });

      // subset inference
      const newSentences: Sentence[] = [];
      for (const s1 of this.knowledge) {
        for (const s2 of this.knowledge) {
          if (
            s1 !== s2 &&
            s1.cells.size > 0 &&
            s2.cells.size > 0 &&
            Array.from(s1.cells).every((c1) =>
              Array.from(s2.cells).some((c2) => c2.join(',') === c1.join(',')),
            ) &&
            s2.cells.size > s1.cells.size
          ) {
            // s1 ⊂ s2
            const diffCells = Array.from(s2.cells).filter(
              (c2) =>
                !Array.from(s1.cells).some(
                  (c1) => c1.join(',') === c2.join(','),
                ),
            );
            const diffCount = s2.count - s1.count;
            const cand = new Sentence(diffCells, diffCount);
            if (!this.knowledge.some((s) => Sentence.equals(s, cand))) {
              newSentences.push(cand);
            }
          }
        }
      }
      if (newSentences.length) {
        this.knowledge.push(...newSentences);
        updated = true;
      }

      // clean empty
      this.knowledge = this.knowledge.filter((s) => s.cells.size > 0);
    }
  }

  makeSafeMove(): Cell | null {
    for (const str of this.safes) {
      if (!this.movesMade.has(str)) {
        return str.split(',').map(Number) as Cell;
      }
    }
    return null;
  }

  makeRandomMove(): Cell | null {
    const all: Cell[] = [];
    for (let i = 0; i < this.height; i++) {
      for (let j = 0; j < this.width; j++) {
        const key = `${i},${j}`;
        if (!this.movesMade.has(key) && !this.mines.has(key)) {
          all.push([i, j]);
        }
      }
    }
    if (!all.length) return null;
    return all[Math.floor(Math.random() * all.length)];
  }
}
