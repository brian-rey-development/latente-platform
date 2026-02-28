import type { Metadata } from 'next'
import Link from 'next/link'
import { getTranslations } from 'next-intl/server'
import { buttonVariants } from '@/shared/ui/button'

export const metadata: Metadata = {
  title: 'Manifiesto',
  description:
    'Latente es una publicación que emerge en el espacio entre el ruido y el silencio.',
}

export default async function ManifiestoPage() {
  const t = await getTranslations('manifesto')

  return (
    <div className="min-h-screen bg-surface">
      <header className="bg-ink text-surface px-6 md:px-16 pt-16 pb-12 border-b-2 border-border">
        <h1 className="font-sans font-black text-5xl md:text-7xl lg:text-[6rem] uppercase leading-[0.9] tracking-tighter">
          MANIFIESTO.
        </h1>
      </header>

      <article className="px-6 md:px-16 lg:px-32 py-16 max-w-4xl">
        <div className="prose prose-xl font-serif text-ink leading-[1.8] space-y-8">
          <p className="first-letter:float-left first-letter:text-7xl first-letter:font-sans first-letter:font-black first-letter:text-brand first-letter:mr-3 first-letter:mt-2 first-letter:leading-none">
            Latente es una publicación que emerge en el espacio entre el ruido y el silencio.
            Vivimos en una era de información infinita y comprensión escasa. Los algoritmos
            optimizan para el clic, no para la claridad.
          </p>

          <p>
            Nosotros hacemos lo opuesto: análisis lento, profundo e inconfortable. Cartografiamos
            las fuerzas que están redibujando el mapa del mundo, desde los laboratorios de
            biología sintética hasta las salas de guerra donde se decide quién controla los
            semiconductores del mañana.
          </p>

          <h2 className="font-sans font-black text-3xl md:text-4xl uppercase text-ink mt-16 mb-8 tracking-tighter">
            Por qué existimos
          </h2>

          <p>
            La inteligencia artificial no es una herramienta. Es una transformación civilizatoria.
            La geo-política del siglo XXI no se libra en campos de batalla, sino en líneas de
            código y centros de datos. La biología se ha convertido en tecnología programable.
          </p>

          <p>
            Estas fuerzas no son independientes. Convergen, colisionan, se amplifican mutuamente.
            Entenderlas requiere pensar en sistemas, no en titulares.
          </p>

          <blockquote className="border-l-4 border-brand bg-surface-dim p-8 md:p-10 my-16 shadow-brutal">
            <p className="font-serif italic text-2xl md:text-3xl text-ink leading-snug">
              &ldquo;El futuro ya está aquí, solo que no está distribuido de forma uniforme.&rdquo;
            </p>
            <footer className="font-mono text-xs font-bold uppercase tracking-widest mt-6 not-italic text-brand">
              {'///'} William Gibson
            </footer>
          </blockquote>

          <p>
            LATENTE existe para distribuirlo. Para quienes necesitan entender qué está
            ocurriendo realmente, por debajo de la superficie, donde las decisiones importantes
            ya están siendo tomadas.
          </p>
        </div>

        <div className="mt-16 pt-10 border-t-4 border-ink">
          <Link href="/" className={buttonVariants({ variant: 'primary' })}>
            {t('cta')}
          </Link>
        </div>
      </article>
    </div>
  )
}
