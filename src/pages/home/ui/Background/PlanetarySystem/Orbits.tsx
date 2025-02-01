import clsx from 'clsx';

import { CustomComponentProps } from '@shared/lib';

type OrbitsProps = CustomComponentProps;

export function Orbits({ className }: OrbitsProps) {
  return (
    <div
      className={clsx(
        className,
        'absolute bottom-0 left-0 h-full w-full',
        'bg-image-orbits bg-contain bg-center bg-no-repeat'
      )}
    ></div>
  );
}
