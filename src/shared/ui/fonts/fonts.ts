import { ABeeZee, IBM_Plex_Mono, Share_Tech_Mono } from 'next/font/google';

export const aBeeZee = ABeeZee({
  subsets: ['latin'],
  display: 'swap',
  weight: '400',
  style: 'normal'
});

export const IBMPlexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  display: 'swap',
  weight: ['500', '400'],
  style: 'normal'
});

export const shareTechMono = Share_Tech_Mono({
  subsets: ['latin'],
  display: 'swap',
  weight: '400',
  style: 'normal'
});
