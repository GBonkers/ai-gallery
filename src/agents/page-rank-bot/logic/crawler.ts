// src/agents/page-rank-bot/logic/crawler.ts
import { Corpus } from './pagerank';

const CORS_PROXY = 'https://api.allorigins.win/raw?url=';

/**
 * Crawl a site up to maxDepth and maxPages, returning a Corpus map.
 */
export async function crawlLive(
  startUrl: string,
  maxDepth: number,
  maxPages: number,
): Promise<Corpus> {
  const origin = new URL(startUrl).origin;
  const toVisit: Array<{ url: string; depth: number }> = [
    { url: startUrl, depth: 0 },
  ];
  const visited = new Set<string>();
  const corpus: Corpus = {};

  while (toVisit.length > 0 && visited.size < maxPages) {
    const { url, depth } = toVisit.shift()!;
    if (visited.has(url) || depth > maxDepth) continue;
    visited.add(url);

    let links: string[] = [];
    try {
      const res = await fetch(CORS_PROXY + encodeURIComponent(url));
      const html = await res.text();
      const doc = new DOMParser().parseFromString(html, 'text/html');
      links = Array.from(doc.querySelectorAll<HTMLAnchorElement>('a[href]'))
        .map((a) => {
          try {
            return new URL(a.getAttribute('href')!, url).href;
          } catch {
            return '';
          }
        })
        .filter((href) => href.startsWith(origin))
        .filter((href, i, arr) => href && arr.indexOf(href) === i); // unique
    } catch {
      // network or parse error — treat as dead end
      links = [];
    }

    corpus[url] = new Set(links);

    // enqueue children
    for (const link of links) {
      if (!visited.has(link) && visited.size + toVisit.length < maxPages) {
        toVisit.push({ url: link, depth: depth + 1 });
      }
    }
  }

  return corpus;
}
