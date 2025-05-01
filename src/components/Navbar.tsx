// src/components/Navbar.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FiSun, FiMoon } from 'react-icons/fi';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [mounted, setMounted] = useState(false);

  // On mount, read the real theme and mark ready
  useEffect(() => {
    const stored = localStorage.getItem('theme');
    const prefers = window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
    setTheme(stored === 'light' || stored === 'dark' ? stored : prefers);
    setMounted(true);
  }, []);

  // Whenever theme changes, update root class & localStorage
  useEffect(() => {
    if (mounted) {
      document.documentElement.classList.toggle('dark-mode', theme === 'dark');
      localStorage.setItem('theme', theme);
    }
  }, [theme, mounted]);

  function toggleTheme() {
    setTheme((t) => (t === 'light' ? 'dark' : 'light'));
  }

  return (
    <nav className='bg-[var(--color-background-light)] text-[var(--color-text-primary)] shadow-sm'>
      <div className='mx-auto max-w-6xl px-4 sm:px-6 lg:px-8'>
        <div className='flex h-16 items-center justify-between'>
          {/* Logo */}
          <Link href='/' className='font-serif text-2xl font-semibold'>
            The AI Gallery
          </Link>

          {/* Desktop Menu */}
          <div className='hidden items-center space-x-8 md:flex'>
            <Link
              href='/src/agents'
              className='transition hover:text-[var(--color-brand)]'
            >
              Gallery
            </Link>
            <Link
              href='/about'
              className='transition hover:text-[var(--color-brand)]'
            >
              About
            </Link>
            <a
              href='https://github.com/GBonkers/ai-gallery'
              target='_blank'
              rel='noreferrer'
              className='transition hover:text-[var(--color-brand)]'
            >
              GitHub
            </a>
            {/* Theme button */}
            <button
              onClick={toggleTheme}
              aria-label='Toggle theme'
              className='rounded p-2 transition hover:bg-[var(--color-background)]'
            >
              {mounted ? (
                theme === 'dark' ? (
                  <FiSun className='h-5 w-5 text-[var(--color-text-primary)]' />
                ) : (
                  <FiMoon className='h-5 w-5 text-[var(--color-text-primary)]' />
                )
              ) : (
                // Render nothing until hydrated
                <span className='inline-block h-5 w-5' />
              )}
            </button>
          </div>

          {/* Mobile Hamburger + Theme */}
          <div className='flex items-center md:hidden'>
            <button
              onClick={toggleTheme}
              aria-label='Toggle theme'
              className='mr-2 rounded p-2 transition hover:bg-[var(--color-background)]'
            >
              {mounted ? (
                theme === 'dark' ? (
                  <FiSun className='h-5 w-5 text-[var(--color-text-primary)]' />
                ) : (
                  <FiMoon className='h-5 w-5 text-[var(--color-text-primary)]' />
                )
              ) : (
                <span className='inline-block h-5 w-5' />
              )}
            </button>
            <button
              onClick={() => setOpen(!open)}
              className='rounded p-2 transition hover:bg-[var(--color-background)]'
            >
              {open ? (
                <svg
                  className='h-6 w-6'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M6 18L18 6M6 6l12 12'
                  />
                </svg>
              ) : (
                <svg
                  className='h-6 w-6'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M4 8h16M4 16h16'
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className='bg-[var(--color-background)] md:hidden'>
          <Link
            href='/src/agents'
            className='block px-4 py-2 transition hover:bg-[var(--color-background-light)]'
            onClick={() => setOpen(false)}
          >
            Gallery
          </Link>
          <Link
            href='/'
            className='block px-4 py-2 transition hover:bg-[var(--color-background-light)]'
            onClick={() => setOpen(false)}
          >
            About
          </Link>
          <a
            href='https://github.com/GBonkers/ai-gallery'
            target='_blank'
            rel='noreferrer'
            className='block px-4 py-2 transition hover:bg-[var(--color-background-light)]'
            onClick={() => setOpen(false)}
          >
            GitHub
          </a>
        </div>
      )}
    </nav>
  );
}
