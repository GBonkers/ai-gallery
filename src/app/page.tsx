// src/app/page.tsx
import Image from 'next/image';

export default function Home() {
  return (
    <div className='grid min-h-screen grid-rows-[80px_1fr_40px] gap-12 bg-gradient-to-br from-indigo-50 to-blue-100 p-8 pb-20 font-[family-name:var(--font-geist-sans)] sm:p-20 dark:from-gray-800 dark:to-gray-900'>
      {/* Header */}
      <header className='row-start-1 flex w-full justify-center sm:justify-start'>
        <h1 className='text-4xl font-extrabold text-indigo-700 dark:text-indigo-300'>
          AI Agents Gallery
        </h1>
      </header>

      {/* Main content */}
      <main className='row-start-2 flex flex-col items-center gap-8 sm:items-start'>
        <Image
          className='dark:invert'
          src='/next.svg'
          alt='Next.js logo'
          width={180}
          height={38}
          priority
        />

        <ol className='list-inside list-decimal text-center font-[family-name:var(--font-geist-mono)] text-sm leading-6 sm:text-left'>
          <li className='mb-2 tracking-[-0.01em]'>
            Edit{' '}
            <code className='rounded bg-black/[.05] px-1 py-0.5 font-semibold dark:bg-white/[.06]'>
              src/app/page.tsx
            </code>{' '}
            and save to see updates live.
          </li>
          <li className='tracking-[-0.01em]'>
            This page uses Tailwind utilities.
          </li>
        </ol>

        {/* Tailwind Test Card */}
        <div className='w-full max-w-md rounded-xl bg-white p-6 shadow-lg transition hover:shadow-2xl dark:bg-gray-700'>
          <h2 className='mb-4 text-2xl font-semibold text-gray-800 dark:text-gray-200'>
            Tailwind Test Card
          </h2>
          <p className='mb-6 text-gray-600 dark:text-gray-400'>
            This card verifies padding, rounded corners, shadows, light/dark
            mode, and transitions.
          </p>
          <button className='rounded bg-indigo-600 px-4 py-2 text-white transition hover:bg-indigo-700'>
            Click me
          </button>
        </div>

        <div className='flex flex-col gap-4 sm:flex-row'>
          <a
            className='bg-foreground text-background rounded-full px-5 py-3 text-sm font-medium transition hover:bg-[#383838] sm:text-base dark:hover:bg-[#ccc]'
            href='https://vercel.com/new'
            target='_blank'
            rel='noopener noreferrer'
          >
            Deploy now
          </a>
          <a
            className='rounded-full border border-black/[.08] px-5 py-3 text-sm font-medium transition hover:bg-[#f2f2f2] sm:text-base dark:border-white/[.145] dark:hover:bg-[#1a1a1a]'
            href='https://nextjs.org/docs'
            target='_blank'
            rel='noopener noreferrer'
          >
            Read our docs
          </a>
        </div>
      </main>

      {/* Footer */}
      <footer className='row-start-3 flex flex-wrap justify-center gap-6'>
        <a
          className='flex items-center gap-2 hover:underline'
          href='https://nextjs.org/learn'
        >
          <Image src='/file.svg' alt='File icon' width={16} height={16} />
          Learn
        </a>
        <a
          className='flex items-center gap-2 hover:underline'
          href='https://vercel.com/templates'
        >
          <Image src='/window.svg' alt='Window icon' width={16} height={16} />
          Examples
        </a>
        <a
          className='flex items-center gap-2 hover:underline'
          href='https://nextjs.org'
        >
          <Image src='/globe.svg' alt='Globe icon' width={16} height={16} />
          Next.js.org
        </a>
      </footer>
    </div>
  );
}
