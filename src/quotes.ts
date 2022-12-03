import { MDXProps } from 'mdx/types';

export type QuoteModule = {
  default: (props: MDXProps) => JSX.Element;
  rarity: number;
  short: string;
};

export const modules = import.meta.glob<QuoteModule>('./quotes/*.mdx', {
  eager: true,
});

export const quotes = Object.keys(modules).map((key) => ({
  key,
  rarity: modules[key].rarity,
}));

export type Quote = {
  key: string;
  rarity: string;
};

export default quotes;
