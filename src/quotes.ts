import { MDXProps } from 'mdx/types';

export type QuoteModule = {
  default: (props: MDXProps) => JSX.Element;
  rarity: number;
  short: string;
};

const modules = import.meta.glob<QuoteModule>('./quotes/*.mdx', {
  eager: true,
});

const quotes = new Map<string, QuoteModule>();

for (const [path, value] of Object.entries(modules)) {
  const key = path.match(/\.\/quotes\/([^.]+)\.mdx/)![1];
  quotes.set(key, value);
}

export default quotes;

const keys = Array.from(quotes.keys());

export function createBoard() {
  const tiles: (string | null)[] = [];

  for (let i = 0; i < 25; i++) {
    if (i === 12) {
      tiles.push(null);
    } else {
      tiles.push(keys[Math.floor(Math.random() * keys.length)]);
    }
  }
  return tiles;
}
