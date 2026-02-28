import Image from 'next/image'
import type { PortableTextComponents } from '@portabletext/react'

export const portableTextComponents: PortableTextComponents = {
  block: {
    normal: ({ children, index }) => {
      const isFirst = index === 0
      return (
        <p
          className={
            isFirst
              ? 'first-letter:float-left first-letter:text-7xl first-letter:font-sans first-letter:font-black first-letter:text-brand first-letter:mr-3 first-letter:mt-2 first-letter:leading-none mb-8 text-ink-subtle'
              : 'mb-8 text-ink-subtle'
          }
        >
          {children}
        </p>
      )
    },
    h2: ({ children }) => (
      <h2 className="font-sans font-black text-3xl md:text-4xl uppercase text-ink mt-16 mb-8 tracking-tighter">
        {children}
      </h2>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-brand bg-surface-dim p-8 md:p-10 my-16 shadow-brutal">
        <p className="font-serif italic text-2xl md:text-3xl text-ink leading-snug">
          {children}
        </p>
      </blockquote>
    ),
  },
  types: {
    image: ({ value }: { value: { asset?: { url?: string }; caption?: string } }) => {
      const src = value.asset?.url
      if (!src) return null
      return (
        <figure className="my-16 w-full max-w-4xl">
          <div className="bg-ink p-1 border-2 border-ink shadow-brutal-lg relative aspect-video">
            <Image
              src={src}
              alt={value.caption ?? ''}
              fill
              className="object-cover grayscale contrast-[1.1]"
            />
          </div>
          {value.caption && (
            <figcaption className="font-mono text-xs font-bold uppercase tracking-widest text-ink mt-4 border-b-2 border-ink pb-2">
              {value.caption}
            </figcaption>
          )}
        </figure>
      )
    },
  },
}
