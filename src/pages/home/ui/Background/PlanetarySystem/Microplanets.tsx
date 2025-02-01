import clsx from 'clsx';

import { CustomComponentProps } from '@shared/lib';

import { Microplanet } from './Microplanet';

type MicroplanetsProps = CustomComponentProps;

export function Microplanets({ className }: MicroplanetsProps) {
  return (
    <div className={className}>
      <Microplanet
        className={clsx(
          'bg-image-planet-1',
          'h-[calc(var(--microplanet-1-position)_+_var(--microplanet-1-size))] w-[calc(var(--microplanet-1-position)_+_var(--microplanet-1-size))]',
          'bg-[length:var(--microplanet-1-size)_var(--microplanet-1-size)]',
          'animate-orbit-1 ![animation-duration:_var(--microplanet-1-duration)]'
        )}
      />
      <Microplanet
        className={clsx(
          'bg-image-planet-2',
          'h-[calc(var(--microplanet-2-position)_+_var(--microplanet-2-size))] w-[calc(var(--microplanet-2-position)_+_var(--microplanet-2-size))]',
          'bg-[length:var(--microplanet-2-size)_var(--microplanet-2-size)]',
          'animate-orbit-2 ![animation-duration:_var(--microplanet-2-duration)]'
        )}
      />
      <Microplanet
        className={clsx(
          'bg-image-planet-3',
          'h-[calc(var(--microplanet-3-position)_+_var(--microplanet-3-size))] w-[calc(var(--microplanet-3-position)_+_var(--microplanet-3-size))]',
          'bg-[length:var(--microplanet-3-size)_var(--microplanet-3-size)]',
          'animate-orbit-3 ![animation-duration:_var(--microplanet-3-duration)]'
        )}
      />
      <Microplanet
        className={clsx(
          'bg-image-planet-4',
          'h-[calc(var(--microplanet-4-position)_+_var(--microplanet-4-size))] w-[calc(var(--microplanet-4-position)_+_var(--microplanet-4-size))]',
          'bg-[length:var(--microplanet-4-size)_var(--microplanet-4-size)]',
          'animate-orbit-4 ![animation-duration:_var(--microplanet-4-duration)]'
        )}
      />
      <Microplanet
        className={clsx(
          'bg-image-planet-5',
          'h-[calc(var(--microplanet-5-position)_+_var(--microplanet-5-size))] w-[calc(var(--microplanet-5-position)_+_var(--microplanet-5-size))]',
          'bg-[length:var(--microplanet-5-size)_var(--microplanet-5-size)]',
          'animate-orbit-5 ![animation-duration:_var(--microplanet-5-duration)]'
        )}
      />
      <Microplanet
        className={clsx(
          'bg-image-planet-6',
          'h-[calc(var(--microplanet-6-position)_+_var(--microplanet-6-size))] w-[calc(var(--microplanet-6-position)_+_var(--microplanet-6-size))]',
          'bg-[length:var(--microplanet-6-size)_var(--microplanet-6-size)]',
          'animate-orbit-6 ![animation-duration:_var(--microplanet-6-duration)]'
        )}
      />
    </div>
  );
}
