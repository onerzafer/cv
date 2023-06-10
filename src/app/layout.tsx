'use client';
import './globals.css';
import { Roboto } from 'next/font/google';
import { ReactNode, useLayoutEffect, useState } from 'react';

const inter = Roboto({
  weight: ['400', '700'],
  subsets: ['latin-ext'],
});

export default function RootLayout({ children }: { children: ReactNode }) {
  const [className, setClassName] = useState(
    window?.localStorage?.getItem('theme') || 'light',
  );

  useLayoutEffect(() => {
    setClassName(window?.localStorage?.getItem('theme') || 'light');
    window.addEventListener('theme', () => {
      setClassName(window?.localStorage?.getItem('theme') || 'light');
    });
  }, [setClassName]);

  return (
    <html lang="en" className={className}>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
