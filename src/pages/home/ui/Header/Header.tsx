import clsx from 'clsx';

import { CustomComponentProps } from '@shared/lib';
import { ExternalLink, Logo } from '@shared/ui';

import './styles.css';

import { ParallaxSwitcher } from './ParallaxSwitcher/ParallaxSwitcher';

type HeaderProps = CustomComponentProps;

export function Header({ className }: HeaderProps) {
  return (
    <header
      className={clsx(className, [
        'grid h-[var(--header-height)] w-full grid-cols-3 pl-[20px] pr-[20px]',
        'lg:pl-[40px] lg:pr-[40px]'
      ])}
    >
      <ExternalLink
        className={clsx(
          'col-start-2 col-end-3 self-center justify-self-center',
          'flex items-center justify-center'
        )}
        href="https://en.wikipedia.org/wiki/Lists_of_planets"
      >
        <Logo />
      </ExternalLink>
      <ParallaxSwitcher className="col-start-3 col-end-4 self-center justify-self-end" />
    </header>
  );
}
