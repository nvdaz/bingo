import ReactGA from 'react-ga';
import classNames from './App.module.scss';
import QuoteTile from './QuoteTile';
import Quote from './Quote';
import { useCallback, useState } from 'react';
import useBoard from '../useBoard';
import Confetti from '../Confetti';

function App() {
  const [open, setOpen] = useState<string>();
  const tiles = useBoard();

  const onClose = useCallback(() => setOpen(undefined), [setOpen]);
  const onClick = useCallback(
    (quote: string) => {
      ReactGA.pageview(`/quotes/${quote}`);
      setOpen(quote);
    },
    [setOpen]
  );

  return (
    <div className={classNames.container}>
      <Confetti />
      {open && <Quote quote={open} onClose={onClose} />}
      <div className={classNames.board}>
        {tiles.map((quote, i) => (
          <QuoteTile quote={quote} key={i} onClick={onClick} />
        ))}
      </div>
    </div>
  );
}

export default App;
