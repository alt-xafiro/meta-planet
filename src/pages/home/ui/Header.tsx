import clsx from 'clsx';

import { CustomComponentProps } from '@shared/lib';
import { ExternalLink, Logo } from '@shared/ui';

type HeaderProps = CustomComponentProps;

export function Header({ className }: HeaderProps) {
  return (
    <header
      className={clsx(
        className,
        'flex h-[110px] w-full items-center justify-center lg:h-[150px]'
      )}
    >
      <ExternalLink href="https://en.wikipedia.org/wiki/Lists_of_planets">
        <Logo />
      </ExternalLink>
    </header>
  );
}
