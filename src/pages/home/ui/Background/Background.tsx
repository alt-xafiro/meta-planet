import clsx from 'clsx';

import { CustomComponentProps } from '@shared/lib';

import { Space } from './Space';
import { Stars } from './Stars/Stars';

type BackgroundProps = CustomComponentProps;

export function Background({ className }: BackgroundProps) {
  return (
    <div
      className={clsx(
        className,
        'pointer-events-none touch-none select-none overflow-hidden'
      )}
    >
      <Space />
      <Stars />
    </div>
  );
}
