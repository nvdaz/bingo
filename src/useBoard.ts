import { useCallback, useEffect, useState } from 'react';
import quotes from './quotes.json';

function quote() {
  return quotes[Math.floor(Math.random() * quotes.length)];
}

interface Tile {
  quote: string;
  rarity: number;
  selected: boolean;
}

export default function useBoard() {
  const [board, setBoard] = useState<Tile[]>(
    [...Array(25)].map(() => ({ ...quote(), selected: false }))
  );

  const select = useCallback(
    (index: number) => {
      setBoard((tiles) =>
        tiles.map(({ selected, ...rest }, i) => ({
          selected: i === index ? !selected : selected,
          ...rest,
        }))
      );
    },
    [setBoard]
  );

  return { board, select };
}
