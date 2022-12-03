import { useCallback, useEffect, useState } from 'react';
import quotes from './quotes';

function quote() {
  return quotes[Math.floor(Math.random() * quotes.length)];
}

interface Tile {
  key: string;
  selected: boolean;
}

export default function useBoard() {
  const [board, setBoard] = useState<Tile[]>(
    [...Array(25)].map(() => ({ quote: 'a', ...quote(), selected: false }))
  );

  const select = useCallback(
    (k: string) => {
      setBoard((tiles) =>
        tiles.map(({ key, selected, ...rest }) => ({
          key,
          selected: k === key ? !selected : selected,
          ...rest,
        }))
      );
    },
    [setBoard]
  );

  return { board, select };
}
