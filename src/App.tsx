import ReactGA from 'react-ga';
import classNames from './App.module.scss';
import useBoard from './useBoard';
import QuoteTile from './QuoteTile';
import Quote from './Quote';
import { useCallback, useState } from 'react';
import { QuoteDescriptor } from './quotes';

function App() {
  const [open, setOpen] = useState<QuoteDescriptor>();
  const { board, select } = useBoard();

  const onSelect = useCallback(() => {
    select(open!.key);
    setOpen(undefined);
  }, [open, setOpen]);
  const onClose = useCallback(() => setOpen(undefined), [setOpen]);
  const onClick = useCallback(
    (quote: QuoteDescriptor) => {
      ReactGA.pageview(quote.key);
      setOpen(quote);
    },
    [setOpen]
  );

  return (
    <div className={classNames.container}>
      {open && <Quote quote={open} onClose={onClose} onSelect={onSelect} />}
      <div className={classNames.board}>
        {board.map((quote, i) => (
          <QuoteTile
            quote={quote}
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
