// src/app/agents/page.tsx

import Link from 'next/link';
import agents from '@/agents';
import type { FC } from 'react';

const GalleryPage: FC = () => {
  const slugs = Object.keys(agents);

  return (
    <div className='min-h-screen bg-[var(--color-background-light)] text-[var(--color-text-primary)]'>
      <div className='mr-8 ml-8 min-h-screen rounded-4xl bg-[var(--color-background)] py-10 shadow-inner'>
        <div className='mx-auto max-w-6xl px-6'>
          <h1 className='mb-8 text-4xl font-bold'>Agent Gallery</h1>
          <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3'>
            {slugs.map((slug) => (
              <Link
                key={slug}
                href={`/agents/${slug}`}
                className='block rounded-2xl bg-[var(--color-background-light)] p-6 shadow transition hover:shadow-lg'
              >
                <h2 className='mb-2 text-2xl font-semibold capitalize'>
                  {slug.replace('-', ' ')}
                </h2>
                <p className='text-[var(--color-text-secondary)]'>
                  View details →
                </p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GalleryPage;
