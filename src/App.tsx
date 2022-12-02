import clsx from 'clsx';
import classNames from './App.module.scss';
import useBoard from './useBoard';

function App() {
  const { board, select } = useBoard();
  return (
    <div className={classNames.container}>
      <div className={classNames.board}>
        {board.map(({ quote, selected }, i) => (
          <div
            key={i}
            className={clsx(
              classNames.tile,
              selected && classNames.tileSelected
            )}
            onClick={() => select(i)}
          >
            <div className={classNames.tileContent}>
              {quote}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
