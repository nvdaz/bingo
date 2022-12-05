import clsx from 'clsx';
import quotes from './quotes';
import classNames from './QuoteTile.module.scss';
import { ReactComponent as Star } from './assets/star.svg';
import { rarityColor } from './rarity';
import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { selectSelected } from './features/boardSlice';

interface QuoteTileProps {
  quote: string | null;
  onClick: (quote: string) => void;
}

export default function QuoteTile({ quote, onClick }: QuoteTileProps) {
  const handleClick = useCallback(() => onClick(quote!), [quote, onClick]);
  const selected = useSelector(selectSelected);

  if (!quote) {
    return (
      <div className={clsx(classNames.tile, classNames.freeTile)}>
        <div className={classNames.tileContent}>
          <div className={classNames.tileQuoteContainer}>
            <p className={clsx(classNames.tileQuote, classNames.freeSpace)}>
              FREE SPACE
            </p>
          </div>
        </div>
      </div>
    );
  }

  const mod = quotes.get(quote);
  if (!mod) {
    throw new Error('no quote');
  }
  const rarity = mod.rarity;
  const short = mod.short;

  return (
    <div
      className={clsx(
        classNames.tile,
        classNames.tileSelectable,
        selected.includes(quote) && classNames.tileSelected
      )}
      onClick={handleClick}
    >
      <div className={classNames.tileContent}>
        <Star
          className={classNames.star}
          style={{ fill: rarityColor(rarity) }}
        ></Star>
        <div className={classNames.tileQuoteContainer}>
          <p className={classNames.tileQuote}>{short}</p>
        </div>
      </div>
    </div>
  );
}
