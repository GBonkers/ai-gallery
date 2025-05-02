import type { FC } from 'react';

const Documentation: FC = () => (
  <div
    className='space-y-8 rounded-lg p-6 shadow-md'
    style={{
      backgroundColor: 'var(--color-background)',
      color: 'var(--color-text-primary)',
    }}
  >
    <h1 className='text-3xl font-bold text-[var(--color-brand-dark)]'>
      Tic‑Tac‑Toe AI Guide
    </h1>

    {/* 1. What is Tic‑Tac‑Toe? */}
    <section>
      <h2 className='mb-2 text-xl font-semibold text-[var(--color-brand)]'>
        1. What is Tic‑Tac‑Toe?
      </h2>
      <p>
        A simple game on a 3×3 grid. Two players (X and O) take turns marking
        empty squares. The first to get three in a row (horizontally,
        vertically, or diagonally) wins. If all squares fill without a winner,
        it’s a draw.
      </p>
    </section>

    {/* 2. How does the AI think? */}
    <section>
      <h2 className='mb-2 text-xl font-semibold text-[var(--color-brand)]'>
        2. How does the AI think?
      </h2>
      <p className='mb-3'>
        The AI imagines all possible moves and scores each final outcome:
      </p>
      <pre
        className='overflow-x-auto rounded p-4 text-sm'
        style={{
          backgroundColor: 'var(--color-background-dark)',
          color: 'var(--color-text-secondary)',
          border: '1px solid var(--color-border)',
        }}
      >
        {`Steps the AI follows:

1. Look at every empty square on the board.
2. For each square:
   a. Imagine the AI places an O there.
   b. Check the game result:
      - If the AI (O) wins: score = +1
      - If you (X) wins: score = -1
      - If the board is full without a winner: score = 0
   c. If the game is not over, switch turns and repeat these steps to see future outcomes.
3. After scoring all possibilities, pick the square with the highest score for the AI.
`}
      </pre>
    </section>

    {/* 3. Why it works */}
    <section>
      <h2 className='mb-2 text-xl font-semibold text-[var(--color-brand)]'>
        3. Why it works
      </h2>
      <ul className='ml-5 list-disc space-y-1'>
        <li>It finds every path from now until game end.</li>
        <li>It scores wins, losses, and draws as +1, –1, and 0.</li>
        <li>It picks the move with the best score for O.</li>
      </ul>
    </section>

    {/* 4. Minimax vs Alpha‑Beta */}
    <section>
      <h2 className='mb-2 text-xl font-semibold text-[var(--color-brand)]'>
        4. Minimax vs Alpha‑Beta
      </h2>
      <p className='mb-2'>
        Both methods search game outcomes, but differ in efficiency:
      </p>
      <ul className='ml-5 list-disc space-y-2'>
        <li>
          <strong className='text-[var(--color-text-secondary)]'>
            Minimax
          </strong>
          : Explores <em>all</em> possible moves and counter‑moves without
          skipping. Simple but can be slow.
        </li>
        <li>
          <strong className='text-[var(--color-text-secondary)]'>
            Alpha‑Beta pruning
          </strong>
          : Keeps two values, <code>alpha</code> (best for maximizer) and{' '}
          <code>beta</code> (best for minimizer). If a branch cannot improve the
          final decision, it skips exploring it.
        </li>
        <li>
          <strong className='text-[var(--color-text-secondary)]'>Result</strong>
          : Alpha‑Beta visits far fewer positions, making decisions faster,
          especially in deeper games.
        </li>
      </ul>
    </section>

    {/* 5. Try it yourself */}
    <section>
      <h2 className='mb-2 text-xl font-semibold text-[var(--color-brand)]'>
        5. Try it yourself
      </h2>
      <p className='mb-2'>
        Play a few moves and watch the “Nodes Visited” stats:
      </p>
      <ul className='ml-5 list-disc space-y-1'>
        <li>
          Notice how Minimax’s node count grows quickly, while Alpha‑Beta stays
          lower.
        </li>
        <li>
          Experiment with different board positions to see pruning in action.
        </li>
      </ul>
    </section>
  </div>
);

export default Documentation;
