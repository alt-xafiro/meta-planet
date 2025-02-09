import clsx from 'clsx';

import { aBeeZee } from '@shared/ui';

import '../styles/globals.css';

export function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="flex min-h-full">
      <body
        className={clsx(
          aBeeZee.className,
          'relative',
          'flex min-h-full w-full min-w-[360px] flex-col items-stretch justify-start',
          'break-words bg-space-600 text-white',
          'scrollbar scrollbar-track-space-800 scrollbar-thumb-space-700'
        )}
      >
        {children}
      </body>
    </html>
  );
}
