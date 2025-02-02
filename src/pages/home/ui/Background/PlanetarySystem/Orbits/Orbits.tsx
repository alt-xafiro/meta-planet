import clsx from 'clsx';

import { CustomComponentProps } from '@shared/lib';

import './styles.css';

type OrbitsProps = CustomComponentProps;

export function Orbits({ className }: OrbitsProps) {
  return (
    <div
      className={clsx(
        className,
        'absolute left-0 top-0 h-full w-full',
        'bg-image-orbits bg-contain bg-center bg-no-repeat'
      )}
    ></div>
  );
}
