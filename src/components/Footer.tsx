// src/components/Footer.tsx
import Link from 'next/link';
import React from 'react';

export default function Footer() {
  return (
    <footer className='bg-[var(--color-background-light)] py-6 text-[var(--color-text-secondary)]'>
      <div className='mx-auto max-w-6xl space-y-4 px-4 text-center sm:px-6 lg:px-8'>
        <nav className='flex justify-center gap-6'>
          <Link
            href='/agents'
            className='transition hover:text-[var(--color-brand)]'
          >
            Gallery
          </Link>
          <Link href='/' className='transition hover:text-[var(--color-brand)]'>
            Home
          </Link>
          <a
            href='https://github.com/GBonkers/ai-gallery'
            target='_blank'
            rel='noreferrer'
            className='transition hover:text-[var(--color-brand)]'
          >
            GitHub
          </a>
        </nav>
        <p className='text-sm'>
          &copy; {new Date().getFullYear()} The AI Gallery. Licensed under&nbsp;
          <a
            href='https://github.com/GBonkers/ai-gallery/blob/main/LICENSE'
            target='_blank'
            rel='noreferrer'
            className='underline hover:text-[var(--color-brand)]'
          >
            MIT
          </a>
          .
        </p>
      </div>
    </footer>
  );
}
