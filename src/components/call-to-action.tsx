'use client';
import React, { ReactNode, useCallback } from 'react';
import { win } from '@/safe-window';
import clsx from 'clsx';

export const CallToAction = ({
  subject,
  children,
  primary,
}: {
  subject: string;
  children: ReactNode;
  primary?: boolean;
}) => {
  const hireMe = useCallback(() => {
    if (win?.location?.href) {
      win.location.href = 'mailto:onerzfr@gmail.com?subject=' + subject;
    }
  }, [subject]);

  return (
    <button
      className={clsx(
        'px-4 py-2 rounded hover:shadow-2xl text-white shadow transition h-12',
        {
          'hover:bg-sky-400 bg-sky-500': primary,
          'hover:bg-slate-400 bg-slate-500': !primary,
        },
      )}
      onClick={hireMe}
    >
      {children}
    </button>
  );
};
