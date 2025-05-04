// src/agents/minesweeper-bot/Documentation.tsx
import type { FC } from 'react';

const Documentation: FC = () => (
  <div className='space-y-6 rounded-xl bg-[var(--color-background-light)] p-6'>
    <h1 className='text-3xl font-bold text-[var(--color-brand)]'>
      How the Minesweeper AI Works
    </h1>

    <section className='space-y-2'>
      <h2 className='text-2xl font-semibold'>What is Minesweeper?</h2>
      <p className='text-sm text-[var(--color-text-secondary)]'>
        Minesweeper is a puzzle where you try to uncover all the safe squares on
        a grid without clicking on any hidden mines. Each time you open a cell,
        it shows a number telling you how many mines are hidden in the eight
        neighboring cells.
      </p>
    </section>

    <section className='space-y-2'>
      <h2 className='text-2xl font-semibold'>What is a “Sentence”?</h2>
      <p className='text-sm text-[var(--color-text-secondary)]'>
        In this AI, a “sentence” is a simple fact the program learns from each
        opened cell. For example:
      </p>
      <p className='ml-4 text-sm text-[var(--color-text-secondary)]'>
        “Among these 5 covered neighbors, exactly 2 are mines.”
      </p>
      <p className='text-sm text-[var(--color-text-secondary)]'>
        The AI collects many such sentences and then uses them to decide which
        cells must be safe and which are definitely mines.
      </p>
    </section>

    <section className='space-y-2'>
      <h2 className='text-2xl font-semibold'>
        How the AI Thinks: Step-by-Step
      </h2>
      <pre
        className='overflow-x-auto rounded p-4 text-sm'
        style={{
          backgroundColor: 'var(--color-background-dark)',
          color: 'var(--color-text-secondary)',
          border: '1px solid var(--color-border)',
        }}
      >{`1. Pick a covered cell to click (first move is random).
2. Open the cell:
   - If it is a mine → game over.
   - Otherwise, see the number of adjacent mines (0–8).
3. Create a new sentence: “Among its covered neighbors, there are [number] mines.”
4. Add this sentence to the AI’s knowledge base.
5. Look through all sentences to find:
   • SAFE cells: where a sentence says “0 mines here,” so every cell in that group is safe.
   • MINE cells: where a sentence says “all these cells are mines.”
6. Compare sentences that share cells to discover new facts:
   - If one group is a subset of another, you can subtract to learn new counts.
7. Repeat steps 5–6 until you cannot mark any new safe or mine cells.
8. If no safe moves are known, guess by choosing a random covered cell.
9. Go back to step 2 and continue until you win (all safe cells open) or lose.`}</pre>
    </section>

    <section>
      <h2 className='text-2xl font-semibold'>Using This Demo</h2>
      <ol className='ml-4 list-decimal text-sm text-[var(--color-text-secondary)]'>
        <li>Click “AI Move” to watch the AI pick and open cells for you.</li>
        <li>Click “Reset” to start a new board anytime.</li>
        <li>
          Read the messages on the board to see how the AI explains each step.
        </li>
      </ol>
    </section>
  </div>
);

export default Documentation;
