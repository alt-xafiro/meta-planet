import clsx from 'clsx';

import { CustomComponentProps } from '@shared/lib';
import { ExternalLink, Logo } from '@shared/ui';

import './styles.css';

type HeaderProps = CustomComponentProps;

export function Header({ className }: HeaderProps) {
  return (
    <header
      className={clsx(className, [
        'flex h-[var(--header-height)] w-full items-center justify-center pl-[20px] pr-[20px]',
        'lg:pl-[40px] lg:pr-[40px]'
      ])}
    >
      <ExternalLink href="https://en.wikipedia.org/wiki/Lists_of_planets">
        <Logo />
      </ExternalLink>
    </header>
  );
}
