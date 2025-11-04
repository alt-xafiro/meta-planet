import type { Metadata } from 'next';

export const metadata: Metadata = {
  metadataBase: new URL('https://meta-planet.vercel.app'),
  title: 'Meta Planet',
  description: 'Outer space.',
  authors: [
    {
      name: 'Safiro',
      url: 'https://github.com/alt-xafiro'
    }
  ],
  icons: [
    '/favicon.ico',
    {
      type: 'image/svg+xml',
      sizes: 'any',
      url: '/favicon.svg'
    },
    {
      rel: 'apple-touch-icon',
      url: '/apple-touch-icon.png'
    }
  ],
  manifest: '/manifest.webmanifest',
  openGraph: {
    siteName: 'Meta Planet',
    url: 'https://meta-planet.vercel.app',
    images: [
      {
        url: 'https://meta-planet.vercel.app/opengraph-image.png',
        width: 1200,
        height: 630
      }
    ]
  },
  twitter: {
    images: ['https://meta-planet.vercel.app/opengraph-image.png']
  }
};
