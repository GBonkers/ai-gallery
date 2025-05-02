// src/app/agents/page.tsx

import Link from 'next/link';
import Image from 'next/image';
import type { FC } from 'react';
import agents from '@/agents'; // your dynamic index of slugs

type AgentMeta = {
  creatorLogin: string;
  // …any other fields you need from metadata.json
};

const GalleryPage: FC = () => {
  const slugs = Object.keys(agents);

  return (
    <div className='min-h-screen bg-[var(--color-background-light)] text-[var(--color-text-primary)]'>
      <div className='mx-8 min-h-screen rounded-4xl bg-[var(--color-background)] py-10 shadow-inner'>
        <div className='mx-auto max-w-6xl px-6'>
          <h1 className='mb-8 text-4xl font-bold'>Agent Gallery</h1>

          <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3'>
            {slugs.map((slug) => {
              // 1) Dynamically require the JSON
              const metaModule = require(`../../agents/${slug}/metadata.json`);
              // Depending on your bundler, metadata may live on .default
              const meta: AgentMeta = metaModule.default ?? metaModule;

              // 2) Dynamically require the PNG
              const thumbModule = require(`../../agents/${slug}/thumbnail.png`);
              // Extract the actual StaticImageData (or URL string)
              const thumbnail = thumbModule.default ?? thumbModule;

              return (
                <Link
                  key={slug}
                  href={`/agents/${slug}`}
                  className='block rounded-2xl bg-[var(--color-background-light)] p-6 shadow transition hover:shadow-lg'
                >
                  {/* Thumbnail */}
                  <div className='relative mb-4 h-40 w-full overflow-hidden rounded-lg'>
                    <Image
                      src={thumbnail}
                      alt={`${slug} thumbnail`}
                      fill
                      className='object-contain'
                      sizes='(max-width: 768px) 100vw, 33vw'
                    />
                  </div>

                  {/* Agent name */}
                  <h2 className='mb-1 text-2xl font-semibold capitalize'>
                    {slug.replace(/-/g, ' ')}
                  </h2>

                  {/* Creator username */}
                  <p className='mb-2 text-sm text-[var(--color-text-secondary)]'>
                    By <strong>{meta.creatorLogin}</strong>
                  </p>

                  {/* CTA */}
                  <p className='text-[var(--color-text-secondary)]'>
                    View details →
                  </p>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GalleryPage;
