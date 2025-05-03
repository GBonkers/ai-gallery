// A simple pub/sub store for PageRank results
import type { Corpus } from './pagerank';

type Subscriber = (ranks: Record<string, number>) => void;
let ranks: Record<string, number> = {};
const subscribers = new Set<Subscriber>();
let corpusGlobal: Corpus = {};

/** Get the current ranks */
export function getRanks(): Record<string, number> {
  return ranks;
}

/** Set new ranks & notify everyone */
export function setRanks(newRanks: Record<string, number>): void {
  ranks = newRanks;
  subscribers.forEach((fn) => fn(ranks));
}

/**
 * Subscribe to rank updates.
 * Returns an unsubscribe function.
 */
export function subscribe(fn: Subscriber): () => void {
  subscribers.add(fn);
  // immediately emit current state
  fn(ranks);
  return () => {
    subscribers.delete(fn);
  };
}

/** Get the latest corpus */
export function getCorpus(): Corpus {
  return corpusGlobal;
}

/** Set a new corpus (called from Demo) */
export function setCorpus(c: Corpus): void {
  corpusGlobal = c;
}
