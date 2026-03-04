import { strings } from "@/shared/lib/strings";

export function EmptyArticles() {
  const quotes = [
    { text: strings.emptyState.quote0Text, author: strings.emptyState.quote0Author },
    { text: strings.emptyState.quote1Text, author: strings.emptyState.quote1Author },
    { text: strings.emptyState.quote2Text, author: strings.emptyState.quote2Author },
  ];

  return (
    <div className="min-h-[85vh] bg-ink text-surface flex flex-col items-center justify-center px-6 md:px-16 py-24">
      <div className="max-w-3xl w-full">
        <p className="font-mono text-sm font-bold uppercase tracking-widest text-brand mb-6">
          {strings.emptyState.label}
        </p>

        <h1 className="font-sans font-black text-5xl md:text-7xl lg:text-8xl uppercase leading-[0.9] tracking-tighter mb-16">
          {strings.emptyState.heading}
        </h1>

        <div className="space-y-10 border-l-4 border-brand pl-8">
          {quotes.map((quote, i) => (
            <blockquote key={i}>
              <p className="font-serif text-xl md:text-2xl text-dim leading-snug mb-3">
                &ldquo;{quote.text}&rdquo;
              </p>
              <cite className="font-mono text-sm uppercase tracking-widest text-meta not-italic">
                - {quote.author}
              </cite>
            </blockquote>
          ))}
        </div>
      </div>
    </div>
  );
}
