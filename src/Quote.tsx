import { modules, QuoteDescriptor } from './quotes';
import classNames from './Quote.module.scss';
import { ReactComponent as Star } from './assets/star.svg';
import { rarityColor, rarityName } from './rarity';
import { MouseEvent, useCallback, useRef } from 'react';
import clsx from 'clsx';

interface QuoteProps {
  quote: QuoteDescriptor;
  onSelect: () => void;
  onClose: () => void;
}

export default function Quote({ quote, onSelect, onClose }: QuoteProps) {
  const mod = modules[quote.module];
  if (!mod) {
    throw new Error('quote module not found');
  }
  const backdrop = useRef<HTMLDivElement>(null);

  const handleBackdropClick = useCallback(
    (event: MouseEvent) => {
      if (event.target === backdrop.current) {
        onClose();
      }
    },
    [backdrop]
  );

  const rarity = mod.rarity;
  const MDXContent = mod.default;

  return (
    <div
      className={classNames.container}
      ref={backdrop}
      onClick={handleBackdropClick}
    >
      <div className={classNames.modal}>
        <div className={classNames.tileContent}>
          <div className={classNames.rarityContainer}>
            <span
              className={classNames.rarity}
              style={{ color: rarityColor(rarity) }}
            >{`${rarityName(rarity)} QUOTE (${rarity.toFixed(2)})`}</span>
            <Star
              className={classNames.star}
              style={{ fill: rarityColor(rarity) }}
            ></Star>
          </div>
          <MDXContent />
          <div className={classNames.actions}>
            <button
              className={clsx(classNames.button, classNames.buttonSelect)}
              onClick={onSelect}
            >
              Select
            </button>
            <button className={classNames.button} onClick={onClose}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
