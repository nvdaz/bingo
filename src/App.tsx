import classNames from './App.module.scss';
import useBoard from './useBoard';
import QuoteTile from './QuoteTile';
import Quote from './Quote';
import { useCallback, useState } from 'react';

function App() {
  const [open, setOpen] = useState<string>();
  const { board, select } = useBoard();

  const onSelect = useCallback(() => {
    select(open!);
    setOpen(undefined);
  }, [open, setOpen]);
  const onClose = useCallback(() => setOpen(undefined), [setOpen]);
  const onClick = useCallback((key: string) => setOpen(key), [setOpen]);

  return (
    <div className={classNames.container}>
      {open && <Quote quote={open} onClose={onClose} onSelect={onSelect} />}
      <div className={classNames.board}>
        {board.map((quote, i) => (
          <QuoteTile
            quote={quote.key}
            selected={quote.selected}
            key={i}
            onClick={onClick}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
