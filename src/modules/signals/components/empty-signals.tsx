import { getTranslations } from 'next-intl/server'

export async function EmptySignals() {
  const t = await getTranslations('signals')

  return (
    <div className="flex flex-col items-center justify-center py-24 px-6 border-l-4 border-brand">
      <p className="font-mono text-xs font-bold uppercase tracking-widest text-brand mb-3">
        {t('heading')}
      </p>
      <p className="font-sans font-black text-2xl uppercase text-muted text-center leading-tight">
        {t('soon')}
      </p>
    </div>
  )
}
