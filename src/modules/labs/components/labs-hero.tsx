interface LabsHeroProps {
  readonly count: number;
}

export function LabsHero({ count }: LabsHeroProps) {
  return (
    <section className="border-b-2 border-ink bg-ink text-surface px-6 md:px-10 py-12 md:py-20">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
        <div>
          <p className="font-mono text-sm font-bold tracking-widest text-brand uppercase mb-4">
            LATENTE / LABS
          </p>
          <h1 className="font-sans font-black text-5xl md:text-7xl lg:text-8xl leading-none tracking-tighter uppercase">
            LATENTE{" "}
            <span className="text-brand underline underline-offset-4 decoration-4">
              LABS
            </span>
            .
          </h1>
          <p className="font-serif text-lg text-dim mt-4 max-w-xl">
            Construimos Vertical SaaS para industrias que el software ha ignorado.
          </p>
        </div>
        {count > 0 && (
          <div className="border-2 border-border p-4 md:p-6 min-w-[120px] text-center">
            <span className="font-mono font-black text-4xl md:text-5xl block text-surface">
              {count}
            </span>
            <span className="font-mono text-xs font-bold tracking-widest uppercase text-brand">
              VENTURES
            </span>
          </div>
        )}
      </div>
    </section>
  );
}
