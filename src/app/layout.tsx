'use client';
import './globals.css';
import { Roboto } from 'next/font/google';
import { ReactNode, useLayoutEffect, useState } from 'react';
import { win } from '@/safe-window';

const inter = Roboto({
  weight: ['400', '700'],
  subsets: ['latin-ext'],
});
export default function RootLayout({ children }: { children: ReactNode }) {
  const [className, setClassName] = useState(
    win?.localStorage?.getItem('theme') || 'light',
  );

  useLayoutEffect(() => {
    setClassName(win?.localStorage?.getItem('theme') || 'light');
    win?.addEventListener('theme', () => {
      setClassName(win?.localStorage?.getItem('theme') || 'light');
    });
  }, [setClassName]);

  return (
    <html lang="en" className={className}>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
