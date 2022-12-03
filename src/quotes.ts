import { MDXProps } from 'mdx/types';

export type QuoteModule = {
  default: (props: MDXProps) => JSX.Element;
  rarity: number;
  short: string;
};

export const modules = import.meta.glob<QuoteModule>('./quotes/*.mdx', {
  eager: true,
});

export const quotes = Object.keys(modules).map((module) => ({
  key: module.match(/\.([^.]+)\.mdx/)![1],
  module,
  rarity: modules[module].rarity,
}));

export type QuoteDescriptor = {
  key: string;
  module: string;
  rarity: number;
};

export default quotes;
