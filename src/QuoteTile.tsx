import clsx from 'clsx';
import { modules } from './quotes';
import classNames from './QuoteTile.module.scss';
import { ReactComponent as Star } from './assets/star.svg';
import { rarityColor } from './rarity';
import { useCallback } from 'react';

interface QuoteTileProps {
  quote: string;
  selected: boolean;
  onClick: (key: string) => void;
}

export default function QuoteTile({
  quote,
  selected,
  onClick,
}: QuoteTileProps) {
  const mod = modules[quote];
  if (!mod) {
    throw new Error('quote module not found');
  }

  const handleClick = useCallback(() => onClick(quote), [quote, onClick]);

  const rarity = mod.rarity;
  const short = mod.short;

  return (
    <div
      className={clsx(classNames.tile, selected && classNames.tileSelected)}
      onClick={handleClick}
    >
      <div className={classNames.tileContent}>
        <Star
          className={classNames.star}
          style={{ fill: rarityColor(rarity) }}
        ></Star>
        <p>{short}</p>
      </div>
    </div>
  );
}
