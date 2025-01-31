import clsx from 'clsx';

import { CustomComponentProps } from '@shared/lib';

type SpaceProps = CustomComponentProps;

export function Space({ className }: SpaceProps) {
  return (
    <div className={className}>
      <div
        className={clsx(
          'fixed bottom-0 left-0 right-0 top-0 -z-[9999]',
          'bg-gradient-space'
        )}
      ></div>
    </div>
  );
}
