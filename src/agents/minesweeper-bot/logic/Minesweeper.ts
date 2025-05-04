// src/agents/minesweeper-bot/logic/Minesweeper.ts

export type Cell = [number, number];

export class Minesweeper {
  height: number;
  width: number;
  board: boolean[][];
  mines: Set<string>;

  constructor(height = 8, width = 8, mineCount = 8) {
    this.height = height;
    this.width = width;
    this.board = Array.from({ length: height }, () =>
      Array.from({ length: width }, () => false),
    );
    this.mines = new Set<string>();

    while (this.mines.size < mineCount) {
      const i = Math.floor(Math.random() * height);
      const j = Math.floor(Math.random() * width);
      if (!this.board[i][j]) {
        this.board[i][j] = true;
        this.mines.add(`${i},${j}`);
      }
    }
  }

  getMines(): [number, number][] {
    return Array.from(this.mines).map((key) => {
      const [i, j] = key.split(',').map(Number);
      return [i, j];
    });
  }

  isMine(cell: Cell): boolean {
    const [i, j] = cell;
    return this.board[i]?.[j] ?? false;
  }

  nearbyMines(cell: Cell): number {
    const [i0, j0] = cell;
    let count = 0;
    for (let i = i0 - 1; i <= i0 + 1; i++) {
      for (let j = j0 - 1; j <= j0 + 1; j++) {
        if (i === i0 && j === j0) continue;
        if (
          i >= 0 &&
          i < this.height &&
          j >= 0 &&
          j < this.width &&
          this.board[i][j]
        ) {
          count++;
        }
      }
    }
    return count;
  }
}
