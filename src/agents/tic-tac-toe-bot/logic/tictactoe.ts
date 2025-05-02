// src/agents/tic-tac-toe-bot/logic/tictactoe.ts
export type Move = { row: number; col: number };
export type Result = { move: Move | null; value: number; nodes: number };

const LINES: Move[][] = [
  // rows
  [
    { row: 0, col: 0 },
    { row: 0, col: 1 },
    { row: 0, col: 2 },
  ],
  [
    { row: 1, col: 0 },
    { row: 1, col: 1 },
    { row: 1, col: 2 },
  ],
  [
    { row: 2, col: 0 },
    { row: 2, col: 1 },
    { row: 2, col: 2 },
  ],
  // cols
  [
    { row: 0, col: 0 },
    { row: 1, col: 0 },
    { row: 2, col: 0 },
  ],
  [
    { row: 0, col: 1 },
    { row: 1, col: 1 },
    { row: 2, col: 1 },
  ],
  [
    { row: 0, col: 2 },
    { row: 1, col: 2 },
    { row: 2, col: 2 },
  ],
  // diags
  [
    { row: 0, col: 0 },
    { row: 1, col: 1 },
    { row: 2, col: 2 },
  ],
  [
    { row: 0, col: 2 },
    { row: 1, col: 1 },
    { row: 2, col: 0 },
  ],
];

export function evaluate(board: string[][]): number {
  for (const line of LINES) {
    const [a, b, c] = line;
    const v1 = board[a.row][a.col];
    if (v1 && v1 === board[b.row][b.col] && v1 === board[c.row][c.col]) {
      return v1 === 'X' ? +1 : -1;
    }
  }
  return 0;
}

export function availableMoves(board: string[][]): Move[] {
  const moves: Move[] = [];
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 3; col++) {
      if (!board[row][col]) moves.push({ row, col });
    }
  }
  return moves;
}

// Plain Minimax
export function minimaxCompare(
  board: string[][],
  isMaximizing: boolean,
): Result {
  let nodes = 1;
  const score = evaluate(board);
  const moves = availableMoves(board);
  if (score !== 0 || moves.length === 0) {
    return { move: null, value: score, nodes };
  }

  let bestVal = isMaximizing ? -Infinity : +Infinity;
  let bestMove: Move | null = null;

  for (const mv of moves) {
    board[mv.row][mv.col] = isMaximizing ? 'X' : 'O';
    const res = minimaxCompare(board, !isMaximizing);
    nodes += res.nodes;
    board[mv.row][mv.col] = '';
    if (
      (isMaximizing && res.value > bestVal) ||
      (!isMaximizing && res.value < bestVal)
    ) {
      bestVal = res.value;
      bestMove = mv;
    }
  }

  return { move: bestMove, value: bestVal, nodes };
}

// Minimax with Alpha‑Beta Pruning
export function alphabetaCompare(
  board: string[][],
  isMaximizing: boolean,
  alpha = -Infinity,
  beta = +Infinity,
): Result {
  let nodes = 1;
  const score = evaluate(board);
  const moves = availableMoves(board);
  if (score !== 0 || moves.length === 0) {
    return { move: null, value: score, nodes };
  }

  let bestVal = isMaximizing ? -Infinity : +Infinity;
  let bestMove: Move | null = null;

  for (const mv of moves) {
    board[mv.row][mv.col] = isMaximizing ? 'X' : 'O';
    const res = alphabetaCompare(board, !isMaximizing, alpha, beta);
    nodes += res.nodes;
    board[mv.row][mv.col] = '';

    if (isMaximizing) {
      if (res.value > bestVal) {
        bestVal = res.value;
        bestMove = mv;
      }
      alpha = Math.max(alpha, bestVal);
    } else {
      if (res.value < bestVal) {
        bestVal = res.value;
        bestMove = mv;
      }
      beta = Math.min(beta, bestVal);
    }
    if (beta <= alpha) break; // prune
  }

  return { move: bestMove, value: bestVal, nodes };
}
