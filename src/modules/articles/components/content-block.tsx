import Image from "next/image";
import type { PortableTextComponents } from "@portabletext/react";

export const portableTextComponents: PortableTextComponents = {
  block: {
    normal: ({ children, index }) => {
      const isFirst = index === 0;
      return (
        <p
          className={
            isFirst
              ? "first-letter:float-left first-letter:text-7xl first-letter:font-sans first-letter:font-black first-letter:text-brand first-letter:mr-3 first-letter:mt-2 first-letter:leading-none text-ink-subtle"
              : "text-ink-subtle"
          }
        >
          {children}
        </p>
      );
    },

    h2: ({ children }) => (
      <h2 className="font-sans font-black text-3xl md:text-4xl uppercase text-ink tracking-tighter border-b-2 border-ink pb-4 pt-8">
        {children}
      </h2>
    ),

    h3: ({ children }) => (
      <h3 className="font-sans font-black text-2xl md:text-3xl text-ink tracking-tight pt-4">
        {children}
      </h3>
    ),

    h4: ({ children }) => (
      <h4 className="font-sans font-black text-lg text-muted pt-2">
        {children}
      </h4>
    ),

    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-brand bg-surface-dim p-8 md:p-10 shadow-brutal">
        <p className="font-serif italic text-2xl md:text-3xl text-ink leading-snug">
          {children}
        </p>
      </blockquote>
    ),
  },

  list: {
    bullet: ({ children }) => <ul className="space-y-3">{children}</ul>,
    number: ({ children }) => <ol className="space-y-3">{children}</ol>,
  },

  listItem: {
    bullet: ({ children }) => (
      <li className="flex items-start gap-3 text-ink-subtle">
        <span
          className="mt-2.5 w-2 h-2 bg-brand flex-shrink-0"
          aria-hidden="true"
        />
        <span>{children}</span>
      </li>
    ),
    number: ({ children, index }) => (
      <li className="flex items-start gap-4 text-ink-subtle">
        <span className="font-mono font-bold text-sm text-brand flex-shrink-0 w-6 mt-0.5">
          {String(index + 1).padStart(2, "0")}.
        </span>
        <span>{children}</span>
      </li>
    ),
  },

  marks: {
    strong: ({ children }) => (
      <strong className="font-black text-ink">{children}</strong>
    ),
    em: ({ children }) => (
      <em className="italic text-muted">{children}</em>
    ),
    code: ({ children }) => (
      <code className="font-mono text-sm bg-surface-dim border border-divider px-1.5 py-0.5 text-brand">
        {children}
      </code>
    ),
    underline: ({ children }) => (
      <span className="underline underline-offset-2">{children}</span>
    ),
    "strike-through": ({ children }) => (
      <span className="line-through text-meta">{children}</span>
    ),
    link: ({ value, children }) => {
      const raw = typeof value?.href === "string" ? value.href : "";
      const isSafe = /^(https?:\/\/|\/)/.test(raw);
      if (!isSafe) return <span>{children}</span>;
      return (
        <a
          href={raw}
          target="_blank"
          rel="noopener noreferrer"
          className="text-brand underline underline-offset-2 hover:text-ink transition-colors"
        >
          {children}
        </a>
      );
    },
  },

  types: {
    image: ({
      value,
    }: {
      value: { asset?: { url?: string }; caption?: string };
    }) => {
      const src = value.asset?.url;
      if (!src) return null;
      return (
        <figure className="my-16 w-full max-w-4xl group">
          <div className="bg-ink p-1 border-2 border-ink shadow-brutal-lg relative aspect-video overflow-hidden">
            <div className="absolute inset-0 bg-brand mix-blend-multiply opacity-0 group-hover:opacity-80 transition-opacity z-10" />
            <Image
              src={src}
              alt={value.caption ?? ""}
              fill
              className="object-cover grayscale contrast-[1.1]"
            />
          </div>
          {value.caption && (
            <figcaption className="font-mono text-sm font-bold uppercase tracking-widest text-ink mt-4 border-b-2 border-ink pb-2">
              {value.caption}
            </figcaption>
          )}
        </figure>
      );
    },
  },
};
