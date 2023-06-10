'use client';

import { Switch } from '@headlessui/react';
import React, { useLayoutEffect, useState } from 'react';
import { win } from '@/safe-window';

export const DarkModeToggle = () => {
  const [enabled, setEnabled] = useState(
    win?.localStorage?.getItem('theme') === 'dark',
  );

  useLayoutEffect(() => {
    win?.localStorage?.setItem('theme', enabled ? 'dark' : 'light');
    win.dispatchEvent(new Event('theme'));
  }, [enabled]);

  return (
    <Switch
      checked={enabled}
      onChange={setEnabled}
      className={`ring-1 ring-current relative inline-flex h-6 w-11 items-center rounded-full bg-slate-200 dark:bg-slate-700 transition ease-in-out duration-500`}
    >
      <span
        className={`${
          enabled ? 'translate-x-6' : 'translate-x-1'
        } inline-block h-4 w-4 transform rounded-full bg-white transition`}
      />
    </Switch>
  );
};
