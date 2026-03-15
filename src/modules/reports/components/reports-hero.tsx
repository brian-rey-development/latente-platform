import { getTranslations } from 'next-intl/server'

interface ReportsHeroProps {
  readonly count: number;
}

export async function ReportsHero({ count }: ReportsHeroProps) {
  const t = await getTranslations('reports')

  return (
    <section className="border-b-2 border-ink px-6 md:px-10 py-12 md:py-16 bg-surface">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
        <div>
          <p className="font-mono text-sm font-bold tracking-widest text-brand uppercase mb-4">
            {t('label')}
          </p>
          <h1 className="font-sans font-black text-5xl md:text-7xl lg:text-8xl leading-none tracking-tighter uppercase text-ink">
            {t('title')}
          </h1>
          <p className="font-serif text-lg text-muted mt-4 max-w-xl">
            {t('subtitle')}
          </p>
        </div>
        {count > 0 && (
          <div className="border-2 border-ink p-4 md:p-6 min-w-[120px] text-center">
            <span className="font-mono font-black text-4xl md:text-5xl block text-ink">
              {count}
            </span>
            <span className="font-mono text-xs font-bold tracking-widest uppercase text-brand">
              {t('title').replace('.', '')}
            </span>
          </div>
        )}
      </div>
    </section>
  );
}
