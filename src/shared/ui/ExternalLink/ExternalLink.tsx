import { AnchorHTMLAttributes } from 'react';

import { CustomComponentProps } from '@shared/lib';

type ExternalLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> &
  CustomComponentProps;

export function ExternalLink({
  children,
  className,
  ...rest
}: ExternalLinkProps) {
  return (
    <a
      className={className}
      target="_blank"
      rel="noopener noreferrer"
      {...rest}
    >
      {children}
    </a>
  );
}
