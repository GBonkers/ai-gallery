// src/components/Home.tsx
'use client';

import Link from 'next/link';
import Image from 'next/image';
import {
  FiAward,
  FiClock,
  FiGitBranch,
  FiFileText,
  FiCheckCircle,
  FiUserPlus,
} from 'react-icons/fi';
import { PiLightbulbFilament, PiRobot } from 'react-icons/pi';
import { BsFileEarmarkPlay } from 'react-icons/bs';

const contributors = [
  { username: 'GBonkers', profile: 'https://github.com/GBonkers' }, //Creator of the platform
];

export default function Home() {
  return (
    <div className='min-h-screen bg-[var(--color-background-light)] text-[var(--color-text-primary)]'>
      <div className='mx-auto max-w-6xl rounded-3xl border border-[var(--color-border-light)] bg-[var(--color-background)] px-6 py-16 shadow-inner'>
        {/* Hero */}
        <div className='text-center'>
          <div className='flex flex-col items-center justify-center gap-6 rounded-lg bg-[var(--color-background)] px-6 py-12 md:flex-row md:items-start md:gap-10 md:px-20'>
            <div className='h-44 w-44 flex-shrink-0'>
              <Image
                src='/assets/TitleImage.png'
                alt='AI Gallery Icon'
                className='mt-2 h-full w-full object-contain'
                width={176}
                height={176}
              />
            </div>
            <div className='md:text-left'>
              <h1 className='font-serif text-4xl leading-tight font-semibold text-[var(--color-text-primary)] sm:text-5xl'>
                About The
                <br />
                AI Gallery
              </h1>
              <p className='mt-4 max-w-xl text-lg leading-relaxed text-[var(--color-text-secondary)]'>
                A curated, open-source archive of AI agents,
                <br />
                documented and preserved for learning and in
                <br />
                inspiration.
              </p>
            </div>
          </div>

          <div className='flex justify-center gap-4'>
            <Link
              href='/agents'
              className='rounded-md bg-[var(--color-brand)] px-6 py-3 font-medium text-white shadow transition hover:bg-[var(--color-brand-dark)]'
            >
              Browse Gallery
            </Link>
            <a
              href='https://github.com/GBonkers/ai-gallery'
              target='_blank'
              rel='noreferrer'
              className='rounded-md border border-[var(--color-brand)] px-6 py-3 text-[var(--color-brand)] shadow transition hover:bg-[var(--color-border-light)]'
            >
              Contribute on GitHub
            </a>
          </div>
        </div>

        <div className='mt-12 grid grid-cols-1 grid-rows-5 gap-6 lg:grid-cols-2'>
          {/* What is an AI Agent? */}
          <div className='row-span-2 overflow-hidden rounded-2xl border border-[var(--color-border-light)] bg-[var(--color-background-light)] shadow-inner'>
            {/* Header */}
            <div className='bg-[var(--color-background-dark)] px-6 py-4'>
              <h2 className='font-serif text-2xl font-semibold text-[var(--color-text-primary)]'>
                What is an AI Agent?
              </h2>
            </div>

            {/* Content with floating icon */}
            <div className='px-6 py-6 text-base leading-relaxed text-[var(--color-text-secondary)]'>
              <div className='float-left mr-4 mb-2 flex h-20 w-20 items-center justify-center rounded-full bg-[var(--color-accent-light)] text-[var(--color-background]'>
                <PiRobot className='h-10 w-10 text-[var(--color-text-secondary)]' />
              </div>
              <p>
                An AI agent is a software system designed to autonomously
                perceive its environment, make decisions, and perform actions.
              </p>
              <p className='mt-4'>
                These agents can handle a wide range of tasks. From natural
                language conversations to image understanding and audio
                recognition, making them a core part of modern intelligent
                systems.
              </p>
            </div>
          </div>

          {/* Why This Gallery */}
          <div className='row-span-3 flex flex-col overflow-hidden rounded-2xl border border-[var(--color-border-light)] bg-[var(--color-background-light)] shadow-inner'>
            {/* Header Bar */}
            <div className='bg-[var(--color-background-dark)] px-6 py-4'>
              <h2 className='font-serif text-2xl font-semibold text-[var(--color-text-primary)]'>
                Why This Gallery?
              </h2>
            </div>

            {/* Inner Content Wrapper */}
            <div className='flex flex-col px-6 pt-6 pb-2'>
              <p className='text-base leading-relaxed text-[var(--color-text-secondary)]'>
                The AI Gallery is a community-curated archive of intelligent
                agents designed to document, preserve, and share useful,
                creative, and open-source models for exploration, learning, and
                collaboration.
              </p>
            </div>

            {/* Content */}
            <ul className='flex flex-grow flex-col justify-between space-y-6 px-6 py-6'>
              {[
                {
                  icon: <PiLightbulbFilament className='h-5 w-5' />,
                  text: 'Curated models with clean, ready-to-run code and reproducible examples.',
                },
                {
                  icon: <FiAward className='h-5 w-5' />,
                  text: 'Not ranked by leaderboard metrics — we favor clarity and usefulness.',
                },
                {
                  icon: <BsFileEarmarkPlay className='h-5 w-5' />,
                  text: 'Explore live demos and tweak parameters in real time.',
                },
                {
                  icon: <FiClock className='h-5 w-5' />,
                  text: 'Built as a lasting resource for researchers, educators, and engineers.',
                },
              ].map(({ icon, text }, idx) => (
                <li key={idx} className='flex items-start gap-4'>
                  <div className='flex aspect-square h-9 min-h-[2.25rem] w-9 min-w-[2.25rem] shrink-0 items-center justify-center rounded-full bg-[var(--color-accent-light)] text-[var(--color-text-secondary)]'>
                    <div className='flex h-5 w-5 items-center justify-center'>
                      {icon}
                    </div>
                  </div>
                  <p className='text-base leading-relaxed text-[var(--color-text-secondary)]'>
                    {text}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          {/* How to contribute */}
          <div className='row-span-3 overflow-hidden rounded-2xl border border-[var(--color-border-light)] bg-[var(--color-background-light)] shadow-inner'>
            {/* Header */}
            <div className='bg-[var(--color-background-dark)] px-6 py-4'>
              <h2 className='font-serif text-2xl font-semibold text-[var(--color-text-primary)]'>
                How to Contribute
              </h2>
            </div>
            {/* Flowchart Image */}
            <div className='mt-6 px-6 pb-6'>
              <Image
                src='/assets/Flowchart.png'
                alt='Contribution Flowchart'
                width={512}
                height={114}
                className='h-auto w-full object-contain'
              />
            </div>
            {/* List Content */}
            <div className='px-6 py-6'>
              <ul className='space-y-5 text-base leading-relaxed text-[var(--color-text-secondary)]'>
                <li className='flex items-center gap-3'>
                  <div className='flex h-7 w-7 items-center justify-center rounded-full bg-[var(--color-accent-light)] text-[var(--color-text-secondary)]'>
                    <FiGitBranch className='h-4 w-4' />
                  </div>
                  <span>
                    Fork the{' '}
                    <a
                      href='https://github.com/GBonkers/ai-gallery'
                      className='underline hover:text-[var(--color-brand)]'
                    >
                      GitHub repository
                    </a>
                    .
                  </span>
                </li>

                <li className='flex items-center gap-3'>
                  <div className='flex h-7 w-7 items-center justify-center rounded-full bg-[var(--color-accent-light)] text-[var(--color-text-secondary)]'>
                    <FiFileText className='h-4 w-4' />
                  </div>
                  <span>
                    Follow the{' '}
                    <a
                      href='https://github.com/GBonkers/ai-gallery/blob/main/CONTRIBUTING.md'
                      target='_blank'
                      rel='noopener noreferrer'
                      className='underline hover:text-[var(--color-brand)]'
                    >
                      CONTRIBUTING GUIDE
                    </a>
                    .
                  </span>
                </li>

                <li className='flex items-center gap-3'>
                  <div className='flex h-7 w-7 items-center justify-center rounded-full bg-[var(--color-accent-light)] text-[var(--color-text-secondary)]'>
                    <FiCheckCircle className='h-4 w-4' />
                  </div>
                  <span>
                    Submit your pull request with metadata and a clear README
                    file.
                  </span>
                </li>

                <li className='flex items-center gap-3'>
                  <div className='flex h-7 w-7 items-center justify-center rounded-full bg-[var(--color-accent-light)] text-[var(--color-text-secondary)]'>
                    <FiUserPlus className='h-4 w-4' />
                  </div>
                  <span>Join the gallery and help grow the ecosystem!</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Contributors */}
          <div className='row-span-2 overflow-hidden rounded-2xl border border-[var(--color-border-light)] bg-[var(--color-background-light)] shadow-inner'>
            {/* Header Bar */}
            <div className='bg-[var(--color-background-dark)] px-6 py-4'>
              <h2 className='font-serif text-2xl font-semibold text-[var(--color-text-primary)]'>
                Meet the Contributors
              </h2>
            </div>

            {/* Contributors Grid */}
            <div className='px-6 py-6'>
              <div className='grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4'>
                {contributors.map((c) => (
                  <a
                    key={c.username}
                    href={c.profile}
                    target='_blank'
                    rel='noreferrer'
                    className='flex flex-col items-center gap-2 text-center transition hover:opacity-80'
                  >
                    <Image
                      src={`https://github.com/${c.username}.png`}
                      alt={`${c.username}'s avatar`}
                      width={64}
                      height={64}
                      className='rounded-full border border-[var(--color-border)] object-cover shadow-sm'
                    />

                    <span className='text-sm font-medium text-[var(--color-text-primary)]'>
                      @{c.username}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Our Philosophy */}
        <section className='mt-20 px-6 text-center'>
          {/* Divider */}
          <div className='mx-auto mb-6 h-px w-full rounded-full bg-[var(--color-border)] opacity-50' />

          {/* Quote Label */}
          <h2 className='mt-8 mb-4 font-serif text-3xl text-[var(--color-text-primary)]'>
            Our Philosophy
          </h2>

          {/* Framed Quote */}
          <blockquote className='mx-auto max-w-2xl'>
            <p className='text-lg leading-relaxed tracking-wide text-[var(--color-text-secondary)] italic'>
              “We believe in open knowledge, shared innovation, and the power of
              community to drive AI forward responsibly.”
            </p>
          </blockquote>
        </section>
      </div>
    </div>
  );
}
