// src/components/Home.tsx
import Link from 'next/link';
import React from 'react';

const featuredAgents = [
  {
    id: 'chatgpt',
    title: 'ChatGPT',
    description: 'A conversational AI model developed by OpenAI',
    tag: 'NLP',
  },
  {
    id: 'image-classifier',
    title: 'ImageClassifier',
    description: 'An image recognition model for various object categories',
    tag: 'Vision',
  },
  {
    id: 'code-assistant',
    title: 'CodeAssistant',
    description: 'An AI tool for code generation and suggestion',
    tag: 'Multimodal',
  },
];

const modalities = ['NLP', 'Vision', 'Audio', 'Agents', 'Multimodal'];

export default function Home() {
  return (
    <div className='min-h-screen bg-[#fdf6ee] text-[#442c1c]'>
      <div className='mx-auto max-w-6xl rounded-3xl bg-[#fff9f1] px-6 py-16 shadow-inner'>
        {/* Hero Section */}
        <div className='text-center'>
          <h1 className='mb-4 font-serif text-6xl font-semibold'>
            The AI Gallery
          </h1>
          <p className='mb-10 text-lg text-[#5c3e2e]'>
            A curated, open-source collection of intelligent agents.
          </p>
          <div className='flex justify-center gap-4'>
            <Link
              href='/agents'
              className='rounded-md bg-[#8c4b26] px-6 py-3 font-medium text-white transition hover:bg-[#7b3e1c]'
            >
              Browse Gallery
            </Link>
            <a
              href='https://github.com/GBonkers/ai-gallery'
              target='_blank'
              rel='noreferrer'
              className='rounded-md border border-[#8c4b26] px-6 py-3 text-[#8c4b26] transition hover:bg-[#f2e7db]'
            >
              Contribute on GitHub
            </a>
          </div>
        </div>

        {/* Featured */}
        <section className='mt-20'>
          <h2 className='mb-8 font-serif text-3xl'>Featured</h2>
          <div className='relative'>
            <div className='flex space-x-6 overflow-x-auto pb-6'>
              {featuredAgents.map((agent) => (
                <div
                  key={agent.id}
                  className='min-w-[260px] rounded-xl bg-white p-6 shadow-md transition hover:shadow-lg'
                >
                  <h3 className='mb-2 text-xl font-bold'>{agent.title}</h3>
                  <p className='mb-4 text-[#5c3e2e]'>{agent.description}</p>
                  <span className='inline-block rounded-full bg-[#a0623d] px-3 py-1 text-sm text-white'>
                    {agent.tag}
                  </span>
                </div>
              ))}
            </div>

            {/* Carousel Dots */}
            <div className='mt-4 flex justify-center gap-2'>
              {featuredAgents.map((_, i) => (
                <span
                  key={i}
                  className={`block h-2 w-2 rounded-full ${
                    i === 0 ? 'bg-[#8c4b26]' : 'bg-[#d8b89e]'
                  }`}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Browse by Modality */}
        <section className='mt-20'>
          <h2 className='mb-8 font-serif text-3xl'>Browse by Modality</h2>
          <div className='flex flex-wrap gap-4'>
            {modalities.map((modality) => (
              <button
                key={modality}
                className='rounded-full bg-[#e7c9b0] px-6 py-2 font-medium text-[#442c1c] transition hover:bg-[#d9b89c]'
              >
                {modality}
              </button>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
