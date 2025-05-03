export const DAMPING = 0.85;

export type Corpus = Record<string, Set<string>>;

/**
 * Build the transition probability distribution for one step.
 */
export function transitionModel(
  corpus: Corpus,
  page: string,
  dampingFactor = DAMPING,
): Record<string, number> {
  const pages = Object.keys(corpus);
  const N = pages.length;
  const links = corpus[page] ?? new Set<string>();
  const dist: Record<string, number> = {};

  // Dead‐end: uniform over all pages
  if (links.size === 0) {
    pages.forEach((p) => (dist[p] = 1 / N));
    return dist;
  }

  // Teleportation component
  const teleport = (1 - dampingFactor) / N;
  pages.forEach((p) => (dist[p] = teleport));

  // Link‐following component
  const linkProb = dampingFactor / links.size;
  links.forEach((dest) => {
    dist[dest] = (dist[dest] || 0) + linkProb;
  });

  return dist;
}

/**
 * Iteratively compute PageRank until convergence.
 */
export function iteratePageRank(
  corpus: Corpus,
  dampingFactor = DAMPING,
  threshold = 0.001,
): Record<string, number> {
  const pages = Object.keys(corpus);
  const N = pages.length;

  // 1) Initialize ranks equally
  let ranks: Record<string, number> = {};
  pages.forEach((p) => (ranks[p] = 1 / N));

  // 2) Build reverse‐link lookup (dead‐ends link everywhere)
  const incoming: Record<string, Set<string>> = {};
  pages.forEach((p) => (incoming[p] = new Set<string>()));

  pages.forEach((p) => {
    const outs = corpus[p];
    if (!outs || outs.size === 0) {
      // dead‐end: treat as if linking to every page
      pages.forEach((q) => incoming[q].add(p));
    } else {
      // only add for pages that actually exist in our corpus
      outs.forEach((q) => {
        if (incoming[q]) {
          incoming[q].add(p);
        }
      });
    }
  });

  // 3) Iterate until no rank moves by more than threshold
  let converged = false;
  while (!converged) {
    converged = true;
    const newRanks: Record<string, number> = {};

    pages.forEach((p) => {
      let sum = 0;
      incoming[p].forEach((linker) => {
        // if a linker has no outgoing links, treat it as linking to all pages
        const outCount = corpus[linker]?.size || N;
        sum += ranks[linker] / outCount;
      });
      newRanks[p] = (1 - dampingFactor) / N + dampingFactor * sum;

      if (Math.abs(newRanks[p] - ranks[p]) > threshold) {
        converged = false;
      }
    });

    ranks = newRanks;
  }

  // 4) Normalize to sum to 1
  const total = Object.values(ranks).reduce((a, b) => a + b, 0);
  pages.forEach((p) => {
    ranks[p] = ranks[p] / total;
  });

  return ranks;
}
