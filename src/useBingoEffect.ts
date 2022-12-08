import { EffectCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectBingos } from './features/boardSlice';

export default function useBingoEffect(effect: EffectCallback) {
  const [lastBingos, setLastBingos] = useState<number | null>(null);
  const bingos = useSelector(selectBingos);

  useEffect(() => {
    if (lastBingos === null) {
      setLastBingos(bingos);
      return;
    }

    if (bingos <= lastBingos) {
      return;
    }

    return effect();
  }, [bingos]);
}
