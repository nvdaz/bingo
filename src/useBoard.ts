import { useCallback, useEffect, useState } from 'react';
import quotes from './quotes.json';

function quote() {
  return quotes[Math.floor(Math.random() * quotes.length)];
}

interface Tile {
  quote: string;
  selected: boolean;
}

export default function useBoard() {
  const [board, setBoard] = useState<Tile[]>(
    [...Array(25)].map(() => ({ quote: quote(), selected: false }))
  );

  useEffect(() => {
    setBoard((tiles) => tiles.map(() => ({ quote: quote(), selected: false })));
  }, []);

  const select = useCallback(
    (index: number) => {
      setBoard((tiles) =>
        tiles.map(({ quote, selected }, i) => ({
          quote,
          selected: i === index ? !selected : selected,
        }))
      );
    },
    [setBoard]
  );

  return { board, select };
}
