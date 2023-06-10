'use client';
import React from 'react';

export const HireMe = () => {
  const hireMe = () => {
    window.location.href = 'mailto:onerzfr@gmail.com?subject=We need you!';
  };

  return (
    <button
      className="px-4 py-2 rounded hover:bg-sky-400 hover:shadow-2xl bg-sky-500 text-white shadow transition h-12"
      onClick={hireMe}
    >
      Hire Me!
    </button>
  );
};
