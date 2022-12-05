import quotes from './quotes';
import classNames from './Quote.module.scss';
import { ReactComponent as Star } from './assets/star.svg';
import { rarityColor, rarityName } from './rarity';
import { MouseEvent, useCallback, useMemo, useRef } from 'react';
import clsx from 'clsx';
import {
  deselectTile,
  selectSelected,
  selectTile,
} from './features/boardSlice';
import { useDispatch, useSelector } from 'react-redux';

interface QuoteProps {
  quote: string;
  onClose: () => void;
}

export default function Quote({ quote, onClose }: QuoteProps) {
  const dispatch = useDispatch();
  const backdrop = useRef<HTMLDivElement>(null);
  const selected = useSelector(selectSelected);

  const isSelected = useMemo(() => selected.includes(quote), [selected, quote]);

  const handleAction = useCallback(() => {
    if (isSelected) {
      dispatch(deselectTile(quote));
    } else {
      dispatch(selectTile(quote));
    }
    onClose();
  }, [dispatch, isSelected]);
  const handleBackdropClick = useCallback(
    (event: MouseEvent) => {
      if (event.target === backdrop.current) {
        onClose();
      }
    },
    [backdrop]
  );

  const mod = quotes.get(quote);
  if (!mod) {
    throw new Error('quote module not found');
  }
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
              className={clsx(
                classNames.button,
                isSelected ? classNames.buttonDeselect : classNames.buttonSelect
              )}
              onClick={handleAction}
            >
              {isSelected ? 'Deselect' : 'Select'}
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
