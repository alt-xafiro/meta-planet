import clsx from 'clsx';

import { aBeeZee } from '@shared/ui';

import '../styles/globals.css';

export function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full min-h-full">
      <body
        className={clsx(
          aBeeZee.className,
          'h-full min-h-full w-full min-w-[360px]',
          'break-words bg-blue-950 text-white'
        )}
      >
        {children}
      </body>
    </html>
  );
}
