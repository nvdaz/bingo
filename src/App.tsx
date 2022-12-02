import clsx from 'clsx';
import classNames from './App.module.scss';
import useBoard from './useBoard';
import { ReactComponent as Star } from './assets/star.svg';
import { rarityColor } from './rarity';

function App() {
  const { board, select } = useBoard();
  console.log(board);
  return (
    <div className={classNames.container}>
      <div className={classNames.board}>
        {board.map(({ quote, rarity, selected }, i) => (
          <div
            key={i}
            className={clsx(
              classNames.tile,
              selected && classNames.tileSelected
            )}
            onClick={() => select(i)}
          >
            <div className={classNames.tileContent}>
              <Star
                className={classNames.star}
                style={{ fill: rarityColor(rarity) }}
              ></Star>
              {quote}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
