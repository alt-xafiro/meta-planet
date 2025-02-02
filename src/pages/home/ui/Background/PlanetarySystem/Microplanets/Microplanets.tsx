import clsx from 'clsx';

import './styles.css';

export function Microplanets() {
  return (
    <>
      {new Array(6).fill(null).map((_, i) => (
        <div
          key={i}
          className={clsx(
            `microplanet microplanet-${++i}`,
            'absolute left-1/2 top-1/2'
          )}
        />
      ))}
    </>
  );
}
