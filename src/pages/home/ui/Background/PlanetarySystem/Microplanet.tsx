import clsx from 'clsx';

import { CustomComponentProps } from '@shared/lib';

type MicroplanetProps = CustomComponentProps;

export function Microplanet({ className }: MicroplanetProps) {
  return (
    <div
      className={clsx(
        className,
        'absolute left-1/2 top-1/2',
        'bg-right bg-no-repeat',
        'origin-center will-change-transform ![animation-fill-mode:_both] ![animation-iteration-count:_infinite] ![animation-timing-function:_linear]'
      )}
    ></div>
  );
}
