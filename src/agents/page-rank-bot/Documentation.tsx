import type { FC } from 'react';

const Documentation: FC = () => (
  <div className='space-y-6 p-6'>
    <h1 className='text-3xl font-bold'>PageRank: A Beginner's Guide</h1>

    {/* What is PageRank? */}
    <section>
      <h2 className='text-2xl font-semibold'>What is PageRank?</h2>
      <p className='text-sm text-[var(--color-text-secondary)]'>
        PageRank is a way to measure how “important” a web page is based on how
        many other pages link to it—even if you’ve never studied computer
        science. Imagine the web as a network of roads: if many roads lead to a
        page, that page is like a busy intersection. PageRank gives each page a
        score showing how busy and well-connected it is.
      </p>
    </section>

    {/* Real-World Uses */}
    <section>
      <h2 className='text-2xl font-semibold'>Why Does It Matter?</h2>
      <ul className='ml-4 list-disc text-sm text-[var(--color-text-secondary)]'>
        <li>
          Search engines use it to decide which pages show up first in your
          search results.
        </li>
        <li>
          Websites track which pages are most linked to understand popularity.
        </li>
        <li>
          Recommender systems and social networks use similar ideas to rank
          content.
        </li>
      </ul>
    </section>

    {/* How it works */}
    <section>
      <h2 className='text-2xl font-semibold'>How PageRank Works</h2>
      <p className='text-sm text-[var(--color-text-secondary)]'>
        1. <strong>Starting Point:</strong> Picture a random web surfer who
        clicks links at random.
        <br />
        2. <strong>Following Links:</strong> With a certain chance (the{' '}
        <em>damping factor</em>), they follow a link on the current page.
        <br />
        3. <strong>Random Jump:</strong> The rest of the time (1 minus the
        damping), they jump to any page at random—this prevents the surfer from
        getting stuck on pages without links.
      </p>
    </section>

    {/* Pseudocode Explanation */}
    <section>
      <h2 className='text-2xl font-semibold'>Simple Pseudocode</h2>
      <pre
        className='overflow-x-auto rounded p-4 text-sm'
        style={{
          backgroundColor: 'var(--color-background-dark)',
          color: 'var(--color-text-secondary)',
          border: '1px solid var(--color-border)',
        }}
      >{`Steps PageRank follows:

1. Initialize each page's rank to 1/total_pages.
2. Repeat until ranks stabilize:
   a. For each page:
      i. Start with (1 - d)/total_pages.
      ii. For every page linking to it, add d * (linking_page_rank / number_of_links_on_linking_page).
3. Normalize all ranks so they sum to 1.

Where:
- d is the damping factor (e.g., 0.85).
- total_pages is the number of pages in your network.
`}</pre>
    </section>

    {/* Damping Factor */}
    <section>
      <h2 className='text-2xl font-semibold'>What is the Damping Factor?</h2>
      <p className='text-sm text-[var(--color-text-secondary)]'>
        The damping factor (usually set around <code>0.85</code>) tells the
        algorithm how often our surfer follows a link versus jumping to a random
        page. A high value means we trust links more, while a lower value gives
        more weight to random jumps.
      </p>
    </section>

    {/* Links contribute */}
    <section>
      <h2 className='text-2xl font-semibold'>How Links Influence the Score</h2>
      <p className='text-sm text-[var(--color-text-secondary)]'>
        Every page passes some of its importance to the pages it links to. If an
        important page links to you, your score goes up—just like a
        recommendation from a trusted friend boosts your own reputation.
      </p>
    </section>

    {/* Reading results */}
    <section>
      <h2 className='text-2xl font-semibold'>Reading the Results</h2>
      <p className='text-sm text-[var(--color-text-secondary)]'>
        After running PageRank, each page gets a number between <code>0</code>{' '}
        and <code>1</code>. Higher numbers mean the page is more central in the
        network. In this demo, we list pages from highest to lowest score so you
        can see the most “important” pages first.
      </p>
    </section>

    {/* Using This Demo */}
    <section>
      <h2 className='text-2xl font-semibold'>Using This Demo</h2>
      <ol className='ml-4 list-decimal text-sm text-[var(--color-text-secondary)]'>
        <li>
          Select <strong>Custom Corpus</strong> to try built-in examples or
          paste your own network.
        </li>
        <li>
          Select <strong>Live Website</strong> to enter a real URL (or click a
          sample) and explore.
        </li>
        <li>
          Adjust <em>Depth</em> and <em>Max Pages</em> to control how far and
          wide the crawler goes.
        </li>
        <li>
          Click <strong>Compute PageRank</strong> and watch both the link
          structure and scores update.
        </li>
      </ol>
    </section>
  </div>
);

export default Documentation;
