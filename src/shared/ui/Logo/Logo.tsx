import clsx from 'clsx';

import Image from 'next/image';

import { CustomComponentProps } from '@shared/lib';

type LogoProps = CustomComponentProps;

export function Logo({ className }: LogoProps) {
  return (
    <div
      className={clsx(
        className,
        'relative flex h-[70px] w-[157px] items-center justify-center'
      )}
    >
      <Image src="/images/logo.svg" alt="Meta Planet" fill priority />
    </div>
  );
}
