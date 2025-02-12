import clsx from 'clsx';
import * as motion from 'motion/react-client';

import { CustomComponentProps } from '@shared/lib';
import { IBMPlexMono } from '@shared/ui';

import './styles.css';

import { RenderPosition, RenderPositionValue } from '../../../lib/planets';

type SidePlanetNameProps = CustomComponentProps & {
  position: RenderPositionValue;
};

export function SidePlanetName({
  children,
  className,
  position
}: SidePlanetNameProps) {
  return (
    <motion.div
      className={clsx(
        className,
        IBMPlexMono.className,
        [
          'absolute top-1/2',
          position === RenderPosition.PREV
            ? 'left-[var(--side-planet-name-x)]'
            : 'right-[var(--side-planet-name-x)]'
        ],
        'max-w-[var(--planets-side-name-max-size)]',
        [
          'overflow-hidden text-ellipsis text-nowrap text-left text-[10px] uppercase tracking-[0.3em]',
          'sm:text-[14px]',
          'md:text-[18px]',
          'lg:text-[24px]',
          '2lg:text-[28px]',
          '3xl:text-[32px]',
          '4xl:text-[36px]',
          '5xl:text-[40px]',
          '6xl:text-[48px]'
        ],
        'select-none'
      )}
      initial={{ opacity: 0, scale: 0, y: '-50%' }}
      animate={{ opacity: 1, scale: 1, y: '-50%' }}
      exit={{ opacity: 0, scale: 0, y: '-50%' }}
    >
      {children}
    </motion.div>
  );
}
