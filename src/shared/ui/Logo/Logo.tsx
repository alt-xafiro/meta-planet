import clsx from 'clsx';

import Image from 'next/image';

import { CustomComponentProps } from '@shared/lib';

type LogoProps = CustomComponentProps;

export function Logo({ className }: LogoProps) {
  return (
    <div
      className={clsx(className, [
        'relative flex h-[49px] w-[110px] items-center justify-center',
        'lg:h-[60px] lg:w-[134px]',
        '2lg:h-[70px] 2lg:w-[157px]',
        '3xl:h-[87px] 3xl:w-[196px]'
      ])}
    >
      <Image src="/images/logo.svg" alt="Meta Planet" fill priority />
    </div>
  );
}
